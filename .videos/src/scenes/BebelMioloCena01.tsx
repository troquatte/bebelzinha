import { AbsoluteFill, Audio, Easing, Img, OffthreadVideo, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import sceneData from '../data/miolo-cena-01.json';

export type MioloCena01Data = typeof sceneData;

const hold = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const smooth = { ...hold, easing: Easing.inOut(Easing.cubic) } as const;
const out = { ...hold, easing: Easing.out(Easing.cubic) } as const;
const pop = { ...hold, easing: Easing.out(Easing.back(1.6)) } as const;

export const BebelMioloCena01: React.FC<{ data: MioloCena01Data }> = ({ data }) => {
  const frame = useCurrentFrame(), { fps } = useVideoConfig(), seconds = frame / fps;
  const { markers: m, motion, character, assets, positions: pos } = data;
  const at = (start: number, duration: number, easing: typeof smooth = smooth) =>
    interpolate(frame, [start * fps, (start + duration) * fps], [0, 1], easing);

  const purchase = at(m.purchase, motion.purchaseEntrance);
  const purchaseScale = interpolate(frame, [m.purchase * fps, (m.purchase + motion.purchaseEntrance) * fps], [0.88, 1], pop);
  const shelf = at(m.duplicate, motion.shelfEntrance);
  const shelfScale = interpolate(frame, [m.duplicate * fps, (m.duplicate + motion.shelfEntrance) * fps], [0.8, 1], pop);
  const emphasis = interpolate(frame, [m.tip * fps, (m.tip + 0.2) * fps, (m.tip + 0.95) * fps], [0, 1, 0], smooth);

  // Uma pose por vez: 40→100% na entrada, 100→45% antes do corte.
  const poseOrder = ['looking', 'surprise', 'pointing'] as const;
  const poseStart = [0, m.discovery, m.myDaughter];
  const activePose = seconds < m.discovery ? 0 : seconds < m.myDaughter ? 1 : 2;
  const poses = poseOrder.map((key, index) => {
    const pose = character.poses[key];
    const fadeIn = interpolate(frame, [poseStart[index] * fps, (poseStart[index] + motion.poseEntrance) * fps], [0.4, 1], smooth);
    const fadeOut = index === poseOrder.length - 1 ? 1 : interpolate(frame,
      [(poseStart[index + 1] - motion.poseExit) * fps, poseStart[index + 1] * fps], [1, 0.45], smooth);
    return { key, pose, opacity: Math.min(fadeIn, fadeOut), visible: index === activePose };
  });

  const isTip = seconds >= m.tip, title = isTip ? data.titles.tip : data.titles.purchase;

  return <AbsoluteFill style={{ background: data.colors.purple, overflow: 'hidden' }}>
    <style>{`@font-face {font-family:BebelRoboto;src:url("${staticFile(assets.font)}") format('truetype');font-weight:100 900;font-display:block;}`}</style>
    <Audio src={staticFile(assets.audio)} volume={1} />
    {/* O vídeo fornecido é a única câmera; nada de zoom extra. */}
    <AbsoluteFill style={{ zIndex: 0 }}>
      <OffthreadVideo src={staticFile(assets.background)} muted playbackRate={data.background.playbackRate}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Duplicata em escala de prateleira; destaque segue a silhueta do pacote (sem retângulo). */}
      <div style={{ position: 'absolute', left: pos.shelf.left, top: pos.shelf.top, width: pos.shelf.width, height: pos.shelf.height, overflow: 'hidden', opacity: shelf }}>
        <div style={{ position: 'absolute', left: pos.shelf.riceLeft - pos.shelf.left + 18, top: pos.shelf.floor - pos.shelf.top - 9,
          width: pos.shelf.riceWidth * 0.75, height: 10, borderRadius: '50%', background: '#281006', filter: 'blur(4px)', opacity: 0.3 }} />
        <Img src={staticFile(assets.rice)} style={{ position: 'absolute', left: pos.shelf.riceLeft - pos.shelf.left,
          top: pos.shelf.floor - pos.shelf.top - pos.shelf.riceWidth * (1225 / 1254), width: pos.shelf.riceWidth, height: 'auto',
          transformOrigin: '50% 96%', translate: `0 ${(1 - shelf) * 4 - emphasis * 5}px`, scale: shelfScale * (1 + emphasis * 0.1),
          filter: emphasis > 0 ? `drop-shadow(0 0 ${8 + emphasis * 10}px rgba(255, 137, 120, ${0.9 * emphasis}))` : undefined }} />
      </div>
      <div style={{ position: 'absolute', ...pos.shelf.lip, overflow: 'hidden' }}>
        <OffthreadVideo src={staticFile(assets.background)} muted playbackRate={data.background.playbackRate}
          style={{ position: 'absolute', width: 1080, height: 1920, objectFit: 'cover', left: -pos.shelf.lip.left, top: -pos.shelf.lip.top }} />
      </div>
    </AbsoluteFill>
    {poses.map(({ key, pose, opacity, visible }) => {
      if (!visible) return null;
      const scale = pose.width / 1167;
      return <Img key={key} src={staticFile(assets.poses[key])} style={{ position: 'absolute', zIndex: 10,
        width: pose.width, height: 'auto', left: character.face.x - pose.faceX * scale,
        top: character.face.y - pose.faceY * scale, opacity }} />;
    })}
    <div style={{ position: 'absolute', zIndex: 19, left: pos.purchase.left + pos.purchase.width * 0.13,
      bottom: pos.purchase.bottom + pos.purchase.width * 0.022, width: pos.purchase.width * 0.78, height: 24,
      borderRadius: '50%', background: '#35140D', filter: 'blur(10px)', opacity: 0.24 * purchase }} />
    <Img src={staticFile(assets.rice)} style={{ position: 'absolute', zIndex: 20, ...pos.purchase, height: 'auto',
      opacity: purchase, translate: `0 ${(1 - purchase) * 10}px`, transformOrigin: '50% 97.7%', scale: purchaseScale }} />
    {/* Cada linha tem seu próprio cartão; mesma tipografia, entrada em cascata e acomodação única. */}
    <div style={{ position: 'absolute', zIndex: 30, ...pos.title, textAlign: 'left',
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: data.titleStyle.gap,
      fontFamily: 'BebelRoboto, sans-serif', fontWeight: 900, lineHeight: 1.08, letterSpacing: -2 }}>
      {title.map((line, index) => {
        const start = (isTip ? m.tip : 0) + index * motion.titleStagger;
        const progress = interpolate(frame, [start * fps, (start + motion.titleEntrance) * fps], [0, 1], out);
        const fadeIn = interpolate(frame, [start * fps, (start + 0.18) * fps],
          [!isTip && index === 0 ? 0.4 : 0, 1], smooth);
        const end = m.tip - (1 - index) * 0.08;
        const fadeOut = isTip ? 1 : interpolate(frame, [(end - 0.26) * fps, end * fps], [1, 0], smooth);
        const scaleIn = interpolate(frame, [start * fps, (start + motion.titleEntrance * 0.68) * fps,
          (start + motion.titleEntrance) * fps], [0.955, 1.008, 1], smooth);
        const tilt = interpolate(frame, [start * fps, (start + motion.titleEntrance) * fps], [index === 0 ? -0.7 : 0.7, 0], out);
        return <div key={`${isTip}-${index}`} style={{ fontSize: data.titleStyle.fontSize, color: data.colors.text,
          padding: `${data.titleStyle.paddingY}px ${data.titleStyle.paddingX}px`, borderRadius: data.titleStyle.radius,
          backgroundColor: data.titleStyle.background, whiteSpace: 'nowrap',
          boxShadow: '0 8px 22px rgba(25, 7, 40, 0.18)', textShadow: '0 2px 3px rgba(0, 0, 0, 0.12)',
          opacity: fadeIn * fadeOut, transformOrigin: '0% 50%', scale: scaleIn * (0.99 + fadeOut * 0.01),
          rotate: `${tilt}deg`, filter: `blur(${(1 - progress) * 0.8}px)`,
          translate: `${(1 - progress) * -16 + (1 - fadeOut) * 10}px ${(1 - progress) * 6 - (1 - fadeOut) * 4}px` }}>{line}</div>;
      })}
    </div>
  </AbsoluteFill>;
};
