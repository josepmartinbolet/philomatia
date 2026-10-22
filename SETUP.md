# SETUP — Onboarding script (addressed to the AGENT)

> **YOU (the agent) run this file, not the user.** It is the conversational script you follow on the first interaction to configure the course.
>
> The user has copied an empty template with unresolved `{{PLACEHOLDERS}}`. Your job here is to interview them, resolve the placeholders with their answers, and leave the repo ready to start Session 1.
>
> This script is harness-agnostic: wherever it says "read", "write", "edit", "list", "search" or "move", use the equivalent tools your harness provides (file tools or shell commands).

---

## When to trigger this script

It triggers **automatically** when you detect any of these signals on starting in the directory:

- `progress/plan.md` contains unresolved `{{PLACEHOLDERS}}`.
- `progress/current-session.md` says "the course hasn't started yet".
- The user says things like *"let's start", "let's set up the course", "it's my first time"*.
- This file (`SETUP.md`) still exists at the root (when setup ends, it's moved to `.agents/SETUP-done.md`).

If setup is already done (placeholders resolved, `SETUP.md` moved), **don't run this script again** — go straight to `AGENTS.md §7` or the normal flow.

---

## How to run it

Follow the 4 phases in order. **One question at a time.** Don't dump the whole questionnaire at once — it's a conversation, not a form. Confirm each answer before moving on and, if the user gives information out of order, slot it where it belongs without making them repeat it.

> 💡 If your harness renders interactive UI inline (forms, option pickers), you may use it to collect the answers — but still one question at a time.

Before starting, say something like (in the user's language, if you can already tell it):

> "I see this repo is a freshly instantiated template. Before we begin, we need to define the course together — I'll ask you a few quick questions (about 5 minutes) and with your answers I'll set everything up. Shall we start?"

---

## PHASE 1 — Course identity

Ask and confirm:

1. **Which course do you want to prepare?** *(name it in your own words)*
   → resolves `{{COURSE_TITLE}}`
   → derive `{{COURSE_SHORT}}` (short kebab-case slug; propose it yourself and let them confirm)

2. **What is the core material?** *(book, online course, lecture notes, … — or none)*
   → **If they have none** (or don't want to provide any): that's fine, don't insist. Resolve `{{MATERIAL_BASE}}` = *"agent-curated sources"* and `{{MATERIAL_FILE}}` = `curated/SOURCES.md`, create `materials/curated/SOURCES.md` with an empty registry (see `materials/README.md`), and skip the rest of this question. **Don't gather sources now**: you'll fetch them only when a session needs them (`AGENTS.md §4.1.1`). The one exception is the plan: if the course targets an official exam or certification and you're not sure of its current syllabus, fetch that syllabus now, since phase 3 depends on it.
   → resolves `{{MATERIAL_BASE}}` (human-readable name)
   → resolves `{{MATERIAL_FILE}}` (exact file name)
   → **ask them to put the file in `materials/` right now** if they haven't yet, and verify it exists (list the folder or read the file).
   → **If it's a PDF with more than ~40 pages** (this is §PHASE 1.2): read it in page ranges (≈20 pages per read; if your harness can't read PDFs, use a local extractor such as `pdftotext -f <first> -l <last>`) until you find the **table of contents**, and generate `materials/TOC.md` with this format:
     ```
     # TOC — {{MATERIAL_BASE}}
     ## Ch 1 — Title · pp. 3-27
     ## Ch 2 — Title · pp. 28-55
     ...
     ```
     You'll use this TOC later to know which page range to read without scanning the whole PDF. Confirm with the user that it matches what they see.
   → If it's an online course or something not downloadable, create `materials/links.md` with URLs + a short description of each resource.

3. **What role do you want me to take as the agent?** *(tutor of X, coach of Y, mentor in Z…)*
   → resolves `{{TUTOR_ROLE}}`. If they hesitate, propose a coherent one: *"private tutor expert in {{COURSE_TITLE}}"*.

---

## PHASE 2 — User profile

4. **Which language do you want the sessions in?** → `{{USER_LANGUAGE}}`
   *(The repo's files stay in English; the conversation and the content of `knowledge/` notes will be in this language.)*

5. **Tell me about your background** — what prior training do you have, what have you done before related to this topic?
   → resolves `{{USER_BACKGROUND}}` (one sentence summarizing their starting level).

6. **Which tools / languages / technologies will you use during the course?** *(e.g. Python + TS, pen and paper, LaTeX, a specific IDE…)*
   → resolves `{{USER_TOOLS}}`.

7. **What is your concrete goal at the end?** *(pass an exam, ace an interview, master the topic for a real project…)*
   → resolves `{{USER_GOAL}}`.

8. **How much time can you dedicate per week?** *(in hours and number of sessions)*
   → resolves `{{USER_DEDICATION}}` (e.g. *"8-12 h/week in 3-4 sessions"*).

---

## PHASE 3 — Time structure

9. **In how many weeks do you want to finish the course?**
   → resolves `{{DURATION_WEEKS}}` (number) and `{{DURATION_HUMAN}}` (e.g. *3 months*).

10. **When do you start?** *(today by default)*
    → resolves `{{START_DATE}}` (format YYYY-MM-DD).
    → compute `{{END_DATE}}` by adding `{{DURATION_WEEKS}}` weeks.

11. **Now I'll propose a block-based plan.** With what they told you (core material + goal + duration), **you propose** a split of the course into 6 blocks (or fewer if the duration is short) and show it to the user to validate/adjust. For each block you need:
    - `{{BLOCK_N_TITLE}}` — short title
    - `{{BLOCK_N_TOPICS}}` — 1-2 lines on what's covered
    - `{{MILESTONE_N}}` — verifiable milestone at the end of the block (assessment, deliverable, mock, integrative exercise)

    Present it as a table and ask *"does this split work for you? anything you'd move?"*. Iterate until they give the OK.

    > 💡 If the core material has a natural structure (chapters, modules), respect it. Don't invent artificial divisions.
    > 💡 If the user only wants 4 blocks, don't force 6 — delete the extra ones in `progress/plan.md` and in the index of `knowledge/README.md`.

12. **Weekly schedule** — from `{{USER_DEDICATION}}`, propose a concrete table of days/durations and validate it with the user. Example if they said *"8 h/week in 3-4 sessions"* with weekday evening and Saturday morning availability:

    | Day | Session type | Duration |
    |---|---|---|
    | Tue 19:00 | Theory + guided practice | 90 min |
    | Thu 19:00 | Free practice | 90 min |
    | Sat 10:00 | Long session: medium-hard block or assessment | 120 min |

    → resolves `{{WEEKLY_SCHEDULE}}` with the agreed table (Markdown, ready to paste into `progress/plan.md`). **Don't copy the example as is** — adapt it to the days/hours the user declared. If the user doesn't want fixed days, write "*Free — the user distributes the {{USER_DEDICATION}} as they like*".

---

## PHASE 4 — Apply the changes

You now have every value. **Editing the files**:

1. Replace ALL `{{PLACEHOLDERS}}` in:
   - `AGENTS.md`
   - `progress/plan.md` (including `{{WEEKLY_SCHEDULE}}` with the agreed schedule table)
   - `progress/current-session.md`
   - `progress/README.md`
   - `knowledge/README.md` (block titles in the index; **delete the extra blocks** if the user asked for fewer than 6)
   - `knowledge/_template.md` (the reference to `{{MATERIAL_BASE}}`)
   - `materials/README.md`
   - `notes/README.md` (if it mentions any placeholder)
   - `.agents/skills/graduate/SKILL.md` (the cheatsheet title and post-mortem)

   Search the repo for the pattern `\{\{` (excluding this file) to make sure none is left unresolved.

2. Move this file:
   ```bash
   mv SETUP.md .agents/SETUP-done.md
   ```
   That way it stays as a historical record but is never triggered again.

3. **(Optional) Native skill registration.** The skills live in `.agents/skills/`, and every harness can use them by reading them (see `AGENTS.md §5`). If the user's harness supports native skills / slash commands in its own folder, offer to register them:
   ```bash
   node scripts/install-skills.mjs <harness>   # claude | codex | gemini | cursor | opencode | <custom dir>
   ```
   Claude Code adapters ship pre-installed in `.claude/skills/`.

4. Confirm to the user:

   > ✅ Course configured. You have:
   > - **Core material** in `materials/{{MATERIAL_FILE}}`
   > - **{{DURATION_WEEKS}}-week plan** in `progress/plan.md` (starts {{START_DATE}}, ends {{END_DATE}})
   > - **Empty wiki** in `knowledge/` — I'll fill it session by session, including interactive widgets in `knowledge/interactives/` when a concept is easier to grasp by playing with it
   > - **Your personal notebook** in `notes/` — you write, I only read and warn you about mistakes
   >
   > Shall we start Session 1 now or leave it for another day?

5. If they say yes, move to the normal `start-session` flow (with the plan already written). If not, save state and say goodbye.

---

## Course reset (reference for the user)

If at some point the user wants to restart, offer these three options:

**a) Progress reset** (keep wiki + notes + materials):
```bash
: > progress/plan.md
: > progress/current-session.md
: > progress/weaknesses.md
: > progress/log.md
rm -rf progress/solutions/*
find progress/weaknesses/ -type f ! -name '_template.md' ! -name '.gitkeep' -delete
```

**b) Progress + wiki reset** (keeps personal notes and materials):
```bash
# ...the above, plus:
find knowledge/ -type f ! -name 'README.md' ! -name '_template.md' ! -name '.gitkeep' -delete
```

**c) Full reset** — delete the repo and clone the template again (personal notes in `notes/` are lost — remind them).

---

## Repo structure (reference)

Four layers separated by lifecycle and by who writes:

```
{{COURSE_SHORT}}/
├── AGENTS.md                    ← tutor's system prompt (single source of truth)
├── CLAUDE.md, GEMINI.md         ← thin adapters → AGENTS.md
├── .agents/
│   ├── SETUP-done.md            ← this file, moved at the end
│   └── skills/                  ← canonical skills (playbooks)
│       ├── start-session/SKILL.md
│       ├── assessment/SKILL.md
│       ├── weakness-drill/SKILL.md
│       ├── end-block/SKILL.md
│       └── graduate/SKILL.md
├── .claude/                     ← Claude Code adapter (skill wrappers + optional hook)
├── scripts/install-skills.mjs   ← registers skills in other harnesses' native folders
│
├── materials/                   ← SOURCES (user adds, agent only reads; optional)
│   └── curated/                 ← sources gathered by the agent, only if the user gave none
├── knowledge/                   ← canonical WIKI (agent writes, user corrects)
│   └── interactives/            ← self-contained HTML widgets that illustrate concepts
├── notes/                       ← personal NOTEBOOK (user writes, agent only reads)
└── progress/                    ← learner STATE (agent maintains)
```

**Mental rule for classifying a new file**:
- Did someone write it *before* the course? → `materials/`
- Is it canonical domain knowledge, still useful in 6 months? → `knowledge/` (an interactive illustrating it → `knowledge/interactives/`)
- Is it the learner's subjective interpretation/doubts? → `notes/`
- Is it about this learner's journey/state in this course? → `progress/`
