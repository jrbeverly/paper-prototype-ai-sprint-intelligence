function renderList(items) {
  if (!items?.length) return '_None identified._\n';
  return items.map(item => `- ${item}`).join('\n') + '\n';
}

function renderEngineeringSummary(data) {
  const sections = ['## Engineering Summary\n'];
  if (data.summary) sections.push(data.summary + '\n');
  if (data.decisions?.length) sections.push('### Key Decisions\n', renderList(data.decisions));
  if (data.completedWork?.length) sections.push('### Completed Work\n', renderList(data.completedWork));
  if (data.blockers?.length) sections.push('### Blockers\n', renderList(data.blockers));
  if (data.actionItems?.length) sections.push('### Action Items\n', renderList(data.actionItems));
  return sections.join('\n');
}

function renderArchitecturalDecisions(data) {
  const sections = ['## Architectural Decisions\n'];
  if (!data.decisions?.length) {
    sections.push('_None identified._\n');
    return sections.join('\n');
  }
  for (const d of data.decisions) {
    sections.push(`### ${d.decision}\n`);
    if (d.rationale) sections.push(`**Rationale:** ${d.rationale}\n`);
    if (d.alternatives) sections.push(`**Alternatives considered:** ${d.alternatives}\n`);
    sections.push('');
  }
  return sections.join('\n');
}

function renderBlockersAndRisks(data) {
  const sections = ['## Blockers & Risks\n'];
  sections.push('### Active Blockers\n', renderList(data.blockers));
  sections.push('### Risks\n', renderList(data.risks));
  return sections.join('\n');
}

function renderActionItems(data) {
  const sections = ['## Action Items\n'];
  if (!data.actionItems?.length) {
    sections.push('_None identified._\n');
    return sections.join('\n');
  }
  sections.push('| Priority | Action | Owner |');
  sections.push('| -------- | ------ | ----- |');
  for (const item of data.actionItems) {
    sections.push(`| ${item.priority} | ${item.action} | ${item.owner ?? '—'} |`);
  }
  sections.push('');
  return sections.join('\n');
}

const SKILL_RENDERERS = {
  'engineering-summary': renderEngineeringSummary,
  'architectural-decisions': renderArchitecturalDecisions,
  'blockers-and-risks': renderBlockersAndRisks,
  'action-items': renderActionItems,
};

export function renderMarkdown(analysis) {
  const sections = ['# Sprint Intelligence Report\n'];
  for (const [name, data] of Object.entries(analysis)) {
    const render = SKILL_RENDERERS[name];
    sections.push(render ? render(data) : `## ${name}\n\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\`\n`);
  }
  return sections.join('\n');
}
