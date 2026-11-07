# Documentation review

[Documentation](README.md)

Reviewed November 6, 2026 against the GitHub v0.2.1 source at `bca951b81f8b612bfcb94e1a9d417f4df77c8c3c`. This pass changes documentation only.

## Main finding

The repository had useful information but no clear reading order. Player instructions, implementation details, design interpretation, review evidence, and machine-specific recovery steps competed for attention. Readers needed to know the project's history before they could find an ordinary next action.

## Problems and changes

| Problem | Change |
|---|---|
| README opened with a recovered Windows path. | Lead with the game, its scope, and three launch steps. |
| Long rules lists made the entry point hard to scan. | Move detailed rules to a searchable player reference; retain a short overview and task links. |
| First-operation and player guides were PDF-only. | Add Markdown equivalents with steps, tables, cross-links, and troubleshooting. Keep the illustrated PDFs available. |
| Controls ambiguously suggested `?` was a keyboard shortcut. | Identify the field-manual screen button explicitly. |
| Setup mixed current work with first-commit and remote-creation steps that predated GitHub. | Add a current development guide; preserve the original recovery record under history with a clear status note. |
| Review findings appeared in a very wide table. | Give each finding a short explanation, fix, and regression context. |
| Design rationale, implemented features, and proposed expansion ran together. | Mark implementation, interpretation, evidence limits, and proposals separately. |
| Campaign analysis required a long read before showing the takeaway. | Add an evidence summary, navigation, and expandable individual run records. Preserve the recorded results and limitations. |
| Campaign reproduction command pointed at an old output directory. | Use the checked-in runner path and document which tracked files it replaces. |
| Historical verification could look like fresh assurance. | Label release review, campaign analysis, recovery checks, and old screenshots as historical. |

## How to maintain this structure

- **README:** what the game is, how to launch it, and where to go next.
- **First operation:** one opening mission, in play order.
- **Player guide:** current controls and rules, grouped by question.
- **Development guide:** current setup, code responsibilities, checks, and backups.
- **Design notes:** rationale and proposals with status visible.
- **Reports and history:** dated evidence with methods and limits.

The player reference was checked against `src/engine.js`, `src/app.js`, and the recovered v0.2.1 PDFs. The original PDFs and raw campaign data were retained. This pass does not claim a new interactive playthrough or a gameplay balance review.

## Verification for this documentation pass

- All 75 existing automated tests passed.
- Rebuilding `ABYSSLINE.html` produced no diff from the checked-in offline build.
- Checked all 11 Markdown files: 87 relative links and anchors resolved; code fences and expandable run records were balanced.
- Git whitespace checks passed. The change set contains Markdown only; gameplay source, PDFs, screenshots, and raw campaign records are unchanged.

No new interactive browser playthrough was performed.
