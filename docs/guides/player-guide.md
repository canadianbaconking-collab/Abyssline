# Player guide

[Documentation](../README.md) · [First operation walkthrough](first-operation.md)

Rules reference for **v0.2.1**. Your job is to complete objectives, preserve a usable squad, and research a route to the source. Reinforcements continue arriving, so killing every enemy is unnecessary.

**Jump to:** [Controls](#controls) · [Combat](#combat-and-action-points) · [Hazards](#concealment-noise-and-flooding) · [Missions](#missions) · [Campaign](#campaign-decisions) · [Research](#research-and-the-final-descent) · [Classes](#specialists) · [Progression](#veterans-bonds-and-reserves) · [Equipment](#equipment) · [Saves](#saves-and-troubleshooting)

## Controls

Select an operator, then choose an action. Click a visible hostile before firing or suppressing it.

| Input | Action |
|---|---|
| Left click | Select an operator or hostile; move to a highlighted floor tile |
| **1–6** | Select a squad member |
| **Arrow keys**, then **Space** | Position a tile cursor, then move there |
| **F** | Fire at the selected hostile |
| **G** | Overwatch: prepare one reaction shot |
| **R** | Reload to three rounds |
| **B** | Brace against incoming attacks |
| **V** | Use the selected operator's specialist ability |
| **T** | Transfer one action to a bonded partner |
| **I** | Interact with an adjacent objective |
| **X** | Extract the selected operator from a green landing-zone tile |
| **Enter** | End turn; activates a focused button instead when one has keyboard focus |
| **Q / E** | Rotate the camera |
| Mouse wheel / right drag | Zoom / orbit the camera |
| **? button** | Open the field manual; this is a screen button, not a keyboard shortcut |
| **☰ menu** | Export/import saves, start a new campaign, or abandon an operation |

## Combat and action points

Each operator receives **2 AP per turn**. Blue movement costs 1 AP; gold movement costs 2. Base movement is five tiles per action, or six for a Diver, before gear and upgrades.

| Action | Cost and effect |
|---|---|
| Fire | Spends all remaining AP and one round. Move first if you need a better position. |
| Overwatch | Spends remaining AP for one reaction shot during enemy movement; requires ammunition. |
| Brace | Spends remaining AP; reduces incoming attack damage by 2 until the next turn. |
| Suppress | Anchor ability; spends remaining AP and one round. Deals 2 damage and cancels the target's next attack. |
| Depth charge | Spends remaining AP and a limited charge. See the blast rules below. |
| Reload | Costs 1 AP and fills the magazine to three rounds. |
| Interact / Extract | Requires an available action. Interact costs 1 AP; extraction removes the operator from play. |
| Other specialist ability | Costs 1 AP; once per operator per turn. |
| Teamwork | Costs 1 AP; gives a deployed bondmate 1 AP, up to a maximum of 2. |

An attack normally ends that operator's turn. A bondmate can transfer an action back afterward, allowing another action if other requirements are met.

**Position matters.** Directional cover lowers the chance of being hit. Flanking bypasses that protection. Exposed targets have a 35% critical chance for +2 damage. Tall structures block line of sight; sonar does not allow shooting through them.

## Concealment, noise, and flooding

Most insertions begin concealed. **Holdout and final descent begin revealed.** Enemies detect operators within three tiles and line of sight, including along movement routes. Attacks, objective interaction, and noise of 4 or more reveal the entire squad. Patrols can also discover a stationary team.

Revealed enemy groups activate together and scatter. Set supporting operators to Overwatch before the opening attack to react to that movement. Sonar reveals distant contacts without automatically activating them.

| Hazard | Rule | Practical response |
|---|---|---|
| Noise | Standard shots add 3; suppression adds 2; standard reaction fire adds 2; depth charges add 5. | Use only the attacks you need and plan a route home. |
| Acoustic reinforcements | At noise 7 or higher, one contact surfaces during the hostile phase. After the first two acoustic reinforcements, later acoustic arrivals are Brutes. | Repeated loud attacks can make later turns harder. |
| Timed reinforcements | Normally arrive every fourth hostile phase when an acoustic arrival does not occur that phase; Swarming tide shortens the interval to three. | Completing the objective promptly matters. |
| Noise decay | Noise falls by 1 after a hostile phase, or by 3 with completed Acoustic masking research. | Starting research is not the same as gaining its benefit. |
| Flooding | Striped tiles deal 3 damage every third hostile phase. Containment seals lower squad flood damage; Rebreathers prevent it. Enemies also take flood damage. | Check the pressure warning before End turn. |

**Depth charges:** each operator starts with one, except an Engineer with Demolition starts with two. Select a contact within six tiles, then preview and confirm the blast. A charge deals 4 guaranteed damage in a one-tile radius, destroys low cover, and hurts allies, escorts, and the Holdout relay. It does not destroy structural walls.

## Missions

Rewards are **Material / Signal** for a successful operation. All mission types also require at least one operator to extract. Regular operations have a 17-turn window; final descent has 20.

| Region | Mission and objective | Reward | Watch for |
|---|---|---:|---|
| North Atlantic | **Containment:** seal both valves. | 34 / 16 | Each seal reduces noise and flood damage. |
| Norwegian Sea | **Civilian rescue:** reach both civilians and get them safely to extraction. | 28 / 18 | Civilians move three tiles per hostile phase; nearby enemies can hurt them. |
| Indian Ocean | **Reconnaissance:** download both recorder arrays. | 22 / 26 | Each download adds 4 noise and reveals contacts. |
| South Pacific | **Holdout:** keep the relay alive through five hostile phases. | 36 / 18 | The Engineer can repair the relay. Destruction is immediate mission failure. |
| Philippine Trench | **Sabotage:** arm both charges and wait for both detonations. | 38 / 14 | Fuses last two hostile phases; blasts deal 5 damage within two tiles. Clear the area. |
| Southern Ocean | **Emergency extraction:** recover both wounded divers and escort them out. | 30 / 18 | They move only two tiles per hostile phase. Allow a longer return. |
| Any active region, after unlocking | **Final descent:** override all three lattice anchors, then extract. | Campaign victory | Begins revealed and has heavier resistance. |

Move adjacent to an objective and **Interact**, or use the Engineer's Remote link within four tiles and line of sight. The Systems doctrine extends that range to five.

**Extraction is individual.** Move each operator onto the green zone and use **Extract (X)** with an action available. Anyone still deployed when time expires or you abandon the operation is lost permanently.

In escort missions, wait until **both escorts are safely aboard before the last operator leaves**. The mission ends when no active operators remain. A rescued escort still walking toward the zone does not count as extracted.

## Campaign decisions

| Resource | What it does |
|---|---|
| **Material** | Buys equipment, recruits, and emergency containment. |
| **Signal** | Pays for research. |
| **Stability** | Keeps the campaign alive. Zero Stability, or losing every region, causes defeat. |

Choose a region by breach urgency, its flagged threat, rewards, and the mission your available squad can handle. Displayed depth is atmosphere rather than a difficulty statistic. Breach level 3 or higher adds a starting Brute.

### What advances time?

Finishing or failing an operation advances one strategic cycle. **Advance cycle** also progresses research, injuries, and assignments, grants 12 Material and 5 Signal, and escalates every active region. Buying gear, recruiting, and funding containment do not advance time.

| Event | Consequence |
|---|---|
| An unattended region advances to breach 4 or 5 | Lose 3 Stability for that region. |
| A region reaches breach 6 | Region is permanently lost; lose 12 Stability. |
| Successful operation | Chosen region loses 3 breach levels; gain 6 Stability before other regions escalate. |
| Failed operation | Chosen region gains 1 breach level; lose 14 Stability, plus 12 if the region is lost. The squad recovers only 8 Material and 4 Signal. |
| **Fund containment**: 20 Material | Selected active region loses 2 breach levels; gain 4 Stability without advancing time. |

**Example decision:** North Atlantic is at breach 5 while Indian Ocean offers a threat counter due in one cycle. Funding North Atlantic first lowers it to 3, so it can survive the cycle while you deploy east. The 20 Material spent on containment could otherwise buy most of a 24-Material recruit.

### Flagged regional threats

Win in the flagged region before its three-cycle countdown expires to prevent the named modifier. If it expires, the next two operations face that modifier.

| Modifier | Effect |
|---|---|
| Hardened shells | Hostiles gain 2 HP. |
| Predatory sonar | Hostiles gain 10 aim. |
| Swarming tide | Timed reinforcements arrive every three turns instead of four. |

## Research and the final descent

Only one project can run at a time. Costs are paid when research starts; benefits begin when it completes.

| Project | Signal | Cycles | Benefit |
|---|---:|---:|---|
| Acoustic masking | 16 | 2 | Noise decays by 3 instead of 1. |
| Pressure lattice | 22 | 2 | Unlocks Capacitors; all operators gain 1 maximum health. |
| Abyssal physiology | 22 | 2 | Unlocks Rebreathers; shortens medical recovery by one cycle. |
| Deep coordinates | 32 | 3 | Available after any two foundational projects. Unlocks final descent once you also have three successful operations. |

Complete the final descent's three objectives and extract a survivor to win the campaign. An unlocked mission is not a readiness assessment: check squad size, medical support, and objective specialists before committing.

## Specialists

Base stats before upgrades. Every class can shoot, interact, and extract. Specialist abilities use **V** and can be used once per turn, subject to AP and any limited charges.

| Class / starting callsign | HP / damage / range | Ability and useful timing |
|---|---|---|
| **Anchor / KEEL** | 11 / 4 / 7 | **Suppress:** 2 damage and disables the target's next attack; it can still move. Costs a round and remaining AP, adds 2 noise. Use on a threat that will survive the turn. |
| **Medic / PATCH** | 8 / 3 / 6 | **Field patch:** heals up to 5 HP to the living ally within two tiles with the lowest health percentage, including self. Two uses; no revival. |
| **Diver / RIPTIDE** | 9 / 3 / 6 | **Slipstream:** +3 movement range this turn and removes 2 noise. Costs an action; two ordinary moves cover more ground but do not reduce noise. Base movement is six. |
| **Engineer / RELAY** | 9 / 3 / 6 | **Remote link:** interact within four tiles and line of sight. In Holdout, repairs 4 relay HP up to 16. |
| **Scout / ECHO** | 8 / 3 / 7 | **Active sonar:** reveals all hostiles for two turns and adds 2 noise. Use before committing to a route. |
| **Marksman / GHOST** | 8 / 5 / 10 | **Steady aim:** next shot this turn gains 20 aim and 1 damage. Moving clears the bonus; establish position first. |

## Veterans, bonds, and reserves

- **Deployment:** the first six available, active operators deploy. Reserve someone to field another. Wounds and Signal watch make operators unavailable; healthy operators can deploy repeatedly at full accuracy. There is no fatigue.
- **Recruitment:** costs 24 Material, up to 12 living operators. Recruit classes follow a fixed sequence.
- **At 4 XP:** choose permanent **Precision** (+10 aim) or **Bulwark** (+2 HP) in Personnel.
- **At 8 XP:** choose one permanent class doctrine from the table below.
- **Bonds:** two unbonded operators can form a mutual bond after two shared returns. Deploy both to use **Teamwork (T)**: transfer 1 AP, capped at 2 AP, once per pair per mission.
- **Signal watch:** one healthy operator can take a two-cycle assignment. They cannot deploy during it and return with 2 XP and 18 Signal for Command.

| Class | Doctrine option 1 | Doctrine option 2 |
|---|---|---|
| Anchor | **Sentinel:** +2 reaction damage | **Bastion:** Brace reduces damage by 3 |
| Medic | **Surgeon:** heal 7 HP | **Triage:** three medical charges per mission |
| Diver | **Sprinter:** +2 movement range | **Raider:** 50% exposed-target critical chance |
| Engineer | **Demolition:** two depth charges | **Systems:** remote range 5; relay repair 6 |
| Scout | **Pathfinder:** vision range 9 instead of 7 | **Silent sonar:** sonar adds no noise |
| Marksman | **Deadeye:** +1 weapon damage | **Hunter:** +15 aim against exposed targets |

## Equipment

An operator equips one gear choice at a time. Prices are in Material.

| Gear | Cost | Effect | Requirement |
|---|---:|---|---|
| Standard | 0 | Balanced rig; no modifiers. | None |
| Silencer | 18 | Shots create no noise; weapon damage falls by 1. Firing still reveals the squad. | None |
| Plating | 22 | +3 maximum HP; movement range falls by 1. | None |
| Capacitor | 24 | +1 weapon damage; shots add 1 extra noise. | Pressure lattice |
| Rebreather | 16 | Flood immunity; +1 movement range. | Abyssal physiology |

## Saves and troubleshooting

The game autosaves after actions in browser storage. Use **☰ → Export save file** for a portable JSON backup and **Import save file** to restore it. Export before **New campaign**, which replaces the current local campaign.

| Problem | What to do |
|---|---|
| GitHub shows HTML source | Download and extract the repository, then open `ABYSSLINE.html` locally. |
| WebGL unavailable or the scene fails to render | Enable browser hardware acceleration and use a browser with WebGL support. |
| A fresh campaign appears after switching location | Export from the old browser/location and import in the new one. File URLs, localhost, `127.0.0.1`, and different ports may use different storage. |
| Autosave unavailable | Browser settings may block storage. Export manually before closing the game. |
| An operator cannot act | Check selection, AP, ammunition, ability use this turn, range, line of sight, and whether the hostile phase is running. |
| An operator cannot deploy | Check wounds, reserve status, Signal watch, and which six eligible operators appear first. |
| The objective is complete but the operation continues | Extract each operator from the green landing zone. |
| An imported save is rejected | Use a valid game export; malformed or incompatible data is rejected. Keep the original backup. |

Valid legacy saves migrate automatically while preserving campaign and mission progress. Legacy fatigue data is discarded. The in-game **?** button provides a compact field manual.

Rules reference: [game engine](../../src/engine.js) and [interface](../../src/app.js). The [PDF guide](ABYSSLINE%20Player%20Guide.pdf) remains available for printing.
