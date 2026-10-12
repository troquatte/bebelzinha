# Bebel — fábrica de CTA

Remotion existente, uma cena compartilhada e duas composições: `BebelInicio` e
`BebelEncerramento`. Etapa atual: somente CTA. Miolo e outros formatos ficam para depois.

## Onde colocar os arquivos

```text
assets/cta/tarefas/
  001-afazer/
    001-inicio/001-nome-do-tema/
      1-audio.mp3
      2-video.mp4
      3-arte.png
    002-final/001-nome-do-tema/
      1-audio.mp3
      2-video.mp4
      3-arte.png
  002-desenvolvendo/
    001-inicio/
    002-final/
  003-gerados/
    001-inicio/
    002-final/
```

Crie o tema somente em afazer. Não precrie o mesmo tema nos outros estados.
O motor move a pasta inteira. O ID pode repetir entre início e final, mas não
dentro do mesmo tipo. Nome: pelo menos três dígitos + slug minúsculo sem espaços.
Os JSONs são gerados pelo motor/agente; o usuário entrega somente as três mídias.
Os arquivos soltos em assets são materiais preservados, não entram automaticamente na fila.

## Comandos reais

| Comando | Função |
| --- | --- |
| `npm run cta:doctor` | Verifica ambiente e conflitos da fila |
| `npm run cta:list` | Lista tarefas e registros |
| `npm run cta:process` | Uma varredura, desenvolvimento primeiro; prepara/renderiza o que tiver inspeção |
| `npm run cta:process -- --task 002-final/001-tema --retry` | Retoma uma tarefa após resolver um bloqueio |
| `npm run cta:prepare -- --task 002-final/001-tema` | Mede mídias e cria config; não inventa timing |
| `npm run cta:transcribe -- --task 002-final/001-tema` | Transcreve offline com palavras/timestamps e hash do áudio |
| `npm run cta:render -- --task 002-final/001-tema` | Renderiza após a inspeção das entradas |
| `npm run cta:validate -- --task 002-final/001-tema` | Valida técnica + evidência visual vinculada ao MP4 |
| `npm run cta:finish -- --task 002-final/001-tema` | Valida, promove MP4 e move para gerados |
| `npm run cta:reconcile` | Recupera journals e verifica movimentos manuais |
| `npm run cta:stage -- --task 002-final/001-tema` | Recria props/staging para Studio e imprime o comando |
| `npm run cta:test` | Testes isolados |
| `npm run lint` | ESLint e TypeScript |
| `npm run skills:check` | Valida as três skills locais |

Sem daemon: um prompt chama o agente, e o agente usa esses comandos. Um script
local não reconhece sozinho a semântica da fala ou a legibilidade da arte.
O transcritor já instalado foi realocado para `.cache/cta/{python,models}` e é
usado por `scripts/transcribe.py`. Não é lixo temporário. `doctor` verifica sua
disponibilidade; `CTA_PYTHON_EXECUTABLE` permite indicar outro Python compatível.
Não há download automático ou API paga. Transcrição é evidência auxiliar, sujeita
a erro: confira o convite e nunca trate uma frase diferente como CTA válido.
`--technical-only` em validate gera relatório parcial, nunca autoriza promoção.
`--root temp/<fixture>` permite testes isolados; não aceita outro projeto.

## Inspeção feita pelo agente

Após prepare, o agente preenche `config.json`, preservando os campos medidos.
`timing.ctaStartSeconds` e `inspection.ctaStartSeconds` devem coincidir. Exemplo
de formato (os valores devem ser medidos, não copiados entre tarefas):

```json
{
  "inputSignature": "assinatura produzida pelo prepare",
  "ctaStartSeconds": 1.5,
  "safeBottom": 650,
  "notes": "Descrição concreta dos quadros, arte, alpha e espaço disponível.",
  "inspectedVideoSeconds": [0, 2.5, 4.9],
  "narrationEvidence": "Convite identificado no áudio, método e intervalo observado.",
  "allowSlowVideo": false
}
```

Esse objeto fica em `config.inspection`. `safeBottom` é a menor coordenada Y
ocupada por cabelo/rosto/mãos/celular na região do CTA durante o trecho, já no
enquadramento final 1080x1920 (cover centralizado). A caixa alpha visível, deslocamento
da entrada e margem devem caber acima dela. Ausência de alpha é registrada;
não fingir transparência nem recortar o PNG para fabricá-la.

Vídeo e áudio podem ter durações diferentes. O áudio decodificado define
`ceil((audioSeconds + 0.5) * 30)` frames. O vídeo usa `min(1, videoSeconds/finalSeconds)`.
Rate abaixo de 0.5 depende de decisão explícita do usuário registrada pelo agente.
Desacelerar implica repetir amostras entre frames de origem conforme a cadência;
não há loop nem sustentação artificial do último quadro.

Para exibir quadros sem criar arquivos, invoque diretamente (stdout binário PNG):

```text
node --experimental-strip-types scripts/cta.ts frame --task 002-final/001-tema --source video --seconds 0
node --experimental-strip-types scripts/cta.ts frame --task 002-final/001-tema --source art
node --experimental-strip-types scripts/cta.ts frame --task 002-final/001-tema --source output --seconds 3
```

O agente deve capturar stdout e exibir via ferramenta de imagem em memória,
sem usar redirecionamento para JPG/PNG. Não usar `npm run` para capturar bytes:
o cabeçalho do npm contaminaria o pipe. Para inspecionar a saída, primeiro use
process ou validate --technical-only; `validation.json` informa todos os tempos.

Após conferir o MP4, o agente cria `visual-review.json` na tarefa:

```json
{
  "outputHash": "hash do MP4 temporário",
  "configSignature": "assinatura do render",
  "frameTimes": [0, 1.7333333333333334, 2, 2.1666666666666665, 4.3],
  "notes": "Evidências concretas de entrada suave, legibilidade, proporções, margens e CTA no último frame.",
  "passed": true
}
```

Os tempos acima são ilustrativos; use os de `validation.requiredVisualFrameTimes`.
Essa revisão é técnica do agente, não aprovação editorial. Sem acesso à imagem
ou narração, registre pendência; não preencha uma revisão fictícia.

## Persistência e resultado

Cada tarefa guarda originais, `manifest.json`, `config.json`, `validation.json`,
`visual-review.json`, registros de promoção/versões e `output/convertido-0001.mp4`.
Nova versão usa próximo número livre. Gerados não é reprocessado automaticamente;
para novo conteúdo, crie nova tarefa. Config e fontes são relativas à própria pasta.
O diretório runtime e public/generated são caches de render/Studio; o fluxo limpa
o cache do render concluído. Nunca adicione fontes específicas a brand/.
Alterações nos modelos orientam novas tarefas; tarefas preparadas mantêm seu
snapshot para reprodução. Mudanças de entradas invalidam a inspeção anterior.

Validação compara PCM por canal, correlação global e por trecho, ganho e cauda
silenciosa; verifica decode completo, streams, resolução, fps, pix_fmt, frames,
hashes e ausência de prévias na tarefa. A inspeção visual é vinculada ao hash e
configuração. Nenhuma tarefa é aprovada ou publicada automaticamente.

Lock exclusivo: `logs/cta.lock`. Um processo vivo bloqueia concorrência. Lock de
processo morto é recuperado com registro; lock ilegível exige inspeção. Journals
recuperam movimentos e promoção. Conflitos são reportados, nunca mesclados.

## Código, SDD e skills

- `factory/storage.ts`: caminhos, hashes, escrita atômica e exclusão mútua.
- `factory/media.ts`: FFmpeg/FFprobe e medição.
- `factory/cta/`: contratos, fila, preparação, render e validação.
- `src/scenes/BebelCtaScene.tsx`: vídeo mudo + áudio único + arte inteira animada.
- `brand/cta-*.json`: padrões compartilhados, um objeto por modelo.
- `.spec/`: estado e evidências da base atual.
- `.agents/skills/bebel-*`: SDD, contratos compartilhados e operação CTA.
- `prompts/processar-cta.md`: único prompt operacional.

A base anterior está isolada em `history/2026-10-12-reset`, fora de imports e
compilação. `moves.json` registra destinos de entregas/diagnósticos. O ZIP de
arquivos substituídos e seu inventário SHA256 permitem recuperação; não são
uma segunda implementação ativa. Materiais fornecidos em assets foram preservados.
