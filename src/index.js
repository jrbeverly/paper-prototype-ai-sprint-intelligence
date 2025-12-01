import { runPipeline } from './pipeline.js';
import { ingest } from './stages/ingest.js';
import { normalize } from './stages/normalize.js';
import { enrich } from './stages/enrich.js';
import { analyze } from './stages/analyze.js';
import { extract } from './stages/extract.js';
import { publish } from './stages/publish.js';

const [inputPath = 'fixtures/sample-sprint-review.vtt', ...contextPaths] = process.argv.slice(2);

console.log(`[pipeline] input: ${inputPath}`);
if (contextPaths.length > 0) {
  console.log(`[pipeline] context: ${contextPaths.join(', ')}`);
}

const ctx = await runPipeline(
  [ingest, normalize, enrich, analyze, extract, publish],
  { inputPath, contextPaths, results: {} },
);

console.log('[pipeline] complete');
if (ctx.outputPaths) {
  console.log(`\n--- outputs ---`);
  console.log(`  markdown: ${ctx.outputPaths.md}`);
  console.log(`  json:     ${ctx.outputPaths.json}`);
}
if (ctx.publishedPaths) {
  console.log(`\n--- published ---`);
  console.log(`  markdown: ${ctx.publishedPaths.md}`);
  console.log(`  json:     ${ctx.publishedPaths.json}`);
}
