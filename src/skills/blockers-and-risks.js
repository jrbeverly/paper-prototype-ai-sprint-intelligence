const PROMPT = `You are an engineering intelligence assistant. Analyse this sprint review transcript and extract only the blockers and risks mentioned or implied. Respond with a JSON object in exactly this format:
{
  "blockers": ["<active blocker preventing progress>", ...],
  "risks": ["<potential future risk or concern>", ...]
}

Respond with only the JSON object and nothing else.`;

export const blockersAndRisks = {
  name: 'blockers-and-risks',
  prompt: PROMPT,
  parse(raw) {
    const json = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    return JSON.parse(json);
  },
};
