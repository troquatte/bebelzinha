# Aprovação e agendamento no Postiz

Configuração compartilhada: `brand/publicacao.json`. Fuso: Brasília.

Todo vídeo/carrossel inclui legenda pronta; YouTube inclui descrição adaptada.
Por enquanto, textos públicos enviados ao Postiz não incluem links de referência.
Fontes verificadas e URLs de pesquisa ficam internamente no roteiro/metadados,
fora do texto copiado para publicação. Não inventar link nem chamada para conteúdo
no app: links reais da Bebel só entram após novo pedido/autorização do usuário.
Não reescrever posts antigos ou textos já aprovados automaticamente.

- `003-gerados`: vídeo ou carrossel entregue, aguardando a revisão do usuário.
- `004-aprovados`: versão aprovada pelo usuário; pode ser enviada/agendada.
- `005-postados`: publicação confirmada em todos os destinos daquela versão.

Sempre enviar aqui no chat a mídia final e a legenda/descrição para o usuário
assistir ou ler. O sinal combinado é “aprovei” para aquela versão; só depois mover
a pasta para aprovados e seguir com agendamento. Entregar não muda a aprovação.

Aprovar não significa publicar imediatamente. Após o usuário aprovar um ID/versão,
o agente executa `npm run cenas:approve -- --task ID --file output/convertido-NNNN.mp4 --format vertical`
(ou `horizontal`). A pasta inteira muda de estado, sem copiar o vídeo.
Não executar aprovação por elogio ambíguo ou por validação técnica. Se a versão
for alterada, precisa de nova revisão; não reaproveitar a aprovação do arquivo antigo.
Uma nova aprovação pode substituir a versão antes de qualquer envio. Após existir
ID remoto, resolver o agendamento anterior primeiro; não duplicar a publicação.

## Calendário e envio

Janela diária: 10h até 23h inclusive, no fuso America/Sao_Paulo. Ler o relógio
atual ao agendar e usar somente instantes futuros, após aprovação e upload pronto.
Não usar automaticamente 10h se já passou; começar no próximo horário viável
de hoje. Depois da janela ou sem espaço, seguir no próximo dia a partir de 10h.

Cada vídeo vertical vai para Instagram Reels e YouTube Shorts no mesmo instante,
com texto e configurações próprios. A hora de intervalo preferida é ENTRE VÍDEOS
DIFERENTES, nunca entre o Reel e o Short correspondentes, conforme confirmação
expressa do usuário. O par conta como UM conteúdo para o limite diário de 15.

Prioridade de envio: se aprovado/upload pronto, dentro da janela e do limite,
e não houve vídeo publicado hoje ou já passaram pelo menos 60 minutos desde
o último vídeo nas duas contas, publicar o par AGORA (`type: "now"`), em vez
de criar espera artificial ou arredondar para a próxima hora. Considerar o último
horário real de publicação quando disponível, não só o horário originalmente marcado.
Conferir também reservas futuras: um post agora não pode encostar no próximo vídeo.
Se as contas publicaram em momentos diferentes, usar a publicação mais recente
para calcular a espera. Sem intervalo disponível, usar o próximo instante elegível.
A redução até 30 minutos para lotes continua válida conforme a regra abaixo.
Essa prioridade vale para novos envios elegíveis; não recriar post já agendado
como `now`, nem duplicar uma entrega ou cancelar agendamentos automaticamente.

Curtos não têm mais slots fixos 10h/19h. Preferir intervalo de 60 minutos entre
conteúdos distintos; reduzir conforme o volume aprovado e a janela restante,
sempre preservando no mínimo 30 minutos. Recalcular horários futuros da nossa
fila quando ela crescer para acomodar até 15 no dia; não alterar publicados nem
posts manuais/de terceiros. Antes de alterar agendamentos nossos, consultar estado
remoto e usar operação de atualização, sem criar cópia. Se não houver capacidade
ou atualização segura disponível, manter o confirmado e levar o excedente a amanhã.
Contar publicados e agendados no limite, sem duplicar o mesmo conteúdo por plataforma.
Quinze é teto, não obrigação de criar/preencher com conteúdo sem aprovação.

Exemplos com calendário vazio e todo o lote aprovado/pronto antes do primeiro slot:
15 a partir de 10h podem usar 55 min até 22h50; a partir de 12h, 45 min até 22h30;
a partir de 16h, 30 min até 23h. A partir de 17h cabem 13 a cada 30 min até 23h;
os dois restantes seguem amanhã. Slots existentes e o relógio real alteram a conta.

Horizontal: testar dois vídeos/dia, em fila separada às 10h e 19h; com apenas um,
usar o primeiro slot futuro disponível. Nunca preencher 10h retroativamente;
depois de 19h usar o próximo dia. Esse limite não consome as 15 vagas de curtos.
TikTok não está incluído neste pedido.

Carrosséis: aprovação, janela 10h–23h, consulta ao calendário e passagem do excedente
para outro dia seguem a mesma lógica. Intervalos entre carrosséis preferencialmente
60 min, mínimo 30 min. Fila independente dos vídeos: um carrossel pode sair a 10 min
de um vídeo, sem precisar consumir/esperar o intervalo dos curtos. Limite diário de
carrosséis ainda não definido; a sugestão de 15 adicionais não foi confirmada.
Carrosséis usam as mesmas cinco pastas e IDs globais, com tipo identificado por
`carrossel.json`; nunca são enviados à fila de render/áudio dos vídeos.

## Criação e entrega de carrossel

Usar a skill `bebelsabetudo-carrossel-img`, a persona e referências compartilhadas.
Criar com `npm run cenas:new -- --theme "Tema" --kind carousel`. Consultar a memória
editorial global antes de escolher tema e registrar com cenas:remember; adaptação
autorizada referencia o original, sem se apresentar como ideia inédita.
Roteiro em `roteiro.md`; texto pronto em `legenda.md`; imagens finais numeradas em
`slides/01.png`, `slides/02.png` etc., na mesma pasta do ID. A ordem de publicação
é a lista explícita em `carrossel.json`: `schemaVersion: 1`, `type: "carousel"`,
`slides: ["slides/01.png", "slides/02.png", ...]`, `caption: "legenda.md"`.
Quantidade conforme conteúdo e limites reais consultados na integração; sem gerar
vídeo, narração ou slides apenas para preencher uma contagem fixa.

Depois de conferir imagens e texto, `npm run cenas:carousel-ready -- --task ID`
move para `003-gerados`, sem aprovar. Entregar a sequência completa e legenda para
revisão. Após aprovação explícita, `npm run cenas:approve -- --task ID --format carousel`
move para `004-aprovados` e vincula ordem, imagens e legenda aos hashes aprovados.
Alterar qualquer parte exige nova revisão; envios anteriores precisam ser resolvidos.
`cenas:publication` aceita `target: "instagram-carousel"` e só move para postados
com confirmação de publicação no Instagram. Não existe envio de carrossel ao Shorts.
Antes do primeiro envio, consultar schema real, validar quantidade/formato/proporção
das imagens e upload no Postiz. Suporte local testado não significa publicação remota
testada. Não migrar conteúdos históricos automaticamente.

Antes de agendar: listar contas conectadas e suas regras pelo MCP; confirmar
o canal Bebel correto e ler o calendário remoto, inclusive posts criados fora
da fábrica. Usar somente o MP4 aprovado, conferir seu hash, reaproveitar mídia
já enviada e registrar IDs retornados por destino em `publicacao.json` da tarefa.
Guardar a chave apenas em ambiente/configuração privada, nunca neste JSON.
Upload precisa ser validado na instalação; caminho local não é URL de mídia pública.

Após uma chamada incerta, consultar o Postiz antes de repetir. Se apenas um dos
destinos tiver sido agendado, conservar o ID e concluir somente o destino faltante
no mesmo horário. Se o horário já passou, resolver a divergência antes de enviar.
Falha ou cancelamento não é publicação. Nunca marcar como postado porque chegou a hora.

O agente salva um comprovante sanitizado da resposta/consulta remota e executa
`npm run cenas:publication -- --task ID --receipt temp/comprovante-postiz.json`.
Campos: `target`, `integrationId`, `postId`, `status` (`scheduled`, `published`, `failed`),
`scheduledAt`, `checkedAt`, e `publishedAt` somente quando o provedor informar o
instante real; `url` HTTPS opcional. Estado remoto PUBLISHED confirmado permite
mover para postados mesmo sem instante real exposto. Não copiar scheduledAt ou
checkedAt para publishedAt: agendamento e instante da consulta não são o instante
real da publicação.
Datas ISO com fuso; status local só reflete informação verificada no Postiz.
Não inventar comprovantes. Ambos os curtos precisam estar publicados para mover
a pasta a `005-postados`; sucesso parcial fica em `004-aprovados`.

O Postiz executa o calendário após o envio, mesmo com o computador desligado.
Esta alteração não instala watcher local nem reconciliador contínuo: o movimento
para postados ocorre quando o agente consultar os resultados e registrar os comprovantes.
Enquanto o MCP não estiver autenticado, a aprovação local funciona, mas não há envio.
Conexão atual autenticada: servidor `postiz`, endpoint `/api/mcp`, Instagram e
YouTube identificados em `brand/publicacao.json`. Upload do MP4 aprovado pela API
e agendamento duplo pelo MCP já foram verificados com consulta de confirmação
no calendário, sem post público de teste. Usar o schema real retornado:
`integrationSchedulePostTool`, e `postsListTool` para conferir IDs/horários/estados.
Arquivos locais usam `POST /api/public/v1/upload` multipart com nome único e hash;
`uploadFromUrlTool` não aceita um caminho local. Reutilizar a mídia enviada.

As memórias em `brand` preservam IDs/temas; caminhos antigos de entrega são
referências históricas. Localizar a produção pelo ID na fila atual após mudanças
de estado. Não apagar aprovados enquanto houver envio/publicação pendente.
