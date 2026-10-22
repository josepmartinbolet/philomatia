---
name: assessment
description: Simulates a timed assessment (mock, exam, simulation, interview, etc.) with formal feedback at the end. Use when the user asks for a "mock", "exam", "simulation", "assess me", "test me" (or the equivalent in their language) or invokes /assessment. Adapts the format to the type of course (technical interview, certification exam, oral defense, etc.) and replicates the real dynamics (silences, staged hints, rubric-based evaluation).
---

# Skill: assessment

## When to use it
The user wants to test themselves in realistic conditions. Triggers: "mock", "simulation", "exam", "assess me", "test me", "quiz", "/assessment".

## Assessment types (adapt to the course)

Adapt this table to the course's real domain. Examples by type:

| Type | Duration | When to use |
|---|---|---|
| **quick** | 30 min, 1 short exercise | Warm-up, end of block 1 |
| **standard** | 45 min, medium exercise | Default, almost any week |
| **hard** | 60 min, hard exercise or 2 medium ones | Final blocks |
| **design** (if applicable) | 45 min, design case / oral defense | Courses with a design / architecture component |
| **oral** (if applicable) | 30 min, oral questions | Courses with conversational assessment |
| **full** | 2-3 h, complete mix | Final milestone |

If the user doesn't specify, **ask which one** and propose one consistent with the plan's current week.

## Assessment protocol

### Before starting
1. Confirm type and duration.
2. Ask about tool / language / format (depending on the course).
3. Warn: "From now on I'm your examiner. I won't give hints unless you ask explicitly or get really stuck. We start when you say ready."

### During (replicate the real scenario)
1. **Pose the exercise** with deliberate ambiguity (as in real life): give the base statement without all the edge cases. The user **must ask** to clarify.
2. Answer clarification questions concisely and realistically.
3. **Don't correct while they think.** Even if you see they're on the wrong track, let them get there alone. Only step in if they've been completely stuck for ≥ 10 min.
4. **Staged hints** when they ask for help:
   - Hint 1: guiding question ("what happens if you tackle X first?")
   - Hint 2: name the technique / concept ("think about [concept]")
   - Hint 3: give the full approach (penalized in the feedback)
5. When they finish, **ask them to trace / justify it** with a concrete case. If there are bugs or errors, let them find them.
6. Ask about **efficiency / quality / trade-offs** and **edge cases**.
7. Ask about **alternatives / improvements**.
8. Warn when 10 min are left and when 2 min are left.

> 🚫 **No interactive elements during the assessment** — they could give away the answer. If a concept would have benefited from one, note it and offer it in the feedback.

### Timing rules
- If they exceed the duration: let them finish with **5 extra min max**, then stop and move to feedback.
- If they finish very quickly (< 50% of the time): bring out a follow-up (harder variant).

## Feedback at the end (always by rubric)

Adapt the dimensions to the specific course. Generic example:

```
## 📊 Assessment feedback — [type] — [real duration]

### Exercise(s)
- [summarized statement]

### Rubric (1-5)
| Dimension | Score | Comment |
|---|---|---|
| **Initial clarification** | X/5 | ... |
| **Communication during** | X/5 | ... |
| **Approach / framing** | X/5 | ... |
| **Execution / correctness** | X/5 | ... |
| **Analysis (efficiency, edge cases, trade-offs)** | X/5 | ... |
| **Time management** | X/5 | ... |

**Indicative verdict**: 🟢 clear pass / 🟡 borderline pass / 🟠 borderline fail / 🔴 fail

### What you did well
- ...

### What to improve (actionable)
- ...

### New weaknesses detected → already added to progress/weaknesses/
- ...
```

If a weak dimension comes from a concept that is dynamic, parametric or spatial, offer an interactive element (`AGENTS.md §2.2`) to work on it **after** the feedback.

## After the assessment

- **Update `progress/log.md`** with the entry (include verdict and weak dimensions).
- **Create/update files in `progress/weaknesses/`** (one per new pattern detected) and regenerate the index `progress/weaknesses.md`.
- If the exercise revealed a **conceptual gap** that deserves a permanent note (not specific to the exercise), add it to `knowledge/` as if it were a *📌 For your notes* snippet. The details of the assessment itself go in `progress/log.md`, not in the wiki.
- If the assessment was a **plan milestone**, tick its checkbox in `progress/plan.md`.
- Suggest the next session: "Today's weak spot was X. Suggested next session: a drill on X with `weakness-drill`, or continue the plan with `start-session`."

## Mistakes to avoid

- ❌ Breaking character halfway and going back to a teaching tone ("ok, let me help you"). Keep the role until the feedback.
- ❌ Giving the solution without going through the 3 staged hints.
- ❌ Generic feedback like "well done, keep it up". It should sting a bit if there are things to fix.
- ❌ Forgetting to update `progress/` at the end.
