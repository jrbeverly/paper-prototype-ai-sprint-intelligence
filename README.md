# AI Sprint Intelligence Pipeline

> [!WARNING]
> **AI-authored:** This change was autonomously planned and implemented by an AI software factory from a human-authored specification, with possible subsequent human review or modification.

> [!WARNING]
> This experiment is effectively abandoned. The generated material is retained primarily as a research artifact.

An early prototype of the concept of transforming unstructured sprint-review transcripts into structured organisational knowledge. Feed it a VTT recording or plain-text transcript; multiple AI analysis passes produce a published markdown report and machine-readable JSON covering engineering summaries, architectural decisions, blockers, and action items.

```sh
npm install
make run-with-context
```

This single command runs all six stages in sequence:

```
ingest → normalize → enrich → analyze → extract → publish
```
