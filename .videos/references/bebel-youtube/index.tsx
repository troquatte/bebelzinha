import {AbsoluteFill,Audio,Composition,Easing,Img,Loop,OffthreadVideo,interpolate,registerRoot,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {RegionPrompt} from '../../src/scenes/RegionPrompt';
import type {RegionPromptTiming} from '../../src/scenes/RegionPrompt';
type Section={from:number;to:number;heading:string;detail:string;asset:string;pose:string;close:boolean;shots?:{from:number;to:number;asset:string}[]};
type Props={audio:string;font:string;background:string;backgroundType?:'image'|'video';backgroundDurationSeconds?:number;avatar:string;hero:string;durationInFrames:number;sections:Section[];thumbnailLead?:string;thumbnailWord?:string;regionPrompt?:RegionPromptTiming};
type Beat={from:number;to:number;lead:string;word:string;tone:string;section:number;chapter:string};
const empty:Props={audio:'',font:'',background:'',avatar:'',hero:'',durationInFrames:30,sections:[]};
const opts={extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)} as const;
const Back=({p}:{p:Props})=>{
 const {fps}=useVideoConfig();
 const video=p.backgroundType==='video'||/\.(mp4|mov|webm)$/i.test(p.background);
 if(video&&(!Number.isFinite(p.backgroundDurationSeconds)||p.backgroundDurationSeconds!<=0))throw new Error('Fundo em vídeo exige duração real válida; não há fallback silencioso para imagem.');
 return <>{video?<Loop durationInFrames={Math.max(1,Math.floor(p.backgroundDurationSeconds!*fps))}><OffthreadVideo muted src={staticFile(p.background)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'50% 85%'}}/></Loop>:<Img src={staticFile(p.background)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'50% 85%'}}/>}<AbsoluteFill style={{background:'linear-gradient(110deg,#321344e0,#44235fa0 48%,#37164b22)'}}/></>;
};
const Capa=(p:Props)=><AbsoluteFill style={{background:'#44205e',fontFamily:'BebelRoboto,sans-serif'}}>
 <style>{`@font-face{font-family:BebelRoboto;src:url("${staticFile(p.font)}");font-weight:100 900}`}</style><Back p={p}/>
 <Img src={staticFile(p.sections[0]?.pose??p.avatar)} style={{position:'absolute',left:25,bottom:-40,width:550}}/>
 <Img src={staticFile(p.hero)} style={{position:'absolute',right:p.thumbnailWord?20:-95,bottom:p.thumbnailWord?0:-45,width:p.thumbnailWord?820:930}}/>
 <div style={{position:'absolute',left:55,top:48,color:'#fffaf0',fontSize:93,fontWeight:900,lineHeight:1.02,textShadow:'0 5px 12px #240635'}}><span style={{background:'#55297d',borderRadius:18,padding:'8px 22px'}}>{p.thumbnailLead??'ARROZ VIROU'}</span><br/><span style={{display:'inline-block',marginTop:15,background:'#fffaf0',color:'#452060',borderRadius:18,padding:'8px 22px'}}>{p.thumbnailWord??'JANTAR!'}</span></div>
</AbsoluteFill>;
const Subscribe=({p,at}:{p:Props;at:number})=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),t=f/fps-at;
 const enter=interpolate(t,[0,.55],[0,1],opts),tap=t-1.6,subscribed=tap>=.16;
 if(t<0)return null;
 const ripple=interpolate(tap,[0,.7],[0,1],opts);
 return <div style={{position:'absolute',zIndex:90,left:60,top:840,width:800,height:160,padding:22,boxSizing:'border-box',borderRadius:32,background:'#fffaf0',display:'flex',alignItems:'center',gap:18,color:'#2d173b',fontFamily:'BebelRoboto,sans-serif',opacity:enter,transform:`translateY(${(1-enter)*270}px)`}}>
 <Img src={staticFile(p.avatar)} style={{width:108,height:108,borderRadius:'50%',border:'5px solid #8d55bc',objectFit:'cover'}}/>
 <div style={{flex:1}}><div style={{fontWeight:900,fontSize:36}}>Bebelzinha</div><div style={{fontSize:25,marginTop:7}}>Jantar sem começar do zero</div></div>
 <div style={{position:'relative',padding:'20px 24px',borderRadius:17,fontSize:32,fontWeight:900,color:subscribed?'#44205e':'#fff',background:subscribed?'#eee7f3':'#d82437',transform:`scale(${interpolate(tap,[-.12,0,.18],[1,.95,1],opts)})`}}>{subscribed?'✓ Inscrito':'Inscreva-se'}
 {tap>=0&&tap<.7&&<div style={{position:'absolute',left:'40%',top:'15%',width:60,height:60,border:'3px solid #d49a4b',borderRadius:'50%',opacity:1-ripple,transform:`scale(${.5+ripple*2})`}}/>}
 </div></div>;
};
const MotionFilm=(p:Props&{beats:Beat[]})=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),seconds=frame/fps;
 const b=p.beats?.find(x=>seconds>=x.from&&seconds<x.to)??p.beats?.at(-1);
 if(!b)return <Film {...p}/>;
 const s=p.sections[b.section],local=seconds-b.from,span=b.to-b.from;
 const shot=s.shots?.find(x=>seconds>=x.from&&seconds<x.to),currentAsset=shot?.asset??s.asset;
 const entry=b.from===0?1:interpolate(local,[0,.35],[0,1],opts);
 const exit=interpolate(seconds,[b.to-.16,b.to],[1,0],opts);
 const key=b.from===0?1:interpolate(local,[.22,.55],[0,1],opts);
 const askingRegion=Boolean(p.regionPrompt&&seconds>=p.regionPrompt.from&&seconds<p.regionPrompt.to);
 const beatIndex=p.beats.indexOf(b),close=!askingRegion&&b.section!==0&&b.section!==p.sections.length-1&&(beatIndex%3===1||s.close);
 const itemZoom=interpolate(local,[0,Math.max(.5,span)],[1,1.04],opts);
 const purple=b.tone==='purple',size=Math.min(122,Math.floor(660/(b.word.length*.61)));
 const end=p.sections.at(-1)!.to,showSubscribe=seconds>=end-6.5;
 const fade=b.section===0?1:interpolate(seconds,[s.from,s.from+.35],[.4,1],opts);
 const previous=p.beats[Math.max(0,beatIndex-1)];
 const previousClose=previous.section!==0&&previous.section!==p.sections.length-1&&((Math.max(0,beatIndex-1)%3===1)||p.sections[previous.section].close);
 const camera=interpolate(local,[0,.5],[previousClose?1:0,close?1:0],opts);
 const assetStart=shot?.from??s.from;
 const assetEntry=b.section===0||(!shot&&p.sections[b.section-1]?.asset===s.asset)?1:interpolate(seconds,[assetStart,assetStart+.35],[0,1],opts);
 return <AbsoluteFill style={{background:'#44205e',fontFamily:'BebelRoboto,sans-serif',color:'#fffaf0'}}>
 <style>{`@font-face{font-family:BebelRoboto;src:url("${staticFile(p.font)}");font-weight:100 900;font-display:block}`}</style><Audio src={staticFile(p.audio)}/><Back p={p}/>
 <div style={{position:'absolute',left:50,top:40,fontSize:28,fontWeight:800,letterSpacing:1,color:'#e9d8f6'}}>BEBELZINHA · {b.chapter.toUpperCase()}</div>
 <div style={{position:'absolute',left:30,top:375,width:760,height:660,borderRadius:'50%',background:'radial-gradient(ellipse,#ffd38445,transparent 65%)',pointerEvents:'none'}}/>
 {!close&&<Img src={staticFile(s.pose)} style={{position:'absolute',left:25,bottom:-135,width:730,opacity:fade}}/>}
 {!askingRegion&&<Img src={staticFile(currentAsset)} style={{position:'absolute',left:820,bottom:-45,width:1130,opacity:assetEntry,transform:`translate(${camera*-130+(1-assetEntry)*65}px,${camera*35}px) scale(${(1+camera*.159)*itemZoom})`,transformOrigin:'50% 85%'}}/>}
 <div style={{position:'absolute',zIndex:40,left:60,top:130,width:740,padding:'27px 30px',boxSizing:'border-box',borderRadius:27,background:purple?'linear-gradient(125deg,#462060f5,#6e388be8)':'#fffaf0f7',color:purple?'#fffaf0':'#3b1851',border:purple?'2px solid #c8a5df':'2px solid #dec9eb',opacity:entry*exit,transform:`translateY(${(1-entry)*-28}px)`,overflow:'hidden'}}>
 <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}><div style={{fontSize:43,fontWeight:800,lineHeight:1.15}}>{b.lead}</div><div style={{width:62,height:62,flexShrink:0,borderRadius:'50%',background:'#ef7359',color:'#fff',fontWeight:900,fontSize:27,display:'grid',placeItems:'center'}}>{String(b.section+1).padStart(2,'0')}</div></div>
 <div style={{display:'grid',gridTemplateRows:`${key}fr`,marginTop:key*17}}><div style={{minHeight:0,overflow:'hidden'}}><div style={{fontWeight:900,fontSize:size,lineHeight:1.08,letterSpacing:-2,whiteSpace:'nowrap',opacity:key,transform:`translateX(${(1-key)*-28}px)`}}>{b.word}</div></div></div>
 <div style={{height:5*key,marginTop:17*key,borderRadius:5,background:purple?'#ddb46b':'#9d6abd',transformOrigin:'0 50%',transform:`scaleX(${key})`}}/>
 </div>
 {close&&!showSubscribe&&<div style={{position:'absolute',left:60,top:510,width:540,padding:'20px 25px',borderRadius:20,background:'#482365e8',fontSize:31,lineHeight:1.24,fontWeight:700,opacity:entry*exit}}>{s.detail}</div>}
 {showSubscribe&&<Subscribe p={p} at={end-6.5}/>}
 <RegionPrompt timing={p.regionPrompt} horizontal/>
 <div style={{position:'absolute',left:60,bottom:22,fontSize:23,fontWeight:800,color:'#fffaf0',opacity:showSubscribe?0:.8}}>PREPARO COMPLETO · {String(b.section+1).padStart(2,'0')} / {p.sections.length}</div>
 <div style={{position:'absolute',bottom:0,left:0,width:`${100*frame/p.durationInFrames}%`,height:7,background:'#e8c777'}}/>
 </AbsoluteFill>;
};
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
const Root=()=> <><Composition id="BebelYoutubeHorizontal" component={Film} defaultProps={empty} width={1920} height={1080} fps={30} durationInFrames={30} calculateMetadata={({props})=>({durationInFrames:props.durationInFrames})}/><Composition id="BebelYoutubeMotion" component={MotionFilm} defaultProps={{...empty,beats:[]}} width={1920} height={1080} fps={30} durationInFrames={30} calculateMetadata={({props})=>({durationInFrames:props.durationInFrames})}/><Composition id="BebelYoutubeCapa" component={Capa} defaultProps={empty} width={1280} height={720} fps={30} durationInFrames={1}/></>;
registerRoot(Root);
