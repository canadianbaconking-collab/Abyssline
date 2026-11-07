# ABYSSLINE workspace

For ongoing work, use the [development guide](docs/development.md). It covers cloning the repository, running the game, testing changes, building the offline file, and backing up committed work.

The original Windows workspace was `C:\dev\playground\abyssline`. Use your own checkout path if different.

## Start the existing checkout

```powershell
Set-Location -LiteralPath 'C:\dev\playground\abyssline'
node server.mjs
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173). To play without Node, open `ABYSSLINE.html` instead.

## Recovery history

The [October 29 recovery record](docs/history/workspace-recovery.md) preserves archive hashes, original machine paths, verification results, and the ZIP restoration procedure. Its first-commit and remote-creation instructions describe the state before this GitHub repository existed.

Personal saves and local recovery archives are outside Git. Export the current browser campaign and back it up separately.
