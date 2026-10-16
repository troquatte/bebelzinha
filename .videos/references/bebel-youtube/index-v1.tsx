import {AbsoluteFill,Audio,Composition,Easing,Img,interpolate,registerRoot,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
type Section={from:number;to:number;heading:string;detail:string;asset:string;pose:string;close:boolean};
type Props={audio:string;font:string;background:string;avatar:string;hero:string;durationInFrames:number;sections:Section[]};
const empty:Props={audio:'',font:'',background:'',avatar:'',hero:'',durationInFrames:30,sections:[]};
const opts={extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)} as const;
const Back=({p}:{p:Props})=><><Img src={staticFile(p.background)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'50% 85%'}}/><AbsoluteFill style={{background:'linear-gradient(110deg,#321344e0,#44235fa0 48%,#37164b22)'}}/></>;
const Capa=(p:Props)=><AbsoluteFill style={{background:'#44205e',fontFamily:'BebelRoboto,sans-serif'}}>
 <style>{`@font-face{font-family:BebelRoboto;src:url("${staticFile(p.font)}");font-weight:100 900}`}</style><Back p={p}/>
 <Img src={staticFile(p.sections[0]?.pose??p.avatar)} style={{position:'absolute',left:25,bottom:-40,width:550}}/>
 <Img src={staticFile(p.hero)} style={{position:'absolute',right:-95,bottom:-45,width:930}}/>
 <div style={{position:'absolute',left:55,top:48,color:'#fffaf0',fontSize:93,fontWeight:900,lineHeight:1.02,textShadow:'0 5px 12px #240635'}}><span style={{background:'#55297d',borderRadius:18,padding:'8px 22px'}}>ARROZ VIROU</span><br/><span style={{display:'inline-block',marginTop:15,background:'#fffaf0',color:'#452060',borderRadius:18,padding:'8px 22px'}}>JANTAR!</span></div>
</AbsoluteFill>;
const Film=(p:Props)=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),seconds=frame/fps;
 const idx=p.sections.findIndex(s=>seconds>=s.from&&seconds<s.to),s=p.sections[idx]??p.sections.at(-1);
 if(!s)return <AbsoluteFill style={{background:'#44205e'}}/>;
 const local=seconds-s.from,span=s.to-s.from,close=s.close||(idx>0&&local>span*.55&&span>9);
 const appear=idx===0?1:interpolate(local,[0,.2],[0,1],opts);
 const detail=idx===0?1:interpolate(local,[.7,1],[0,1],opts);
 const last=idx===p.sections.length-1,zoom=interpolate(local,[0,span],[1,1.035],opts);
 return <AbsoluteFill style={{background:'#44205e',fontFamily:'BebelRoboto,sans-serif',color:'#fffaf0'}}>
  <style>{`@font-face{font-family:BebelRoboto;src:url("${staticFile(p.font)}");font-weight:100 900;font-display:block}`}</style>
  <Audio src={staticFile(p.audio)}/><Back p={p}/>
  <div style={{position:'absolute',left:70,top:42,fontSize:25,fontWeight:700,letterSpacing:2,color:'#e6d5f0'}}>BEBELZINHA · JANTAR SEM COMEÇAR DO ZERO</div>
  <div style={{position:'absolute',left:70,top:98,maxWidth:1740,padding:'20px 30px',borderRadius:24,background:idx%2?'#4b226fe8':'#fffaf0',color:idx%2?'#fffaf0':'#3c1755',fontSize:58,fontWeight:900,lineHeight:1.06,opacity:appear}}>{s.heading}</div>
  {!close&&<Img src={staticFile(s.pose)} style={{position:'absolute',width:640,left:30,bottom:-120,opacity:appear}}/>}
  <Img src={staticFile(s.asset)} style={{position:'absolute',width:close?1380:1220,left:close?500:650,bottom:-40,transform:`scale(${zoom})`,transformOrigin:'50% 80%',opacity:appear}}/>
  <div style={{position:'absolute',left:close?72:650,top:close?340:240,width:close?420:1080,display:'grid',gridTemplateRows:`${detail}fr`}}><div style={{minHeight:0,overflow:'hidden'}}><div style={{padding:'20px 26px',borderRadius:20,background:'#fffaf0ef',color:'#3c1755',fontSize:close?40:43,fontWeight:800,lineHeight:1.2,opacity:detail}}>{s.detail}</div></div></div>
  {last&&local>span*.52&&<div style={{position:'absolute',left:70,top:290,padding:'18px 26px',borderRadius:22,background:'#fffaf0',color:'#44205e',fontSize:35,fontWeight:900}}>Mais ideias com a Bebel <span style={{marginLeft:16,color:'#fff',background:'#d82437',padding:'10px 18px',borderRadius:12}}>Inscreva-se</span></div>}
  <div style={{position:'absolute',left:70,bottom:24,color:'#fffaf0',fontWeight:700,fontSize:25}}>PASSO A PASSO · {String(idx+1).padStart(2,'0')} / {p.sections.length}</div>
  <div style={{position:'absolute',left:0,bottom:0,height:7,width:`${100*frame/p.durationInFrames}%`,background:'#eac56f'}}/>
 </AbsoluteFill>;
};
const Root=()=> <><Composition id="BebelYoutubeHorizontal" component={Film} defaultProps={empty} width={1920} height={1080} fps={30} durationInFrames={30} calculateMetadata={({props})=>({durationInFrames:props.durationInFrames})}/><Composition id="BebelYoutubeCapa" component={Capa} defaultProps={empty} width={1280} height={720} fps={30} durationInFrames={1}/></>;
registerRoot(Root);
