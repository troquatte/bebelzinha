import {Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Scene} from '../../factory/cenas/contracts';

// Optional, silent graphic overlay; never changes the account's actual follow state.
export const BebelFollow = ({data}: {data: NonNullable<Scene['follow']>}) => {
  const frame = useCurrentFrame(), {fps} = useVideoConfig(), seconds = frame / fps;
  const options = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)} as const;
  const enter = interpolate(seconds, [data.at, data.at + .5], [0, 1], options);
  const tap = seconds - data.tapAt;
  const pressed = interpolate(tap, [-.12, 0, .18], [1, .96, 1], options);
  const ripple = interpolate(tap, [0, .75], [0, 1], options);
  const followed = tap >= .16;
  if (seconds < data.at) return null;
  return <div style={{position:'absolute', zIndex:60, left:100, top:data.y ?? 250, width:880,
    height:176, boxSizing:'border-box', padding:25, borderRadius:42, background:'#fff',
    display:'flex', alignItems:'center', gap:22, fontFamily:'BebelRoboto, sans-serif',
    boxShadow:'0 14px 40px #1c0b3a44', opacity:enter, transform:`translateY(${(1-enter)*24}px) scale(${.96+enter*.04})`}}>
    <div style={{width:126,height:126,flexShrink:0,borderRadius:'50%',padding:6,boxSizing:'border-box',
      background:'linear-gradient(135deg, #7334dd, #b234c1, #ff795c)'}}>
      <Img src={staticFile(data.avatar)} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%',border:'4px solid white',boxSizing:'border-box'}} />
    </div>
    <div style={{flex:1,minWidth:0,color:'#17131c'}}>
      <div style={{fontWeight:900,fontSize:40,letterSpacing:-1,whiteSpace:'nowrap'}}>{data.handle}</div>
      {data.subtitle && <div style={{marginTop:7,fontSize:31,fontWeight:600,color:'#625b6d',whiteSpace:'nowrap'}}>{data.subtitle}</div>}
    </div>
    <div style={{position:'relative',width:210,height:90,flexShrink:0,borderRadius:23,
      display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:40,
      background:followed?'#eeeaf2':'#008ff5',color:followed?'#18121e':'#fff',transform:`scale(${pressed})`}}>
      {followed?'Seguindo':'Seguir'}
      {tap >= 0 && tap < .75 && <>
        <div style={{position:'absolute',left:63,top:3,width:84,height:84,borderRadius:'50%',
          border:'4px solid #ffffff',background:'#ffffff22',opacity:1-ripple,transform:`scale(${.5+ripple*1.6})`}} />
        {Array.from({length:8},(_,i)=>{
          const angle=i*Math.PI/4, distance=35+ripple*95;
          return <div key={i} style={{position:'absolute',left:100+Math.cos(angle)*distance,
            top:40+Math.sin(angle)*distance,width:11,height:11,borderRadius:'50%',
            background:['#833ada','#00a8f7','#ffb453'][i%3],opacity:1-ripple}} />;
        })}
      </>}
    </div>
  </div>;
};
