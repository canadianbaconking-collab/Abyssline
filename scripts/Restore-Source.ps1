param(
    [string]$ZipPath = 'C:\dev\backups\abyssline\recovery-2026-10-29\ABYSSLINE-source.zip',
    [string]$Destination = 'C:\dev\playground\abyssline-restored'
)
$ErrorActionPreference = 'Stop'
$destinationRoot = [IO.Path]::GetFullPath($Destination).TrimEnd('\')
if (Test-Path -LiteralPath $destinationRoot) {
    throw 'Destination already exists. Choose a new empty path; nothing was overwritten.'
}
if ((Get-FileHash -LiteralPath $ZipPath -Algorithm SHA256).Hash -ne 'A1124199460A050F9706A0B630B7CDD0060025DC4E237F78ED64A750B4083DB2') {
    throw 'This is not the verified recovery ZIP. Stopping before extraction.'
}
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [IO.Compression.ZipFile]::OpenRead($ZipPath)
try {
    $seen = @{}
    $mapping = foreach ($entry in $archive.Entries) {
        if ($entry.FullName.StartsWith('abyssline/')) {
            $relative = $entry.FullName.Substring('abyssline/'.Length)
        } elseif ($entry.FullName.StartsWith('abyssline-playthroughs/')) {
            $relative = 'reports/playthroughs/' + $entry.FullName.Substring('abyssline-playthroughs/'.Length)
        } else { throw "Unexpected entry: $($entry.FullName)" }
        $target = [IO.Path]::GetFullPath((Join-Path $destinationRoot $relative))
        if (-not $target.StartsWith($destinationRoot + '\', [StringComparison]::OrdinalIgnoreCase)) {
            throw 'Archive entry escapes the destination.'
        }
        if ($seen.ContainsKey($target)) { throw 'Duplicate archive destination.' }
        $seen[$target] = $true
        [pscustomobject]@{ Entry = $entry; Target = $target }
    }
    foreach ($item in $mapping) {
        New-Item -ItemType Directory -Path ([IO.Path]::GetDirectoryName($item.Target)) -Force | Out-Null
        [IO.Compression.ZipFileExtensions]::ExtractToFile($item.Entry, $item.Target, $false)
    }
} finally { $archive.Dispose() }
# Keep future campaign output inside the restored project.
$runner = Join-Path $destinationRoot 'tests\playthroughs.mjs'
$text = [IO.File]::ReadAllText($runner)
$text = $text.Replace("path.resolve(fileURLToPath(new URL('../../',import.meta.url)),'abyssline-playthroughs')", "fileURLToPath(new URL('../reports/playthroughs/',import.meta.url))")
[IO.File]::WriteAllText($runner, $text, [Text.UTF8Encoding]::new($false))
Write-Output "Restored recovery source into $destinationRoot"
