// @ts-check

import { readFile, rename, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";

const resultsPath = "multiplication.json";
const datesPath = "model-dates.json";
const pendingPath = ".promptfoo-new.json";
const repeats = 5;

const normalizeProvider = (provider) => provider.replace(/^openrouter:/, "");

const readModels = async () =>
  (await readFile("new-models.txt", "utf8"))
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*/, "").trim())
    .filter(Boolean);

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 || code === 100
        ? resolve(undefined)
        : reject(new Error(`${command} exited with ${code}`)),
    );
  });

const addNumbers = (left, right) => {
  if (typeof right === "number")
    return (typeof left === "number" ? left : 0) + right;
  if (!right || typeof right !== "object" || Array.isArray(right))
    return left ?? right;
  return Object.fromEntries(
    [...new Set([...Object.keys(left ?? {}), ...Object.keys(right)])].map(
      (key) => [key, addNumbers(left?.[key], right[key])],
    ),
  );
};

const normalizeEval = (evaluation) => {
  for (const prompt of evaluation.results.prompts)
    prompt.provider = normalizeProvider(prompt.provider);
  for (const result of evaluation.results.results)
    result.provider.id = normalizeProvider(result.provider.id);
  return evaluation;
};

const merge = (existing, added) => {
  const addedProviders = new Set(
    added.results.prompts.map((prompt) => prompt.provider),
  );
  const providers = [
    ...existing.config.providers,
    ...added.config.providers.filter((provider) => {
      const id = normalizeProvider(
        typeof provider === "string" ? provider : provider.id,
      );
      return !existing.config.providers.some((current) => {
        const currentId = normalizeProvider(
          typeof current === "string" ? current : current.id,
        );
        return currentId === id;
      });
    }),
  ];

  return {
    ...existing,
    evalId: added.evalId,
    config: { ...added.config, providers },
    results: {
      ...added.results,
      prompts: [
        ...existing.results.prompts.filter(
          (prompt) => !addedProviders.has(prompt.provider),
        ),
        ...added.results.prompts,
      ],
      results: [
        ...existing.results.results.filter(
          (result) =>
            !addedProviders.has(normalizeProvider(result.provider.id)),
        ),
        ...added.results.results,
      ],
      stats: addNumbers(existing.results.stats, added.results.stats),
    },
    shareableUrl: added.shareableUrl,
  };
};

const save = async (existing, added, dates) => {
  const merged = merge(existing, added);
  await writeFile(`${resultsPath}.tmp`, `${JSON.stringify(merged, null, 2)}\n`);
  await rename(`${resultsPath}.tmp`, resultsPath);

  const date = new Date().toISOString().slice(0, 10);
  for (const prompt of added.results.prompts)
    dates.models[prompt.provider] = date;
  await writeFile(datesPath, `${JSON.stringify(dates, null, 2)}\n`);

  console.log(
    `Updated ${resultsPath} with ${added.results.prompts.length} providers and ${added.results.results.length} results.`,
  );
};

const main = async () => {
  const existing = JSON.parse(await readFile(resultsPath, "utf8"));
  const dates = JSON.parse(await readFile(datesPath, "utf8"));
  const tested = new Set(
    existing.results.prompts.map((prompt) =>
      normalizeProvider(prompt.provider),
    ),
  );
  const args = process.argv.slice(2);
  const resume = args.includes("--resume");
  const selected = args.filter((arg) => arg !== "--resume");
  const requested = selected.length
    ? selected.map(normalizeProvider)
    : await readModels();
  const missing = requested.filter((model) => !tested.has(model));

  if (resume) {
    const added = normalizeEval(
      JSON.parse(await readFile(pendingPath, "utf8")),
    );
    await save(existing, added, dates);
    return;
  }

  console.log(
    `Requested: ${requested.length}; already tested: ${requested.length - missing.length}; to run: ${missing.length}`,
  );
  if (!missing.length) return;
  console.log(missing.map((model) => `  ${model}`).join("\n"));

  const providers = missing.map((model) => `openrouter:${model}`);
  await run("npx", [
    "promptfoo",
    "eval",
    "-c",
    "promptfooconfig.yaml",
    "--providers",
    ...providers,
    "--env-file",
    ".env",
    "--repeat",
    String(repeats),
    "--no-share",
    "--no-progress-bar",
    "--no-table",
    "-o",
    pendingPath,
  ]);

  const added = normalizeEval(JSON.parse(await readFile(pendingPath, "utf8")));
  await save(existing, added, dates);
};

await main();
