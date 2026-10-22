# Weakness register

> **Each weakness = one file in `progress/weaknesses/<slug>.md`** with YAML frontmatter (`status`, `failures`, `last_review`, `consecutive_passes`, …). This file is just the index.
>
> **Why this design**: maintaining a Markdown table by hand (incrementing counters, sorting, switching emojis) degrades quickly with many entries. Separate files with frontmatter can be read/sorted programmatically without risk of breaking the format.

---

## How to operate (mandatory for the agent)

### When a new weakness is detected
1. Create `progress/weaknesses/<kebab-case-slug>.md` by copying `_template.md`.
2. Fill in the frontmatter: `status: red`, `failures: 1`, `last_review: today`, `first_recorded: today`, `consecutive_passes: 0`.
3. If the concept already has a note in `knowledge/`, reference its slug in `knowledge_note:`.
4. Regenerate this file's index (see §Index below). **Re-emit it entirely, don't edit it row by row** — it's a safe operation for an LLM and avoids corruption.

### When reviewing in a drill / surprise exercise
1. Open the concept's file and update the frontmatter:
   - If passed: `consecutive_passes += 1`, `last_review = today`. If it's 2 in a row: raise the status (`red→yellow→green`) and reset `consecutive_passes` to 0.
   - If failed: `failures += 1`, `consecutive_passes = 0`, `last_review = today`, lower the status if it was `green` or `yellow`.
2. Add a line to the file's *History* with the date and what happened.
3. If after reaching `green` it accumulates 2 more passes → delete the file (consolidated). Regenerate the index.

### When starting a session
1. List `progress/weaknesses/*.md` (exclude `_template.md` and `.gitkeep`).
2. Read them and sort by `status` (red > yellow > green) and then by oldest `last_review`.
3. If any `status: red` hasn't been reviewed in ≥ 3 sessions → candidate for a surprise exercise this session.

---

## Index — regenerate every time something changes

> Rules: one line per weakness, grouped by status, sorted by `last_review` (oldest on top). **Re-emit the full block**, don't edit individual lines.

### 🔴 Critical (red)
_(empty — filled in from session 1)_

### 🟡 Consolidating (yellow)
_(empty)_

### 🟢 Mastered (green — 2 passes → delete)
_(empty)_

---

## Legend
- 🔴 **red** — recurring failure. Review every week.
- 🟡 **yellow** — understands it now, keep an eye on it. Review every 2-3 weeks.
- 🟢 **green** — passed 2 surprise reviews. 2 more passes → consolidated (delete the file).
