// Host-side, opt-in Pi provider adapter. No Hub/plugin mount or shared Pi agent home.
// Importing this module has no provider effect; runIsolatedMiniMax performs one paid turn.
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = '/home/cosmatrexis/devel/hearthandcode/internal/pi-ember-exocore/docker/pi-codex-container';
const sha = (text) => createHash('sha256').update(text).digest('hex');
const command = `set -eu
mkdir -p /tmp/clean/agent
cp /opt/pi-minimax-oauth.json /tmp/clean/agent/models.json
test ! -e /tmp/clean/agent/APPEND_SYSTEM.md
test ! -e /sources/hub/AGENTS.md
test ! -e /work/pi-ember-exocore/extensions/index.ts
export PI_CODING_AGENT_DIR=/tmp/clean/agent
prompt=$(cat /tmp/clean/prompt.txt)
system=$(cat /tmp/clean/system.txt)
exec pi --provider minimax-oauth --model MiniMax-M3 --thinking off --mode json --print --no-session --no-tools --no-extensions --no-skills --no-prompt-templates --no-context-files --system-prompt "$system" "$prompt"`;

export function runIsolatedMiniMax({ prompt, system, timeout = 360000 }) {
  if (!prompt || !system) throw new Error('Prompt and explicit system instruction required');
  const scratch = mkdtempSync(join(tmpdir(), 'pi-clean-method-'));
  chmodSync(scratch, 0o777);
  try {
    writeFileSync(join(scratch, 'prompt.txt'), prompt);
    writeFileSync(join(scratch, 'system.txt'), system);
    const proc = spawnSync('docker', ['compose', '--project-directory', root, '-f', join(root, 'compose.yaml'), 'run', '--rm', '--no-deps', '-T', '-v', `${scratch}:/tmp/clean:rw`, '--workdir', '/tmp/clean', '--entrypoint', '/bin/sh', 'pi-auth', '-c', command], { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024, timeout });
    if (proc.status !== 0) throw new Error(`Clean Pi exited ${proc.status}; no response receipt released`);
    const rows = proc.stdout.trim().split('\n').map((line) => JSON.parse(line));
    const message = rows.findLast((row) => row.type === 'message_end' && row.message?.role === 'assistant')?.message;
    const user = rows.find((row) => row.type === 'message_end' && row.message?.role === 'user')?.message?.content?.find((part) => part.type === 'text')?.text;
    if (user !== prompt || message?.provider !== 'minimax-oauth' || message?.model !== 'MiniMax-M3' || message?.stopReason !== 'stop' || rows.some((row) => String(row.type).includes('tool'))) throw new Error('Prompt, provider, model, stop reason or tool-event check failed');
    const raw = message.content.filter((part) => part.type === 'text').map((part) => part.text).join('\n');
    const response = raw.replace(/^<think>[\s\S]*?<\/think>\s*/, '').trim();
    if (!response) throw new Error('Empty final response');
    return { prompt: user, prompt_sha256: sha(user), response, response_sha256: sha(response), executed_at: rows.find((row) => row.type === 'session')?.timestamp, tool_events: 0, provider: message.provider, model: message.model, system_prompt_sha256: sha(system) };
  } finally { rmSync(scratch, { recursive: true, force: true }); }
}
