import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const html = await readFile(join(root, 'src/app/modules/products/components/products-emotional.component.html'), 'utf8');
const component = await readFile(join(root, 'src/app/modules/products/components/products-emotional.component.ts'), 'utf8');
const routes = await readFile(join(root, 'src/app/app.routes.ts'), 'utf8');
const seo = JSON.parse(await readFile(join(root, 'src/app/core/seo.config.json'), 'utf8'));

for (const asset of [
  'public/images/products/refeicao-resolvida/escolha.webp',
  'public/images/products/refeicao-resolvida/porcoes.webp',
  'public/images/products/refeicao-resolvida/preparo.webp',
  'public/images/products/refeicao-resolvida/compras.webp',
  'public/videos/products/refeicao-resolvida-vsl-v1.mp4',
  'public/videos/products/refeicao-resolvida-vsl-poster-v2.webp',
  'public/images/bebel/bebel-roxa.jpg',
  'public/images/recipes/frango-arroz-cenoura-v1.webp',
  'public/images/recipes/carne-moida-batata-arroz-v1.webp',
  'public/images/recipes/macarrao-bolonhesa-v1.webp',
  'public/images/recipes/omelete-tomate-queijo-arroz-v1.webp',
]) await access(join(root, asset));

for (const literal of ['O jantar não precisa ser mais uma preocupação', 'Quero uma preocupação a menos', 'Veja exatamente o que você recebe', 'Como vou receber meu acesso?', 'checkoutUrl', 'ProductCheckoutClick', 'ProductVideoPlay']) {
  assert.ok((html + component).includes(literal), `Texto ou evento ausente: ${literal}`);
}
assert.ok(routes.includes('ProductsEmotionalComponent'), 'A página principal não aponta para a nova versão');
for (const v of ['teste-a', 'teste-b', 'sem-delivery']) assert.ok(routes.includes(`/refeicao-resolvida/${v}`), `Variante não preservada: ${v}`);
const main = seo.shells.find(item => item.path === '/produtos/refeicao-resolvida');
assert.ok(main?.indexable, 'Página comercial principal não indexável');
assert.ok(main.title.includes('Uma preocupação a menos'), 'SEO da oferta não foi atualizado');
assert.ok(component.includes('sck=bebel-alivio-v3'), 'SCK para atribuição não está configurado');
assert.ok(!html.includes('depósitos reais de clientes') && !html.includes('Últimas vagas'), 'Promessa não permitida');
console.log('OK: Página de vendas emocional; imagens, vídeo, variantes antigas, SEO e rastreamento básicos encontrados.');
console.log('Atenção: verificação estática. Rodar npm ci, npm run build e testar na Hotmart no ambiente adequado.');
