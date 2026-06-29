import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const file = join(
  process.cwd(),
  "node_modules/nf3/dist/_chunks/trace.mjs"
);

if (existsSync(file)) {
  let content = readFileSync(file, "utf8");
  const badImport = 'import { nodeFileTrace } from "@vercel/nft";';
  const goodImport =
    'import __nft from "@vercel/nft"; const { nodeFileTrace } = __nft;';

  if (content.includes(badImport)) {
    content = content.replace(badImport, goodImport);
    writeFileSync(file, content, "utf8");
    console.log("[patch] Fixed @vercel/nft CJS import in nf3");
  }
}
