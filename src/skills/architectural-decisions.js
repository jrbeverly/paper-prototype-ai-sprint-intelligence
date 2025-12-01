const PROMPT = `You are an engineering intelligence assistant. Analyse this sprint review transcript and extract only the technical and architectural decisions made. Respond with a JSON object in exactly this format:
{
  "decisions": [
    { "decision": "<what was decided>", "rationale": "<why>", "alternatives": "<alternatives considered, or null>" }
  ]
}

Respond with only the JSON object and nothing else.`;

export const architecturalDecisions = {
  name: 'architectural-decisions',
  prompt: PROMPT,
  parse(raw) {
    const json = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    return JSON.parse(json);
  },
};
