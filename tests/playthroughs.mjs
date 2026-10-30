// Instrumented campaign playthroughs. No rule changes, injected resources, or hidden-target attacks.
import * as E from '../src/engine.js';
import assert from 'node:assert/strict';
import {writeFile,mkdir,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

export const definitions=[
 {id:'containment',name:'Containment first',seed:101,minTeam:5,quiet:false,aggressive:false,watch:false,
  research:['Acoustic masking','Pressure lattice','Deep coordinates','Abyssal physiology'],
  doctrines:['Sentinel','Surgeon','Sprinter','Systems','Silent sonar','Hunter']},
 {id:'research',name:'Research and counter-threats',seed:202,minTeam:5,quiet:true,aggressive:false,watch:true,
  research:['Acoustic masking','Abyssal physiology','Deep coordinates','Pressure lattice'],
  doctrines:['Bastion','Triage','Sprinter','Systems','Pathfinder','Hunter']},
 {id:'firepower',name:'Firepower rush',seed:303,minTeam:3,quiet:false,aggressive:true,watch:false,
  research:['Pressure lattice','Acoustic masking','Deep coordinates','Abyssal physiology'],
  doctrines:['Sentinel','Surgeon','Raider','Demolition','Silent sonar','Deadeye']},
];
const clone=v=>JSON.parse(JSON.stringify(v));
const resources=c=>({material:c.material,signal:c.signal,stability:c.stability});
const commandState=c=>({day:c.day,...resources(c),successes:c.successes,tech:[...c.tech],research:clone(c.research),
 threat:clone(c.threat),modifier:clone(c.modifier),covert:clone(c.covert),notice:c.notice,ending:c.ending,
 regions:c.regions.map(r=>({id:r.id,name:r.name,level:r.level,lost:r.lost})),
 roster:c.soldiers.map(s=>({id:s.id,call:s.call,role:s.role,xp:s.xp,kills:s.kills,wounds:s.wounds,dead:s.dead,gear:s.gear,perk:s.perk,doctrine:s.doctrine||null,bond:s.bond})),
 available:E.deployment(c).map(s=>s.id)});

export function runCampaign(policy){
 const c=E.newCampaign(policy.seed),run={policy:clone(policy),initial:commandState(c),cycles:[],missions:[],actions:[],errors:[],snapshotChecks:0};
 let current=null;
 const check=()=>{assert.ok(E.validateSave(c),`Invalid save: ${policy.id}, day ${c.day}, turn ${c.mission?.turn}`);run.snapshotChecks++;};
 function strategic(action,data,why){
  const before=commandState(c),result=E.strategic(c,action,data);assert.ok(result.ok,`${action}: ${result.reason}`);
  const record={day:before.day,layer:'strategy',action,data:clone(data||{}),why,before,after:commandState(c)};
  run.actions.push(record);check();return result;
 }
 function act(action,data={},why=''){
  const m=c.mission,u=m.units.find(u=>u.id===m.selected),oldLogs=new Set(m.log);
  const record={day:c.day,layer:'tactics',mission:run.missions.length,turn:m.turn,operator:u?.call,action,data:clone(data),why,
   before:{ap:u?.ap,ammo:u?.ammo,noise:m.noise,concealed:m.concealed,relay:m.relayHP}};
  if(action==='shoot')record.chance=E.shotChance(m,u,m.enemies.find(e=>e.id===data.id));
  const healthBefore=m.units.reduce((a,u)=>a+u.hp,0),enemyBefore=m.enemies.filter(e=>e.hp>0).length;
  const result=E.act(c,action,data);
  if(!result.ok){run.errors.push({...record,reason:result.reason});return false;}
  record.logs=m.log.filter(l=>!oldLogs.has(l)).reverse().map(clone);
  record.after={ap:u?.ap,ammo:u?.ammo,noise:m.noise,concealed:m.concealed,relay:m.relayHP};
  if(result.shot)record.hit=result.shot.hit;
  record.events=(result.events||[]).map(clone);
  record.squadHealthDelta=m.units.reduce((a,u)=>a+u.hp,0)-healthBefore;
  record.aliveEnemyDelta=m.enemies.filter(e=>e.hp>0).length-enemyBefore;
  run.actions.push(record);
  if(action!=='select')current.actions.push(record);
  check();return true;
 }
 const visible=m=>m.enemies.filter(e=>e.hp>0&&E.isVisible(m,e));
 const blasts=m=>m.type==='sabotage'?m.objects.filter(o=>o.done&&!o.detonated&&o.fuse<=1):[];
 const unsafe=(m,u,p)=>blasts(m).some(o=>E.dist(o,p)<=2)||(E.floodActive(m)&&u.gear!=='Rebreather'&&E.tileAt(m,p.x,p.z).kind==='hazard');
 const escortDone=m=>m.type==='survival'?m.complete:m.objects.every(o=>o.done);
 function moveTo(m,u,goals,why){
  const p=E.routeToward(m,u,goals,E.moveRange(u));if(!p)return false;
  let destination=p;
  if(unsafe(m,u,p)){
   const choices=[...E.reachable(m,u,E.moveRange(u)).values()].filter(p=>p.d>0&&!unsafe(m,u,p));
   choices.sort((a,b)=>Math.min(...goals.map(g=>E.dist(a,g)))-Math.min(...goals.map(g=>E.dist(b,g)))||a.d-b.d);
   if(choices.length)destination=choices[0];else return false;
  }
  return act('move',{x:destination.x,z:destination.z},why);
 }
 function processUnit(u,maxActions=10){
  const m=c.mission;if(m.result||u.hp<=0||u.evacuated)return;
  act('select',{id:u.id});
  for(let i=0;i<maxActions&&u.ap>0&&!m.result;i++){
   const exits=m.tiles.filter(t=>t.kind==='extract'),done=escortDone(m),withdrawing=m.turn>=m.limit-2&&!m.complete;
   const canSkill=u.skillTurn!==m.turn;
   if((m.complete||withdrawing)&&E.tileAt(m,u.x,u.z).kind==='extract'){act('evac',{},m.complete?'Objective complete; extract individually.':'Deadline approaching; preserve the operator despite mission failure.');continue;}
   if(unsafe(m,u,u)){
    const options=[...E.reachable(m,u,E.moveRange(u)).values()].filter(p=>p.d>0&&!unsafe(m,u,p));
    const goals=done||withdrawing?exits:m.objects.filter(o=>!o.done);
    options.sort((a,b)=>Math.min(...(goals.length?goals:exits).map(g=>E.dist(a,g)))-Math.min(...(goals.length?goals:exits).map(g=>E.dist(b,g)))||a.d-b.d);
    if(options[0]&&act('move',{x:options[0].x,z:options[0].z},'Leave a pending shockwave or this phase’s flood tile.'))continue;
   }
   if(u.role==='Medic'&&canSkill&&u.charges&&m.units.some(a=>a.hp>0&&!a.evacuated&&a.hp<a.maxHP&&E.dist(u,a)<=2)){
    act('skill',{},'Heal a nearby injured operator before combat or extraction.');continue;
   }
   if(u.role==='Engineer'&&canSkill&&m.type==='survival'&&m.relayHP<=12&&E.dist(u,m.objects[0])<=(u.doctrine==='Systems'?5:4)){
    act('skill',{},'Restore threatened relay integrity.');continue;
   }
   if(!withdrawing&&m.type!=='survival'&&u.role==='Engineer'&&canSkill&&E.interactable(m,u,u.doctrine==='Systems'?5:4)){
    act('skill',{},'Remote-link the objective without spending movement to reach it.');continue;
   }
   if(!withdrawing&&m.type!=='survival'&&E.interactable(m,u)){
    act('interact',{},'Complete the adjacent mission objective.');continue;
   }
   const targets=visible(m).filter(e=>E.shotChance(m,u,e)>0).sort((a,b)=>
    (E.shotChance(m,u,b)+(b.hp<=E.weaponDamage(u)?45:0)-b.hp*2)-(E.shotChance(m,u,a)+(a.hp<=E.weaponDamage(u)?45:0)-a.hp*2));
   const combat=targets.length&&(!done||targets.some(e=>E.dist(u,e)<=(policy.quiet?3:5)))&&!withdrawing;
   if(combat){
    const e=targets[0],chance=E.shotChance(m,u,e);
    const explosive=targets.find(e=>E.dist(u,e)<=6&&E.lineOfSight(m,u,e)&&
     !m.units.some(a=>a.hp>0&&!a.evacuated&&E.dist(a,e)<=1)&&
     !m.objects.some(o=>o.hp>0&&!o.evacuated&&(['rescue','extraction'].includes(m.type)||m.type==='survival')&&E.dist(o,e)<=1)&&
     (visible(m).filter(a=>E.dist(a,e)<=1).length>=2||(policy.aggressive&&e.hp<=4)));
    if(explosive&&u.grenades){act('grenade',{id:explosive.id},policy.aggressive?'Use guaranteed damage to remove a contact or hit a cluster.':'Use a limited charge against multiple contacts without friendly fire.');continue;}
    if(!u.ammo){act('reload',{},'Reload to restore offensive capacity.');continue;}
    if(u.role==='Marksman'&&canSkill&&u.ap===2){act('skill',{},'Steady aim improves accuracy and damage before the committed shot.');continue;}
    if(!policy.aggressive&&u.role==='Anchor'&&canSkill&&e.hp>2&&e.awake&&
      (chance<65||m.units.some(a=>a.hp>0&&!a.evacuated&&a.hp<=4&&E.dist(a,e)<=e.range))){
     act('skill',{id:e.id},'Guarantee suppression of a surviving hostile threatening an injured operator.');continue;
    }
    if(policy.aggressive&&u.ap===2&&chance<72){
     const options=[...E.reachable(m,u,E.moveRange(u)).values()].filter(p=>p.d>0&&!unsafe(m,u,p));
     options.sort((a,b)=>E.shotChance(m,{...u,x:b.x,z:b.z},e)-E.shotChance(m,{...u,x:a.x,z:a.z},e)||a.d-b.d);
     const p=options[0];if(p&&E.shotChance(m,{...u,x:p.x,z:p.z},e)>=chance+12){act('move',{x:p.x,z:p.z},'Improve the firing angle before committing the attack.');continue;}
    }
    act('shoot',{id:e.id},'Remove an available threat; the shot consumes remaining AP.');continue;
   }
   if(u.role==='Scout'&&canSkill&&!policy.aggressive&&!withdrawing&&m.sonar===0&&m.turn===1){
    act('skill',{},'Reveal distant contacts before committing to an objective route.');continue;
   }
   const mate=E.bondmate(m,u),pair=E.bondKey(u.id,mate?.id);
   if(mate&&mate.ap===0&&!m.bondUsed.includes(pair)&&(!done||m.complete)&&!u.guard){
    const usable=E.tileAt(m,mate.x,mate.z).kind==='extract'||E.interactable(m,mate)||visible(m).some(e=>mate.ammo&&E.shotChance(m,mate,e));
    if(usable){act('teamwork',{},'Give a spent bonded operator one more useful action.');processUnit(mate,3);if(m.result)break;if(u.hp>0&&!u.evacuated)act('select',{id:u.id});continue;}
   }
   let goals=done||withdrawing?exits:m.type==='survival'?[{x:8,z:6}]:m.objects.filter(o=>!o.done);
   if(m.type==='survival'&&!m.complete&&E.dist(u,goals[0])<=3){
    act(u.ammo<3?'reload':'guard',{},'Defend the relay while its five-phase objective progresses.');continue;
   }
   if(u.role==='Diver'&&canSkill&&u.ap===2&&m.noise>=5&&!withdrawing){
    act('skill',{},'Reduce noise before advancing under Slipstream.');continue;
   }
   if(goals.length&&moveTo(m,u,goals,done||withdrawing?'Return toward extraction; escort/fuse progress continues in hostile phases.':'Advance toward an unfinished objective.'))continue;
   act(u.ammo<3?'reload':'guard',{},'No useful objective move; reload or prepare a reaction.');
  }
 }

 while(!c.ending&&c.day<=40){
  const cycle={day:c.day,start:commandState(c),decision:null};run.cycles.push(cycle);
  const finalReady=()=>c.tech.includes('Deep coordinates')&&c.successes>=3;
  if(!c.research&&!finalReady()){
   const next=policy.research.map(name=>E.RESEARCH.find(r=>r.name===name)).find(r=>!c.tech.includes(r.name)&&(!r.requires||c.tech.length>=r.requires));
   if(next&&c.signal>=next.cost)strategic('research',{name:next.name},`Follow ${policy.name}'s research order.`);
  }
  for(const s of c.soldiers.filter(s=>!s.dead)){
   if(s.xp>=4&&!s.perk)strategic('perk',{id:s.id,perk:!policy.aggressive&&['Medic','Anchor'].includes(s.role)?'Bulwark':'Precision'},'Spend earned XP on the permanent specialization.');
   if(s.xp>=8&&!s.doctrine)strategic('doctrine',{id:s.id,name:policy.doctrines[Object.keys(E.ROLES).indexOf(s.role)]},'Select the class doctrine supporting this campaign strategy.');
  }
  for(const [key,count]of Object.entries(c.bonds)){
   const [id,mate]=key.split(':').map(Number),a=c.soldiers.find(s=>s.id===id),b=c.soldiers.find(s=>s.id===mate);
   if(count>=2&&a&&!a.dead&&b&&!b.dead&&a.bond==null&&b.bond==null)strategic('bond',{id,mate},'Bond a pair that earned two shared returns.');
  }
  if(policy.watch&&!c.covert&&!finalReady()){
   const ready=c.soldiers.filter(s=>!s.dead&&!s.wounds&&!s.reserve);
   const operator=c.day===1?ready.find(s=>s.role==='Anchor'):ready.length>=7?ready.at(-1):null;
   if(operator)strategic('covert',{id:operator.id},'Trade two cycles of availability for 18 Signal and 2 XP.');
  }
  function equip(s,gear,why){if(s&&s.gear!==gear&&c.material>=E.GEAR[gear].cost+(policy.aggressive?0:20)&&(!E.GEAR[gear].tech||c.tech.includes(E.GEAR[gear].tech)))strategic('gear',{id:s.id,gear},why);}
  if(policy.id==='containment'&&c.day===1)equip(c.soldiers[0],'Plating','Protect the Anchor at the cost of one movement range.');
  if(policy.quiet){
   if(c.day===1)equip(c.soldiers[4],'Silencer','Lower Scout shot noise, accepting one less damage.');
   for(const s of c.soldiers.filter(s=>!s.dead&&['Engineer','Diver'].includes(s.role)))equip(s,'Rebreather','Protect the objective runners from flooding and add movement.');
  }
  if(policy.aggressive&&c.tech.includes('Pressure lattice'))for(const role of ['Marksman','Anchor'])equip(c.soldiers.find(s=>!s.dead&&s.role===role),'Capacitor','Spend Material on more damage, accepting extra acoustic noise.');
  while(c.material>=24&&E.deployment(c).length<policy.minTeam&&c.soldiers.filter(s=>!s.dead).length<12)strategic('recruit',{},'Replenish the deployable team to this strategy’s minimum squad size.');
  const active=c.regions.filter(r=>!r.lost);if(!active.length){E.upgradeSave(c);break;}
  const ranked=active.map(r=>({r,score:policy.id==='containment'?r.level*10+(c.threat?.region===r.id?3:0):
    policy.id==='research'?(r.type==='recon'?12:0)+(c.threat?.region===r.id?(c.threat.left===1?25:15):0)+r.level*3:
    E.TYPES[r.type].reward[0]+r.level*2})).sort((a,b)=>b.score-a.score||a.r.id-b.r.id);
  const chosen=ranked[0].r;
  cycle.decision={region:chosen.name,id:chosen.id,type:finalReady()?'descent':chosen.type,level:chosen.level,ranking:ranked.map(({r,score})=>({name:r.name,level:r.level,score})),why:finalReady()?'Final coordinates and three prior wins unlock the descent.':
   policy.id==='containment'?'Highest breach first, with a small counter-threat preference.':policy.id==='research'?'Recon Signal and counter-threats outweigh breach urgency until containment can no longer fund them.':'Highest Material reward first; accept unattended regional losses.'};
  if(!policy.aggressive)for(const r of active.filter(r=>r.id!==chosen.id&&r.level>=5).sort((a,b)=>b.level-a.level)){
   if(c.material>=20)strategic('stabilize',{id:r.id},`Prevent ${r.name} from being lost during the chosen operation.`);
  }
  if(chosen.level>=5&&c.material>=20)strategic('stabilize',{id:chosen.id},'Reduce the risk of permanent region loss if this mission fails.');
  if(E.deployment(c).length<policy.minTeam){
   strategic('rest',{},'Too few deployable operators; advance injury recovery and collect resources despite escalation.');cycle.end=commandState(c);continue;
  }
  const before=commandState(c),final=finalReady();assert.ok(E.startMission(c,chosen.id,final));check();
  current={index:run.missions.length+1,day:before.day,region:chosen.name,type:c.mission.type,level:chosen.level,
   pre:before,seed:c.mission.seed,modifier:c.mission.modifier,deployed:c.mission.units.map(u=>({id:u.id,call:u.call,role:u.role,gear:u.gear,perk:u.perk,doctrine:u.doctrine||null,hp:u.hp})),actions:[]};
  run.missions.push(current);let phases=0;
  while(!c.mission.result&&phases++<=c.mission.limit){
   const order=c.mission.units.slice().sort((a,b)=>['Engineer','Marksman','Diver','Scout','Anchor','Medic'].indexOf(a.role)-['Engineer','Marksman','Diver','Scout','Anchor','Medic'].indexOf(b.role));
   for(const u of order){if(c.mission.result)break;processUnit(u);}
   if(!c.mission.result)act('end',{},'All useful squad actions resolved; advance the hostile phase.');
  }
  assert.ok(c.mission.result,'Mission must reach a natural outcome.');current.result=clone(c.mission.result);current.post=commandState(c);
  current.finalMission=clone(c.mission);cycle.end=current.post;E.returnToCommand(c);check();
 }
 assert.ok(c.ending,`Campaign ${policy.id} did not reach a natural ending.`);assert.equal(run.errors.length,0,'Player selected an illegal action');
 run.final=commandState(c);run.save=clone(c);
 const tactics=run.missions.flatMap(m=>m.actions),shots=tactics.filter(a=>a.action==='shoot');
 const logs=tactics.flatMap(a=>a.logs||[]),allEvents=tactics.flatMap(a=>a.events||[]);
 run.summary={name:policy.name,seed:policy.seed,outcome:c.ending,cycles:c.day-1,missions:run.missions.length,successes:c.successes,
  failedMissions:run.missions.filter(m=>!m.result.success).length,operatorsLost:c.soldiers.filter(s=>s.dead).length,regionsLost:c.regions.filter(r=>r.lost).map(r=>r.name),
  resources:resources(c),minStability:Math.min(run.initial.stability,...run.cycles.map(s=>s.end.stability)),
  shots:shots.length,hits:shots.filter(a=>a.hit).length,expectedHits:Math.round(shots.reduce((n,a)=>n+a.chance/100,0)*100)/100,
  criticals:logs.filter(l=>l.text.includes('Flanking critical')).length,depthCharges:tactics.filter(a=>a.action==='grenade').length,
  playerReactions:allEvents.filter(e=>!e.hostile).length,enemyShots:allEvents.filter(e=>e.hostile).length,enemyHits:allEvents.filter(e=>e.hostile&&e.hit).length,
  noiseReinforcements:logs.filter(l=>l.text.startsWith('Acoustic threshold exceeded')).length,timedReinforcements:logs.filter(l=>l.text.startsWith('Incoming contact')).length,
  moves:tactics.filter(a=>a.action==='move').length,fieldPatches:tactics.filter(a=>a.action==='skill'&&a.operator&&c.soldiers.find(s=>s.call===a.operator)?.role==='Medic').length,
  teamwork:tactics.filter(a=>a.action==='teamwork').length,recruits:run.actions.filter(a=>a.layer==='strategy'&&a.action==='recruit').length,
  containmentPurchases:run.actions.filter(a=>a.layer==='strategy'&&a.action==='stabilize').length,restCycles:run.actions.filter(a=>a.layer==='strategy'&&a.action==='rest').length,
  counteredThreats:run.missions.filter(m=>m.pre.threat?.region===m.pre.regions.find(r=>r.name===m.region)?.id&&m.result.success).length,
  failedThreats:run.cycles.filter(s=>s.start.threat?.left===1&&s.end.modifier?.left===2).length,
  missionTypes:[...new Set(run.missions.map(m=>m.type))],snapshotChecks:run.snapshotChecks};
 return run;
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const folder=fileURLToPath(new URL('../reports/playthroughs/',import.meta.url));
 await mkdir(folder,{recursive:true});
 const engineHash=createHash('sha256').update(await readFile(new URL('../src/engine.js',import.meta.url))).digest('hex');
 const runs=definitions.map(runCampaign);
 await writeFile(path.join(folder,'campaign-records.json'),JSON.stringify({version:'0.2.1',engineHash,runs},null,2));
 for(const run of runs)await writeFile(path.join(folder,`${run.policy.id}-final-save.json`),JSON.stringify(run.save,null,2));
 console.log(JSON.stringify(runs.map(r=>r.summary),null,2));
 console.log('Records: '+folder);
}
