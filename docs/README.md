# ABYSSLINE documentation

Start with the guide for what you are doing. The Markdown guides below can be read directly on GitHub and cover the current v0.2.1 rules.

## Play

| Guide | Use it for |
|---|---|
| [Your first operation](guides/first-operation.md) | A step-by-step route from launch to your first debrief |
| [Player guide](guides/player-guide.md) | Controls, combat, missions, classes, equipment, research, and saves |

## Develop and evaluate

| Document | Use it for | Status |
|---|---|---|
| [Development guide](development.md) | Setup, source layout, verification, and backups | Current workflow |
| [Design notes](../WOTC-REVISION.md) | Implemented systems, design rationale, and proposed expansion | Current v0.2.1 scope; proposals labeled |
| [Code review](../CODE-REVIEW.md) | Five resolved bugs, fatigue removal, and regression coverage | Historical v0.2.1 review |
| [Campaign analysis](../reports/playthroughs/ANALYSIS.md) | Three automated campaigns, evidence, and test limits | Historical results from October 1, 2026 |
| [Documentation review](documentation-review.md) | Problems found and how this documentation pass addresses them | Documentation changes only |

## Printable guides and history

The recovered PDFs remain available for printing and their annotated examples. They are fixed v0.2.1 snapshots; update the Markdown guides when rules change.

- [First Operation Guide (PDF)](guides/ABYSSLINE%20First%20Operation%20Guide.pdf) — four illustrated pages.
- [Player Guide (PDF)](guides/ABYSSLINE%20Player%20Guide.pdf) — three reference pages.
- [Windows recovery record](history/workspace-recovery.md) — original paths, archive hash, checks, and recovery commands from October 29, 2026. Machine-specific information is historical.
- [Workspace entry point](../WORKSPACE.md) — links to the current workflow and recovery record.

## Keeping the docs useful

Update the [player guide](guides/player-guide.md) when controls, rules, or progression change, and the [first-operation guide](guides/first-operation.md) if that changes the opening mission. Keep the in-game manual in `src/app.js` consistent, then rebuild `ABYSSLINE.html`.

Put implementation instructions in the development guide and design proposals in the design notes. Record verification with its version and limits. Preserve old reports as dated evidence; a new test run does not automatically update their analysis or charts.
