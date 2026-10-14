import type {Scene} from './contracts.ts';

export function itemSoundCueTimes(scene:Scene,previous?:Scene):number[]{
  return [...new Set(scene.items.filter(item=>{
    const before=previous?.items.find(p=>p.id===item.id);
    return !(item.at===0 && before?.asset===item.asset && before.until===undefined);
  }).map(item=>item.at))].sort((a,b)=>a-b);
}
