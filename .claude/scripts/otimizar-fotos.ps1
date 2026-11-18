<#
Prepara uma foto para public/img/<página>/. O script:
- corrige a rotação gravada pelo celular;
- apara margens brancas, se pedido (livros e documentos digitalizados);
- recorta numa proporção, se pedido;
- reduz a largura;
- salva em JPEG sem metadados (EXIF, GPS, câmera) e confere o resultado.

Uso (uma foto por chamada):
  powershell -NoProfile -ExecutionPolicy Bypass -File .claude/scripts/otimizar-fotos.ps1 `
    -Origem "Refinamento/Quem Somos/04_Imagens/01_topo_IMG_1234.jpg" `
    -Destino "public/img/quem-somos/topo-equipe-no-patio.jpg" `
    -Largura 1600 -Qualidade 75 [-Aparar] [-Proporcao 4:3] [-FocoY 0.4]

-Proporcao recorta no centro, na largura e na altura. -FocoY vai de 0 (topo) a 1 (base) e escolhe a faixa vertical.
Só grava dentro de public/img/ e nunca em "public/img/Page Quero ajudar".
#>
param(
  [Parameter(Mandatory = $true)][string]$Origem,
  [Parameter(Mandatory = $true)][string]$Destino,
  [int]$Largura = 1400,
  [int]$Qualidade = 80,
  [switch]$Aparar,
  [string]$Proporcao,
  [double]$FocoY = 0.5
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.Drawing

$raiz = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..\..")).Path
$saida = [System.IO.Path]::GetFullPath((Join-Path $raiz $Destino))
$pastaPermitida = Join-Path $raiz "public\img\"
if (-not $saida.StartsWith($pastaPermitida, [System.StringComparison]::OrdinalIgnoreCase) -or $saida -match "Page Quero ajudar") {
  throw "O destino precisa ficar em public/img/<página>/: $saida"
}
if ($saida -notmatch "\.jpe?g$") { throw "O destino precisa terminar em .jpg" }

$src = [System.Drawing.Image]::FromFile((Resolve-Path -LiteralPath $Origem).Path)
try {
  # 1. Rotação do celular (tag EXIF 0x0112), antes de descartar os metadados.
  $rotacao = "nenhuma"
  if ($src.PropertyIdList -contains 0x0112) {
    $o = $src.GetPropertyItem(0x0112).Value[0]
    $tipos = @{
      2 = "RotateNoneFlipX"; 3 = "Rotate180FlipNone"; 4 = "Rotate180FlipX"; 5 = "Rotate90FlipX"
      6 = "Rotate90FlipNone"; 7 = "Rotate270FlipX"; 8 = "Rotate270FlipNone"
    }
    if ($tipos.ContainsKey([int]$o)) {
      $src.RotateFlip([System.Drawing.RotateFlipType]$tipos[[int]$o])
      $rotacao = $tipos[[int]$o]
    }
  }

  # 2. Margens brancas: mede numa miniatura e aplica na foto inteira.
  $x = 0; $y = 0; $w = $src.Width; $h = $src.Height
  if ($Aparar) {
    $escala = [Math]::Min(1.0, 300.0 / $src.Width)
    $mw = [Math]::Max(1, [int]($src.Width * $escala)); $mh = [Math]::Max(1, [int]($src.Height * $escala))
    $mini = New-Object System.Drawing.Bitmap $mw, $mh
    $gm = [System.Drawing.Graphics]::FromImage($mini)
    $gm.DrawImage($src, 0, 0, $mw, $mh); $gm.Dispose()
    $escura = New-Object 'bool[,]' $mw, $mh
    for ($i = 0; $i -lt $mw; $i++) {
      for ($j = 0; $j -lt $mh; $j++) {
        $p = $mini.GetPixel($i, $j)
        $escura[$i, $j] = (0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B) -lt 235
      }
    }
    $mini.Dispose()
    # Uma linha ou coluna conta como conteúdo quando mais de 2% dos pixels não são brancos.
    $temConteudoNaColuna = { param($c) $n = 0; for ($j = 0; $j -lt $mh; $j++) { if ($escura[$c, $j]) { $n++ } }; $n -gt ($mh * 0.02) }
    $temConteudoNaLinha = { param($l) $n = 0; for ($i = 0; $i -lt $mw; $i++) { if ($escura[$i, $l]) { $n++ } }; $n -gt ($mw * 0.02) }
    $esq = 0; while ($esq -lt $mw - 1 -and -not (& $temConteudoNaColuna $esq)) { $esq++ }
    $dir = $mw - 1; while ($dir -gt $esq -and -not (& $temConteudoNaColuna $dir)) { $dir-- }
    $topo = 0; while ($topo -lt $mh - 1 -and -not (& $temConteudoNaLinha $topo)) { $topo++ }
    $base = $mh - 1; while ($base -gt $topo -and -not (& $temConteudoNaLinha $base)) { $base-- }
    $x = [int]([Math]::Floor($esq / $escala)); $y = [int]([Math]::Floor($topo / $escala))
    $w = [Math]::Min($src.Width - $x, [int]([Math]::Ceiling(($dir - $esq + 1) / $escala)))
    $h = [Math]::Min($src.Height - $y, [int]([Math]::Ceiling(($base - $topo + 1) / $escala)))
  }

  # 3. Proporção: recorta no centro na horizontal e pela faixa -FocoY na vertical.
  if ($Proporcao) {
    $partes = $Proporcao -split "[:/x]"
    $alvo = [double]$partes[0] / [double]$partes[1]
    if ($w / $h -gt $alvo) {
      $nw = [int]($h * $alvo); $x += [int](($w - $nw) / 2); $w = $nw
    } else {
      # 0.0 e 1.0, não 0 e 1: com inteiros o PowerShell escolhe Math.Max(int, int) e zera o foco.
      $foco = [Math]::Min([double]1.0, [Math]::Max([double]0.0, $FocoY))
      $nh = [int]($w / $alvo); $y += [int](($h - $nh) * $foco); $h = $nh
    }
  }

  # 4. Redesenha num bitmap novo: o JPEG sai sem nenhum metadado da câmera.
  $fw = [Math]::Min($Largura, $w)
  $fh = [int][Math]::Round($h * $fw / $w)
  $bmp = New-Object System.Drawing.Bitmap $fw, $fh
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $atributos = New-Object System.Drawing.Imaging.ImageAttributes
  $atributos.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
  $g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $fw, $fh), $x, $y, $w, $h, [System.Drawing.GraphicsUnit]::Pixel, $atributos)
  $g.Dispose()

  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $params = New-Object System.Drawing.Imaging.EncoderParameters 1
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$Qualidade)
  New-Item -ItemType Directory -Force -Path (Split-Path $saida) | Out-Null
  $bmp.Save($saida, $codec, $params)
  $bmp.Dispose()
  $recorte = if ($Aparar -or $Proporcao) { "recorte=${x},${y},${w}x${h}" } else { "recorte=nenhum" }
} finally {
  $src.Dispose()
}

# 5. Conferência: só as tabelas de quantização do JPEG (0x5090 e 0x5091) podem sobrar.
$chk = [System.Drawing.Image]::FromFile($saida)
$extras = @($chk.PropertyIdList | Where-Object { $_ -ne 0x5090 -and $_ -ne 0x5091 }).Count
"{0}  {1}x{2}  {3:N0} KB  metadados={4}  rotacao={5}  {6}" -f $Destino, $chk.Width, $chk.Height, ((Get-Item -LiteralPath $saida).Length / 1KB), $extras, $rotacao, $recorte
$chk.Dispose()
