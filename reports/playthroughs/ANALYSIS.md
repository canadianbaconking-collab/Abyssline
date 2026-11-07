# Campaign analysis: three automated playthroughs

[Documentation](../../docs/README.md) · [Reproduction commands](../../docs/development.md#reproduce-the-three-recorded-campaigns)

**Historical results · v0.2.1 · October 1, 2026.** Seeds 101, 202, and 303 produced two victories and one defeat. These were automated engine campaigns using normal public actions.

## Read this first

- **Observed:** both winning campaigns lost many operators; the firepower rush lost four regions and the campaign.
- **Observed:** more Signal did not shorten the research schedule. All three policies entered final descent on cycle 8.
- **Interpretation:** regional containment, squad readiness, and noise management deserve attention alongside damage output.
- **Limit:** different seeds and multiple policy differences make these descriptive cases, not a controlled strategy comparison or a player win-rate estimate.

**Jump to:** [Method](#what-was-actually-tested) · [Comparison](#comparison) · [Run records](#individual-campaign-records) · [Findings](#what-these-outcomes-say-about-the-game) · [Recommendations](#suggested-priorities-for-a-later-revision) · [Evidence and limits](#evidence-reproducibility-and-limits)

## What was actually tested

These were instrumented automated playthroughs of the production rules through `newCampaign`, `strategic`, `startMission`, `act`, and `returnToCommand`. Each began with normal starting resources and the real six regions, continued through a natural victory or defeat, and used earned research, recruitment, equipment, XP, bonds, and extraction. No seed was replaced because of its outcome, and no game rules or resources were changed during the comparison.

The same player framework used different strategic priorities, squad-size thresholds, purchases, and tactical aggression. It targeted only visible enemies, avoided known friendly-fire blasts, and avoided ending moves on an imminent flood tile or within an imminent sabotage shockwave. It used normal shared map/pathfinding information exposed by the game. Its movement mostly pursued objectives along short routes; it did not coordinate formations or stage ambushes like a skilled human. Only the aggressive policy sought better firing angles before poor shots.

A player-harness preflight caught an actor-selection error after Teamwork; that was corrected before the recorded comparison. The game engine was unchanged. The recorded runs contain zero rejected actions and 2527 successful save-validation checks. These checks are not separate playthroughs. Replaying all three policies once reproduced the complete JSON records byte for byte.

This is three new distinct campaign runs, bringing the distinct full-campaign seeds tested to four including the earlier seed-12 campaign. It is not three browser-controlled campaigns or a statistical win-rate estimate.

## Comparison

| Measure | Containment first | Research and counter-threats | Firepower rush |
|---|---:|---:|---:|
| Seed | 101 | 202 | 303 |
| Ending | Victory | Victory | Defeat |
| Completed cycles | 8 | 8 | 9 |
| Operations / successful | 8 / 8 | 8 / 8 | 8 / 5 |
| Permanent operator losses | 7 | 10 | 12 |
| Recruit purchases | 6 | 7 | 8 |
| Regions lost | 0 | 1 | 4 |
| Final Stability | 94 | 77 | 0 |
| Final Material / Signal | 8 / 90 | 12 / 108 | 20 / 49 |
| Emergency containment purchases | 5 | 3 | 1 |
| Noise reinforcement contacts | 35 | 31 | 41 |
| Timed reinforcement contacts | 7 | 7 | 4 |
| Reinforcement Brutes | 19 | 16 | 27 |
| Depth charges | 5 | 2 | 19 |
| Player shots: hits / attempts | 85 / 110 | 76 / 101 | 73 / 89 |
| Expected player hits from displayed chances | 85.11 | 76.88 | 70.23 |
| Field patches / Teamwork transfers | 8 / 5 | 12 / 6 | 6 / 4 |
| Countered / expired threats | 2 / 1 | 8 / 0 | 1 / 2 |
| Recovery-only cycles | 0 | 0 | 1 |

## Individual campaign records

Expand a run for its policy, turning points, and per-operation table.

<details>
<summary>Run 1: Containment first</summary>


The policy ranked breach urgency first, used the threatened region as a tie preference, kept at least five deployable operators, and funded unattended level-5 regions when affordable. It researched Acoustic masking, Pressure lattice, then Deep coordinates. Initial Anchor plating traded movement for durability.

The opening Recon succeeded in five turns but killed RIPTIDE. The next Containment killed PATCH and RELAY and returned only three of five. The campaign then spent 72 Material on three recruits before its third operation; this was a genuine reserve-roster recovery, not a reset.

The cleanest stretch was Holdout, Rescue, and a second Recon: all deployed operators returned. The Rescue still took 14 turns. On the final descent the squad had five members, no Medic, and the active Predatory sonar modifier. Three returned; ECHO and the replacement Engineer died.

Five containment purchases cost 100 Material, added 20 Stability before caps, and lowered dangerous breach levels. Region losses stayed at zero. The campaign finished at 94 Stability with only 8 Material. It sustained the global network by spending on regions and replacing losses; the high Stability score did not mean the squad was healthy.

Seven operators died, all to hostile attacks: three to Brutes and four to Drifters. The original Anchor and Marksman survived the campaign; the original Medic, Diver, Engineer, and Scout did not. The Plating Anchor survived a Rescue return with 12 HP missing and then spent three cycles recovering. This is evidence that injury availability still matters without fatigue.

| Cycle | Region / mission | Turns | Returned / deployed | Operator losses | Stability after operation |
|---:|---|---:|---:|---|---:|
| 1 | Indian Ocean / Recon  | 5 | 5 / 6 | RIPTIDE | 86 |
| 2 | North Atlantic / Containment  | 8 | 3 / 5 | PATCH, RELAY | 89 |
| 3 | Philippine Trench / Sabotage  | 11 | 4 / 5 | DIVER 8 | 86 |
| 4 | South Pacific / Holdout  | 7 | 5 / 5 | None | 86 |
| 5 | Norwegian Sea / Rescue  | 14 | 6 / 6 | None | 94 |
| 6 | Indian Ocean / Recon  | 6 | 5 / 5 | None | 91 |
| 7 | Southern Ocean / Emergency extraction  | 12 | 4 / 5 | DIVER 7 | 91 |
| 8 | North Atlantic / Final descent  | 12 | 3 / 5 | ECHO, DIVER 9 | 94 |

</details>

<details>
<summary>Run 2: Research and counter-threats</summary>


The policy favored Recon Signal and counter-threat regions, sent KEEL on a two-cycle Signal watch immediately, started with five operators, and used a Scout Silencer. It researched Acoustic masking, Abyssal physiology, then Deep coordinates, and later bought an Engineer Rebreather.

Every operation won in the currently threatened region, including final descent. This prevented all enemy modifiers in this run. Signal watch returned its 18 Signal and 2 XP after the second operation. All six normal mission types occurred before the descent.

The difficult stretch was Emergency extraction on cycle 4 and Rescue on cycle 6. These took 14 and 12 turns and lost two and three operators respectively. Rescue returned only two of five; the original Engineer, a replacement Anchor, and a replacement Diver died. These escort routes gave reinforcement Brutes time to reach the squad.

The campaign won its ninth-turn final descent with three of five returned, but the final strategic advance permanently lost the Philippine Trench and charged 12 Stability. That loss happened after the final objective had already earned victory. The campaign finished at 77 Stability, 12 Material, and 108 Signal.

The extra Signal did not accelerate the ending: both successful runs started Deep coordinates on cycle 5 and entered the descent on cycle 8. The fixed research durations, rather than Signal affordability, controlled their earliest finish. The assignment sacrificed a starting Anchor for two insertions, and the final Signal surplus remained unused.

Ten operators died, seven to Brutes and three to Drifters. No player flood or sabotage-blast damage was logged, so the Rebreather’s flood immunity was not responsible for the victory; its movement bonus was used. Better medical recovery helped availability, but it could not save operators killed before extraction. Only the original Marksman remained alive from the starting six.

| Cycle | Region / mission | Turns | Returned / deployed | Operator losses | Stability after operation |
|---:|---|---:|---:|---|---:|
| 1 | Indian Ocean / Recon  | 6 | 4 / 5 | RIPTIDE | 86 |
| 2 | South Pacific / Holdout  | 7 | 5 / 5 | None | 86 |
| 3 | Philippine Trench / Sabotage  | 7 | 6 / 6 | None | 83 |
| 4 | Southern Ocean / Emergency extraction  | 14 | 3 / 5 | PATCH, ECHO | 87 |
| 5 | North Atlantic / Containment  | 7 | 4 / 5 | KEEL | 91 |
| 6 | Norwegian Sea / Rescue  | 12 | 2 / 5 | RELAY, DIVER 6, DIVER 8 | 88 |
| 7 | Indian Ocean / Recon  | 8 | 4 / 5 | DIVER 9 | 89 |
| 8 | South Pacific / Final descent  | 9 | 3 / 5 | DIVER 7, DIVER 10 | 77 |

</details>

<details>
<summary>Run 3: Firepower rush</summary>


The policy favored Material rewards, researched Pressure lattice before Acoustic masking, bought Capacitors for the Marksman and Anchor, used aggressive depth charges, and accepted a three-person deployment threshold. It purchased only one emergency containment intervention.

The first Sabotage returned all six. Three further operations also won, although two operators died in Containment and the original Anchor died in the second Sabotage. The squad shrank from six to four, then three. Ignoring the initial Indian Ocean threat applied Hardened shells to operations 4 and 5; each hostile gained 2 HP.

The cycle-5 Emergency extraction was the decisive bad decision. Two of three operators died. On turn 15, the remaining GHOST extracted while Luis Reis was alive at (4,3), outside the landing zone and two movement tiles from an extraction tile. Luis moves two tiles per hostile phase, so one more phase could have brought him aboard if the route stayed open and he survived. The policy’s deadline rule chose withdrawal; the mission failed immediately. This was an automation decision, not proof that the mission was impossible.

That failure cost 14 Stability; the same cycle lost Norwegian Sea for another 12, dropping Stability from 78 to 52. The following three-person Containment wiped out. A later Containment succeeded, but regional losses still drove Stability from 35 to 26. Winning one local mission could no longer stop the wider collapse.

Final descent was entered with two Marksmen and a Scout, no Medic or Engineer, and Predatory sonar active. The team secured one of three anchors, then wiped out in six turns. Stability fell to 9. Two recruits left only a two-person team, below the policy’s minimum; the next recovery cycle lost South Pacific and reduced Stability to zero. This was a natural campaign defeat, not a time-limit stop imposed by the harness.

The policy spent 48 Material on Capacitors, 192 on eight recruits, and 20 on containment. It fired 19 depth charges and generated 41 acoustic reinforcements, of which 27 were Brutes. Eight of its twelve deaths were caused by Brutes. Its shots hit 73 times against 70.23 expected hits, so an unusually poor aggregate hit roll does not explain the defeat. Loud offense, smaller squads, ignored threats, the premature escort extraction, and delayed global intervention all contributed.

The lost final descent was premature: coordinates were ready, but squad composition was poor. There were 48 Material left before insertion, enough to buy the next two recruits, an Anchor and Medic, and field five. The three-person policy deliberately did not do so. Recruitment follows a fixed class sequence, so the next Engineer was farther away; the immediately available third operator was a second Marksman. More recruits and containment to buy preparation time were reasonable alternative decisions. The run did not test those counterfactuals; it recorded the consequences of rushing. This outcome does not establish that a properly staffed firepower build is unviable.

| Cycle | Region / mission | Turns | Returned / deployed | Operator losses | Stability after operation |
|---:|---|---:|---:|---|---:|
| 1 | Philippine Trench / Sabotage  | 6 | 6 / 6 | None | 86 |
| 2 | North Atlantic / Containment  | 9 | 4 / 6 | RIPTIDE, ECHO | 89 |
| 3 | South Pacific / Holdout  | 7 | 4 / 4 | None | 86 |
| 4 | Philippine Trench / Sabotage  | 10 | 3 / 4 | KEEL | 74 |
| 5 | Southern Ocean / Emergency extraction (failed) | 15 | 1 / 3 | PATCH, DIVER 6 | 52 |
| 6 | North Atlantic / Containment (failed) | 10 | 0 / 3 | RELAY, DIVER 7, DIVER 8 | 35 |
| 7 | North Atlantic / Containment  | 7 | 2 / 3 | DIVER 9 | 26 |
| 8 | South Pacific / Final descent (failed) | 6 | 0 / 3 | GHOST, DIVER 10, DIVER 11 | 9 |

Cycle 9 was recovery only: two new recruits could not meet the three-person minimum. Stability fell from 9 to 0 and the campaign ended.

</details>

## What these outcomes say about the game

### 1. Regional pressure is consequential, but success can hide severe attrition

The containment policy preserved all six regions with five purchases; the rush lost four with one purchase. Containment costs 20 Material, reduces breach by two, restores four Stability, and does not advance time. That makes it a powerful way to buy time. Both victories finished with nearly exhausted Material despite high unused Signal.

Every one of the 29 operator losses in these runs was a combat death. None was a living operator stranded at the deadline or killed by player explosives, flooding, or sabotage shockwaves. Mission success requires the objective and at least one extracted operator, so the wins legitimately coexist with seven and ten permanent losses. Stability does not directly charge for soldier casualties. The success presentation should make that human cost conspicuous.

### 2. Noise creates a heavy-enemy feedback loop

After the first two acoustic reinforcements in a mission, later noise contacts are Brutes. This is why repeatedly using louder Capacitors and charges is more expensive than the immediate noise number suggests. The rush saw 27 reinforcement Brutes across 62 hostile phases; the containment and research policies saw 19 across 67 phases and 16 across 62 phases. These counts include actual spawned entities, not inferred enemy totals.

This is a useful tactical tradeoff: guaranteed explosive damage can reduce the current threat while increasing later pressure. It may also be too punishing for a small team trying to recover. The runs identify that risk; they do not establish the right reinforcement threshold or prove that Capacitors are always a bad purchase.

### 3. Research speed was gated by clocks, not by Signal

All three runs entered final descent on cycle 8 after two two-cycle foundational projects and a three-cycle coordinates project. The research policy generated more Signal and canceled more threats, but did not shorten that schedule. Additional research options or uses for Signal would give this resource more midgame value once basic unlocks are funded.

### 4. The Marksman became the durable campaign core

GHOST deployed in all eight missions of both winning campaigns, finishing with 30 and 33 XP and 14 and 17 kills. Most other starting classes died. Steady aim was used 16 and 19 times in those runs; the original Diver died in both opening Recon missions. High damage, range, accuracy upgrades, and kill-derived XP helped the Marksman stay useful while replacement objective specialists cycled through.

This is a balance signal, not proof of an overpowered class: the player’s short-route objective movement exposed Divers, Engineers, and Medics more than a coordinated human squad would. The player also did little formation planning or prepared ambush staging. Better protection of objective runners is an obvious tactical improvement; reward distribution and lower-damage class survivability merit further testing.

### 5. Removing fatigue did not remove roster pressure

The successful runs still bought six and seven recruits and repeatedly deployed five-person teams because of deaths and injuries. The heavily injured Plating Anchor missed three later operations, while healthy GHOST could deploy every time. Fatigue removal allows healthy veterans to remain active; wounds and permanent losses continue to force roster decisions.

### 6. The final descent distinguishes an unlock from readiness

The rush had the coordinates and enough prior wins, but entered with three operators and no objective or medical specialist. It failed after securing only one anchor. The two victorious squads entered with five operators and secured all three anchors. This argues for a clearer composition/readiness summary in the final briefing while preserving the player’s choice to attempt a risky descent.

### 7. Escort extraction needs an explicit last-operator consequence

The turn-15 withdrawal left a living rescued diver two tiles from safety. A warning when the last active operator extracts with an unfinished escort objective would make this consequence easier to understand. The current manual describes it, but an action-time notice would be more useful. Escort routing and survival pressure are meaningful; this particular loss also reflects a too-simple deadline rule in the automated player.

### 8. Some mechanics were not meaningfully pressured

All three Holdout missions ended with the relay still at 16/16 HP, and none used relay repair. No operator took logged flood or sabotage-blast damage because the player avoided the imminent hazards. Those outcomes demonstrate successful avoidance; they do not establish that relay defense, repairs, or flood-immunity equipment are balanced under pressure. Prepared concealment ambushes were also underused. Bastion was selected but the player never used Brace, and neither winning roster retained a Diver long enough to select its 8-XP doctrine. These are specific gaps to cover in later tests.

## Suggested priorities for a later revision

1. Show casualties and surviving squad strength prominently in mission-success and campaign-victory reports.
2. Warn before the last operator extracts while an escort or another objective remains incomplete.
3. Make the escalation from acoustic Drifters to Brutes readable in noise previews and the briefing.
4. Show final-descent squad composition and preparation risks before insertion.
5. Test class XP distribution, objective-runner survivability, and noise-heavy builds with paired seeds and a stronger formation/ambush player.
6. Add meaningful midgame Signal spending or research alternatives, then test whether research-focused play changes the campaign clock.

These are analysis recommendations. This pass did not change v0.2.1 gameplay.

## Evidence, reproducibility, and limits

The runs used different seeds and several policy differences together. Consequently, the results are descriptive case studies rather than a controlled comparison isolating any one item, doctrine, or strategy. Two victories out of three are the observed outcomes, not a reliable estimate of a player win rate. Direct-shot expected hits were summed from the actual shot chances; that comparison does not account for every critical, enemy shot, or timing effect.

The two winning campaigns covered all six normal mission types plus final descent. The losing campaign covered Sabotage, Containment, Holdout, Emergency extraction, and final descent. It naturally lost other regions before they could be tested there. No full browser playthrough or UI usability score is claimed.

Each strategy reached its ending with no rejected actions. Save validation ran after every public tactical/strategic action, mission start, and return to command. Final campaign saves are importable through the game menu, and the raw records include pre/post resources, rosters, regional state, decision reasons, shot chances/results, hostile events, full retained action logs, objective state, and final saves.

Run again from the repository root. This replaces the tracked JSON records and ending saves; the analysis and chart remain historical:

```powershell
Set-Location -LiteralPath 'C:\dev\playground\abyssline'
node tests/playthroughs.mjs
```

Production engine SHA-256 recorded for these runs: `b4be88420cb9cc95dffaaeeedcfc1569c373a6e081e4f5898c7c3841d5411b72`.

Files beside this report: [action records](campaign-records.json), [outcome chart](campaign-outcomes.png), and importable ending saves for [containment](containment-final-save.json), [research](research-final-save.json), and [firepower](firepower-final-save.json). Reproducer: [`tests/playthroughs.mjs`](../../tests/playthroughs.mjs).
