# Dot-source this file: . .\scripts\Use-Tools.ps1
$ErrorActionPreference = 'Stop'
$runtimeRoot = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies'
function Find-AbysslineTool([string]$Name, [string]$Fallback) {
    $found = Get-Command $Name -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) { return $found.Source }
    if (Test-Path -LiteralPath $Fallback -PathType Leaf) { return $Fallback }
    throw "$Name was not found. Install it or supply its executable path."
}
$NodeExe = Find-AbysslineTool 'node.exe' (Join-Path $runtimeRoot 'node\bin\node.exe')
$GitExe = Find-AbysslineTool 'git.exe' (Join-Path $runtimeRoot 'native\git\cmd\git.exe')
