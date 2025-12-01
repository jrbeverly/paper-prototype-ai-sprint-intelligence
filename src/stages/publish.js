import { copyFile, mkdir } from 'node:fs/promises';
import { basename, join } from 'node:path';

const DOCS_DIR = 'docs';

export async function publish(ctx) {
  if (!ctx.outputPaths) return ctx;

  const date = new Date().toISOString().slice(0, 10);
  const stem = basename(ctx.outputPaths.md, '.md');
  await mkdir(DOCS_DIR, { recursive: true });

  const mdDest = join(DOCS_DIR, `${date}-${stem}.md`);
  const jsonDest = join(DOCS_DIR, `${date}-${stem}.json`);

  await copyFile(ctx.outputPaths.md, mdDest);
  await copyFile(ctx.outputPaths.json, jsonDest);

  console.log(`[publish] wrote ${mdDest}`);
  console.log(`[publish] wrote ${jsonDest}`);

  return { ...ctx, publishedPaths: { md: mdDest, json: jsonDest } };
}
