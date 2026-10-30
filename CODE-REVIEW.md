# ABYSSLINE v0.2.1 code review

Reviewed the campaign rules, tactical actions, save migration/import, UI rendering, and standalone build. Five confirmed bugs were reproduced and fixed. The requested fatigue removal is included in this release.

## Findings and fixes

| Priority | Finding | Resolution and regression coverage |
|---|---|---|
| P1 | Imported saves could supply unvalidated perk markup, log attributes, report fields, inherited class names, or invalid mission references. Some reached HTML rendering; others could crash the interface or mission resolution. | `validateSave` now checks renderer-facing values, enum ownership, report/log shapes, objective counts, coordinates, and unique/known IDs without throwing. UI callsigns, perks, and casualty names are escaped. Malformed imports are rejected; valid current and legacy saves round-trip. |
| P2 | A failed operation raised its chosen region from breach 5 to 6 without marking it permanently lost or applying its 12-Stability loss. | Mission failure now closes the region immediately and charges the loss once. Migration repairs affected old saves once, including defeat when Stability reaches zero. A lost region cannot deploy again. |
| P2 | A friendly depth charge could destroy the Holdout relay, yet an Engineer could repair it before the next enemy phase recorded failure. | Destruction of the relay, a required escort, or the remaining squad resolves failure immediately after the explosive action. A regression verifies that a destroyed relay cannot be repaired afterward. |
| P2 | A bonded AP transfer let an operator shoot after setting Overwatch while retaining the queued reaction shot. | Valid Fire, Suppress, and depth-charge actions clear the queued Overwatch state. A regression exercises Overwatch → Teamwork → Fire with already active enemies. |
| P2 | Out-of-grid movement coordinates could alias an in-grid tile through the flattened tile index. | `tileAt` checks integer coordinates and grid bounds. Movement rejects invalid coordinates before looking up the path and does not spend AP. |

References: [rules and validation](src/engine.js), [UI and imports](src/app.js), [review regressions](tests/review.test.mjs).

## Fatigue removal

Deployment and aim no longer depend on fatigue. Mission completion no longer adds it, and strategic cycles no longer recover it. Signal watch has no fatigue restriction. New campaigns and recruits omit the field; migration deletes it from both the roster and an active squad while preserving campaign and mission progress.

The personnel screen shows kills in place of fatigue. Briefings, reports, the field manual, README, design notes, and three-page player guide have been updated. Injuries, reserve status, and Signal watch still affect availability.

## Verification

- 75 automated tests pass, including focused regression cases, legacy save migration, deterministic serialization, 30 mission simulations across all six mission types, and a campaign reaching final victory through earned resources and research.
- JavaScript source and the generated standalone script pass syntax checks.
- The rebuilt standalone HTML runs in the in-app browser. Personnel shows six KILLS statistics with no fatigue, tired, or exhausted labels. The manual is revision 03 and the build stamp is v0.2.1.
- The updated player guide is exactly three pages; every rendered page was visually checked for clipping and layout defects.

These checks establish the reviewed behaviors and campaign completion. They do not establish balance across every seed, nor constitute a performance audit or exhaustive browser compatibility test.
