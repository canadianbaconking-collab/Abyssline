param([string]$BackupDirectory = 'C:\dev\backups\abyssline')
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'Use-Tools.ps1')
$projectRoot = Split-Path -Parent $PSScriptRoot
Push-Location -LiteralPath $projectRoot
try {
    & $GitExe rev-parse --verify HEAD *> $null
    if ($LASTEXITCODE -ne 0) { throw 'Make the first Git commit before creating a bundle.' }
    $changes = @(& $GitExe status --porcelain)
    if ($LASTEXITCODE -ne 0) { throw 'Could not read Git status.' }
    if ($changes.Count -gt 0) { throw 'Commit or resolve pending changes before backing up. Ignored personal saves need a separate copy.' }
    New-Item -ItemType Directory -Path $BackupDirectory -Force | Out-Null
    $bundle = Join-Path ([IO.Path]::GetFullPath($BackupDirectory)) ('abyssline-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '-' + [guid]::NewGuid().ToString('N').Substring(0,8) + '.bundle')
    & $GitExe bundle create $bundle --all
    if ($LASTEXITCODE -ne 0) { throw 'Git bundle creation failed.' }
    & $GitExe bundle verify $bundle
    if ($LASTEXITCODE -ne 0) { throw 'Git bundle verification failed.' }
    Write-Output "Verified Git backup: $bundle"
} finally { Pop-Location }
