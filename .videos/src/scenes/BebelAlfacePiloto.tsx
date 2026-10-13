import {AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/alface-piloto.json';

const smooth = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)} as const;
export const pilotFrames = (fps: number) => data.shots.reduce((sum, shot) => sum + Math.ceil((shot.end - shot.start) / data.speed * fps), 0) + Math.round(data.ctaSeconds * fps);
const Shot = ({shot}: {shot: typeof data.shots[number]}) => {
  const frame = useCurrentFrame(), {fps, durationInFrames} = useVideoConfig();
  const t = frame / fps;
  const enter = interpolate(t, [0, .26], [.4, 1], smooth);
  const demonstration = shot.kind !== 'reaction';
  const closed = shot.kind === 'result';
  const withCharacter = ['problem','reaction','close','result'].includes(shot.kind);
  const sharedFrame = withCharacter && demonstration;
  const character = shot.kind === 'problem' || closed ? data.characterLooking : data.character;
  const exit = interpolate(t, [(shot.end-shot.start)/data.speed-.28, (shot.end-shot.start)/data.speed], [1,.45], smooth);
  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.035], smooth);
  const contact = interpolate(t, [.1, .75, 1.65, 2.55], [0, 1, 1, 0], smooth);
  const lid = interpolate(t, [.12, .75], [0, 1], smooth);
  return <AbsoluteFill style={{overflow: 'hidden'}}>
    <OffthreadVideo src={staticFile(data.background)} muted playbackRate={.6} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    <AbsoluteFill style={{background: demonstration ? 'linear-gradient(#37115288, #37115233)' : 'transparent'}} />
    {withCharacter && <Img src={staticFile(character)} style={{position:'absolute', width:sharedFrame ? 850 : 1080, left:sharedFrame ? -70 : -35, top:sharedFrame ? 720 : 710, opacity:Math.min(enter,exit), filter:'drop-shadow(0 0 35px #ffc56555)'}} />}
    <div style={{position:'absolute', left:sharedFrame ? 120 : demonstration ? -130 : 180, top:sharedFrame ? 1200 : demonstration ? 750 : 1370,
      width:sharedFrame ? 1020 : demonstration ? 1340 : 760, transform:`scale(${zoom})`, transformOrigin:'50% 70%', opacity:enter}}>
      <Img src={staticFile(closed ? data.closed : data.open)} style={{width:'100%'}} />
      {shot.kind === 'close' && <Img src={staticFile(data.closed)} style={{position:'absolute', inset:0, width:'100%', opacity:lid, translate:`0 ${-20 * (1-lid)}px`}} />}
      {(shot.kind === 'problem' || shot.kind === 'dry') && <svg viewBox="0 0 1536 1024" style={{position:'absolute', inset:0, width:'100%', opacity:shot.kind === 'dry' ? 1-contact : 1}}>
        {[ [510,340],[740,310],[980,425],[640,490],[1150,385] ].map(([x,y], i) => <path key={i} d="M0,-25 C-9,-8 -20,6 -20,19 A20,20 0 0 0 20,19 C20,6 9,-8 0,-25Z" transform={`translate(${x},${y})`} fill="#b1eafa" stroke="#fff" strokeWidth="3" opacity=".86" />)}
      </svg>}
      {(shot.kind === 'dry' || shot.kind === 'paper') && <svg viewBox="0 0 1536 1024" style={{position:'absolute', inset:0, width:'100%', pointerEvents:'none'}}>
        <defs><pattern id={`paper-${shot.kind}`} width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#fffdf4"/><circle cx="8" cy="8" r="2" fill="#ddd9ce" /></pattern></defs>
        <g style={{opacity:interpolate(t, [0,.25, shot.kind === 'dry' ? 2.5 : 2.15, shot.kind === 'dry' ? 3.1 : 2.65], [0,1,1,0], smooth),
          transform:`translateY(${shot.kind === 'dry' ? -145 * (1-contact) : interpolate(t,[.1,1.3],[-200,0],smooth)}px)`}}>
          <path d="M410 390 L900 330 L1120 465 L630 555 Z" fill={`url(#paper-${shot.kind})`} stroke="#eee5d8" strokeWidth="4" />
        </g>
      </svg>}
    </div>
    <div style={{position:'absolute', left:90, top:360, maxWidth:850, display:'flex', flexDirection:'column', gap:5,
      fontFamily:'BebelPilotRoboto', fontWeight:900, fontSize:82, lineHeight:1.1, color:'#fff'}}>
      {shot.lines.map((line,i) => {
        const p=interpolate(t,[i*.1,.4+i*.1],[0,1],smooth);
        const shine=interpolate(t,[0,2.5],[-130,130],smooth);
        return <div key={line} style={{width:'fit-content', maxWidth:850, padding:'18px 25px', borderRadius:20,
          background:'#301046b8', border:'1px solid #ffffff55', boxShadow:'0 8px 24px #200a4333', position:'relative', overflow:'hidden',
          opacity:p, translate:`${-12*(1-p)}px 0`, textShadow:'0 2px 5px #19062580'}}>
          <div style={{position:'absolute', inset:0, background:'linear-gradient(110deg,transparent 30%,#ffffff40 50%,transparent 70%)', translate:`${shine}% 0`}} />
          <span style={{position:'relative'}}>{line}</span>
        </div>;
      })}
    </div>
  </AbsoluteFill>;
};
export const BebelAlfacePiloto = () => {
  const {fps}=useVideoConfig();
  let at=0;
  return <AbsoluteFill style={{background:'#38124f'}}>
    <style>{`@font-face{font-family:BebelPilotRoboto;src:url("${staticFile(data.font)}");font-weight:100 900}`}</style>
    {data.shots.map((shot) => {
      const frames=Math.ceil((shot.end-shot.start)/data.speed*fps), start=at; at+=frames;
      return <Sequence key={shot.kind} from={start} durationInFrames={frames}>
        <Shot shot={shot} />
        <Audio src={staticFile(data.audio)} trimBefore={Math.round(shot.start*fps)} trimAfter={Math.round(shot.end*fps)} playbackRate={data.speed} />
      </Sequence>;
    })}
    <Sequence from={at} durationInFrames={Math.round(data.ctaSeconds*fps)}>
      <OffthreadVideo src={staticFile(data.ctaVideo)} muted style={{width:'100%',height:'100%',objectFit:'contain'}} />
      <Audio src={staticFile(data.ctaAudio)} trimBefore={Math.round(data.ctaStart*fps)} trimAfter={Math.round(data.ctaEnd*fps)} />
    </Sequence>
  </AbsoluteFill>;
};
