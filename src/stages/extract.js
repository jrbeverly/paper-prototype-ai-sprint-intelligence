import { mkdir, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { renderMarkdown } from '../output/markdown.js';

export async function extract(ctx) {
  if (!ctx.analysis) return ctx;

  const stem = basename(ctx.inputPath, extname(ctx.inputPath));
  const outDir = 'output';
  await mkdir(outDir, { recursive: true });

  const mdPath = join(outDir, `${stem}.md`);
  const jsonPath = join(outDir, `${stem}.json`);

  await writeFile(mdPath, renderMarkdown(ctx.analysis), 'utf8');
  await writeFile(jsonPath, JSON.stringify(ctx.analysis, null, 2) + '\n', 'utf8');

  console.log(`[extract] wrote ${mdPath}`);
  console.log(`[extract] wrote ${jsonPath}`);

  return { ...ctx, outputPaths: { md: mdPath, json: jsonPath } };
}
