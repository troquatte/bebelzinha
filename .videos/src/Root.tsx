import { CtaCompositions } from "./compositions/CtaCompositions";
import { Composition } from 'remotion';
import { BebelMioloCena01 } from './scenes/BebelMioloCena01';
import type { MioloCena01Data } from './scenes/BebelMioloCena01';
import sceneData from './data/miolo-cena-01.json';
import { BebelTema } from './scenes/BebelTema';
import { emptyThemeProps } from '../factory/cenas/contracts';
import type { ThemeProps } from '../factory/cenas/contracts';
import {BebelAlfacePiloto, pilotFrames} from './scenes/BebelAlfacePiloto';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <CtaCompositions />
      <Composition id="BebelAlfacePiloto" component={BebelAlfacePiloto} width={1080} height={1920} fps={30} durationInFrames={pilotFrames(30)} />
      <Composition id="BebelMioloTema" component={BebelTema} width={1080} height={1920} fps={30}
        durationInFrames={30} defaultProps={emptyThemeProps}
        calculateMetadata={({ props }: { props: ThemeProps }) => ({ durationInFrames: props.durationInFrames })} />
      <Composition id="BebelMioloCena01" component={BebelMioloCena01} width={1080} height={1920}
        fps={30} durationInFrames={234} defaultProps={{ data: sceneData }}
        calculateMetadata={({ props }: { props: { data: MioloCena01Data } }) => ({ durationInFrames: Math.ceil((props.data.audioSeconds + props.data.holdSeconds) * 30) })} />
    </>
  );
};
