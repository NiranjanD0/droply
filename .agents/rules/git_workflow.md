---
trigger: always_on
description: Git workflow rules - pull with rebase, branch checkout before changes, commit only without pushing.
---

# Git Workflow & Branching Guardrails

## 1. Pre-Change Pull & Branching
- **Always Ask Before Branching:** When currently on an active task or fix branch, ALWAYS ask the user first: *"Do you want to create a new branch or continue working on the current branch `<branch-name>`?"*
- **Pull & Branch if on Main:** If on `main` or `master`, always pull latest updates from remote with rebase (`git pull --rebase origin main`) and checkout a dedicated branch before making changes.
- **No Direct Edits on Main:** NEVER make code changes directly on `main` or `master`.

## 2. Commit Only (Never Push)
- **Commit Locally:** Once changes are verified and tested, stage and commit them locally with a clear and concise commit message:
  ```bash
  git add .
  git commit -m "<type>(<scope>): <summary>"
  ```
- **Do NOT Push:** NEVER run `git push` to remote automatically. Pushing is reserved for the user, or only when explicitly asked by the user in the prompt.
