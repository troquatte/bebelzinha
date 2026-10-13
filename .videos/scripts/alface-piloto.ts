import {copyFileSync, existsSync, mkdirSync, readFileSync, renameSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {browserExecutable, execute, probe, validateMetadata} from '../factory/media.ts';

const root=resolve(import.meta.dirname,'..');
const task='assets/cenas/tarefas/003-gerados/008-alface-murchando-no-pote-3-cuidados-antes-de-guardar';
const cta='assets/cta/tarefas/003-gerados/002-final/001-cta-dicas-da-bebel';
const assets={
  'cozinha.mp4':'assets/cenario/fundo-video.mp4',
  'aberto.png':'assets/itens/pote-alface-papel-toalha-aberto.png',
  'fechado.png':'assets/itens/pote-alface-papel-toalha-fechado.png',
  'bebel.png':'assets/personagem/bebel-apontando.png',
  'bebel-olhando.png':'assets/personagem/bebel-olhando.png',
  'audio.mp3':`${task}/audio.mp3`,
  'roboto.ttf':'assets/fontes/roboto.ttf',
  'cta.mp4':`${cta}/output/convertido-0001.mp4`,
  'cta-audio.mp3':`${cta}/1-audio.mp3`,
};
const hash=(file:string)=>createHash('sha256').update(readFileSync(resolve(root,file))).digest('hex');
const before=Object.values(assets).map(hash);
const staging=resolve(root,'public/generated/alface-piloto');
mkdirSync(staging,{recursive:true});
for(const [name,source] of Object.entries(assets)) copyFileSync(resolve(root,source),resolve(staging,name));
const data=JSON.parse(readFileSync(resolve(root,'src/data/alface-piloto.json'),'utf8'));
const frames=data.shots.reduce((sum:number,s:{start:number;end:number})=>sum+Math.ceil((s.end-s.start)/data.speed*30),0)+Math.round(data.ctaSeconds*30);
const output=resolve(root,task,'output');
mkdirSync(output,{recursive:true});
let n=1;
while(existsSync(resolve(output,`convertido-${String(n).padStart(4,'0')}.mp4`))) n++;
const dest=resolve(output,`convertido-${String(n).padStart(4,'0')}.mp4`);
const temp=resolve(output,`.piloto-${Date.now()}.mp4`);
const browser=browserExecutable();
execute(process.execPath,[resolve(root,'node_modules/@remotion/cli/remotion-cli.js'),'render','src/index.ts','BebelAlfacePiloto',temp,
  '--codec=h264','--audio-codec=aac','--pixel-format=yuv420p','--color-space=bt709','--crf=18','--concurrency=2','--overwrite=false','--log=error',
  ...(browser?[`--browser-executable=${browser}`]:[])],root);
validateMetadata(probe(temp),frames);
if(Object.values(assets).some((file,i)=>hash(file)!==before[i])) throw new Error('Original mudou durante render; resultado não promovido');
if(existsSync(dest)) throw new Error('Destino ocupado; preservado');
renameSync(temp,dest);
console.log(JSON.stringify({file:dest,frames,seconds:frames/30,validation:'1080x1920, 30fps, H.264 yuv420p + AAC; originais preservados'}));
