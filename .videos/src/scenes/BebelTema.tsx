import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Item, RuntimeScene, ThemeProps } from '../../factory/cenas/contracts';
import mioloConfig from '../../brand/miolo.json';
import {PreparationDemo} from './PreparationDemo';
import {CookingPan} from './CookingPan';

const effects = mioloConfig.visualEffects;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const smooth = { ...clamp, easing: Easing.inOut(Easing.cubic) } as const;
const out = { ...clamp, easing: Easing.out(Easing.cubic) } as const;

const bokeh = [
  [110,650,36,5],[260,530,28,3],[860,610,42,7],[975,800,30,3],
  [65,950,40,7],[185,1100,24,3],[905,1150,34,5],[1020,1330,27,3],
  [70,1510,46,8],[230,1690,24,4],[820,1710,38,6],[970,1590,26,3],
  [420,700,23,4],[685,720,30,5],[340,1840,34,6],[710,1830,22,3],
];
const CharacterLights = ({ scene }: { scene: RuntimeScene }) => {
  const frame = useCurrentFrame(), { fps } = useVideoConfig();
  const seconds = (frame + scene.fromFrame) / fps;
  const c = scene.character!;
  const opacity = interpolate(seconds, [0, 0.9], [0, 1], smooth);
  return <AbsoluteFill style={{ zIndex: 1, pointerEvents: 'none', opacity }}>
    <div style={{ position: 'absolute', left: c.faceX - 650, top: c.faceY - 430, width: 1300, height: 1300,
      borderRadius: '50%', background: 'radial-gradient(circle, #ffd38c66 0%, #edaa5340 30%, transparent 68%)', filter: 'blur(35px)' }} />
    <div style={{ position: 'absolute', left: c.faceX - 630, top: c.faceY - 410, width: 1260, height: 1260,
      borderRadius: '50%', background: 'repeating-conic-gradient(transparent 0deg 24deg, #ffe2a755 24deg 30deg, transparent 30deg 45deg)',
      maskImage: 'radial-gradient(circle, transparent 12%, #000 27%, #000 48%, transparent 69%)',
      rotate: `${seconds * effects.rayDegreesPerSecond}deg`, filter: 'blur(8px)', opacity: 0.7 }} />
    {bokeh.map(([x,y,size,blur], i) => {
      const phase = i * 1.73 + seconds * 0.28;
      return <div key={i} style={{ position: 'absolute', left: x + Math.cos(phase) * 23,
        top: y + Math.sin(phase) * 18, width: size * 2, height: size * 2, borderRadius: '50%',
        background: 'radial-gradient(circle, #fff8df 0%, #ffe7aa 35%, #ffd27a99 62%, transparent 78%)',
        boxShadow: `0 0 ${size * 2}px #ffd58360`, filter: `blur(${blur}px)`, opacity: effects.bokehOpacity }} />;
    })}
  </AbsoluteFill>;
};

const Background = ({ scene, style }: { scene: RuntimeScene; style?: React.CSSProperties }) => {
  if (scene.background.type === 'image') return <Img src={staticFile(scene.background.asset)}
    style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }} />;
  // Nested sequence keeps the supplied background video at theme time across scene cuts.
  return <Sequence from={scene.background.timing === 'scene' ? 0 : -scene.fromFrame} layout="none">
    <OffthreadVideo src={staticFile(scene.background.asset)} muted playbackRate={scene.backgroundRate}
      style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }} />
  </Sequence>;
};
const ObjectLayer = ({ item, scene, props }: { item: Item; scene: RuntimeScene; props: ThemeProps }) => {
  const frame = useCurrentFrame(), { fps } = useVideoConfig();
  const previous = props.scenes[props.scenes.findIndex((s) => s.id === scene.id) - 1]?.items.find((i) => i.id === item.id);
  const continued = item.at === 0 && previous && previous.until === undefined && previous.asset === item.asset &&
    previous.x === item.x && previous.ground === item.ground && previous.width === item.width;
  const entry = continued || item.initiallyVisible ? 1 : interpolate(frame, [item.at * fps, (item.at + (item.entrance ?? effects.defaultItemEntranceSeconds)) * fps], [0, 1], smooth);
  const leaving = item.until === undefined ? 1 : interpolate(frame, [(item.until - (item.exit ?? 0.45)) * fps, item.until * fps], [1, 0], smooth);
  const p = entry * leaving;
  const light = continued || item.initiallyVisible ? 0 : Math.sin(Math.PI * interpolate(frame, [item.at * fps, (item.at + (item.entrance ?? effects.defaultItemEntranceSeconds) + 1.1) * fps], [0, 1], clamp));
  const info = props.media[item.asset], height = item.width * info.height / info.width, anchor = item.anchorY ?? 0.977;
  const image = <>
    {item.shadow && <div style={{ position: 'absolute', left: item.x + item.width * 0.13, top: item.ground - 12,
      width: item.width * 0.78, height: 22, borderRadius: '50%', background: '#241008', filter: 'blur(9px)', opacity: p * 0.24 }} />}
    <Img src={staticFile(item.asset)} style={{ position: 'absolute', left: item.x, top: item.ground - height * anchor,
      width: item.width, height: 'auto', opacity: p, transformOrigin: `50% ${anchor * 100}%`,
      filter: `drop-shadow(0 0 ${5 + light * 16}px rgba(228,185,255,${light * 0.48})) brightness(${1 + light * 0.1})`,
      scale: 0.985 + p * 0.015, translate: `0 ${(1 - p) * (item.entranceOffset ?? (item.layer === 'back' ? 3 : 10))}px` }} />
  </>;
  const rect = item.clip;
  return <AbsoluteFill style={{ zIndex: item.layer === 'back' ? 2 : 20, pointerEvents: 'none' }}>
    {rect ? <AbsoluteFill style={{ clipPath: `inset(${rect.y}px ${1080 - rect.x - rect.width}px ${1920 - rect.y - rect.height}px ${rect.x}px)` }}>{image}</AbsoluteFill> : image}
    {item.occlusion && <div style={{ position: 'absolute', left: item.occlusion.x, top: item.occlusion.y,
      width: item.occlusion.width, height: item.occlusion.height, overflow: 'hidden' }}>
      <Background scene={scene} style={{ position: 'absolute', width: 1080, height: 1920,
        left: -item.occlusion.x, top: -item.occlusion.y }} />
    </div>}
  </AbsoluteFill>;
};
const Scene = ({ scene, props }: { scene: RuntimeScene; props: ThemeProps }) => {
  const frame = useCurrentFrame(), { fps } = useVideoConfig(), seconds = frame / fps;
  const c = scene.character, pose = c?.poses.filter((p) => p.at <= seconds).at(-1);
  const index = pose && c ? c.poses.indexOf(pose) : -1, next = c?.poses[index + 1];
  const incoming = pose ? interpolate(frame, [pose.at * fps, (pose.at + 0.32) * fps], [0.4, 1], smooth) : 0;
  const outgoing = next ? interpolate(frame, [(next.at - 0.28) * fps, next.at * fps], [1, 0.45], smooth) : 1;
  const activeTitle = scene.titles.filter((t) => t.at <= seconds).at(-1);
  const listMatch = activeTitle?.lines[0].match(/^(\d+)\.\s+(.+)$/);
  const nextTitle = activeTitle ? scene.titles[scene.titles.indexOf(activeTitle) + 1] : undefined;
  const transition = scene.transition === 'fade' && scene.fromFrame > 0 ? interpolate(frame, [0, 0.2 * fps], [0, 1], smooth) : 1;
  return <AbsoluteFill style={{ opacity: transition, overflow: 'hidden' }}>
    <Background scene={scene} />
    {scene.objectFocus && <div style={{position:'absolute',zIndex:15,left:0,top:1210,width:1080,height:690,
      background:'radial-gradient(ellipse at 50% 55%, #25172dcc 0%, #25172d99 44%, transparent 74%)',
      filter:'blur(22px)',pointerEvents:'none'}} />}
    {scene.checklist && <div style={{position:'absolute', zIndex:15, left:185, top:850, width:710,
      padding:55, boxSizing:'border-box', borderRadius:28, background:'#fffaf0', color:'#35134e',
      fontFamily:'BebelRoboto', fontSize:58, boxShadow:'0 18px 40px #22093855',
      opacity:interpolate(seconds,[0,.35],[0,1],smooth), translate:`0 ${interpolate(seconds,[0,.5],[18,0],smooth)}px`}}>
      <div style={{fontWeight:900, marginBottom:35}}>{scene.checklist.heading}</div>
      {scene.checklist.lines.map((line,i) => <div key={line} style={{display:'flex', gap:25, alignItems:'center', marginTop:30,
        opacity:interpolate(seconds,[.2+i*.22,.55+i*.22],[0,1],smooth)}}>
        <div style={{width:38,height:38,border:'4px solid #814bc1',borderRadius:7,flexShrink:0}} />
        <span>{line}</span>
      </div>)}
    </div>}
    {c && effects.characterAtmosphereEnabled && <CharacterLights scene={scene} />}
    {scene.items.map((item) => <ObjectLayer key={item.id} item={item} scene={scene} props={props} />)}
    {scene.preparation && <PreparationDemo kind={scene.preparation} />}
    {scene.cooking && <CookingPan data={scene.cooking} />}
    {pose && c && <Img key={pose.asset} src={staticFile(pose.asset)} style={{ position: 'absolute', zIndex: 10,
      width: pose.width, height: 'auto', left: c.faceX - pose.anchorX * pose.width / props.media[pose.asset].width,
      top: c.faceY - pose.anchorY * pose.width / props.media[pose.asset].width, opacity: Math.min(incoming, outgoing),
      filter: 'drop-shadow(0 8px 18px #17072330) drop-shadow(0 0 10px #d199ff1c)' }} />}
    {activeTitle && <div style={{ position: 'absolute', zIndex: 30, left: activeTitle.x ?? 90, top: activeTitle.y ?? effects.titleTop,
      maxWidth: effects.titleMaxWidth, display: 'flex', flexDirection: listMatch ? 'row' : 'column', alignItems: listMatch ? 'center' : 'flex-start', gap: listMatch ? 26 : 4,
      fontFamily: 'BebelRoboto, sans-serif', fontWeight: 900, lineHeight: 1.08, letterSpacing: -2 }}>
      {listMatch && <div style={{ width: 148, height: 148, flexShrink: 0, borderRadius: '50%', background: '#ff5948',
        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110,
        boxShadow: '0 8px 24px #17062538',
        opacity: interpolate(frame, [activeTitle.at * fps, (activeTitle.at + 0.3) * fps], [0, 1], smooth) *
          (nextTitle ? interpolate(frame, [(nextTitle.at - 0.3) * fps, nextTitle.at * fps], [1, 0], smooth) : 1),
        translate: `${interpolate(frame, [activeTitle.at * fps, (activeTitle.at + effects.titleEntranceSeconds) * fps], [-18, 0], out)}px 0` }}>
        {listMatch[1]}
      </div>}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: listMatch ? 8 : 4, minWidth: 0 }}>
      {activeTitle.lines.map((line, i) => {
        const start = activeTitle.at + i * effects.titleStaggerSeconds;
        const progress = interpolate(frame, [start * fps, (start + effects.titleEntranceSeconds) * fps], [0, 1], out);
        const opacity = interpolate(frame, [start * fps, (start + 0.3) * fps], [i === 0 && start === 0 ? 0.4 : 0, 1], smooth);
        const exit = nextTitle ? interpolate(frame, [(nextTitle.at - 0.3) * fps, nextTitle.at * fps], [1, 0], smooth) : 1;
        const shimmer = interpolate(frame, [start * fps, (start + effects.glassSeconds) * fps], [0, 1], smooth);
        const light = Math.sin(Math.PI * shimmer);
        return <div key={`${activeTitle.at}-${i}`} style={{ width: 'fit-content', maxWidth: listMatch ? effects.titleMaxWidth - 174 : effects.titleMaxWidth, fontSize: activeTitle.fontSize ?? (listMatch ? 84 : 100),
          padding: '18px 28px', boxSizing: 'border-box', borderRadius: 20, color: '#fff', background: 'rgba(48,16,70,.68)',
          position: 'relative', overflow: 'hidden',
          outline: `1px solid rgba(244,220,255,${0.3 + light * 0.45})`, outlineOffset: -1,
          boxShadow: `0 8px 22px #1907282e, 0 0 ${20 + light * 24}px rgba(179,99,255,${0.2 + light * 0.2}), inset 0 2px 0 #ffffff38`, opacity: opacity * exit,
          textShadow: '0 2px 4px #17062580',
          translate: `${(1 - progress) * -16}px ${(1 - progress) * 6}px`, scale: 0.975 + progress * 0.025,
          transformOrigin: '0% 50%' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: light * 0.8,
            background: 'linear-gradient(110deg, transparent 20%, #ffffff18 35%, #fff5dc80 48%, #e4c3ff85 53%, #ffffff18 66%, transparent 80%)',
            translate: `${shimmer * 220 - 110}% 0` }} />
          <span style={{ position: 'relative' }}>{listMatch && i === 0 ? listMatch[2] : line}</span>
        </div>;
      })}
      </div>
    </div>}
  </AbsoluteFill>;
};

export const BebelTema: React.FC<ThemeProps> = (props) => {
  const { fps } = useVideoConfig();
  if (!props.audio || !props.scenes.length) return <AbsoluteFill style={{ background: '#38124f' }} />;
  return <AbsoluteFill style={{ background: '#38124f' }}>
    <style>{`@font-face{font-family:BebelRoboto;src:url("${staticFile(props.font)}");font-weight:100 900;font-display:block}`}</style>
    {/* One complete narration for the whole theme. Scenes never trim or repeat the voice. */}
    <Audio src={staticFile(props.audio)} volume={1} playbackRate={1} endAt={props.audioEndAt} />
    {props.scenes.map((scene, i) => {
      const next = props.scenes[i + 1], extra = next?.transition === 'fade' ? Math.ceil(0.2 * fps) : 0;
      return <Sequence key={scene.id} from={scene.fromFrame} durationInFrames={scene.durationInFrames + extra} premountFor={fps}>
        <Scene scene={scene} props={props} />
      </Sequence>;
    })}
  </AbsoluteFill>;
};
