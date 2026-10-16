import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import brazil from '../../assets/mapas/brasil-regioes.json';

export type RegionPromptTiming = {from: number; to: number};
const ease = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)} as const;

/** Optional conversation beat; no location detection or simulated posted comment. */
export const RegionPrompt = ({timing, horizontal = false}: {timing?: RegionPromptTiming; horizontal?: boolean}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (!timing) return null;
  if (!Number.isFinite(timing.from) || !Number.isFinite(timing.to) || timing.from < 0 || timing.to <= timing.from) {
    throw new Error('Pergunta regional exige intervalo válido no áudio original.');
  }
  const seconds = frame / fps;
  if (seconds < timing.from || seconds >= timing.to) return null;
  const t = seconds - timing.from;
  const enter = interpolate(t, [0, .5], [0, 1], ease);
  const exit = interpolate(seconds, [timing.to - .3, timing.to], [1, 0], ease);
  const cycle = Math.max(0, t - .55) / 1.05;
  const active = Math.floor(cycle) % brazil.regions.length;
  const pulse = cycle % 1;
  const scale = horizontal ? .88 : 1;
  return <div style={{position: 'absolute', zIndex: 95, left: horizontal ? 1070 : 100,
    top: horizontal ? 510 : 1140, width: 880, height: 580, transformOrigin: '0 0',
    transform: `translateY(${(1 - enter) * 210 + (1 - exit) * 65}px) scale(${scale})`,
    opacity: enter * exit, borderRadius: 34, background: '#fffaf0', border: '3px solid #d9c4e7',
    boxShadow: '0 18px 40px #220c354d', color: '#39184f', fontFamily: 'BebelRoboto, sans-serif',
    boxSizing: 'border-box', padding: '24px 30px'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 16, fontSize: 39, fontWeight: 900}}>
      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 6h32v26H23L12 42V32H8Z" fill="#60328b"/><path d="M16 16h16M16 23h11" stroke="#fffaf0" strokeWidth="3" strokeLinecap="round"/></svg>
      De qual região você fala?
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 14}}>
      <svg width="420" height="410" viewBox={brazil.viewBox} aria-label="Mapa das cinco regiões do Brasil">
        {brazil.regions.map((region, i) => <g key={region.id}>
          <path d={region.path} fill={i === active ? '#e9ac53' : '#cbb4df'} stroke="#fffaf0" strokeWidth="2" strokeLinejoin="round"/>
          <path d={region.path} fill="none" stroke="#734299" strokeWidth="1.2" pathLength="1"
            strokeDasharray="1" strokeDashoffset={1 - enter}/>
          {i === active && <g transform={`translate(${region.center.join(' ')})`}>
            <circle r={9 + pulse * 24} fill="none" stroke="#9b4f7c" strokeWidth="3" opacity={1 - pulse}/>
            <path d="M0 6C-6-2-12-7-12-14a12 12 0 1 1 24 0c0 7-6 12-12 20Z" fill="#67348c"/>
            <circle cy="-14" r="4" fill="#fffaf0"/>
          </g>}
        </g>)}
      </svg>
      <div style={{flex: 1, paddingRight: 10}}>
        {brazil.regions.map((region, i) => <div key={region.id} style={{fontSize: 34, fontWeight: i === active ? 900 : 600,
          marginBottom: 10, color: i === active ? '#4b1c67' : '#887291',
          transform: `translateX(${i === active ? 8 : 0}px)`}}>
          <span style={{display: 'inline-block', width: 13, height: 13, marginRight: 14, borderRadius: '50%',
            background: i === active ? '#e9ac53' : '#cbb4df'}}/>{region.name}
        </div>)}
      </div>
    </div>
    <div style={{position: 'absolute', left: 30, right: 30, bottom: 20, borderRadius: 18,
      padding: '15px 20px', background: '#60328b', color: '#fffaf0', fontSize: 34,
      textAlign: 'center', fontWeight: 900}}>Conta nos comentários!</div>
  </div>;
};
