export type CtaProps = {
  video: string; narration: string; cta: string;
  durationInFrames: number; videoPlaybackRate: number;
  ctaStartSeconds: number; ctaEntranceSeconds: number;
  ctaWidth: number; ctaTop: number; entranceOffset: number;
};
export const emptyCtaProps: CtaProps = {
  video: '', narration: '', cta: '', durationInFrames: 30, videoPlaybackRate: 1,
  ctaStartSeconds: 0, ctaEntranceSeconds: 0.5, ctaWidth: 880, ctaTop: 24, entranceOffset: 28,
};
