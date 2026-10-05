# 041-padronizar-cards-de-dica

## Objetivo

Corrigir inconsistências visuais dos blocos de dica e aviso, especialmente o disclosure de afiliados em desktop/mobile.

## Critérios de aceite

- [x] Aviso de afiliados usa ícone + conteúdo agrupado.
- [x] Aviso de afiliados possui título visual de contexto.
- [x] Dica de Compras usa o mesmo padrão compartilhado.
- [x] Dica da Home usa o mesmo padrão compartilhado.
- [x] Texto quebra naturalmente no mobile sem desalinhamento do ícone.
- [x] Ícone mantém tamanho fixo e não comprime o texto.
- [x] Conteúdo textual usa min-width 0 para evitar overflow.
- [x] Texto legal de afiliados permanece intacto.
- [x] Nenhuma dependência nova é adicionada.
- [~] Build Angular validado pelo CI.
- [ ] Entrega publicada em main.
- [ ] main e development equalizadas.


## Evidências de implementação

- `bebel-note-card` criado em `src/styles.scss`;
- aviso de afiliados, dica de Compras e dica da Home usam a mesma estrutura;
- ícone usa coluna fixa de 2rem e conteúdo usa `min-width: 0`;
- disclosure de afiliados preservado integralmente;
- aguardando CI.
