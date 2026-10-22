---
name: graduate
description: Full course closure after the final milestone is passed. Consolidates `knowledge/` into a single cheatsheet, forces a review pass over the remaining draft notes, generates a post-mortem of the whole course (successes, failures, real vs. planned time) and leaves the repo in "post-course reference" mode. Use when the user passes the final milestone or says "we're done", "course finished", "end of the course" (or the equivalent in their language) or invokes /graduate.
---

# Skill: graduate

## When to use it

- The user passes the plan's **final milestone** (last assessment / deliverable / real exam).
- The user decides to wrap up the course (even without completing 100%). In that case, the real state and what was left uncovered are documented.
- Triggers: "we're done", "I passed", "course finished", "final closure", `/graduate`.

**Don't confuse it with `end-block`** — this closes the whole course, not a block.

## Hard precondition

Before graduating, **every block in the plan must be closed with `end-block`**. If any is still open:

> Block N is still open. Before graduating let's run `end-block` for N. Shall we?

If the user insists on graduating without closing blocks → close the pending ones in "incomplete" mode (record the gap in `progress/log.md`) and continue.

## What it does

### 1. Final review pass over `knowledge/`

- List every note with `status: draft` (from any block). If there are ≤ 10: go through them as in `end-block §2`. If there are more: ask the user whether they'd rather review them all or bulk-mark as `reviewed` those that have had ≥ 1 previous review by them.
- Check that the index in `knowledge/README.md` is up to date (one line per note, sorted by block), including the *Interactives* section.

### 2. Generate the consolidated cheatsheet

Create `knowledge/_cheatsheet.md` with:

```markdown
---
topic: final cheatsheet
status: reviewed
last_updated: YYYY-MM-DD
---

# Cheatsheet — {{COURSE_TITLE}}

> Executive summary generated when graduating from the course. For the detail of each concept, follow the wikilink to its note.

## Block 1 — {title}
### {concept}
- **Idea**: {1 line}
- **Where it shows up**: {1 line}
- **Typical pitfall**: {1 line}
- See [[note-slug]] · ▶ interactives/<slug>.html (if any)

... (repeat per concept and block)

## Formulas / facts to memorize

| Concept | Formula / fact |
|---|---|
| ... | ... |

## Classic mistakes (aggregated from `progress/weaknesses/`)

- {typical symptom → how to avoid it} (was a recurring weakness in this course)
- ...
```

Each bullet must fit on one line. If a concept needs more context, it goes in its note, not in the cheatsheet.

### 3. Course post-mortem

Append a separator and a post-mortem at the end of `progress/log.md`:

```
---

# 🎓 GRADUATION — YYYY-MM-DD

## Real vs. planned duration
- Planned: {{DURATION_WEEKS}} weeks, {{USER_DEDICATION}}.
- Real: {N} weeks, ~{H} total hours (estimated from `log.md`).

## Final milestone
- Result: [passed / not passed / N/A]. Detail: {statement + short comment}.

## What worked
- ...

## What I'd change
- ...

## Weaknesses still active
- {list of `progress/weaknesses/*.md` still 🔴 or 🟡}. If the user will keep practicing, leave them active; if not, archive them.

## State of `knowledge/`
- {N} total notes, {N_reviewed} reviewed, {N_draft} draft, {N_interactives} interactives.
- Cheatsheet in `knowledge/_cheatsheet.md`.
```

### 4. Mark the plan as completed

- In `progress/plan.md`, header: add `**Status: 🎓 Graduated YYYY-MM-DD**` under the target date.
- Tick every pending block checkbox with `[x]` or `[~]` (incomplete).

### 5. "Post-course reference" mode

Overwrite `progress/current-session.md`:

```
# Current state

🎓 **Course graduated on YYYY-MM-DD.**

The course has ended. This repo stays as a reference:
- `knowledge/` — canonical wiki (start with `_cheatsheet.md`); interactive widgets in `knowledge/interactives/`.
- `progress/log.md` — full history, post-mortem at the end.
- `progress/weaknesses/` — weaknesses still worth reviewing (if any).

To pick it up occasionally: `weakness-drill` or ask directly. To start a new course: see `.agents/SETUP-done.md` on how to relaunch the setup.
```

### 6. Confirm to the user

> 🎓 Course closed. You have:
> - Consolidated cheatsheet in `knowledge/_cheatsheet.md`.
> - Full post-mortem in `progress/log.md`.
> - Notes, interactives and weaknesses preserved — the repo stays as a searchable reference.
>
> Thanks for the journey. See you.

## Mistakes to avoid

- ❌ Graduating without having run `end-block` for each block → drafts pile up and the cheatsheet comes out broken.
- ❌ A cheatsheet with long paragraphs. It's a reference sheet, not a summary of the book.
- ❌ A generic post-mortem. If you can't name 2 concrete things that failed, you haven't been paying attention.
- ❌ Deleting `progress/weaknesses/` when graduating — they may still be useful afterwards.
