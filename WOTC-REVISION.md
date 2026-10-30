# ABYSSLINE v0.2.1 — XCOM 2 / War of the Chosen analysis and revision

The most useful lesson is that a tactical choice should have consequences beyond the current shot. This pass strengthens three connections: position to action commitment, information to engagement timing, and soldier development to campaign availability. ABYSSLINE keeps its own ocean crisis, noise, flooding, escort, sabotage and extraction rules.

## What makes XCOM 2 work

XCOM 2 gives soldiers two action points, distinguishes a single move from a dash, uses concealment to support ambushes, and makes directional cover and flanking matter. Its targeting interface exposes hit, damage and critical information. Dark Events connect mission selection to enemy advantages. These are documented in [Feral's official XCOM 2 manual](https://www.feralinteractive.com/en/manuals/xcom2/latest/steam/).

My design interpretation: the tension comes from sequencing under incomplete information. Spending movement to discover the next threat can leave too little capacity to answer it. Defensive position, ammunition and action order must therefore compete with objective speed. A percentage becomes interesting when the player has alternatives: improve the angle, suppress, spend a limited explosive, or accept the risk to preserve a resource.

The previous ABYSSLINE slice had two actions, but firing cost only one. That allowed two shots from every stationary soldier and allowed a soldier to fire before retreating. There was little distinction between an opening shot and a finishing action. Enemies also woke individually, so exploration lacked a clear change from patrol to engagement.

## What War of the Chosen adds

WotC layers soldier bonds, faction hero classes, Covert Actions, Resistance Orders, mission SITREPs and the Chosen onto the campaign. Bonds provide tactical benefits; Covert Actions compete for personnel; the Chosen have distinctive strengths, weaknesses and strategic interference, with strongholds that let the player end their threat. These are features described in the [official expansion overview](https://store.steampowered.com/app/593380/XCOM_2_War_of_the_Chosen/).

My interpretation: WotC's strongest contribution is making a roster into a network of commitments. A useful soldier is valuable for their capabilities, relationships and availability. A powerful pair creates attachment, but using that pair constantly narrows the rest of the roster. Additional assignments make a spare operator useful even when they are not in the tactical squad. Distinctive recurring opponents also give the campaign a personal rhythm that a global meter alone cannot create.

ABYSSLINE's earlier roster had injuries and a generic accuracy-or-health promotion. That provided persistence but weak reasons to develop reserves or distinguish veterans within a class. Region choice mostly compared breach urgency and mission rewards. This revision adds explicit counter-threat opportunities and personnel tradeoffs.

## Implemented changes

| System | Revised behavior | Decision it creates |
|---|---|---|
| Action commitment | Fire, Suppress, Brace, Overwatch and depth charges consume remaining AP. Other abilities, reload, interaction and extraction cost 1. | Position before attacking; a dash sacrifices offense. A bond transfer can intentionally reopen an operator's turn. |
| Concealed insertion | All missions except Holdout and final descent begin concealed. Detection checks the complete movement route within 3 tiles and line of sight. Attacks, objectives and noise 4+ reveal the squad. | Stage an ambush or advance carefully; a patrol can discover a stationary squad. |
| Enemy groups | Encountered groups activate together and scatter toward cover. Prepared Overwatch can react to this movement. Groups activated during the enemy phase do not attack in that same phase. | Bringing another group into view changes the problem for the whole squad. |
| Criticals and explosives | Exposed targets have a 35% critical chance for +2 damage. Every operator carries one radius-1 depth charge: 4 guaranteed damage, low-cover destruction, range 6 and +5 noise. Friendly fire applies. | Spend a limited certainty tool, improve a firing lane, or preserve the charge and take a shot. |
| Personnel availability | Wounds, reserve status and Signal watch assignments determine deployment. Roster capacity is 12. Fatigue was removed in v0.2.1. | Recruit, manage injuries, and choose which operators to assign away from the squad. |
| Bonds | Two shared returns unlock a mutually exclusive pair bond. Teamwork transfers 1 AP to the deployed partner, capped at 2 AP; once per pair per mission. | Keep a pair together, separate them for roster coverage, or save their transfer for extraction. |
| Class doctrines | At 8 XP, each of six classes chooses one of two permanent, functional upgrades. The original 4-XP specialization remains. | Twelve class-specific options develop movement, criticals, reaction fire, healing, vision, remote support and supplies. |
| Signal watch | One available operator can take a two-cycle assignment, becoming unavailable to deploy and returning with 2 XP and 18 Signal. | Trade current squad strength for research and reserve development. |
| Regional threats | Win in the flagged region within three cycles to prevent a modifier on the next two operations. Effects are extra hostile HP, extra enemy aim, or faster timed reinforcements. | Choose between a counter-threat, a threatened region, a resource reward and a mission your available team can handle. |

## Reading the new campaign

Suppose North Atlantic is at breach 5 while Indian Ocean offers research Signal and counters Hardened shells. Going east risks losing North Atlantic; going north allows the enemy modifier to mature. Emergency containment may buy enough time to take the counter-threat, but spends Material that could recruit a fresh operator. Sending an experienced Engineer may shorten the mission, while sending a replacement allows that veteran to recover. These systems now change the value of the same mission from one cycle to another.

A useful combat sequence is to scout, stage Overwatch, move the objective specialist, then commit the opening attack. After activation, inspect cover and available actions before firing the remaining weapons. Save the bonded transfer for an operator who needs to reload and attack, finish an objective, or reach extraction.

## Scope and remaining differences

This is a substantial revision of a short playable campaign, not a full reproduction of WotC. It does not yet have recurring named nemeses, faction diplomacy, a base construction layer, vertical traversal, a large enemy bestiary, or multi-rank ability trees. Signal watch is a deterministic support assignment, not WotC's complete covert-operation system. There is no fatigue mechanic. Depth charges destroy low cover, not structural walls.

The next major expansion would benefit most from a recurring ocean adversary with a telegraphed ability, a campaign-level interference effect, and an objective-driven way to permanently defeat it. That would connect the existing regional pressure and veteran progression to a memorable midgame opponent. It is deliberately outside this implemented pass.

## Validation and compatibility

The revision adds focused checks for action commitment, detection along paths, group ambushes, friendly-fire explosives, bonds, support assignments, event deadlines, doctrines and legacy saves, including removal of old fatigue data. Simulations exercise all six mission types and an earned-resource campaign through final victory. The campaign simulation recruits and advances time when injuries deplete the roster and researches final coordinates after the required two projects.

Existing saves migrate in place. An operation already underway stays revealed; a new mission receives the new insertion rules. The offline HTML, in-game manual and three-page player guide are updated together. Browser checks cover support assignment, recruit deployment, concealment, sonar, movement, explosive preview and detonation. These checks establish functionality; they do not establish balance across every seed or player strategy.
