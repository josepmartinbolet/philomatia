---
name: end-block
description: Closes a plan block after its milestone is passed. Goes through the block's draft notes in `knowledge/`, runs a review pass with the user (one by one, quick decision draft→reviewed / edit / merge / discard), marks the block as completed in `progress/plan.md`, and proposes what comes next at the start of the following block. Use when the user says "let's close the block", "end of block", "review block", "let's move to the next one" (or the equivalent in their language) or invokes /end-block.
---

# Skill: end-block

## When to use it

- The user passes a **block milestone** (assessment, deliverable, mock) and wants to close it before moving on.
- The tutor detects that the current block is finished (all subtopics covered + milestone passed) and proposes closing it.
- Triggers: "let's close the block", "end of block", "review block N", "let's move to the next one", `/end-block`.

**Don't** confuse it with `graduate` — this is a partial closure; `graduate` is the end of the course.

## What it does

### 1. Check preconditions

- The block's milestone in `progress/plan.md` must be reasonably covered. If it isn't, ask the user whether they want to do the milestone now (`assessment`) or close the block incomplete (recording the gap in `progress/log.md`).
- List `knowledge/*.md` with `block: N` (the block being closed). Count how many are `status: draft` vs `reviewed`.

### 2. Review pass over the block's draft notes

Go through the `status: draft` notes **one by one**. For each note:

1. Give the user a short summary:
   > 📄 **`knowledge/<slug>.md`** — {topic}. Last updated: {last_updated}.
   > Current definition: {first sentence of the Definition section}.
   > Interactive: {path, if the note has one}.

2. Ask with 4 short options:
   - **✅ OK** → set `status: reviewed`, bump `last_updated`.
   - **✏️ Edit** → open the note, the user dictates changes, update it and mark it `reviewed`.
   - **🔗 Merge with [[X]]** → merge into the given note, delete the current one, update incoming wikilinks and the index (and move/relink its interactive, if any).
   - **🗑️ Discard** → delete the note (it added nothing). Fix orphan wikilinks and the index. If it had an interactive that nothing else links to, ask whether to keep it.

3. **Pace**: no more than 60-90 s per note. If the user hesitates, leave it as `draft` and move on. The goal is to *reduce the debt*, not to perfect everything.

If there are more than 10 draft notes, offer to split the review pass into 2 sessions to avoid fatigue.

### 3. Consolidate the block's weaknesses

- List `progress/weaknesses/*.md` with weaknesses whose `first_recorded` falls within this block.
- For each one with `status: green` and ≥ 2 passes → delete the file (consolidated).
- For each one with `status: red` not reviewed during the block → add a "carry-over" candidate to the next block (note in `progress/current-session.md`).

### 4. Mark the block as completed

- In `progress/plan.md`, tick the block's checkbox: `- [x] **Block N** — ...`.
- Add a line with the real closing date: `→ *Closed YYYY-MM-DD*`.

### 5. Short post-mortem (mandatory, 1 paragraph)

Write an entry in `progress/log.md` like:

```
## YYYY-MM-DD — Block N closed: {title}

- Notes reviewed: X draft → Y reviewed, Z discarded/merged.
- Interactives: [list of widgets created in this block, and whether they helped].
- Milestone: [passed / borderline / with gaps in ...].
- Weaknesses consolidated: [list].
- Weaknesses carried over to the next block: [list].
- Lessons for the next block: [1-2 lines — change the pace, change the format, insist more on X].
```

### 6. Propose starting the next block

Close with:

> ✅ Block N closed. Next: **Block N+1 — {title}**. Shall we start now with `start-session` or leave it for next time?

## Mistakes to avoid

- ❌ Turning the review pass into a re-explanation of the content. It's **triage**, not a lesson.
- ❌ Letting the user say "I'll look at it more slowly later" for each note. Force a decision on the spot or explicitly mark it as postponed.
- ❌ Marking the block as completed without passing the milestone or recording the gap.
- ❌ Skipping the entry in `progress/log.md` — it's the only durable trace of the closure.
