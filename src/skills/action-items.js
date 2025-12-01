const PROMPT = `You are an engineering intelligence assistant. Analyse this sprint review transcript and extract only the follow-up action items. Respond with a JSON object in exactly this format:
{
  "actionItems": [
    { "action": "<what needs to be done>", "owner": "<person or team responsible, or null>", "priority": "<high|medium|low>" }
  ]
}

Respond with only the JSON object and nothing else.`;

export const actionItems = {
  name: 'action-items',
  prompt: PROMPT,
  parse(raw) {
    const json = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    return JSON.parse(json);
  },
};
