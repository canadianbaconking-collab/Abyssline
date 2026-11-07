# Historical record: workspace recovery

> Recorded October 29, 2026. Paths, backup locations, and verification results describe the original Windows recovery. They have not been rechecked on the reader's machine. The first-commit and remote-creation instructions below predate the GitHub import; use the [current development guide](../development.md) for ongoing work.

# ABYSSLINE recovered workspace

Working folder: `C:\dev\playground\abyssline`.

Recovery date: October 29, 2026 (America/Vancouver). The original session folder and uploaded ZIP were preserved. This is a copy, so the old files remain available for comparison.

## Recovery evidence

- Uploaded archive: 26 files, version 0.2.1.
- Original: `C:\Users\Windows\Documents\Codex\2026-09-29\build-abyssline-a-single-player-turn\outputs`.
- The original ZIP and uploaded ZIP have the same SHA-256: `A1124199460A050F9706A0B630B7CDD0060025DC4E237F78ED64A750B4083DB2`.
- Before workspace changes, every file in the original game's source directory matched the recovered copy.
- Preserved ZIP: `C:\dev\backups\abyssline\recovery-2026-10-29\ABYSSLINE-source.zip`.
- Reorganized workspace snapshot: `C:\dev\backups\abyssline\recovery-2026-10-29\ABYSSLINE-workspace.zip` (includes personal save and supplemental files; excludes `.git`).
- Player guides and four screenshots were copied from the original outputs into `docs/`.
- The downloaded cycle-1 save was copied to `saves/abyssline-cycle-1.json` and the recovery backup folder. It passes the game's save validator. The original Downloads copy remains in place.

## Structure and source review

```text
abyssline/
  src/engine.js           deterministic rules, campaign state, save validation
  src/view.js             Three.js rendering, geometry, camera, picking
  src/app.js              screens, controls, audio, browser save/import/export
  tests/                 rules, regression tests, simulation and campaign runners
  vendor/                bundled Three.js r169 and its MIT license
  reports/playthroughs/  campaign records, ending saves, analysis and chart
  docs/guides/           recovered player PDFs
  docs/screenshots/      historical game screenshots
  scripts/               tool lookup, safe recovery and Git backup helpers
  saves/                 personal saves; excluded from Git
  index.html             development entry point
  style.css              interface styles
  server.mjs             local development server
  build.mjs              offline HTML packager
  ABYSSLINE.html          generated, playable offline build; tracked in Git
  package.json           optional npm shortcuts; no installed dependencies needed
```

The game already has a useful rules/rendering/interface split. Keep this structure while resuming development. `engine.js` has no browser dependency, which enables reproducible automated campaigns. `view.js` imports the locally bundled renderer. There is no framework or dependency installation step to recover.

The main maintenance issue is dense code with long lines and large responsibilities in `app.js` and `engine.js`. A later, separate cleanup can format the code and extract save handling and campaign UI, with the tests checking behavior. A framework migration is unnecessary for this recovery.

Edit `src/`, `style.css`, and `index.html`; rebuild `ABYSSLINE.html` rather than editing generated code. The packager uses source-text patterns to collect exports and remove imports, so substantial module changes need a build check as well as rules tests.

The one required path adjustment was in `tests/playthroughs.mjs`: reports now stay in `reports/playthroughs/`, rather than a sibling outside the repository. Package scripts now include build and playthrough shortcuts. README links and Git ignore/line-ending rules were added. Game rules and rendering were unchanged.

## Checks performed

- 75 automated tests passed using Node v24.22.1.
- Rebuilding produced `ABYSSLINE.html` byte-for-byte identical to the recovered build.
- All three full campaign simulations reproduced their records and ending saves byte-for-byte: two victories and one defeat, matching the historical analysis.
- The personal cycle-1 save passed validation.

This recovery did not include a new interactive browser playthrough or a fresh exhaustive code/security audit. `CODE-REVIEW.md` describes the earlier review. The report analysis and chart are historical; the campaign runner regenerates JSON files only.

## PowerShell: play and develop

Copy this into PowerShell. Tool lookup first uses installed Node/Git, then this machine's bundled runtime. It changes no permanent PATH or execution policy. If Windows blocks local scripts, use the executable paths shown in `scripts/Use-Tools.ps1` directly; no policy change is required for the game.

```powershell
Set-Location -LiteralPath 'C:\dev\playground\abyssline'
. .\scripts\Use-Tools.ps1
& $NodeExe server.mjs
```

Open `http://127.0.0.1:4173` in your browser. Ctrl+C stops the server. Use a second PowerShell window for other work. This local server binds to your own computer.

To play the standalone build without Node:

```powershell
Start-Process 'C:\dev\playground\abyssline\ABYSSLINE.html'
```

For verification after an edit:

```powershell
Set-Location -LiteralPath 'C:\dev\playground\abyssline'
. .\scripts\Use-Tools.ps1
& $NodeExe --test 'tests/*.test.mjs'
if ($LASTEXITCODE -ne 0) { throw 'Tests failed; stop here.' }
& $NodeExe build.mjs
if ($LASTEXITCODE -ne 0) { throw 'Build failed; stop here.' }
# Optional full campaigns; replaces the tracked generated JSON reports.
& $NodeExe tests/playthroughs.mjs
if ($LASTEXITCODE -ne 0) { throw 'Campaign verification failed.' }
```

Saves belong to a browser and origin. Moving from the old file to the new file or localhost may show a fresh campaign. Use the old game's menu to export the latest save, then import it in the new location. The copied cycle-1 file is a recovery option, not evidence that it is your latest campaign. Keep using the same browser and `127.0.0.1:4173` for consistency; `localhost` is a different origin.

## PowerShell: first Git checkpoint

Git is initialized on `main`. No remote was created. If the first commit is still pending, run this block; the identity prompts configure this repository only. Inspect the staged file list before the separate commit block.

```powershell
Set-Location -LiteralPath 'C:\dev\playground\abyssline'
. .\scripts\Use-Tools.ps1
$commitName = Read-Host 'Your Git commit name'
$commitEmail = Read-Host 'Your Git email (or GitHub no-reply email)'
if ([string]::IsNullOrWhiteSpace($commitName) -or [string]::IsNullOrWhiteSpace($commitEmail)) {
    throw 'Name and email are required.'
}
& $GitExe config --local user.name $commitName
if ($LASTEXITCODE -ne 0) { throw 'Could not set Git name.' }
& $GitExe config --local user.email $commitEmail
if ($LASTEXITCODE -ne 0) { throw 'Could not set Git email.' }
& $GitExe add --all
if ($LASTEXITCODE -ne 0) { throw 'Could not stage files.' }
& $GitExe diff --cached --stat
```

Then create the checkpoint and a portable backup:

```powershell
& $GitExe commit -m 'Recover ABYSSLINE v0.2.1 into stable Windows workspace'
if ($LASTEXITCODE -ne 0) { throw 'Commit failed.' }
& .\scripts\Backup-Git.ps1
```

For subsequent work: run tests and build, inspect `& $GitExe diff`, stage intended changes with `& $GitExe add --all`, commit with a descriptive message, then run `Backup-Git.ps1`. The backup helper refuses uncommitted changes so they cannot silently be left out. Personal `saves/` files are deliberately ignored: copy exported saves separately.

A bundle includes committed history and branches, not ignored files or pending edits. Copy verified bundles and personal saves to another drive or cloud backup; another folder on C: protects against accidental edits but not drive failure.

To restore a bundle into a new folder:

```powershell
$bundlePath = Read-Host 'Full path to the .bundle file'
$restoreFolder = 'C:\dev\playground\abyssline-from-backup'
if (Test-Path -LiteralPath $restoreFolder) { throw 'Choose a new restore folder.' }
& $GitExe clone $bundlePath $restoreFolder
if ($LASTEXITCODE -ne 0) { throw 'Restore failed.' }
```

For an off-computer Git remote, create an empty private repository in your chosen service, then run the following with its clone URL. The push uploads committed project content, including the recovered guides and reports.

```powershell
$remoteUrl = Read-Host 'Clone URL of your empty private repository'
if ([string]::IsNullOrWhiteSpace($remoteUrl)) { throw 'A repository URL is required.' }
& $GitExe remote add origin $remoteUrl
if ($LASTEXITCODE -ne 0) { throw 'Could not add origin; inspect git remote -v before changing an existing remote.' }
& $GitExe push -u origin main
if ($LASTEXITCODE -ne 0) { throw 'Push failed; check the URL and sign-in.' }
```

## PowerShell: repeat recovery from the original ZIP

The migration is already done. For a fresh recovery copy, this helper verifies the archive hash, validates paths, refuses an existing destination, and never deletes files:

```powershell
& 'C:\dev\playground\abyssline\scripts\Restore-Source.ps1' `
    -Destination 'C:\dev\playground\abyssline-restored'
```

This restores the original 26 archive files with reports inside the project and the runner path adjusted. Supplemental guides, screenshots, personal saves, workspace documentation, and Git history are outside the original ZIP; use the workspace snapshot or Git bundle for those project additions, and a separate personal-save backup.

## Resuming work

Use this stable folder for future edits. Start by playing a mission and checking your imported campaign. The next useful maintenance task is readable formatting in a dedicated commit, followed by one focused gameplay or interface change at a time. Keep the old recovery files until the new project, backups, and desired save have all been checked.
