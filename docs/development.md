# Develop ABYSSLINE

[Documentation](README.md) · [Project overview](../README.md)

ABYSSLINE is a browser game built from plain JavaScript, CSS, and locally bundled Three.js. Node.js runs the development server, tests, and offline packager. **No npm install is required.**

Commands below use PowerShell and the checkout path `C:\dev\playground\abyssline`. Substitute your own path if needed. For playing without development tools, open `ABYSSLINE.html`.

## Get the repository

Install Git and a current Node.js release if they are not already available. The recovery record used Node 24; the project does not declare a minimum Node version.

```powershell
Set-Location -LiteralPath 'C:\dev\playground'
git clone https://github.com/canadianbaconking-collab/Abyssline.git abyssline
Set-Location -LiteralPath '.\abyssline'
node --version
git status
```

Already cloned? Start in the existing checkout instead of cloning over it:

```powershell
Set-Location -LiteralPath 'C:\dev\playground\abyssline'
git status
```

## Daily workflow

Start the local server:

```powershell
Set-Location -LiteralPath 'C:\dev\playground\abyssline'
node server.mjs
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173). The server binds to the local computer. **Ctrl+C** stops it; use a second terminal for other commands.

To use another port:

```powershell
$env:PORT = '4174'
node server.mjs
```

Open [http://127.0.0.1:4174](http://127.0.0.1:4174). A different port uses different browser save storage; export/import your campaign when switching.

## Where to make changes

| File or folder | Responsibility |
|---|---|
| [`src/engine.js`](../src/engine.js) | Deterministic campaign and combat rules, serializable state, save migration and validation; no browser dependency. |
| [`src/view.js`](../src/view.js) | Three.js scene, procedural geometry, camera, picking, and animation. |
| [`src/app.js`](../src/app.js) | Command screens, mission interface, input, audio, save import/export, and in-game manual. |
| [`style.css`](../style.css), [`index.html`](../index.html) | Layout, styling, and development entry point. |
| [`tests/`](../tests/) | Rules and regression tests, mission simulations, and campaign runners. |
| [`build.mjs`](../build.mjs) | Packages source and vendor files into one offline HTML file. |
| [`ABYSSLINE.html`](../ABYSSLINE.html) | Generated offline build, tracked in Git. Rebuild it; edit the source files. |
| [`vendor/`](../vendor/) | Bundled Three.js r169 and its MIT license. |
| [`reports/playthroughs/`](../reports/playthroughs/) | Generated campaign records and ending saves, plus historical analysis and chart. |
| [`docs/`](./) | Player/developer guides, recovered PDFs, screenshots, and history. |
| [`scripts/`](../scripts/) | Windows tool lookup, Git-bundle backup, and original ZIP recovery helpers. |
| `saves/` | Optional personal-save folder; excluded from Git. Create it locally if needed. |

Keep the rules, rendering, and interface split. The packager removes imports and collects exports with source-text patterns; substantial module changes need a successful build as well as passing rules tests.

## Verify a change

From the repository root:

```powershell
node --test 'tests/*.test.mjs'
if ($LASTEXITCODE -ne 0) { throw 'Tests failed.' }
node build.mjs
if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }
git diff --stat
git diff
```

The optional npm equivalents are `npm test`, `npm run build`, and `npm start`. The scripts are defined in [`package.json`](../package.json).

For gameplay or interface changes, also open the local source and rebuilt `ABYSSLINE.html` in a browser. Check the changed action or screen and save behavior. Passing rules tests does not verify rendering or usability.

### Reproduce the three recorded campaigns

```powershell
node tests/playthroughs.mjs
if ($LASTEXITCODE -ne 0) { throw 'Campaign verification failed.' }
git diff -- reports/playthroughs
```

This **replaces tracked JSON reports** in `reports/playthroughs/`: action records and three importable ending saves. It does not regenerate `ANALYSIS.md` or `campaign-outcomes.png`.

The [campaign analysis](../reports/playthroughs/ANALYSIS.md) explains policies, outcomes, and limits. These are automated engine runs using public game actions, not browser playthroughs or a controlled balance study.

## Save compatibility

Browser saves belong to a browser and origin. Keep using the same browser and `127.0.0.1:4173` when testing one campaign; `localhost` uses a different origin. Export/import when switching to a file URL, another port, or another browser.

Keep migration and validation compatible with valid legacy exports. Malformed saves should be rejected without crashing the interface. Personal saves are ignored by Git and need their own backup.

## Commit and back up

Inspect changes and stage the intended paths before committing. This example stages the Markdown player guide; replace that path with the files you changed.

```powershell
git status
git diff
git add -- docs/guides/player-guide.md
git diff --cached
git commit -m 'Clarify player guide'
```

For an optional local Git bundle, use the existing Windows helper after resolving pending changes:

```powershell
. .\scripts\Use-Tools.ps1
& .\scripts\Backup-Git.ps1
```

The helper refuses a dirty working tree and verifies the resulting bundle. It defaults to `C:\dev\backups\abyssline`; pass `-BackupDirectory` to change that location. Bundles contain committed history and branches, not pending edits or ignored saves. Copy exported saves separately and keep backups off the original drive.

Restore a verified bundle into a **new** folder:

```powershell
$bundlePath = Read-Host 'Full path to the .bundle file'
$restoreFolder = 'C:\dev\playground\abyssline-from-backup'
if (Test-Path -LiteralPath $restoreFolder) { throw 'Choose a new restore folder.' }
git clone $bundlePath $restoreFolder
if ($LASTEXITCODE -ne 0) { throw 'Restore failed.' }
```

`Use-Tools.ps1` looks for installed Node/Git, then a machine-specific bundled runtime. It does not change permanent PATH or execution policy. If that fallback is absent, install the tools or supply executable paths. The normal `node`/`git` commands above do not require the helper.

## Recovery and maintenance history

The [original Windows recovery record](history/workspace-recovery.md) contains the archive hash and `Restore-Source.ps1` procedure. It describes the October 29 recovery, including files outside Git. Those machine-specific backups are not shipped by this repository.

Potential maintenance work: format dense source and extract save handling or campaign UI in separate changes, using the existing tests to preserve behavior. These are recommendations, not completed refactors or requirements for running the game.
