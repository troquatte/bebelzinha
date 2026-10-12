import { Composition } from 'remotion';
import { BebelCtaScene } from '../scenes/BebelCtaScene';
import { emptyCtaProps } from '../schemas/cta';
import type { CtaProps } from '../schemas/cta';

const metadata = ({ props }: { props: CtaProps }) => ({ durationInFrames: props.durationInFrames });
export const CtaCompositions = () => <>
  <Composition id="BebelInicio" component={BebelCtaScene} width={1080} height={1920}
    fps={30} durationInFrames={30} defaultProps={emptyCtaProps} calculateMetadata={metadata} />
  <Composition id="BebelEncerramento" component={BebelCtaScene} width={1080} height={1920}
    fps={30} durationInFrames={30} defaultProps={emptyCtaProps} calculateMetadata={metadata} />
</>;
