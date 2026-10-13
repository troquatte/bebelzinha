import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Scene} from '../../factory/cenas/contracts';

const smooth={extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)} as const;
const eggWhite='M-135 -12 C-164 -85 -91 -145 -26 -116 C32 -150 135 -103 125 -38 C170 28 114 98 37 94 C-35 125 -143 80 -135 -12Z';
export const CookingPan=({data}:{data:NonNullable<Scene['cooking']>})=>{
  const frame=useCurrentFrame(),{fps}=useVideoConfig(),t=frame/fps;
  const stage=data.stage;
  const finished=['preview','serve'].includes(stage);
  const sauce=!['saute','garlic'].includes(stage);
  const eggs=finished||['add-eggs','cook','lid'].includes(stage);
  const cooked=finished?1:stage==='lid'?interpolate(t,[0,2.2],[.65,1],smooth):stage==='cook'?interpolate(t,[0,1.4],[.25,.65],smooth):.25;
  const fill=stage==='tomato'?interpolate(t,[.05,1.3],[0,1],smooth):1;
  const stirred=['saute','garlic','tomato'].includes(stage);
  const stir=interpolate(t,[0,1,2,3,4],[0,1,0,1,0],smooth);
  const lid=stage==='lid'?interpolate(t,[.05,.8,2.2,2.8],[0,1,1,0],smooth):0;
  const lift=stage==='add-eggs'?interpolate(t,[1.65,2.5],[0,1],smooth):1;
  return <svg viewBox="0 0 1080 1000" style={{position:'absolute',zIndex:21,left:data.table?60:-45,top:data.table?1260:760,
    width:data.table?960:1170,height:data.table?889:1083,overflow:'visible',filter:'drop-shadow(0 18px 22px #20092555)'}}>
    <defs>
      <radialGradient id="pan-metal"><stop stopColor="#616473"/><stop offset=".8" stopColor="#272a34"/><stop offset="1" stopColor="#151821"/></radialGradient>
      <radialGradient id="tomato-sauce"><stop stopColor="#ee783e"/><stop offset=".65" stopColor="#ce4028"/><stop offset="1" stopColor="#7f221d"/></radialGradient>
      <radialGradient id="yolk"><stop offset="0" stopColor="#ffdc6b"/><stop offset=".65" stopColor="#ffb721"/><stop offset="1" stopColor="#e78215"/></radialGradient>
      <linearGradient id="handle" x2="0" y2="1"><stop stopColor="#454955"/><stop offset=".5" stopColor="#131520"/><stop offset="1" stopColor="#333641"/></linearGradient>
      <linearGradient id="onion" x2=".5" y2="1"><stop stopColor="#fff9df"/><stop offset="1" stopColor="#e2b472"/></linearGradient>
      <clipPath id="pan-inside"><ellipse cx="540" cy="470" rx="370" ry="231"/></clipPath>
    </defs>
    <ellipse cx="550" cy="800" rx="360" ry="45" fill="#150728" opacity=".25"/>
    <path d="M856 480 L1050 405 Q1090 445 1054 488 L879 577Z" fill="url(#handle)" stroke="#626671" strokeWidth="8"/>
    <path d="M127 460 Q111 761 540 790 Q943 763 951 460Z" fill="url(#pan-metal)" stroke="#858998" strokeWidth="9"/>
    <ellipse cx="540" cy="470" rx="414" ry="271" fill="url(#pan-metal)" stroke="#babdc5" strokeWidth="11"/>
    <ellipse cx="540" cy="470" rx="376" ry="236" fill="#343337" stroke="#11131a" strokeWidth="8"/>
    <g clipPath="url(#pan-inside)">
      <ellipse cx="540" cy="475" rx="347" ry="207" fill="#d9ac4240"/>
      {Array.from({length:34},(_,i)=>{
        const x=245+(i*113)%580,y=295+(i*73)%340;
        return <g key={i} transform={`translate(${x+stir*(i%2?12:-12)},${y+stir*(i%3?8:-8)}) rotate(${i*37})`}>
          <rect x="-15" y="-12" width="30" height="25" rx="7" fill={i%2?'url(#onion)':'#c8492d'} stroke={i%2?'#fff4cf':'#f17e51'} strokeWidth="2"/>
        </g>;
      })}
      {stage==='garlic'&&Array.from({length:9},(_,i)=><rect key={i} x={340+i*37} y={280+interpolate(t,[0,.7],[0,100+i%3*25],smooth)} width="14" height="12" rx="3" fill="#fff6ce" opacity={interpolate(t,[0,.25],[0,1],smooth)}/>)}
      {sauce&&<g opacity={fill}>
        <ellipse cx="540" cy="470" rx="370" ry="232" fill="url(#tomato-sauce)"/>
        {Array.from({length:28},(_,i)=><path key={i} d={`M${250+(i*97)%560} ${305+(i*83)%330}l20 -6 14 20 -30 5Z`} fill={i%2?'#a62a1c':'#f28748'} opacity=".65"/>)}
      </g>}
      {['wells','add-eggs'].includes(stage)&&[360,700].map((x,i)=><ellipse key={x} cx={x} cy={450+i*35} rx="122" ry="100" fill="#64271e" opacity={stage==='wells'?interpolate(t,[i*.25,.7+i*.25],[0,1],smooth):1} stroke="#ed814b" strokeWidth="8"/>)}
      {eggs&&[360,700].map((x,i)=>{
        const entry=stage==='add-eggs'?interpolate(t,[1.85+i*.65,2.4+i*.65],[0,1],smooth):1;
        return <g key={x} transform={`translate(${x},${450+i*35-(1-entry)*170}) scale(${.88+entry*.12})`} opacity={entry}>
          <path d={eggWhite} fill="#fff9e9" opacity={.22+cooked*.78} stroke="#e8dcc7" strokeWidth={cooked*4}/>
          <ellipse cx="6" cy="-12" rx="58" ry="50" fill="url(#yolk)" stroke="#ef991c" strokeWidth="3"/>
          <ellipse cx="-12" cy="-30" rx="22" ry="10" fill="#fff2b8" opacity=".7"/>
        </g>;
      })}
      {(stage==='cook'||stage==='tomato')&&Array.from({length:10},(_,i)=><circle key={i} cx={250+(i*77)%600} cy={340+(i*49)%290} r={5+Math.sin(t*2+i)*3} fill="none" stroke="#ffe1a8" strokeWidth="2" opacity=".35"/>)}
    </g>
    {stirred&&<g transform={`translate(${590+stir*55},${440+stir*40}) rotate(${-30+stir*18})`}>
      <ellipse cx="0" cy="0" rx="40" ry="65" fill="#b87e45" stroke="#e4b079" strokeWidth="5"/>
      <path d="M0 -40L-18 -365Q-2 -395 18 -365L10 -40Z" fill="#ce9860" stroke="#e8b984" strokeWidth="4"/>
    </g>}
    {stage==='add-eggs'&&<g transform={`translate(${790-lift*100},${170+lift*65}) rotate(${lift*30})`} opacity={interpolate(t,[0,.25,2.5,3.3],[0,1,1,0],smooth)}>
      <path d="M-100 0 Q-80 140 0 140 Q80 140 100 0Z" fill="#e6ddcd" stroke="#fff7e8" strokeWidth="7"/>
      <ellipse cy="0" rx="100" ry="36" fill="#fff8ed"/>
      <ellipse cy="0" rx="72" ry="23" fill="#f5d86a"/>
    </g>}
    {lid>0&&<g opacity={lid} transform={`translate(0,${-200*(1-lid)})`}>
      <ellipse cx="540" cy="453" rx="425" ry="283" fill="#d2dce9c9" stroke="#eeeef4" strokeWidth="15"/>
      <ellipse cx="540" cy="438" rx="390" ry="247" fill="#61748470" stroke="#bac9d5" strokeWidth="6"/>
      <path d="M260 360Q500 175 770 352" fill="none" stroke="#fff9" strokeWidth="20"/>
      <rect x="462" y="366" width="156" height="63" rx="28" fill="#282838" stroke="#707382" strokeWidth="6"/>
    </g>}
    {!data.table&&['tomato','cook','lid'].includes(stage)&&[350,540,720].map((x,i)=><path key={x} d={`M${x} 230q-25 -45 0 -85q25 -45 0 -90`} fill="none" stroke="#fff" strokeWidth="8" opacity={.1+Math.sin(t*.9+i)*.06} transform={`translate(0,${-t*9})`}/>)}
    {finished&&<g opacity=".85">{Array.from({length:15},(_,i)=><ellipse key={i} cx={270+(i*71)%540} cy={335+(i*53)%230} rx="7" ry="3" fill="#388a39" transform={`rotate(${i*29} ${270+(i*71)%540} ${335+(i*53)%230})`}/>)}</g>}
  </svg>;
};
