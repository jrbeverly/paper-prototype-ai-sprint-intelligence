SAMPLE  := fixtures/sample-sprint-review.vtt
CONTEXT := fixtures/project-context.md

## run: Run the pipeline against the sample transcript
.PHONY: run
run:
	node src/index.js $(SAMPLE)

## run-with-context: Run the pipeline with supplementary context to demonstrate enriched output
.PHONY: run-with-context
run-with-context:
	node src/index.js $(SAMPLE) $(CONTEXT)
