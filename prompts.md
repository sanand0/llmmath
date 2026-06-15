# Prompts

## Extend to newer models, 15 Jun 2026

<!--
cd ~/code/llmmath/
dev.sh
codex --yolo --model gpt-5.5 --config model_reasoning_effort=medium
-->

Extend this repo to newer models.

First, check if you're able to add a relatively new model using OpenRouter (see .env for API key) and run it via PromptFoo.

If yes, then suggest which models to include in this list so that (a) I don't incur too much cost, and (b) I can cover a reasonable range of models introduced since when I last updated it.

Based on your suggestions (with reason), I will pick models for you to extend the repo to.

---

Upgrade promptfoo to a later version that works well with Node 26 - if the YAML will still be compatible.

Update the YAML to fix the JavaScript number parsing by converting it to a string.

Extend to include these models:

deepseek/deepseek-v4-flash
openai/gpt-5.4-nano
openai/gpt-5.4-mini
openai/gpt-5.5
google/gemini-3-flash-preview-20251217
google/gemini-3.1-flash-lite
google/gemini-3.1-pro-preview-20260219
google/gemini-3.5-flash-20260519
anthropic/claude-haiku-4.5
anthropic/claude-sonnet-4.6
anthropic/claude-opus-4.8
x-ai/grok-4.3
qwen/qwen3.7-plus
mistralai/mistral-small-2603
amazon/nova-2-lite-v1

Make sure that multiplication.json is updated with the results for these models.

Note: Ideally, I do NOT want to re-run the evals for models that are already tested.
Restructure minimally and elegantly so that new models can be added and tested without having to re-run the evals for existing models.
Test with a few cheap models first, verifying that multiplication.json is updated, to confirm that the process works, before running for all the models.

---

Update the summary in index.html to reflect what's changed. Make sure that this is clearly delineated as an update dated today (and add the date for the earlier summary).

Commit and push.

--- <!-- steering -->

Include the date as a column in the table and allow sorting the table in index.html.

--- <!-- steering -->

Document how to add new models in the future in README.md - and how it runs (what's updated, what's unchanged, etc.)

<!-- codex resume 019eca9e-1220-76c3-a0b5-c81bcce81760 --yolo -->
