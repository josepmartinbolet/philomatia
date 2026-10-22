#!/usr/bin/env node
// check-knowledge-persistence.mjs
//
// Claude Code `Stop` hook (optional adapter — the rule itself lives in AGENTS.md
// and is enforced in every harness by the debt check in the start-session skill).
// Receives on stdin a JSON with `transcript_path`. If in the last assistant turn
// you emitted the `📌 For your notes` snippet but did NOT write/edit any file in
// `knowledge/`, it prints a warning to stderr so the agent sees it before its
// next response.
//
// Designed to work on Windows, macOS and Linux with no external dependencies.
// Node ships with Claude Code, so it is always available.
//
// Rules:
// - Always exits with code 0 (never blocks the user).
// - On error (unreadable transcript, malformed JSON), exits silently.

import { readFileSync } from 'node:fs';

// Tolerates Markdown bold around the label: `📌 **For your notes**`.
const NEEDLE = /📌\s*\**\s*For your notes/;
const KNOWLEDGE_MATCHER = /[\\/]knowledge[\\/]/;
const WRITE_TOOLS = new Set(['Write', 'Edit', 'MultiEdit']);

function readStdin() {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function safeParse(line) {
  try {
    return JSON.parse(line);
  } catch {
    return null;
  }
}

function extractText(content) {
  // Claude Code stores `content` as an array of blocks {type, text|...} or as a string.
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content
    .map((b) => {
      if (typeof b === 'string') return b;
      if (b && typeof b === 'object' && typeof b.text === 'string') return b.text;
      return '';
    })
    .join('\n');
}

function extractToolUses(content) {
  if (!Array.isArray(content)) return [];
  return content.filter(
    (b) => b && typeof b === 'object' && b.type === 'tool_use'
  );
}

function main() {
  const raw = readStdin();
  if (!raw) return;

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return;
  }

  const transcriptPath = payload.transcript_path;
  if (!transcriptPath) return;

  let transcript;
  try {
    transcript = readFileSync(transcriptPath, 'utf8');
  } catch {
    return;
  }

  // Walk lines backwards, keeping the last contiguous assistant block
  // (it may span several lines if there are interleaved tool_use entries).
  const lines = transcript.split(/\r?\n/).filter(Boolean);

  let sawNeedle = false;
  let wroteKnowledge = false;
  let foundAssistantTurn = false;

  for (let i = lines.length - 1; i >= 0; i--) {
    const evt = safeParse(lines[i]);
    if (!evt) continue;

    // Typical Claude Code format: {type: 'assistant', message: {role, content}}
    // or {role: 'assistant', content: [...]}. We cover both.
    const role =
      evt.role ??
      (evt.message && evt.message.role) ??
      (evt.type === 'assistant' ? 'assistant' : undefined);
    const content =
      evt.content ?? (evt.message && evt.message.content) ?? undefined;

    if (role === 'user' && foundAssistantTurn) {
      // We've walked back past the last assistant turn.
      break;
    }

    if (role === 'assistant' && content !== undefined) {
      foundAssistantTurn = true;

      const text = extractText(content);
      if (NEEDLE.test(text)) sawNeedle = true;

      for (const tu of extractToolUses(content)) {
        const fp = tu.input && tu.input.file_path;
        if (WRITE_TOOLS.has(tu.name) && typeof fp === 'string') {
          if (KNOWLEDGE_MATCHER.test(fp)) wroteKnowledge = true;
        }
      }
    }
  }

  if (!sawNeedle || wroteKnowledge) return;

  process.stderr.write(
    [
      '⚠️  Persistence rule (AGENTS.md §2.7 / §4.2) not met in the last turn.',
      '',
      'You emitted a `📌 For your notes` snippet but did NOT write/update',
      'any note in `knowledge/`. Before continuing:',
      '',
      '1. Identify the snippet\'s concept.',
      '2. If `knowledge/<slug>.md` already exists → update it and bump `last_updated`.',
      '3. If it doesn\'t → create it from `knowledge/_template.md` with `status: draft`.',
      '4. Update the index in `knowledge/README.md`.',
      '',
      'Don\'t repeat the 📌 — just persist the one you already emitted.',
      '',
    ].join('\n')
  );
}

try {
  main();
} catch {
  // No noise if something fails — the hook must never block.
}
