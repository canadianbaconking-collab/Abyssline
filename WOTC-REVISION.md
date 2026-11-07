# Design notes: tactical commitment and campaign pressure

[Documentation](docs/README.md) · [Player rules](docs/guides/player-guide.md)

**Status:** implemented v0.2.1 systems, followed by design interpretation and possible future work. This document explains why the systems exist; use the player guide for rules and controls.

## The central design problem

A tactical choice should matter beyond the current shot. ABYSSLINE connects three decisions:

- **Position and commitment:** moving spends actions you may need to fight or extract.
- **Information and timing:** discovering another enemy group changes when it is safe to engage.
- **Veterans and availability:** injuries, bonds, and assignments change which team you can field next.

The ocean setting adds its own pressures: noise attracts reinforcements, flooding changes safe routes, escorts slow extraction, and helping one region leaves others exposed.

## What changed in this revision

Earlier builds allowed a shot for one action, letting stationary operators fire twice or shoot before retreating. Enemies activated individually, and progression relied on injuries plus a generic accuracy-or-health upgrade. The revision strengthens action sequencing, group encounters, veteran development, and regional choices.

| Implemented system | Current behavior | Intended decision |
|---|---|---|
| Action commitment | Fire, Suppress, Brace, Overwatch, and depth charges spend remaining AP. | Position before attacking; a dash gives up immediate offense. |
| Concealed insertion | Most missions start concealed. Detection checks the movement route; attacks, objectives, and noise 4+ reveal the squad. | Prepare an opening or trade concealment for speed. |
| Enemy groups | Encountered groups activate and scatter together. Prepared Overwatch can react. Groups activated during the hostile phase do not attack that phase. | Decide whether the squad can handle another engagement. |
| Criticals and explosives | Exposed targets allow criticals. Limited depth charges deal guaranteed damage, destroy low cover, add noise, and permit friendly fire. | Improve an angle, spend a limited resource, or risk an uncertain shot. |
| Personnel availability | Injuries, reserve status, and Signal watch affect deployment. Living roster capacity is 12; no fatigue. | Balance today's squad against recovery and assignments. |
| Bonds | Two shared returns allow a mutual bond; Teamwork transfers one action once per pair per mission. | Keep partners together and choose when an extra action matters most. |
| Class doctrines | At 8 XP, each class chooses one of two permanent upgrades. The 4-XP accuracy/health choice remains. | Develop distinct veterans within the same role. |
| Signal watch | One operator is unavailable for two cycles, then returns with 18 Signal and 2 XP. | Trade immediate squad strength for research resources and reserve development. |
| Regional threats | A flagged mission prevents a timed modifier; missing it affects the next two operations. | Weigh threat prevention against breach urgency, rewards, and squad readiness. |

Fatigue was removed in v0.2.1. Healthy veterans can deploy repeatedly at full accuracy. Valid legacy saves migrate in place; old fatigue fields are discarded. An already active legacy mission stays revealed, while new insertions use the revised concealment rules.

## How the systems connect

### At Command

North Atlantic is at breach 5. Indian Ocean offers research Signal and counters Hardened shells. Going east risks losing North Atlantic; going north allows the modifier to mature.

Emergency containment can buy time to do both, but spends Material that could recruit an operator. An experienced Engineer can simplify the objective, while assigning that operator to Signal watch provides future Signal and XP at the cost of immediate availability.

The intended effect is that a mission's value changes with the campaign state, rather than remaining a fixed reward comparison.

### On the deck

A useful opening is to scout, stage Overwatch, position the objective specialist, then commit the first attack. After enemies activate, reassess cover and actions before firing the remaining weapons.

A bonded transfer can reopen a turn for reloading and attacking, finishing an objective, or extracting. Loud guaranteed damage may solve the current turn while attracting a stronger later threat. Those are tradeoffs the player can plan around.

## Inspiration and interpretation

XCOM 2 and War of the Chosen informed this revision. Reference material: [official XCOM 2 manual](https://www.feralinteractive.com/en/manuals/xcom2/latest/steam/) and [official expansion overview](https://store.steampowered.com/app/593380/XCOM_2_War_of_the_Chosen/).

**Design interpretation:** sequencing under incomplete information makes action points meaningful. Accuracy becomes interesting when the player can change the angle, suppress a survivor, spend an explosive, or conserve a resource. Roster relationships and competing assignments add value to an operator beyond their current weapon statistics.

ABYSSLINE applies those ideas to a short ocean-crisis campaign. Signal watch is a deterministic support assignment; depth charges destroy low cover. The prototype has six objective rule sets, two enemy archetypes, seeded procedural cover, and a concluding mission.

## What the evidence supports

The [v0.2.1 review](CODE-REVIEW.md) records regression coverage for action commitment, save handling, and other fixes. The [campaign report](reports/playthroughs/ANALYSIS.md) records two victories and one defeat from three automated policies on different seeds.

Those runs demonstrate connected campaign progression and meaningful consequences. They also found high casualties in victories, surplus Signal without faster research, and a poorly prepared final descent. Different seeds and several policy differences prevent causal claims about any single strategy or upgrade. The runs do not establish balance across seeds or human-player usability.

## Proposed work, not implemented

The current prototype has no recurring named nemesis, faction diplomacy, base construction, vertical traversal, large enemy roster, or multi-rank ability trees.

A possible major expansion is a **recurring ocean adversary** with a readable tactical ability, campaign interference, and an objective-driven way to end its threat. That could connect regional pressure and veteran progression to a memorable midgame opponent. This remains a proposal.

Nearer-term recommendations from the campaign evidence:

1. Make casualties conspicuous even when an operation succeeds.
2. Warn before the last operator leaves with an unfinished escort.
3. Explain escalation from acoustic reinforcements to Brutes.
4. Show final-descent squad composition and readiness clearly.
5. Test objective-runner survivability and class XP with paired seeds and stronger tactics.
6. Explore useful midgame Signal spending and research alternatives.

These priorities are candidates for future work, not a committed implementation schedule.
