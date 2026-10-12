import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
for (const name of ["bebel-fabrica-sdd", "bebel-fabrica-arquitetura", "bebel-cta"]) {
  const file = path.resolve(
    scriptDirectory,
    "../.agents/skills",
    name,
    "SKILL.md",
  );
  const content = fs.readFileSync(file, "utf8");
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(content);
  if (!match) throw new Error(`${name}: frontmatter ausente`);
  const frontmatter = yaml.load(match[1]);
  if (
    frontmatter.name !== name ||
    !/^[a-z0-9-]+$/.test(frontmatter.name) ||
    typeof frontmatter.description !== "string" ||
    !frontmatter.description.trim() ||
    frontmatter.description.length > 1024
  )
    throw new Error(`${name}: frontmatter inválido`);
  if (
    /\[TODO:/.test(content) ||
    content.slice(match[0].length).trim().length === 0
  )
    throw new Error(`${name}: instruções incompletas`);
  process.stdout.write(`${name}: YAML e instruções válidos\n`);
}
