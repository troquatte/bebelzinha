# Produtos da Bebel e acesso por código

## Pedido e escopo

28/10/2026. Menu no app leva à apresentação do Refeição Resolvida. Pessoa conhece, pode abrir checkout em outra aba ou escolher já comprei e informar código. Sem backend ou consulta real à Hotmart nesta etapa. Autorizados pelo usuário: código inventado de 6 dígitos e checkout placeholder # com target blank. Código de demonstração 482719.

## Fluxo

Menu desktop/mobile Produtos → /produtos → /produtos/refeicao-resolvida → comprar ou /produtos/refeicao-resolvida/acessar → /jantar-resolvido. A rota antiga continua válida, agora com barreira local que preserva dia válido da URL. Compras e receitas gratuitas mantêm acesso normal. Entrada produtos não exige onboarding. Retorno às refeições liberadas pelo mesmo menu. Acesso e progresso são separados, sem apagar compras/checklists.

## Limites explícitos

Código compartilhado confere apenas no cliente, com hash público e estado local; não é autenticação segura nem proteção contra extração de conteúdo. Não confirma pagamento, comprador, validade, reembolso ou revogação. Não enviar código para analytics, URL ou log. Código é demonstração pública, deve ser substituído antes de qualquer distribuição real. Checkout # abre nova aba conforme pedido, com aviso de prévia. Nenhum pagamento, upload ou publicação será realizado.

## Conteúdo e UX

Brand-copywriter aplicado com AIDA (principal): dúvida do almoço/jantar → mecanismo de uso → benefícios concretos → comprar. Alternativa BAB: antes, receitas soltas; depois, escolha e compras juntas; ponte, 22 refeições no app. Principal implementada por explicar com menos texto a visita vinda do app. Versão alternativa de título: Escolha a refeição. Leve a lista. Prepare com a Bebel. Não anunciar receitas testadas, vídeos concluídos, tempo de 30 minutos ou congelamento universal. Fotos existentes ilustrativas por IA. Página usa tokens existentes, navegação com quatro itens e superfícies creme/roxo.

## Validação prevista

Compilação; visita sem código; código vazio/incorreto/correto; retorno após recarregar; preservação de dia da URL; navegação desktop/mobile e verificação de link externo placeholder sem pagamento.


## Verificação executada

Compilação Angular aprovada. Navegador: rota direta /jantar-resolvido?dia=17 redirecionou ao acesso preservando dia; envio vazio e 000000 mostraram erros; 482719 abriu Dia 17; reload manteve acesso e dia; link de retorno abriu apresentação; menu desktop e quatro itens mobile conferidos; largura 390 px sem overflow lateral. Apresentação mostrou Continuar minhas refeições depois da liberação. Checkout placeholder confirmado no config e template com target _blank e rel noopener noreferrer; sem tentativa de pagamento. Código usado apenas para testar liberação local, não compra Hotmart.
