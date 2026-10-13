import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Scene} from '../../factory/cenas/contracts';

const smooth = {extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)} as const;
const Cup = ({x,y,width,progress}: {x:number;y:number;width:number;progress:number}) => <svg viewBox="0 0 430 460" style={{position:'absolute',left:x,top:y,width,height:width*460/430,overflow:'visible',filter:'drop-shadow(0 15px 18px #20103b40)'}}>
  <defs><clipPath id={`cup-${x}`}><path d="M45 65 L325 65 L302 400 Q185 437 68 400Z"/></clipPath><pattern id={`rice-${x}`} width="32" height="26" patternUnits="userSpaceOnUse"><rect width="32" height="26" fill="#e5d8b5"/><ellipse cx="8" cy="8" rx="3" ry="9" fill="#fff7dc" transform="rotate(-25 8 8)"/><ellipse cx="25" cy="21" rx="3" ry="8" fill="#faf0d3" transform="rotate(30 25 21)"/></pattern></defs>
  <path d="M320 100 Q420 95 403 225 Q390 287 320 275" fill="none" stroke="#f2eddf" strokeWidth="22"/>
  <path d="M45 65 L325 65 L302 400 Q185 437 68 400Z" fill="#e6e7f140" stroke="#f6f5ee" strokeWidth="8"/>
  <rect x="45" y={400-progress*240} width="290" height="330" clipPath={`url(#cup-${x})`} fill={`url(#rice-${x})`}/>
  {[140,205,270,335].map(yMark=><path key={yMark} d={`M65 ${yMark}H115`} stroke="#603973" strokeWidth="6"/>)}
  <path d="M140 95 L124 350" stroke="#fff9" strokeWidth="12"/>
</svg>;
const Bowl = ({x,y,width,progress}: {x:number;y:number;width:number;progress:number}) => <svg viewBox="0 0 460 340" style={{position:'absolute',left:x,top:y,width,height:width*340/460,overflow:'visible',filter:'drop-shadow(0 15px 18px #20103b40)'}}>
  <path d="M28 80 Q52 300 230 300 Q408 300 432 80Z" fill="#f9f1df" stroke="#c5b3cd" strokeWidth="7"/>
  <ellipse cx="230" cy="80" rx="202" ry="65" fill="#e8dbca" stroke="#fff9ef" strokeWidth="9"/>
  <ellipse cx="230" cy="84" rx="185" ry="51" fill="#c44324" opacity={progress}/>
  <path d="M90 150 Q130 230 180 245" fill="none" stroke="#fff8" strokeWidth="16"/>
</svg>;
export const PreparationDemo = ({kind}: {kind:NonNullable<Scene['preparation']>}) => {
  const frame=useCurrentFrame(), {fps}=useVideoConfig(), t=frame/fps;
  const p=interpolate(t,[.1,1.15],[0,1],smooth);
  return <AbsoluteFill style={{zIndex:22,pointerEvents:'none',opacity:interpolate(t,[0,.25],[0,1],smooth)}}>
    {kind==='rice' && <>
      <Cup x={560} y={1120} width={410} progress={p}/>
      <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
        {Array.from({length:18},(_,i)=>{
          const fall=((t*1.25+i*.073)%1);
          return <ellipse key={i} cx={710+Math.sin(i*3.7)*28} cy={920+fall*370} rx="4" ry="12" fill="#fff2cb" opacity={t<1.12 ? .85:0} transform={`rotate(${i*23} ${710+Math.sin(i*3.7)*28} ${920+fall*370})`}/>;
        })}
      </svg>
    </>}
    {kind==='sauce' && <>
      <Bowl x={550} y={1300} width={440} progress={p}/>
      <div style={{position:'absolute',left:750,top:1110,width:15,height:265,background:'#d75432',borderRadius:10,opacity:Math.sin(p*Math.PI),transformOrigin:'50% 0%',scale:`1 ${p}`}}/>
    </>}
    {(kind==='eggs' || kind==='egg-colors') && <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
      {[[330,1490],[575,1490]].map(([x,y],i)=><g key={i} opacity={interpolate(t,[.2+i*.65,.65+i*.65],[0,1],smooth)}>
        <ellipse cx={x} cy={y} rx="105" ry="135" fill="none" stroke="#fff6ce" strokeWidth="8"/>
        {kind==='eggs' ? <circle cx={x} cy={y-160} r="45" fill="#ff5948"/> : <rect x={x-100} y={y-203} width="200" height="65" rx="18" fill="#431d66"/>}
        <text x={x} y={y-157} textAnchor="middle" fill="white" fontFamily="BebelRoboto" fontSize={kind==='eggs'?54:43} fontWeight="900">{kind==='eggs'?i+1:i===0?'Branco':'Marrom'}</text>
      </g>)}
    </svg>}
    {kind==='ready' && <><Cup x={35} y={1500} width={260} progress={1}/><Bowl x={760} y={1570} width={280} progress={1}/></>}
  </AbsoluteFill>;
};
