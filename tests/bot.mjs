import * as E from '../src/engine.js';
export function play(c,id,final=false){if(!E.startMission(c,id,final))return null;const m=c.mission;let turns=0;while(!m.result&&turns++<22){
 for(const u of [...m.units].sort((a,b)=>(a.role==='Engineer'?-2:a.role==='Diver'?-1:0)-(b.role==='Engineer'?-2:b.role==='Diver'?-1:0))){if(u.hp<=0||u.evacuated)continue;E.act(c,'select',{id:u.id});let attempts=0;while(u.ap>0&&!m.result&&attempts++<4){
  if(u.role==='Medic'&&u.skillTurn!==m.turn&&u.charges&&m.units.some(a=>a.hp>0&&a.hp<=a.maxHP-3&&E.dist(u,a)<=2)){if(E.act(c,'skill').ok)continue;}
  if(m.type!=='survival'&&u.role==='Engineer'&&u.skillTurn!==m.turn&&E.interactable(m,u,4)){E.act(c,'skill');continue;}
  if(m.type!=='survival'&&E.interactable(m,u)){E.act(c,'interact');continue;}
  const objectivesDone=m.type==='survival'?m.complete:m.objects.every(o=>o.done);
  if(m.complete&&E.tileAt(m,u.x,u.z).kind==='extract'){E.act(c,'evac');continue;}
  const targets=m.enemies.filter(e=>e.hp>0&&E.shotChance(m,u,e)>0).sort((a,b)=>(E.shotChance(m,u,b)*2-b.hp*3)-(E.shotChance(m,u,a)*2-a.hp*3));
  if(targets.length&&(!objectivesDone||E.dist(u,targets[0])<5)){if(u.ammo)E.act(c,'shoot',{id:targets[0].id});else E.act(c,'reload');continue;}
  let goals=objectivesDone?m.tiles.filter(t=>t.kind==='extract'):m.type==='survival'?[{x:8,z:6}]:m.objects.filter(o=>!o.done);
  if(m.type==='survival'&&!m.complete&&E.dist(u,goals[0])<=3){if(u.ammo<3)E.act(c,'reload');else E.act(c,'guard');continue;}
  const p=E.routeToward(m,u,goals,E.moveRange(u));if(p){const result=E.act(c,'move',p);if(result.ok)continue;}
  if(u.ammo<3)E.act(c,'reload');else E.act(c,'guard');
 }}
 if(!m.result)E.act(c,'end');}
 return m.result;
}
