const PROMPT = `You are an engineering intelligence assistant. Analyse this sprint review transcript and respond with a JSON object in exactly this format:
{
  "summary": "<2-4 sentence engineering summary of what was accomplished>",
  "decisions": ["<key architectural or process decision>", ...],
  "completedWork": ["<completed work item>", ...],
  "blockers": ["<blocker or risk>", ...],
  "actionItems": ["<action item>", ...]
}

Respond with only the JSON object and nothing else.`;

export const engineeringSummary = {
  name: 'engineering-summary',
  prompt: PROMPT,
  parse(raw) {
    const json = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    return JSON.parse(json);
  },
};
