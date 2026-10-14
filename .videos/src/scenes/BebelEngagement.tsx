import {Audio,Easing,interpolate,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import type {Scene} from '../../factory/cenas/contracts';

export const BebelEngagement=({data}:{data:NonNullable<Scene['engagement']>})=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig();
 const entries=[{at:data.likeAt,x:85,color:'#ff6659',kind:'heart',label:'Curta'},{at:data.commentAt,x:405,color:'#ab72e8',kind:'comment',label:'Comente'},{at:data.shareAt,x:725,color:'#efae52',kind:'share',label:'Compartilhe'}];
 return <>
  {entries.map(e=>{
   const p=interpolate(frame,[e.at*fps,(e.at+.85)*fps],[0,1],{easing:Easing.out(Easing.cubic),extrapolateLeft:'clamp',extrapolateRight:'clamp'});
   return <div key={e.kind} style={{position:'absolute',zIndex:32,left:e.x,top:480,width:270,height:205,borderRadius:30,background:'linear-gradient(145deg,#572574ed,#2f104bea)',border:'2px solid #ffffff65',boxShadow:`0 8px 25px #1b062b55,0 0 28px ${e.color}55,inset 0 2px 0 #ffffff35`,opacity:p,transform:`translateY(${(1-p)*60}px) scale(${.97+p*.03})`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14}}>
    <svg width="96" height="96" viewBox="0 0 100 100" fill="none" stroke={e.color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
     {e.kind==='heart'?<path fill={e.color} stroke="none" d="M50 86 15 53C-8 27 25 5 50 29 75 5 108 27 85 53Z"/>:e.kind==='comment'?<><path d="M16 17H84V67H47L24 84V67H16Z"/><path d="M31 34H69M31 49H59"/></>:<><path d="m12 43 75-29-26 73-17-28Z"/><path d="m44 59 26-28"/></>}
    </svg>
    <span style={{fontFamily:'BebelRoboto, sans-serif',fontSize:43,fontWeight:900,color:'#fff',letterSpacing:-1,textShadow:'0 2px 4px #21082f80'}}>{e.label}</span>
   </div>;
  })}
  {[data.likeAt,data.commentAt].map((at,i)=><Sequence key={i} from={Math.round(at*fps)} durationInFrames={Math.ceil(.3*fps)} layout="none"><Audio src={staticFile(data.sound)} volume={i===0?.18:.13}/></Sequence>)}
 </>;
};
