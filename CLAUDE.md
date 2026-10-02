# Project instructions

## Git workflow (mandatory)

- Before making ANY code change, create a feature branch first. This is the
  first action of a task, before editing any file — never commit directly to
  `main`.
- Branch names: `feat/*`, `fix/*`, `refactor/*`, `chore/*`.
- Commit per logical step, not one giant commit at the end. Conventional
  Commits, short messages (no long bodies).
- Run `/code-review` before merging a branch into `main`.

## Code style

- Pure functions, clear data/presentation separation, no redundant
  abstractions.
- No "AI slop": no superfluous wrapper functions, no over-commenting, no
  boilerplate.
- Match the existing style of the file being edited.
- Reuse existing utilities/mixins/config instead of inventing new ad-hoc
  values.
