import Anthropic from '@anthropic-ai/sdk';

export function createClaudeClient() {
  const anthropic = new Anthropic();
  const model = process.env.ANTHROPIC_MODEL ?? 'claude-opus-4-8';

  return {
    async complete(prompt, text) {
      const message = await anthropic.messages.create({
        model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: `${prompt}\n\n${text}` }],
      });
      const block = message.content[0];
      return block?.type === 'text' ? block.text : '';
    },
  };
}
