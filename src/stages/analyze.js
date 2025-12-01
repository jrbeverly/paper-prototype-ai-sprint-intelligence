import { aiClient } from '../ai/client.js';
import { skills } from '../skills/index.js';

export async function analyze(ctx) {
  const transcript = ctx.normalizedTranscript ?? ctx.transcript;
  const input = ctx.supportingContext
    ? `${transcript}\n\n--- Supporting Context ---\n${ctx.supportingContext}`
    : transcript;

  const analysis = {};
  for (const skill of skills) {
    const raw = await aiClient.complete(skill.prompt, input);
    analysis[skill.name] = skill.parse(raw);
  }
  return { ...ctx, analysis };
}
