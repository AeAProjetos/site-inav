<#
Extrai o texto de um .docx, sem Word, poppler ou Python.

Uso:
  powershell -NoProfile -ExecutionPolicy Bypass -File .claude/scripts/ler-docx.ps1 -Caminho "Refinamento/Contato/01_Copy/Copy.docx"
  powershell -NoProfile -ExecutionPolicy Bypass -File .claude/scripts/ler-docx.ps1 -Caminho "..." -Saida "scratch/refinamento/contato/copy.txt"

Sem -Saida, imprime o texto. Com -Saida, grava em UTF-8. Só grava dentro de scratch/, que fica fora do Git.
Cada parágrafo vira uma linha, e as células de tabela são separadas por " | ".
Os comentários do Word, se houver, vão para o fim.
#>
param(
  [Parameter(Mandatory = $true)][string]$Caminho,
  [string]$Saida
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.IO.Compression.FileSystem

function ConvertTo-TextoDocx([string]$xml) {
  $t = $xml -replace '</w:p>\s*</w:tc>', ' | ' `
    -replace '</w:tr>', "`n" `
    -replace '</w:p>', "`n" `
    -replace '<w:tab/>', "`t" `
    -replace '<w:br[^>]*/>', "`n" `
    -replace '<[^>]+>', ''
  return [System.Net.WebUtility]::HtmlDecode($t)
}

$zip = [System.IO.Compression.ZipFile]::OpenRead((Resolve-Path -LiteralPath $Caminho).Path)
try {
  function Read-DocxPart([string]$nome) {
    $entrada = $zip.GetEntry($nome)
    if (-not $entrada) { return $null }
    $leitor = New-Object System.IO.StreamReader($entrada.Open(), [System.Text.Encoding]::UTF8)
    try { return $leitor.ReadToEnd() } finally { $leitor.Dispose() }
  }

  $texto = ConvertTo-TextoDocx (Read-DocxPart "word/document.xml")
  $comentarios = Read-DocxPart "word/comments.xml"
  if ($comentarios) {
    $texto += "`n--- Comentários do Word ---`n" + (ConvertTo-TextoDocx $comentarios)
  }
} finally {
  $zip.Dispose()
}

# Linhas vazias repetidas viram uma só.
$texto = ($texto -replace "(\r?\n){3,}", "`n`n").Trim()

if ($Saida) {
  $raiz = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..\..")).Path
  $destino = [System.IO.Path]::GetFullPath((Join-Path $raiz $Saida))
  if (-not $destino.StartsWith((Join-Path $raiz "scratch\"), [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "A saída precisa ficar dentro de scratch/: $destino"
  }
  New-Item -ItemType Directory -Force -Path (Split-Path $destino) | Out-Null
  [System.IO.File]::WriteAllText($destino, $texto, (New-Object System.Text.UTF8Encoding $false))
  $linhas = ($texto -split "`n").Count
  "Gravado: $Saida ($linhas linhas)"
} else {
  $texto
}
