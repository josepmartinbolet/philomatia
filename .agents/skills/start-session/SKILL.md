---
name: start-session
description: Starts or resumes today's study session. Use when the user says "let's start", "let's go", "what's on today", "let's pick up where we left off" (or the equivalent in their language) or invokes /start-session. Reads the state in progress/ and proposes what to cover today based on plan.md, current-session.md and weaknesses.md.
---

# Skill: start-session

## When to use it
- The user starts a study session: "let's start", "let's get going", "what's next", "let's pick up where we left off", or invokes `/start-session`.
- Any time you need to realign the conversation with the real progress recorded in `progress/`.

## What to do (in this strict order)

### 1. Read the state
**Always** read these files before talking:
- `progress/current-session.md` — where we stopped
- `progress/plan.md` — current block/week and next milestone
- `progress/weaknesses.md` (index) + `progress/weaknesses/*.md` (one per weakness, sort by `status` and `last_review`)
- `knowledge/README.md` (index) — to know which notes and interactives already exist for today's topic. If the concept already has a note, read it before starting to keep consistency across sessions.
- `notes/` — review files modified since the last session (list by modification time, or ask the user). If it is empty, skip this silently (`AGENTS.md §4.3`). If you spot conceptual errors, point them out at the start with the format *📝 In `notes/X.md` you wrote "..."; nuance: ...* (see `AGENTS.md §4.3`).

If `progress/plan.md` is empty / has placeholders, or `SETUP.md` is still at the root: the course is NOT configured. **Run the `SETUP.md` script** (see `AGENTS.md §7`) instead of starting a session.

**Pending-debt check** (mandatory before starting):

- Compare `progress/log.md` with `knowledge/*.md`. If the last session recorded *📌 For your notes* content but there is no corresponding note updated in `knowledge/` (`last_updated` of that date), **persist it now** before continuing. In Claude Code the optional hook `.claude/hooks/check-knowledge-persistence.mjs` tries to catch this debt at the end of each turn; in any harness, this manual check is the safety net.

### 2. Decide what's on today

Cross three inputs:

| Input | Question |
|---|---|
| Plan | Which block/week are we in? On time or behind? |
| Current-session | Was anything left half-done last time? |
| Weaknesses | Is it time to slip in a surprise review? (every 3-4 sessions, without warning) |

**Decision rules:**
- If there are pending items in `current-session.md`, **prioritize closing them** before moving forward.
- If ≥ 3 sessions have passed without touching a `status: red` weakness (check `last_review` in each `progress/weaknesses/*.md`), add **a single surprise exercise** at the start (5-10 min) and then continue.
- If we're behind the plan, propose **compacting** (skip 1-2 optional exercises of the current block) rather than skipping whole blocks.

### 3. Present the session plan to the user

Short format, 5 lines max:

```
📚 **Session [N] — Block [X] · [Topic]**
Today: [main activity in 1 line]
Estimated duration: [X] min
Suggested tool / language: [according to the course and why]
```

And start with **a single step** (short explanation + control question, or an exercise + open question about how they'd approach it). **Don't** dump the whole session content at once.

### 4. During the session

- Follow the teaching guidelines in `AGENTS.md` section 2 (Socratic, notes snippets, etc.).
- **Interactive elements**: when the concept of the moment is dynamic, parametric or spatial, build or reuse an interactive element (`AGENTS.md §2.2`) and pair it with a control question that requires using it. Check `knowledge/interactives/` first — reuse beats rebuilding.
- **Every *📌 For your notes* snippet you emit → persist it in `knowledge/`** (see `AGENTS.md §4.2`). New note if the concept doesn't exist; update + bump `last_updated` if it does.
- Every 30-40 min, do a mental micro-checkpoint: are we meeting the session plan?
- If you detect a new failure, **create the file `progress/weaknesses/<slug>.md`** right away (don't wait for the end) and regenerate the index.

### 5. Close the session

When the user says "let's stop here", "that's it for today", "I have to go", or when the planned duration is reached, **update these files**:

1. **`progress/log.md`** — add an entry with today's date, real duration, exercises solved, weaknesses detected, interactives created/used, next step.
2. **`progress/current-session.md`** — overwrite with: where we stopped, what comes next, carried-over items.
3. **Weaknesses**: if a new one appeared, create `progress/weaknesses/<slug>.md` from `_template.md`. If an existing one was reviewed, update its frontmatter (`failures`, `last_review`, `consecutive_passes`, `status`) and history. Finally, **regenerate the whole index in `progress/weaknesses.md`**.
4. **`knowledge/README.md`** — if you created or modified any note or interactive today, check that the index is up to date (one line per note, sorted by block).

Confirm to the user in one line: "✅ Session saved. Next step: [X]. See you!"

## Common mistakes to avoid

- ❌ Starting to explain before reading `current-session.md`.
- ❌ Closing the session without updating the `progress/` files.
- ❌ Adding surprise exercises every session (breaks the flow). Only every 3-4 sessions.
- ❌ Announcing that the next exercise is a "surprise review" — it must be a real surprise.
- ❌ Building an interactive element for something a table would explain just as well.
