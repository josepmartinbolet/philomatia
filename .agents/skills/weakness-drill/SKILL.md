---
name: weakness-drill
description: Spaced-repetition review session focused exclusively on the user's weak concepts. Use when they ask for "review", "drill", "reinforcement", "let's review my weak spots" (or the equivalent in their language) or invoke /weakness-drill. Lists progress/weaknesses/*.md, prioritizes files with status red and the oldest last_review, and chains short exercises.
---

# Skill: weakness-drill

## When to use it
- The user explicitly asks to review: "drill", "review", "/weakness-drill".
- The tutor detects that **≥ 3 sessions have passed without touching 🔴 weaknesses** and proposes a drill to the user.
- Before an important assessment (milestone), to go in sharp.

## How it works

### 1. Read the weaknesses and prioritize

List `progress/weaknesses/*.md` (exclude `_template.md` and `.gitkeep`). For each file:
- Read the frontmatter (`status`, `failures`, `last_review`, `consecutive_passes`).
- **Check the canonical note in `knowledge/`** (via `knowledge_note:` if referenced) to reuse previous wording and pitfalls already detected — and its `interactive:` widget, if it has one.
- **Also check `notes/`** — if the user wrote something about this concept, see how they phrased it. If their phrasing has an error, that's the perfect angle for the drill.

Sort by:
1. `status`: red > yellow > green
2. Oldest `last_review` = higher priority
3. Higher `failures` = higher priority

If the folder is empty or everything is `green`: tell the user ("You have no active weaknesses — want me to set up a random review of the current block?"). If they say yes, pick 2-3 topics from the current block in `plan.md`.

### 2. Agree on duration and format

Ask:
> How long? (30 / 45 / 60 min) And how many topics? (1 in depth, or 3 quick ones)

Sensible defaults:
- **30 min**: 2 topics, 1 quick exercise each.
- **45 min**: 3 topics, 1 exercise each + 1 conceptual question.
- **60 min**: 1 topic in depth (mini-lesson + 2-3 exercises) or 4 quick topics.

### 3. For each drill topic

3-step structure (5-15 min per topic):

**a) Conceptual question** (unsolved)
> "Explain in your own words what [X] is and when you'd use it."

If they answer wrong → mini-explanation + new question. If the concept is dynamic, parametric or spatial and the text explanation already failed in a previous drill, **switch to an interactive element** (`AGENTS.md §2.2`): reuse the note's widget or build one, and give them a guided task with it. If they answer right → next step.

**b) Timed mini-exercise**
Give a small exercise (5-10 min) that is directly applicable. Prefer exercises from the core material already seen, to reinforce muscle memory.

**c) Variant / trace**
- If they get it right: **variant** ("and what if now [change in the input / requirement]?").
- If they get it wrong: **joint trace** of the exercise with a simple case, identifying where it went off the rails.

### 4. Update the weakness file after each topic

Edit `progress/weaknesses/<slug>.md`:
- If **they answered the concept right AND solved the exercise**:
  - `consecutive_passes += 1`, `last_review = today`.
  - If `consecutive_passes` reaches 2 → raise status (`red→yellow→green`), reset `consecutive_passes = 0`.
  - If it was already `green` and accumulates 2 more passes → **delete the file** (consolidated).
- If **they failed any step**:
  - `failures += 1`, `consecutive_passes = 0`, `last_review = today`.
  - If it was `green` → lower to `yellow`. If it was `yellow` → lower to `red`.
- Add a line to the file's *History* with what happened.
- At the end, **regenerate the index in `progress/weaknesses.md`** by re-emitting it entirely (don't edit individual lines).

### 5. Wrap-up

```
## Drill summary (Y min)
| Topic | Before | After | Notes |
|---|---|---|---|
| ... | 🔴 | 🟡 | ... |

Next recommended review: [weakest topic] in ~3-4 sessions.
```

Update `progress/log.md` with an entry like "Session N — DRILL" and save.

## Mistakes to avoid

- ❌ Drills so long they turn into a normal lesson. **If you've spent > 15 min on a topic, close it and move on.**
- ❌ Always reviewing the same thing. Rotate: if a topic appears in 2 drills in a row, replace it with the next one by priority.
- ❌ Not updating the weakness file + the index afterwards → the whole skill loses its point.
