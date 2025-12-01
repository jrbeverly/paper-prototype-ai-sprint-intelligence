export async function runPipeline(stages, ctx) {
  for (const stage of stages) {
    console.log(`[pipeline] stage: ${stage.name}`);
    ctx = await stage(ctx);
  }
  return ctx;
}
