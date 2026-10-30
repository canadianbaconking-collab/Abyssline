# ABYSSLINE

Recovered Windows workspace: `C:\dev\playground\abyssline`. See [WORKSPACE.md](WORKSPACE.md) for recovery details, PowerShell commands, source review, and Git backups.

A playable single-player tactical campaign about managing a deep-ocean containment crisis. Version 0.2.1 removes fatigue and fixes campaign, combat, movement, and save-import bugs. The game includes a complete command → deployment → objective → extraction → progression loop with victory and defeat endings.

## Play

Open **ABYSSLINE.html** in a desktop browser with WebGL enabled. Everything is embedded; no installation or network connection is needed. A mouse and keyboard are recommended. The layout also adapts to smaller windows.

For development, run `node server.mjs` in this folder, then open **http://127.0.0.1:4173**. No npm install is required. Set the `PORT` environment variable if needed.

The game autosaves after each action in the browser. Use **☰ → Export save file** for a portable backup. Saves belong to the browser and origin: use Export/Import when moving between the offline file and localhost. A blocked browser storage setting may prevent autosaving; export manually in that case.

## Your first operation

1. Start **Acoustic masking** in Research to reduce noise buildup.
2. In Command, select a region and prepare deployment. You begin with six specialists.
3. Select an operator with the bottom roster or keys **1–6**. Click a highlighted tile to move: blue costs one action, gold costs two. You can also use arrow keys to position the tile cursor and Space to move.
4. Click a visible hostile to inspect its hit chance, then Fire. Firing ends that operator’s turn, so move first. Exposed enemies have a 35% critical chance for +2 damage. Flanking avoids directional cover. Tall structures block line of sight.
5. Move adjacent to each objective and Interact. The Engineer can Remote link from four tiles away with line of sight.
6. Return to the green landing zone. **Every operator extracts individually for one action.** Complete the objective and return at least one operator to win. Anyone left behind at the deadline or when abandoning the operation is lost.

## Controls

| Control | Action |
|---|---|
| Left click | Select a soldier or hostile; move to a floor tile |
| 1–6 | Select squad member |
| Arrow keys, Space | Position tile cursor, then move |
| F | Fire at selected hostile |
| G | Overwatch: spend remaining actions for one reaction shot |
| R | Reload three rounds for one action |
| B | Brace: reduce incoming damage by two until next turn |
| V | Specialist ability (Suppress ends the turn) |
| T | Transfer one action to a bonded partner, once per pair per mission |
| Contact → Depth charge | Preview and confirm a limited explosive |
| I | Interact with an adjacent objective |
| X | Extract from the landing zone |
| Enter | End turn (or activate a focused button) |
| Q / E | Rotate camera |
| Scroll / right drag | Zoom / orbit |
| ? | Full field manual |

## Connected systems

- **Strategy:** six regions, escalating breaches, Material, Signal, Stability, four research projects, equipment purchases, reserve roster, recruitment, injury recovery, persistent kills and XP, bonds, Signal watch assignments, timed regional counter-threats, and class doctrines at 8 XP.
- **Combat:** two actions per operator with attacks ending the turn, concealed insertions, enemy-group activation, flanking criticals, limited cover-destroying depth charges, six specialist roles, ammunition, directional cover, line of sight, team visibility, sonar, overwatch, suppression, healing, noise thresholds, reinforcements, cyclic flooding, and individual extraction.
- **Containment:** sealing valves reduces noise and flood damage.
- **Reconnaissance:** downloads create a loud broadcast that reveals contacts.
- **Rescue:** civilians move independently toward extraction and can be hurt by nearby enemies.
- **Emergency extraction:** wounded divers move more slowly than ordinary civilians.
- **Sabotage:** planted charges explode after two hostile phases; clear a two-tile radius.
- **Holdout:** defend a relay through five hostile phases. Engineers can repair it.
- **Final descent:** research Deep coordinates after two prior projects, win three operations, then override three anchors and return from a more dangerous mission.

Each completed or failed operation advances one strategic cycle. Advancing without deploying also heals injuries and progresses research, but escalates every region. At breach level 4–5, unattended regions drain Stability; at level 6 they are permanently lost. Emergency containment costs Material to reduce breach and recover Stability. Choosing where to act is the central campaign tradeoff.

## Revision notes

See [WOTC-REVISION.md](WOTC-REVISION.md) for the source-linked analysis, design decisions, implemented systems, and remaining differences from XCOM 2: War of the Chosen.

Old saves migrate automatically, keeping campaign and mission progress. Legacy fatigue fields are discarded. New insertions use concealment except Holdout and final descent. The save storage key remains unchanged.

Operators can deploy repeatedly without an accuracy penalty. Wounds, reserve status, and Signal watch assignments determine availability. The roster holds 12. After two shared returns, a pair can bond in Personnel. At 8 XP each class chooses one of two permanent doctrines. Signal watch takes one operator away for two cycles and earns 18 Signal + 2 XP.

The flagged region prevents the named enemy modifier if its mission is won before the countdown expires. Otherwise the next two operations receive the modifier. The briefing shows the consequence. Standard regional escalation still applies.

## Scope and implementation

This slice uses a procedural industrial platform kit with seeded cover variants, six objective rule sets, two enemy archetypes, and a concluding mission. It is designed for replayable short campaigns rather than a full-length commercial campaign. Movement and firing are animated; art is generated from low-poly geometry. No accounts, analytics, external services, or paid assets are used.

- `src/engine.js`: serializable deterministic game rules; no browser dependency.
- `src/view.js`: Three.js scene, procedural geometry, camera, input picking, animation.
- `src/app.js`: command interface, mission HUD, campaign save/import/export, sound.
- `style.css`: desktop and compact layouts.
- `tests/`: focused rules tests and simulated missions/campaigns using public actions.
- `build.mjs`: rebuilds the standalone offline HTML from source.

Run `node --test tests/*.test.mjs` for verification. Run `node build.mjs` after changing source files to refresh the offline build.

Run `node tests/playthroughs.mjs` for three reproducible full campaigns with containment, research/counter-threat, and firepower priorities. It writes action records and importable ending saves to `reports/playthroughs` inside this repository. The accompanying `ANALYSIS.md` documents outcomes, turning points, coverage, and limits; these are automated campaign runs using normal game actions. The analysis and chart are historical artifacts and are not regenerated by this command.

Three.js r169 is included under its MIT license in `vendor/THREE-LICENSE.txt`.
