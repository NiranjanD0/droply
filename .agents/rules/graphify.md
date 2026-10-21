---
trigger: always_on
description: Consult the graphify knowledge graph at graphify-out/ for codebase and architecture questions.
---

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- For codebase or architecture questions, always use Graphify first. When `graphify-out/graph.json` exists, run `graphify query "<question>"` (CLI) or `query_graph` (MCP) before broad search. Use `graphify path "<A>" "<B>"` / `shortest_path` for relationships and `graphify explain "<concept>"` / `get_node` for focused concepts. These return a scoped subgraph, usually much smaller than `GRAPH_REPORT.md` or raw grep output.
- If Graphify data is missing or incomplete for the question, generate or refresh it with `graphify update .` before continuing, then re-query Graphify.
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)

## Development & Safety Constraints
- **No Mock Data:** Strictly avoid creating mock or placeholder data arrays. Always implement real data integration patterns or model mapping.
- **UI Components:** Use shadcn/ui components exclusively when building, styling, or scaffolding user interface elements.
- **Database Guardrails:** Never write code or execute operations that delete database records without explicitly prompting the user and obtaining consent first.
- **End-to-End Integration:** When creating or modifying features, always build the complete pipeline end-to-end (Database Schema -> Backend Controller/API -> Frontend Service Layer -> shadcn/ui View Component). Never leave a feature half-implemented or hardcoded.

## Git & Branching Rules
- **Pre-Change Branch Confirmation:** If already on a working branch, ALWAYS ask the user whether to create a new branch or continue on the current branch. If on `main` or `master`, pull latest changes (`git pull --rebase origin main`) and checkout a new dedicated task branch. Never make code changes directly on `main` or `master`.
- **Commit Only, Do NOT Push:** When changes are completed, stage and commit them locally (`git commit`). Strictly DO NOT run `git push` to remote. Never push unless the user explicitly requests you to push.
- **Dedicated Branch per Task:** All new features, refactors, and fixes must live on their own separate branch.
