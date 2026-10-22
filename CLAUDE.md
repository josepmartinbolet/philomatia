# CLAUDE.md — Claude Code adapter

All the tutor's instructions live in `AGENTS.md` (harness-agnostic, single source of truth). Do not add rules here — add them to `AGENTS.md`.

@AGENTS.md

## Claude Code specifics
- The skills are pre-registered as thin wrappers in `.claude/skills/` (regenerate with `node scripts/install-skills.mjs claude`); the canonical playbooks are in `.agents/skills/`.
- `.claude/settings.json` registers an optional `Stop` hook (`.claude/hooks/check-knowledge-persistence.mjs`) that warns you when you emitted a *📌 For your notes* snippet without writing to `knowledge/`.
- To render interactive elements (`AGENTS.md §2.2`), prefer any inline UI/artifact/preview capability available in the session; otherwise write the HTML file in `knowledge/interactives/` and give the user its path.
