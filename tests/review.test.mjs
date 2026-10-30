import test from 'node:test';
import assert from 'node:assert/strict';
import * as E from '../src/engine.js';

test('import rejects renderer-facing markup and invalid report or log shapes without throwing',()=>{
 const mutations=[
  c=>c.soldiers[0].perk='<img src=x onerror=alert(1)>',
  c=>c.soldiers[0].role='constructor',
  c=>c.history=[{type:'rescue',region:'Norwegian Sea',lost:[],reward:[1,2],day:'<img src=x>',evacuated:1,turns:1,success:true}],
  c=>{E.startMission(c,0);c.mission.log=[{text:'hello',tone:'" onclick="alert(1)',turn:1}];},
  c=>{E.startMission(c,0);c.mission.result={success:true};},
  c=>{E.startMission(c,0);c.mission.units[0].id=999;},
  c=>{E.startMission(c,0);c.mission.units.push({...c.mission.units[0]});},
  c=>{c.regions[0].type='survival';E.startMission(c,0);c.mission.objects=[];},
  c=>{c.regions[0]=null;},
 ];
 for(const mutate of mutations){const c=E.newCampaign(7);mutate(c);assert.doesNotThrow(()=>E.validateSave(c));assert.equal(E.validateSave(c),false);}
});

test('losing a mission at breach 5 permanently loses the region and charges the loss once',()=>{
 const c=E.newCampaign(1);c.regions[0].level=5;E.startMission(c,0);for(const u of c.mission.units){c.mission.selected=u.id;E.act(c,'evac');}
 assert.equal(c.regions[0].level,6);assert.equal(c.regions[0].lost,true);assert.equal(c.stability,54);
 E.returnToCommand(c);assert.equal(E.startMission(c,0),false);
 for(const r of c.regions.filter(r=>!r.lost))r.level=0;
 E.advanceDay(c);assert.equal(c.stability,54);
});

test('normal saves round-trip after all six mission types and return to command',async()=>{
 const {play}=await import('./bot.mjs');
 for(const type of Object.keys(E.TYPES).filter(t=>t!=='descent')){
  const c=E.newCampaign(3);c.regions[0].type=type;
  assert.equal(E.validateSave(c),true,type);
  const result=play(c,0);assert.ok(result?.success,type);
  const restored=E.upgradeSave(JSON.parse(JSON.stringify(c)));
  assert.equal(E.validateSave(restored),true,type);assert.deepEqual(restored,c);
  E.returnToCommand(restored);assert.equal(E.validateSave(restored),true,type);
 }
});

test('old saves repair a breach-6 region once and honor campaign defeat',()=>{
 const c=E.newCampaign(1);c.revision=2;c.regions[0].level=6;
 const d=E.upgradeSave(JSON.parse(JSON.stringify(c)));assert.equal(d.regions[0].lost,true);assert.equal(d.stability,68);
 E.upgradeSave(d);assert.equal(d.stability,68);assert.equal(E.startMission(d,0),false);
 const doomed=E.newCampaign(1);doomed.regions[0].level=6;doomed.stability=12;
 E.upgradeSave(doomed);assert.equal(doomed.ending,'defeat');assert.equal(E.startMission(doomed,1),false);
});

test('legacy fatigue neither blocks deployment nor changes aim, and migration removes it from saved state',()=>{
 const c=E.newCampaign(17);c.revision=2;c.soldiers.forEach(s=>s.fatigue=4);
 assert.equal(E.validateSave(c),true);assert.equal(E.deployment(c).length,6);
 assert.equal(E.startMission(c,0),true);const m=c.mission,u=m.units[0];u.x=7;u.z=3;E.updateVision(m);
 const e=m.enemies.find(e=>E.shotChance(m,u,e)>0);assert.ok(e);const chance=E.shotChance(m,u,e);
 u.fatigue=2;assert.equal(E.shotChance(m,u,e),chance);
 const migrated=E.upgradeSave(JSON.parse(JSON.stringify(c)));assert.equal(migrated.revision,3);
 assert.ok([...migrated.soldiers,...migrated.mission.units].every(s=>!Object.hasOwn(s,'fatigue')));
 assert.equal(E.validateSave(migrated),true);
});

test('legacy fatigue does not restrict Signal watch and new recruits have no fatigue field',()=>{
 const c=E.newCampaign(1);c.soldiers[0].fatigue=4;
 assert.equal(E.strategic(c,'covert',{id:0}).ok,true);
 assert.equal(E.strategic(c,'recruit').ok,true);
 assert.ok(c.soldiers.every(s=>!Object.hasOwn(s,'fatigue')));
});

test('a destroyed relay cannot be restored after a friendly depth charge',()=>{
 const c=E.newCampaign(1);c.regions[0].type='survival';E.startMission(c,0);const m=c.mission;m.relayHP=4;m.enemies=[];
 const u=m.units[3];m.selected=u.id;u.x=8;u.z=5;E.spawnEnemy(m,8,7);E.updateVision(m);
 assert.ok(E.act(c,'grenade',{id:m.enemies[0].id}).ok);assert.equal(m.relayHP,0);assert.equal(m.result?.success,false);
 assert.equal(E.act(c,'skill').ok,false);
});

test('a soldier granted an AP after overwatch cannot shoot and keep the reaction queued',()=>{
 const c=E.newCampaign(1);c.bonds['0:1']=2;E.strategic(c,'bond',{id:0,mate:1});E.startMission(c,0);const m=c.mission,u=m.units[0];
 u.x=7;u.z=3;E.updateVision(m);const e=m.enemies.find(e=>E.shotChance(m,u,e)>0);assert.ok(e);
 m.concealed=false;m.enemies.forEach(e=>e.awake=true);assert.ok(E.act(c,'guard').ok);m.selected=1;assert.ok(E.act(c,'teamwork').ok);m.selected=0;assert.ok(E.act(c,'shoot',{id:e.id}).ok);assert.equal(u.guard,false);
});

test('off-grid coordinates cannot alias a valid movement tile',()=>{
 const c=E.newCampaign(1);E.startMission(c,0);const u=c.mission.units[0];
 assert.equal(E.act(c,'move',{x:16,z:0}).ok,false);assert.equal(u.ap,2);assert.equal(u.x,1);
 assert.equal(E.tileAt(c.mission,-1,1),undefined);
});
