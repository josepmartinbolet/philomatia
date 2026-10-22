# notes/ — The learner's personal notebook

**This space is YOURS. The agent reads but does NOT write here.**

**Optional.** If you never write anything here, the course works the same: the agent simply skips the notebook review and won't nag you about it.

What goes here (unlike `knowledge/`) are your raw notes, in your own voice, with your sketches, loose doubts, connections you've made with other things, things you don't get yet, etc. They don't need to be pretty, complete or canonical. They are **your way of thinking about the material**.

## Difference from `knowledge/`

| | `knowledge/` (wiki) | `notes/` (you) |
|---|---|---|
| Who writes | Agent | Learner |
| Tone | Canonical, objective | Personal, subjective, informal |
| Structure | Frontmatter + strict template | Free — whatever works for you |
| Purpose | Stable domain reference | Reflection, doubts, your own connections |

## What the agent does with this folder

- **At the start of each session** (and in some drills): takes a quick look at the recent files you've touched here.
- If it detects a **conceptual error** or an **important inaccuracy** in your notes, it points it out at the start of the session with a format like:
  > 📝 *Careful, in `notes/binary-search.md` you wrote "log₂(n) because you divide by 2" — nuance: it would be log_k(n) if you divided by k. In binary search it is log₂ because you always split in half, but the general reason is how the problem is divided, not the constant 2.*
- **It never modifies your files.** It only comments.
- If it offers a correction and you agree, **you** edit it.

## How to organize it (suggestions, not rules)

Any format works, but if you're looking for ideas:

- **One file per topic** (parallel to `knowledge/`): `notes/binary-search.md` — your version of that canonical note.
- **One file per session**: `notes/2026-06-26-session-1.md` — chronological notebook.
- **A mix**: big topics get their own file, and `notes/doubts.md` collects loose questions to review.

Choose whatever feels most natural. If you still don't know in the first session, start with **one file per topic** — it works well for most people.

## What does NOT go here

- **The course's canonical wiki** → `knowledge/` (written by the agent)
- **Session state / plan** → `progress/`
- **Work you want to keep as solved** → `progress/solutions/`
- **PDFs and sources** → `materials/`
