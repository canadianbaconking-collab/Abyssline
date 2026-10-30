import test from 'node:test';
import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import {play} from './bot.mjs';
for(const type of Object.keys(E.TYPES).filter(t=>t!=='descent'))for(let seed=1;seed<=5;seed++)test(`${type}: completes through public actions, seed ${seed}`,()=>{const c=E.newCampaign(seed);c.regions[0].type=type;const result=play(c,0);assert.ok(result?.success);assert.ok(result.evacuated>0);assert.ok(result.turns<=17);assert.equal(c.day,2);});
test('complete campaign reaches final descent through earned research and resources',()=>{
 const c=E.newCampaign(12);
 for(let cycle=0;cycle<12&&!c.ending;cycle++){
  if(!c.research){const next=[E.RESEARCH[0],E.RESEARCH[1],E.RESEARCH[3],E.RESEARCH[2]].find(r=>!c.tech.includes(r.name)&&(!r.requires||c.tech.length>=r.requires));if(next)E.strategic(c,'research',{name:next.name});}
  while(c.material>=24&&E.deployment(c).length<6&&c.soldiers.filter(s=>!s.dead).length<12){if(!E.strategic(c,'recruit').ok)break;}
  const chosen=c.regions.filter(r=>!r.lost).sort((a,b)=>b.level-a.level)[0];assert.ok(chosen);
  if(chosen.level>=4&&c.material>=20)E.strategic(c,'stabilize',{id:chosen.id});
  if(E.deployment(c).length<4){E.strategic(c,'rest');continue;}
  const result=play(c,chosen.id,c.tech.includes('Deep coordinates')&&c.successes>=3);
  if(!result)E.strategic(c,'rest');else E.returnToCommand(c);
  assert.ok(c.material>=0);assert.ok(c.signal>=0);
 }
 assert.equal(c.ending,'victory');assert.ok(c.successes>=3);assert.ok(c.history.some(h=>h.type==='descent'&&h.success));assert.ok(c.tech.includes('Deep coordinates'));
});
