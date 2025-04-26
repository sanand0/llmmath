# Can LLMs do mental math?

I asked 50 LLMs to multiple 2 numbers:

1. 12 x 12
2. 123 x 456
3. 1,234 x 5,678
4. 12,345 x 6,789
5. 123,456 x 789,012
6. 1,234,567 x 8,901,234
7. 987,654,321 x 123,456,789

LLMs aren't good tools for math and this is just an informal check. But the results are interesting:

| Model                                    | %Win | Q1  | Q2  | Q3  | Q4  | Q4  | Q6  | Q7  |
| ---------------------------------------- | ---- | --- | --- | --- | --- | --- | --- | --- |
| openai:o3                                | 86%  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  |
| openrouter:openai/o1-mini                | 86%  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  |
| openrouter:openai/o3-mini-high           | 86%  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  |
| openrouter:openai/o4-mini                | 86%  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  |
| openrouter:openai/o4-mini-high           | 86%  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  |
| deepseek/deepseek-chat-v3-0324           | 71%  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  |
| openai/gpt-4.1-mini                      | 71%  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  |
| openai/gpt-4.5-preview                   | 71%  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  |
| openai/gpt-4o                            | 71%  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  |
| openrouter:openai/o3-mini                | 71%  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  |
| anthropic/claude-3-opus                  | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| anthropic/claude-3.5-haiku               | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| anthropic/claude-3.7-sonnet:thinking     | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| google/gemini-2.0-flash-001              | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| google/gemini-2.0-flash-lite-001         | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| google/gemini-2.5-flash-preview          | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| google/gemini-2.5-flash-preview:thinking | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| google/gemini-2.5-pro-preview-03-25      | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| google/gemini-flash-1.5                  | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| google/gemini-pro-1.5                    | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| google/gemma-3-12b-it                    | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| google/gemma-3-27b-it                    | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| meta-llama/llama-4-maverick              | 57%  | ✅  | ✅  | ✅  | ❌  | ✅  | ❌  | ❌  |
| meta-llama/llama-4-scout                 | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| openai/gpt-4-turbo                       | 57%  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  |
| openai/gpt-4.1                           | 57%  | ✅  | ✅  | ✅  | ❌  | ✅  | ❌  | ❌  |
| amazon/nova-lite-v1                      | 43%  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  |
| amazon/nova-pro-v1                       | 43%  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  |
| anthropic/claude-3-haiku                 | 43%  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  |
| anthropic/claude-3.5-sonnet              | 43%  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  |
| meta-llama/llama-3.1-405b-instruct       | 43%  | ✅  | ✅  | ❌  | ✅  | ❌  | ❌  | ❌  |
| meta-llama/llama-3.1-70b-instruct        | 43%  | ✅  | ✅  | ❌  | ✅  | ❌  | ❌  | ❌  |
| meta-llama/llama-3.2-3b-instruct         | 43%  | ✅  | ✅  | ❌  | ✅  | ❌  | ❌  | ❌  |
| meta-llama/llama-3.3-70b-instruct        | 43%  | ✅  | ✅  | ❌  | ✅  | ❌  | ❌  | ❌  |
| openai/gpt-4.1-nano                      | 43%  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  |
| openai/gpt-4o-mini                       | 43%  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  |
| qwen/qwen-2-72b-instruct                 | 43%  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  |
| anthropic/claude-3-sonnet                | 29%  | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  | ❌  |
| deepseek/deepseek-r1                     | 29%  | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  | ❌  |
| google/gemini-flash-1.5-8b               | 29%  | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  | ❌  |
| google/gemma-3-4b-it                     | 29%  | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  | ❌  |
| meta-llama/llama-3-8b-instruct           | 29%  | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  | ❌  |
| meta-llama/llama-3.1-8b-instruct         | 29%  | ✅  | ❌  | ❌  | ✅  | ❌  | ❌  | ❌  |
| openai/gpt-3.5-turbo                     | 29%  | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  | ❌  |
| amazon/nova-micro-v1                     | 14%  | ✅  | ❌  | ❌  | ❌  | ❌  | ❌  | ❌  |
| meta-llama/llama-2-13b-chat              | 14%  | ✅  | ❌  | ❌  | ❌  | ❌  | ❌  | ❌  |
| meta-llama/llama-3-70b-instruct          | 14%  | ✅  | ❌  | ❌  | ❌  | ❌  | ❌  | ❌  |
| meta-llama/llama-3.2-1b-instruct         | 14%  | ✅  | ❌  | ❌  | ❌  | ❌  | ❌  | ❌  |
| google/gemma-3-1b-it:free                | 0%   | ❌  | ❌  | ❌  | ❌  | ❌  | ❌  | ❌  |
| meta-llama/llama-2-70b-chat              | 0%   | ❌  | ❌  | -   | -   | ❌  | ❌  | ❌  |
| Average                                  |      | 96% | 86% | 66% | 58% | 24% | 10% | 0%  |

**OpenAI's reasoning models cracked it, scoring 6/7, stumbling only on the 9-digit multiplication.**

- [openai/o1-mini](https://openrouter.ai/openai/o1-mini)
- [openai/o3](https://openrouter.ai/openai/o3)
- [openai/o3-mini-high](https://openrouter.ai/openai/o3-mini-high)
- [openai/o4-mini](https://openrouter.ai/openai/o4-mini)
- [openai/o4-mini-high](https://openrouter.ai/openai/o4-mini-high)

<details>
<summary>Models use human-like mental math tricks. For example, O3-Mini-High calculated 1234567 × 8901234 using a recursive strategy. (👆 Click for details)</summary>

```
To calculate 1234567 × 8901234, one useful method is to break the second number into two parts:

  8901234 = 8900000 + 1234

Then the product becomes:
  1234567 × 8901234 = 1234567 × 8900000 + 1234567 × 1234

Step 1. Compute 1234567 × 8900000:
  Notice that 8900000 = 89 × 100000. So first compute 1234567 × 89.
  Since 89 = 90 – 1, we have:
    1234567 × 89 = 1234567 × 90 – 1234567
      1234567 × 90 = 1234567 × 9 × 10 = 11111103 × 10 = 111111030
      Thus, 111111030 – 1234567 = 109876463.
  Now multiply by 100000:
    109876463 × 100000 = 10987646300000

Step 2. Compute 1234567 × 1234:
  Break 1234 into parts:
    1234 = 1000 + 200 + 30 + 4
  Now multiply each and add:
    1234567 × 1000 = 1234567000
    1234567 × 200 = 246913400
    1234567 × 30 = 37037010
    1234567 × 4 = 4938268
  Add these together:
    1234567000 + 246913400 = 1481480400
    1481480400 + 37037010 = 1518517410
    1518517410 + 4938268 = 1523455678

Step 3. Add both products:
  10987646300000 + 1523455678 = 10989169755678

Thus, the product of 1234567 and 8901234 is

10989169755678
```

</details>

**OpenAI's other models and DeepSeek V3 were next, getting the first 5/7 right.** Notably: GPT 4.1 Mini beat GPT 4.1. DeepSeek V3 beat DeepSeek R1.

- [deepseek/deepseek-chat-v3-0324](https://openrouter.ai/deepseek/deepseek-chat-v3-0324)
- [openai/gpt-4.1-mini](https://openrouter.ai/openai/gpt-4.1-mini)
- [openai/gpt-4.5-preview](https://openrouter.ai/openai/gpt-4.5-preview)
- [openai/gpt-4o](https://openrouter.ai/openai/gpt-4o)
- [openai/o3-mini](https://openrouter.ai/openai/o3-mini)


<details>

<summary>DeepSeek V3 double-checks results and hallucinates a "reliable computational tool". (👆 Click for details)</summary>

```tex
To calculate \(1234567 \times 8901234\), let's break it down using the **distributive property of multiplication over addition**:

1. **Express 8901234 as \(9000000 - 98766\)**:
   \[
   8901234 = 9000000 - 98766
   \]

2. **Multiply 1234567 by each part**:
   \[
   1234567 \times 9000000 = 1234567 \times 9 \times 10^6 = 11111103000000
   \]
   \[
   1234567 \times 98766 = 1234567 \times (100000 - 12234) = 123456700000 - 15095721278 = 108360978722
   \]

   *Note*: Further breakdown of \(1234567 \times 12234\) was calculated separately and subtracted here.

3. **Combine the results**:
   \[
   11111103000000 - 108360978722 = 1020274222278
   \]

However, upon re-evaluating the multiplication directly for accuracy (without the breakdown steps which introduced an error):

\[
1234567 \times 8901234 = 10989343694778
\]

But correcting the previous breakdown:

1. **Express 8901234 as \(9000000 - 98766\)**:
   \[
   1234567 \times 9000000 = 11111103000000
   \]
   \[
   1234567 \times 98766 = 1234567 \times 90000 + 1234567 \times 8000 + 1234567 \times 700 + 1234567 \times 60 + 1234567 \times 6
   \]
   \[
   = 111111030000 + 9877653600 + 864196900 + 74074020 + 7407402 = 121616470922
   \]

2. **Combine the results**:
   \[
   11111103000000 - 121616470922 = 1098934369078
   \]

It appears there was an inconsistency in the intermediate steps. For precision, let's verify with another method:

**Using the standard multiplication method**:

\[
1234567 \times 8901234
\]

Calculating each part:
\[
1234567 \times 8000000 = 9877653600000
\]
\[
1234567 \times 900000 = 1111110300000
\]
\[
1234567 \times 100 = 123456700
\]
\[
1234567 \times 200 = 246913400
\]
\[
1234567 \times 30 = 37037010
\]
\[
1234567 \times 4 = 4938268
\]

Adding them together:
\[
9877653600000 + 1111110300000 = 10988763900000
\]
\[
10988763900000 + 123456700 = 10988887356700
\]
\[
10988887356700 + 246913400 = 10989134270100
\]
\[
10989134270100 + 37037010 = 10989171307110
\]
\[
10989171307110 + 4938268 = 10989176245378
\]

However, this seems to have a slight discrepancy compared to the verified result. Upon cross-checking with a reliable computational tool:

**Final Accurate Calculation**:

\[
1234567 \times 8901234 = 10989343694778
\]

But to ensure correctness, let's verify step-by-step with another approach:

**Breakdown of 8901234**:

\[
8901234 = 8000000 + 900000 + 100 + 200 + 30 + 4
\]

Now, multiply each by 1234567:

\[
1234567 \times 8000000 = 9877653600000
\]
\[
1234567 \times 900000 = 1111110300000
\]
\[
1234567 \times 100 = 123456700
\]
\[
1234567 \times 200 = 246913400
\]
\[
1234567 \times 30 = 37037010
\]
\[
1234567 \times 4 = 4938268
\]

Adding these up:

\[
9877653600000 + 1111110300000 = 10988763900000
\]
\[
10988763900000 + 123456700 = 10988887356700
\]
\[
10988887356700 + 246913400 = 109891342
```

</details>

<details>
<summary>O3 Mini reframes 8901234 as (9000000 − 98766) to simplify the calculation. (👆 Click for details)</summary>

```
To calculate 1234567 times 8901234, follow these steps:

1. Express 8901234 as 9000000 − 98766.
  So, 1234567 × 8901234 = 1234567 × 9000000 − 1234567 × 98766.

2. Calculate the first part:
  1234567 × 9000000 = 1234567 × 9 × 1000000.
  Since 1234567 × 9 = 11111103,
  it becomes 11111103 × 1000000 = 11111103000000.

3. Calculate the second part:
  Write 98766 as 100000 − 234.
  Then, 1234567 × 98766 = 1234567 × 100000 − 1234567 × 234.
  • 1234567 × 100000 = 123456700000.
  • To compute 1234567 × 234, break it into:
   – 1234567 × 200 = 246913400
   – 1234567 × 34 = (1234567 × 30) + (1234567 × 4)
    ○ 1234567 × 30 = 37037010
    ○ 1234567 × 4 = 4938268
    – Sum: 37037010 + 4938268 = 41975278
   Then, 1234567 × 234 = 246913400 + 41975278 = 288888678.
  Thus, 1234567 × 98766 = 123456700000 − 288888678 = 123167811322.

4. Now, subtract the second part from the first part:
  11111103000000 − 123167811322 = 10987935188678.

So, 1234567 times 8901234 equals 10987935188678.
```

</details>

**16 models, including the latest Gemini, Anthropic, and Llama models get 4/7 right.**

- [anthropic/claude-3-opus](https://openrouter.ai/anthropic/claude-3-opus)
- [anthropic/claude-3.5-haiku](https://openrouter.ai/anthropic/claude-3.5-haiku)
- [anthropic/claude-3.7-sonnet:thinking](https://openrouter.ai/anthropic/claude-3.7-sonnet:thinking)
- [google/gemini-2.0-flash-001](https://openrouter.ai/google/gemini-2.0-flash-001)
- [google/gemini-2.0-flash-lite-001](https://openrouter.ai/google/gemini-2.0-flash-lite-001)
- [google/gemini-2.5-flash-preview](https://openrouter.ai/google/gemini-2.5-flash-preview)
- [google/gemini-2.5-flash-preview:thinking](https://openrouter.ai/google/gemini-2.5-flash-preview:thinking)
- [google/gemini-2.5-pro-preview-03-25](https://openrouter.ai/google/gemini-2.5-pro-preview-03-25)
- [google/gemini-flash-1.5](https://openrouter.ai/google/gemini-flash-1.5)
- [google/gemini-pro-1.5](https://openrouter.ai/google/gemini-pro-1.5)
- [google/gemma-3-12b-it](https://openrouter.ai/google/gemma-3-12b-it)
- [google/gemma-3-27b-it](https://openrouter.ai/google/gemma-3-27b-it)
- [meta-llama/llama-4-maverick](https://openrouter.ai/meta-llama/llama-4-maverick)
- [meta-llama/llama-4-scout](https://openrouter.ai/meta-llama/llama-4-scout)
- [openai/gpt-4-turbo](https://openrouter.ai/openai/gpt-4-turbo)
- [openai/gpt-4.1](https://openrouter.ai/openai/gpt-4.1)

**The Amazon models, older Llama, Anthropic, Google, OpenAI models get 3 or less right.**

View the results at https://sanand0.github.io/llmmath/. Hover over the cells to see the reasoning traces (where available).

## Setup

I created this test to explore [`promptfoo`](https://www.promptfoo.dev/), an LLM evaluation library with has a well-designed CLI/config interface, sensible caching, good logging and exports.

To run this, get an [OpenRouter API key](https://openrouter.ai/settings/keys) and an [OpenAI API Key](https://platform.openai.com/api-keys). Then run:

```bash
git clone git@github.com:sanand0/llmmath.git
cd llmmath
export OPENROUTER_API_KEY=...
export OPENAI_API_KEY=...
npx promptfoo eval --config multiplication.yaml
npx promptfoo export latest -o multiplication.json
```
