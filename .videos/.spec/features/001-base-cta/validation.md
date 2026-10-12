# Evidências

Validação executada em 2026-10-12. Histórico anterior preservado separadamente;
resultados antigos não foram usados para declarar esta base validada.

## Checks executados

- `npm run lint`: ESLint e TypeScript passaram.
- `npm run cta:test`: 17/17 passaram. Inclui caminhos/junction, exclusão mútua,
  entradas incompletas/recentes, duplicidade, colisões, recuperação de movimento
  e promoção antes/depois de rename, timing, layout e comparação de áudio.
- `npm run skills:check`: três skills locais válidas; remotion-* preservadas.
- `npm run cta:doctor`: Node 22.22.3, Remotion 4.0.534, FFmpeg/FFprobe n7.1 e Chrome local.
- `cta:prepare`, `cta:transcribe`, `cta:process`, `cta:finish`, `cta:validate` e
  `cta:stage` executados na fixture `temp/cta-diagnostic-2026-10-12`.
- Remotion compositions com props regeneradas: BebelInicio e BebelEncerramento,
  ambas 1080x1920, 30fps e 160 frames. Compartilham a mesma cena.
- `cta:frame`: stdout PNG decodificado e verificado em memória; nenhum still salvo.
- `cta:process`, `cta:reconcile` e `cta:list` na fila real retornaram lista vazia.
- 40 arquivos de mídia fornecidos conferidos contra SHA256 anterior: intactos.

## Diagnóstico completo

Movido, após conclusão, para `history/diagnostics/cta-2026-10-12`.
MP4 relativo a essa pasta:
`assets/cta/tarefas/003-gerados/002-final/001-diagnostico/output/convertido-0001.mp4`.

- SHA256: `e7d34b7d2f0207895f349efd7472a2a1e90b385c26be93222f691e7446532230`.
- H264/AAC, yuv420p, BT.709, 1080x1920, 30fps, 160 frames, 5.333333s.
- Áudio histórico decodificado: 4.8326875s; sustentação calculada ~0.500646s.
- Vídeo: 5.041667s, rate 0.9453125625; narração 1x. Sem all-intra neste diagnóstico.
- Comparação PCM: correlação 0.999947 em ambos os canais; lag zero; 19 janelas
  verificadas. Ganho ~0.7057 compatível com mono → estéreo de energia preservada.
- Cauda silenciosa medida: RMS zero, 0.420625s após tolerância AAC de 80ms.
- Inspeção visual real em memória: fonte em 0, 2.5, 4.9s; saída em
  0, 2, 2.233333, 2.666667, 5.3s. Arte inteira, legível, com margem acima do cabelo,
  rosto e mãos livres, CTA até o último frame. Width ajustada para 800.
- `finish` validou, promoveu e moveu; `validate` voltou a passar no destino.
- Staging/runtime do diagnóstico limpos; originais e registros preservados.
- Approval null. Nenhuma publicação, preview ou tarefa de produção criada.

## Descobertas e correções

- O áudio solto atual é frase de miolo sem CTA. Transcrição registrada no histórico
  diagnóstico; não foi aprovado nem substituído na pasta original. Apenas a
  fixture usou explicitamente a narração histórica com “Comente” em ~1.74s.
- FFmpeg do Remotion não oferece muxers raw f32le/rawvideo nem wrapped_avframe.
  A implementação usa PCM s16le em WAV e image2pipe em memória; decode completo
  usa codecs habilitados. Sem instalação de outro FFmpeg.
- Render default gerou yuvj420p; BT.709 explícito corrigiu para yuv420p.
- Alteração de fontes/config/motor invalida checkpoint. Validação visual é
  vinculada ao hash do MP4 e à assinatura de render, não apenas ao nome.

## Limites

Transcrição automática pode errar palavras: no diagnóstico errou parte da primeira
frase. O convite e seus timestamps orientaram o teste; a inspeção editorial continua
responsabilidade do usuário. A CLI não simula análise semântica/visual automática.
Falhas de inspeção impedem promoção. O fallback all-intra está implementado mas
não foi necessário no diagnóstico atual. Os testes de junction e binários nativos
exigiram execução fora do sandbox do Windows.
