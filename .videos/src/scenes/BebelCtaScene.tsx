import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, staticFile,
  useCurrentFrame, useVideoConfig } from 'remotion';
import type { CtaProps } from '../schemas/cta';

export const BebelCtaScene = (props: CtaProps) => {
  const frame = useCurrentFrame(), { fps, width } = useVideoConfig();
  if (!props.video || !props.narration || !props.cta) return <AbsoluteFill style={{ background: '#000' }} />;
  const start = Math.round(props.ctaStartSeconds * fps);
  const end = start + Math.max(1, Math.round(props.ctaEntranceSeconds * fps));
  const options = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1) } as const;
  return <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: '#6722b9' }}>
    <OffthreadVideo src={staticFile(props.video)} muted playbackRate={props.videoPlaybackRate}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    <Audio src={staticFile(props.narration)} playbackRate={1} volume={1} />
    <Img src={staticFile(props.cta)} style={{ position: 'absolute', top: props.ctaTop,
      left: (width - props.ctaWidth) / 2, width: props.ctaWidth, height: 'auto',
      opacity: interpolate(frame, [start, end], [0, 1], options),
      translate: `0 ${interpolate(frame, [start, end], [props.entranceOffset, 0], options)}px` }} />
  </AbsoluteFill>;
};
