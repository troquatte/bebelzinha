import {AbsoluteFill,Composition,Easing,interpolate,registerRoot,useCurrentFrame,useVideoConfig} from 'remotion';
import {BebelTema} from '../../src/scenes/BebelTema';
import {emptyThemeProps} from '../../factory/cenas/contracts';
import {RegionPrompt} from '../../src/scenes/RegionPrompt';
import type {RegionPromptTiming} from '../../src/scenes/RegionPrompt';
import type {ThemeProps} from '../../factory/cenas/contracts';
type Beat={from:number;to:number;lead:string;word:string;wordAt:number;tone:string;step?:string;tail?:string;tailAt?:number};
const defaultBeats:Beat[]=[];
const props=emptyThemeProps;
const smooth={extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)} as const;
const FullMotion=(data:ThemeProps & {typography?:typeof defaultBeats;immediateHook?:boolean;regionPrompt?:RegionPromptTiming})=>{
  const beats=data.typography??defaultBeats;
  const frame=useCurrentFrame(),{fps}=useVideoConfig(),s=frame/fps;
  const b=beats.find(x=>s>=x.from&&s<x.to);
  const immediate=data.immediateHook&&b?.from===0;
  const enter=immediate?1:b?interpolate(s,[b.from,b.from+.32],[0,1],smooth):0;
  const exit=b?interpolate(s,[b.to-.2,b.to],[1,0],smooth):0;
  const word=immediate?1:b?interpolate(s,[b.wordAt,b.wordAt+.3],[0,1],smooth):0;
  const tail=b?.tail?interpolate(s,[b.tailAt!,b.tailAt!+.28],[0,1],smooth):0;
  const purple=b?.tone==='purple',ending=b?.tone==='ending';
  const size=b?Math.min(b.word.length>11?100:b.word.length>8?116:146,Math.floor(760/(b.word.length*.64))):100;
  return <AbsoluteFill>
    <BebelTema {...data}/>
    <RegionPrompt timing={data.regionPrompt}/>
    {b&&<div style={{position:'absolute',zIndex:80,left:105,top:ending?510:245,width:850,
      boxSizing:'border-box',padding:ending?'18px 26px':'28px 34px',borderRadius:ending?22:30,
      background:purple?'linear-gradient(125deg,#3c155cf2,#5b2785ee)':'#fffaf0',
      border:purple?'2px solid #dec9ee':'3px solid #63318a',
      boxShadow:'0 14px 32px #23083944',color:purple?'#fffaf0':'#35134e',
      fontFamily:'BebelRoboto, sans-serif',fontWeight:900,lineHeight:1.03,letterSpacing:-2,
      opacity:enter*exit,transform:`translateY(${(1-enter)*-22}px)`}}>
      {!ending&&<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
        <div style={{fontSize:54,letterSpacing:-1}}>{b.lead}</div>
        {b.step&&<div style={{flexShrink:0,width:80,height:80,borderRadius:'50%',fontSize:46,
          display:'flex',alignItems:'center',justifyContent:'center',background:purple?'#fffaf0':'#55277d',
          color:purple?'#55277d':'#fffaf0'}}>{b.step}</div>}
      </div>}
      <div style={{display:'grid',gridTemplateRows:`${word}fr`,marginTop:ending?0:14*word}}><div style={{minHeight:0,overflow:'hidden'}}>
      <div style={{position:'relative',overflow:'hidden',
        fontSize:ending?66:size,whiteSpace:'nowrap',opacity:word,
        transformOrigin:'0 50%',transform:`translateX(${(1-word)*-30}px) scale(${.94+.06*word})`,
        textShadow:purple?'0 3px 8px #200a3d66':'0 3px 0 #e3d1ef'}}>
        {b.word}
        <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:.2*Math.sin(Math.PI*interpolate(s,[b.wordAt,b.wordAt+1.1],[0,1],smooth)),
          background:'linear-gradient(110deg,transparent 30%,#fff 50%,transparent 70%)',
          transform:`translateX(${interpolate(s,[b.wordAt,b.wordAt+1.1],[-110,110],smooth)}%)`}}/>
      </div></div></div>
      {b.tail&&<div style={{display:'grid',gridTemplateRows:`${tail}fr`,marginTop:14*tail}}><div style={{minHeight:0,overflow:'hidden'}}><div style={{fontSize:54,letterSpacing:-1,opacity:tail,transform:`translateY(${(1-tail)*12}px)`}}>{b.tail}</div></div></div>}
      {!ending&&<div style={{height:5*word,marginTop:18*word,borderRadius:3,background:purple?'#b693da':'#9a73bd',
        transformOrigin:'0 50%',transform:`scaleX(${word})`,opacity:.65}}/>}
    </div>}
  </AbsoluteFill>;
};
const Root=()=> <Composition id="BebelMotionReferencia" component={FullMotion} defaultProps={props}
  width={1080} height={1920} fps={30} durationInFrames={props.durationInFrames}
  calculateMetadata={({props})=>({durationInFrames:props.durationInFrames})}/>;
registerRoot(Root);
