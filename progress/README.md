# progress/

The tutor's persistent state. **Don't delete files from here** — they are the agent's memory between sessions.

| File / folder | Who writes | What it contains |
|---|---|---|
| `plan.md` | Tutor (1st session) + occasional adjustments | {{DURATION_WEEKS}}-week plan with blocks, milestones and schedule. Single source. |
| `current-session.md` | Tutor at the end of each session | Exact point to resume from next time |
| `weaknesses.md` | Tutor | Index + protocol. Regenerated whenever any weakness changes. |
| `weaknesses/` | Tutor | One `.md` per weakness with frontmatter (`status`, `failures`, `last_review`, `consecutive_passes`, …) |
| `log.md` | Tutor at the end of each session | Chronological log: date, topic, exercises, notes |
| `solutions/` | User (reviewed by the tutor) | Work worth keeping |

> ℹ️ `notes/` does **not** live here — it's a sibling folder at the repo root, the learner's personal notebook (agent only reads). See `notes/README.md`.

If you want to restart the plan from scratch, empty these files (don't delete them) and the tutor will regenerate them at the start of the next session. For the full reset options, see `.agents/SETUP-done.md § Course reset`.
