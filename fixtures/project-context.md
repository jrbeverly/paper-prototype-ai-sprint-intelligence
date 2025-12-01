# Project: AI Sprint Intelligence Pipeline

## Overview

An automated pipeline that ingests sprint review recordings and transcripts,
runs multiple AI analysis passes over them, and publishes structured summaries
to team knowledge bases. Each pipeline stage operates on a shared context
object and returns an enriched version of it.

---

## Sprint 22 Summary (Previous Sprint)

### Completed

- Bootstrapped project repository, CI, and devcontainer
- Established sequential pipeline architecture with a shared context object
- Normalisation stage strips VTT timestamps and speaker labels before AI analysis

### Architectural Decisions (Sprint 22)

- **ADR-001 (PENDING):** Document the stage interface contract — deferred from
  sprint 22; Carol is the owner
- **ADR-002 (ACCEPTED):** Normalise all input formats to plain text before
  passing to AI — reduces prompt complexity and decouples format parsing from
  analysis

### Open Backlog Items Entering Sprint 23

| ID       | Title                                          | Owner | Priority |
|----------|------------------------------------------------|-------|----------|
| TASK-041 | Document the stage interface contract          | Carol | Medium   |
| TASK-042 | Add transcript chunking for long meetings      | TBD   | High     |
| TASK-043 | Investigate parallel AI calls for batch runs   | Bob   | Medium   |
| TASK-044 | Add token-limit validation before AI call      | TBD   | High     |

### Known Technical Risks

- Transcripts longer than ~8 000 tokens will silently exceed the AI API limit
- No retry or error handling on AI API failures
- All API calls are synchronous; batch throughput will be poor at scale
