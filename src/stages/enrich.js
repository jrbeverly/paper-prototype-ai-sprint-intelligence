import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';

const MAX_CHARS_PER_FILE = 8000;

export async function enrich(ctx) {
  const { contextPaths = [] } = ctx;
  if (contextPaths.length === 0) return ctx;

  const sections = await Promise.all(
    contextPaths.map(async (filePath) => {
      let content = await readFile(filePath, 'utf-8');
      if (content.length > MAX_CHARS_PER_FILE) {
        console.warn(`[enrich] ${basename(filePath)}: truncated to ${MAX_CHARS_PER_FILE} chars`);
        content = content.slice(0, MAX_CHARS_PER_FILE);
      }
      return `=== ${basename(filePath)} ===\n${content.trim()}`;
    }),
  );

  const supportingContext = sections.join('\n\n');
  console.log(`[enrich] loaded ${contextPaths.length} context file(s)`);
  return { ...ctx, supportingContext };
}
