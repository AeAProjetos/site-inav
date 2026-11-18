<#
Procura fotos repetidas entre páginas pela semelhança da imagem, com um dHash de 64 bits.
O hash do arquivo não serve, porque a foto publicada é recodificada e reduzida.

Uso:
  powershell -NoProfile -ExecutionPolicy Bypass -File .claude/scripts/comparar-fotos.ps1 `
    -Novas "Refinamento/Quem Somos/04_Imagens" [-Ignorar "public/img/quem-somos"] [-Limite 10]

Compara cada foto de -Novas com todas as de public/img, menos a pasta -Ignorar.
Lista os pares com distância até -Limite: 0 é a mesma imagem, até 10 costuma ser a mesma foto
com outro corte ou outra compressão, e acima de 12 são fotos diferentes.
Confira os pares suspeitos olhando as duas imagens.
#>
param(
  [Parameter(Mandatory = $true)][string]$Novas,
  [string]$Ignorar,
  [int]$Limite = 10
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.Drawing

$raiz = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..\..")).Path
$extensoes = @(".jpg", ".jpeg", ".png")

function Get-DHash([string]$caminho) {
  $img = [System.Drawing.Image]::FromFile($caminho)
  try {
    if ($img.PropertyIdList -contains 0x0112) {
      $tipos = @{ 3 = "Rotate180FlipNone"; 6 = "Rotate90FlipNone"; 8 = "Rotate270FlipNone" }
      $o = [int]$img.GetPropertyItem(0x0112).Value[0]
      if ($tipos.ContainsKey($o)) { $img.RotateFlip([System.Drawing.RotateFlipType]$tipos[$o]) }
    }
    $bmp = New-Object System.Drawing.Bitmap 9, 8
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, 9, 8)
    $g.Dispose()
    $bits = New-Object System.Text.StringBuilder 64
    for ($l = 0; $l -lt 8; $l++) {
      for ($c = 0; $c -lt 8; $c++) {
        $a = $bmp.GetPixel($c, $l); $b = $bmp.GetPixel($c + 1, $l)
        $la = 0.299 * $a.R + 0.587 * $a.G + 0.114 * $a.B
        $lb = 0.299 * $b.R + 0.587 * $b.G + 0.114 * $b.B
        [void]$bits.Append($(if ($la -gt $lb) { "1" } else { "0" }))
      }
    }
    $bmp.Dispose()
    return $bits.ToString()
  } finally {
    $img.Dispose()
  }
}

function Get-Distancia([string]$a, [string]$b) {
  $d = 0
  for ($i = 0; $i -lt 64; $i++) { if ($a[$i] -ne $b[$i]) { $d++ } }
  return $d
}

$pastaIgnorada = if ($Ignorar) { [System.IO.Path]::GetFullPath((Join-Path $raiz $Ignorar)).TrimEnd("\") + "\" } else { $null }
$publicadas = Get-ChildItem -LiteralPath (Join-Path $raiz "public\img") -Recurse -File |
  Where-Object { $extensoes -contains $_.Extension.ToLower() } |
  Where-Object { -not $pastaIgnorada -or -not $_.FullName.StartsWith($pastaIgnorada, [System.StringComparison]::OrdinalIgnoreCase) } |
  ForEach-Object { [pscustomobject]@{ Caminho = $_.FullName.Substring($raiz.Length + 1); Hash = (Get-DHash $_.FullName) } }

# Outro nome de propósito: o PowerShell não diferencia maiúsculas, e $novas seria o parâmetro [string] $Novas.
$fotosNovas = @(Get-ChildItem -LiteralPath (Resolve-Path -LiteralPath $Novas).Path -File |
  Where-Object { $extensoes -contains $_.Extension.ToLower() })

$suspeitas = 0
foreach ($nova in $fotosNovas) {
  $h = Get-DHash $nova.FullName
  $parecidas = $publicadas | ForEach-Object { [pscustomobject]@{ Caminho = $_.Caminho; Distancia = (Get-Distancia $h $_.Hash) } } |
    Where-Object { $_.Distancia -le $Limite } | Sort-Object Distancia
  foreach ($p in $parecidas) {
    "{0}  ~  {1}  (distância {2})" -f $nova.Name, $p.Caminho, $p.Distancia
    $suspeitas++
  }
}
"{0} foto(s) novas comparadas com {1} publicadas. {2} par(es) suspeito(s)." -f $fotosNovas.Count, @($publicadas).Count, $suspeitas
