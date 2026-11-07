# v0.2.1 code review record

[Documentation](docs/README.md) · [Development guide](docs/development.md)

**Historical release review.** Five confirmed bugs were reproduced and fixed in v0.2.1, alongside removal of fatigue. The verification below records that review; it is not a new exhaustive audit or a guarantee about later changes.

## Resolved findings

### P1 — Malformed imported saves could reach rendering or crash the game

Imported data could contain unvalidated perk markup, log attributes, report fields, inherited class names, or invalid mission references.

**Fix:** `validateSave` checks renderer-facing values, enum ownership, report/log shapes, objective counts, coordinates, and unique/known IDs without throwing. Callsigns, perks, and casualty names are escaped by the interface.

**Regression coverage:** malformed imports are rejected; valid current and legacy saves round-trip.

### P2 — A failed operation could leave a breach-6 region active

Failure could raise a region from breach 5 to 6 without permanently closing it or charging the 12-Stability loss.

**Fix:** failure now marks the region lost immediately and charges once. Migration repairs affected legacy saves once, including defeat at zero Stability. Lost regions cannot deploy again.

### P2 — A destroyed Holdout relay could be repaired before failure registered

A friendly depth charge could destroy the relay, but an Engineer could repair it before the next hostile phase.

**Fix:** destroying the relay, a required escort, or the remaining squad resolves failure immediately after the explosive action. A regression verifies that the destroyed relay cannot be repaired afterward.

### P2 — Teamwork could preserve Overwatch through a manual attack

An operator could set Overwatch, receive a bonded action, and fire while retaining the queued reaction shot.

**Fix:** valid Fire, Suppress, and depth-charge actions clear Overwatch. A regression covers **Overwatch → Teamwork → Fire** with active enemies.

### P2 — Invalid movement coordinates could resolve to a valid tile

Out-of-grid coordinates could alias an in-grid tile through the flattened tile index.

**Fix:** `tileAt` validates integer coordinates and bounds. Movement rejects invalid coordinates before path lookup and spends no AP.

Source references: [rules and validation](src/engine.js), [UI and imports](src/app.js), and [review regressions](tests/review.test.mjs).

## Fatigue removal

Deployment and aim no longer depend on fatigue. Mission completion does not add it, strategic cycles do not recover it, and Signal watch has no fatigue restriction. New campaigns and recruits omit the field. Migration deletes it from the roster and active squad while preserving progress.

Personnel shows kills in its place. Injuries, reserve status, and Signal watch still affect deployment. The release also updated briefings, reports, the field manual, design notes, and printable player guide.

## Verification recorded for the release

| Check | Recorded result |
|---|---|
| Automated suite | 75 tests passed, including review regressions, legacy migration, deterministic serialization, 30 mission simulations across all six regular types, and an earned-resource campaign to final victory. |
| Syntax | JavaScript source and generated standalone script passed syntax checks. |
| Browser | Rebuilt standalone HTML ran in the review browser; Personnel displayed kills without fatigue labels, manual revision 03, and v0.2.1 build stamp. |
| Printable player guide | Three pages; every rendered page checked for clipping and layout defects. |

These checks establish the reviewed behaviors and campaign completion. They do not establish balance across every seed, performance, or exhaustive browser compatibility. For reproducible commands, see [Verify a change](docs/development.md#verify-a-change).
