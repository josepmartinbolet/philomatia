# AI-driven course template

A template repo that turns any AI coding agent into a **personal tutor** for a course of your choice: it interviews you, builds a week-by-week plan from your core material, teaches Socratically, keeps a wiki of what you learn, tracks your weak spots with spaced repetition, and illustrates hard concepts with **interactive widgets** you can play with.

It is **harness-agnostic**: everything runs on plain Markdown files plus one instruction file, `AGENTS.md`, so it works with any agent that can read and write files in a folder.

## Quick start

1. Copy this template (GitHub "Use this template", or clone it) into a new folder.
2. *(Optional)* Put your core material (PDF, notes, …) in `materials/`. If you have none, the agent teaches from its own knowledge and gathers sources into `materials/curated/` only when it needs them.
3. Open the folder with your agent and say **"let's start"**. It will detect the unconfigured template and run `SETUP.md` (a ~5-minute interview).

## Harness compatibility

| Harness | How it picks up the instructions | Skills |
|---|---|---|
| Any agent that reads `AGENTS.md` (Codex, Cursor, GitHub Copilot, OpenCode, Amp, Windsurf, Zed, …) | `AGENTS.md` natively | Read from `.agents/skills/` on demand (`AGENTS.md §5`); optionally register natively with `scripts/install-skills.mjs` |
| Claude Code | `CLAUDE.md` → imports `AGENTS.md` | Pre-registered wrappers in `.claude/skills/` + optional `Stop` hook |
| Gemini CLI | `GEMINI.md` → imports `AGENTS.md` | Read on demand, or `node scripts/install-skills.mjs gemini` |
| Anything else | Tell the agent: *"Read AGENTS.md and follow it"* | Read on demand |

Rules of thumb:
- **`AGENTS.md` is the single source of truth.** Adapter files only point to it.
- **`.agents/skills/` holds the canonical skills.** Native skill folders contain generated wrappers that point back, so nothing drifts. Re-run `node scripts/install-skills.mjs <harness>` after renaming a skill or changing its description. Skill folder conventions vary between harnesses and versions — if yours reads from a different folder, pass that path to the script.
- Nothing depends on a specific tool name: wherever the instructions say "read", "write" or "search", the agent uses whatever its harness offers.

## Layout

```
├── AGENTS.md            ← the tutor's system prompt
├── SETUP.md             ← first-run interview (moved to .agents/SETUP-done.md afterwards)
├── CLAUDE.md, GEMINI.md ← thin adapters
├── .agents/skills/      ← start-session · assessment · weakness-drill · end-block · graduate
├── .claude/             ← Claude Code adapter (skill wrappers + optional hook)
├── scripts/             ← install-skills.mjs
├── materials/           ← your sources (agent reads only) · curated/ = sources the agent gathered if you gave none
├── knowledge/           ← wiki the agent writes (you correct)
│   └── interactives/    ← self-contained HTML widgets illustrating concepts
├── notes/               ← your personal notebook (agent reads only)
└── progress/            ← plan, current session, weaknesses, log
```

## Interactive elements

When a concept is dynamic, parametric or spatial (an algorithm step by step, the effect of a parameter, a geometric transformation, a state machine…), the tutor builds a small interactive UI for it: inline if your harness can render UI, otherwise as a single self-contained HTML file in `knowledge/interactives/` that you open in any browser. Each widget comes with a guided task and a control question, and is linked from the concept's wiki note. See `AGENTS.md §2.2`.
