import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

export async function ingest(ctx) {
  const transcript = await readFile(ctx.inputPath, 'utf-8');
  const inputExt = extname(ctx.inputPath).toLowerCase();
  return { ...ctx, transcript, inputExt };
}
