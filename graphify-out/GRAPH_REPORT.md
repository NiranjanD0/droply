# Graph Report - droply  (2026-10-22)

## Corpus Check
- 24 files · ~463,601 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 25 file(s) not represented in the graph (top: .ttf 19, (none) 2, .ico 2)

## Summary
- 193 nodes · 240 edges · 15 communities (12 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `828fbde0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- floating-3d-particles.tsx
- components.json
- package.json
- RoomSettings.tsx
- compilerOptions
- Notifications.jsx
- Droply
- dependencies
- magic-card.tsx
- devDependencies
- Git Workflow & Branching Guardrails
- Ponytail, lazy senior dev mode
- AGENTS.md
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Droply` - 11 edges
3. `RoomSettings()` - 9 edges
4. `react` - 9 edges
5. `Hero()` - 7 edges
6. `tailwind` - 6 edges
7. `aliases` - 6 edges
8. `Floating3DParticles()` - 6 edges
9. `ToastProvider()` - 5 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `ToastProvider()`  [EXTRACTED]
  app/layout.tsx → components/Notifications.jsx
- `Home()` --calls--> `Hero()`  [EXTRACTED]
  app/page.tsx → components/Hero.tsx
- `Hero()` --calls--> `Floating3DParticles()`  [EXTRACTED]
  components/Hero.tsx → components/ui/floating-3d-particles.tsx
- `RoomSettings()` --calls--> `useToast()`  [EXTRACTED]
  components/RoomSettings.tsx → components/Notifications.jsx
- `Hero()` --calls--> `FeaturesShowcase()`  [EXTRACTED]
  components/Hero.tsx → components/FeaturesShowcase.tsx

## Import Cycles
- None detected.

## Communities (15 total, 3 thin omitted)

### Community 0 - "floating-3d-particles.tsx"
Cohesion: 0.11
Nodes (17): Tile, VerticalTilesProps, Alert(), alertVariants, AnimatedList, AnimatedListItem(), AnimatedListProps, deriveProjection() (+9 more)

### Community 1 - "components.json"
Cohesion: 0.09
Nodes (22): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+14 more)

### Community 2 - "package.json"
Cohesion: 0.09
Nodes (21): eslintConfig, name, private, scripts, build, dev, lint, start (+13 more)

### Community 3 - "RoomSettings.tsx"
Cohesion: 0.17
Nodes (16): Home(), FeaturesShowcase(), FeaturesShowcaseProps, Hero(), AdvancedSidebar(), FieldLabel(), IconInput(), NumberStepper() (+8 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 5 - "Notifications.jsx"
Cohesion: 0.16
Nodes (13): geistMono, geistSans, metadata, RootLayout(), App(), DemoButtons(), renderIcon(), Toast() (+5 more)

### Community 6 - "Droply"
Cohesion: 0.11
Nodes (17): Architecture, Communication, Contributing, Droply, Features, File Sharing, File Transfer Flow, Getting Started (+9 more)

### Community 7 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, @base-ui/react, class-variance-authority, cn, lucide-react, motion, next, next-themes (+5 more)

### Community 8 - "magic-card.tsx"
Cohesion: 0.31
Nodes (8): isOrbMode(), MagicCard(), MagicCardBaseProps, MagicCardGradientProps, MagicCardOrbProps, MagicCardProps, ResetReason, next-themes

### Community 9 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 10 - "Git Workflow & Branching Guardrails"
Cohesion: 0.50
Nodes (3): 1. Pre-Change Pull & Branching, 2. Commit Only (Never Push), Git Workflow & Branching Guardrails

### Community 11 - "Ponytail, lazy senior dev mode"
Cohesion: 0.50
Nodes (3): Before you write, Ponytail, lazy senior dev mode, The smallest complete change

## Knowledge Gaps
- **10 isolated node(s):** `@base-ui/react`, `react-dom`, `shadcn`, `tw-animate-css`, `@tailwindcss/postcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 120 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `floating-3d-particles.tsx` to `magic-card.tsx`, `package.json`, `RoomSettings.tsx`, `Notifications.jsx`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **What connects `@base-ui/react`, `react-dom`, `shadcn` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `floating-3d-particles.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10541310541310542 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._