// Explicit provider-backed comparison runs; not part of site build or visitor runtime.
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { parse } from 'yaml';
if (process.argv[2] !== '--run') throw new Error('Pass --run for 16 paid isolated MiniMax-M3 turns.');
const batch = parse(readFileSync('src/data/prompt-technique-batch-001.yaml', 'utf8'));
if (batch.entries.length !== 8) throw new Error('Batch must contain exactly eight entries');
const sha = (s) => createHash('sha256').update(s).digest('hex');
const route = '/home/cosmatrexis/devel/hearthandcode/internal/pi-ember-exocore/docker/pi-codex-container/bin/pi-container';
const revision2 = process.argv.includes('--revision-2');
const system = revision2
  ? 'You are a tool-free assistant preparing a candidate response to a synthetic professional scenario. Use only supplied facts. Do not include any self-identifier, persona, organization name, title or role label not explicitly present in the supplied facts. Do not include Latin titles, software project names, proprietary framework vocabulary, or claims of browsing, testing, changing files, contacting anyone, approving decisions or taking external action. Answer the task directly; no hidden reasoning.'
  : 'You are a tool-free assistant preparing a candidate response to a synthetic professional scenario. Use only supplied facts. Do not claim that you browsed, verified external facts, changed a file, contacted anyone, approved a decision, or performed an external action. Avoid project names and proprietary vocabulary. Answer the delegated task directly; no hidden reasoning.';
const flags = ['--provider', 'minimax-oauth', '--model', 'MiniMax-M3', '--thinking', 'off', '--mode', 'json', '--print', '--no-session', '--no-tools', '--no-extensions', '--no-skills', '--no-prompt-templates', '--no-context-files', '--system-prompt', system];
const output = 'src/data/prompt-technique-comparisons.batch-001.json';
const stage = revision2 ? '/tmp/prompt-technique-batch-001-revision2-stage.json' : '/tmp/prompt-technique-batch-001-stage.json';
if (existsSync(output)) throw new Error('Batch output already exists; refusing overwrite.');
const records = existsSync(stage) ? JSON.parse(readFileSync(stage, 'utf8')).comparisons : [];
for (const entry of batch.entries) {
  if (records.some((item) => item.slug === entry.slug)) continue;
  const packet = entry.example.source_packet.map((fact, index) => `${index + 1}. ${fact}`).join('\n');
  const samples = [];
  for (const condition of ['baseline', 'applied']) {
    const prompt = `Synthetic professional task (no real client or external action):\n${entry.example.task}\n\nSupplied facts:\n${packet}\n\nInstructions:\n${condition === 'baseline' ? entry.example.baseline_instruction : entry.example.applied_instruction}\n\nReturn a candidate response for review. Do not invent facts or claim to have taken action.`;
    const run = spawnSync(route, [...flags, prompt], { encoding: 'utf8', maxBuffer: 12 * 1024 * 1024, timeout: 360000 });
    if (run.status !== 0) throw new Error(`${entry.slug}/${condition}: Pi exit ${run.status}; staged completed records preserved`);
    const rows = run.stdout.trim().split('\n').map((line) => JSON.parse(line));
    const content = rows.findLast((row) => row.type === 'message_end' && row.message?.role === 'assistant')?.message?.content ?? [];
    const raw = content.filter((part) => part.type === 'text').map((part) => part.text).join('\n');
    const response = raw.replace(/^<think>[\s\S]*?<\/think>\s*/, '').trim();
    if (!response || rows.some((row) => String(row.type).includes('tool'))) throw new Error(`${entry.slug}/${condition}: missing text or unexpected tool event`);
    samples.push({ condition, submitted_prompt: prompt, prompt_sha256: sha(prompt), response, response_sha256: sha(response), executed_at: rows.find((row) => row.type === 'session')?.timestamp, tool_events: 0 });
    console.log(`${entry.slug} ${condition} ${response.length} chars`);
  }
  records.push({ schema_version: 'hnc.prompt-comparison-receipt.v1', slug: entry.slug, provider: 'minimax-oauth', model: 'MiniMax-M3', execution_mode: 'pi-container --print --no-session --no-tools --no-extensions --no-skills --no-prompt-templates --no-context-files --thinking off', system_prompt_sha256: sha(system), source_packet_sha256: sha(packet), comparison_predicate: entry.example.comparison_predicate, task_class: entry.example.scenario, samples, review_status: 'candidate-needs-review', editorial_delta: 'The baseline asks for the task result; the applied prompt operationalizes this technique with specific constraints and checks. Compare both responses against the stated predicate before drawing any conclusion.', observed_limits: ['Unreviewed model outputs: inspect both responses for invented claims, missing checks and unsupported external effects before approving this teaching example.'], boundary: 'One synthetic matched pair; not evidence of general technique efficacy, real-world verification, or authority for an external action.' });
  writeFileSync(stage, `${JSON.stringify({ comparisons: records }, null, 2)}\n`);
}
records.sort((a, b) => batch.entries.findIndex((entry) => entry.slug === a.slug) - batch.entries.findIndex((entry) => entry.slug === b.slug));
writeFileSync(output, `${JSON.stringify({ comparisons: records }, null, 2)}\n`, { flag: 'wx' });
console.log(`Created ${output} with ${records.length} matched pairs.`);
