function isVtt(transcript, ext) {
  return ext === '.vtt' || transcript.trimStart().startsWith('WEBVTT');
}

function parseVtt(raw) {
  const textLines = [];
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed === 'WEBVTT') continue;
    if (/^\d+$/.test(trimmed)) continue;
    if (trimmed.includes('-->')) continue;
    if (/^(NOTE|STYLE|REGION)(\s|$)/.test(trimmed)) continue;
    textLines.push(trimmed);
  }
  return textLines.join('\n');
}

export async function normalize(ctx) {
  const { transcript, inputExt } = ctx;
  const normalizedTranscript = isVtt(transcript, inputExt)
    ? parseVtt(transcript)
    : transcript.trim();
  return { ...ctx, normalizedTranscript };
}
