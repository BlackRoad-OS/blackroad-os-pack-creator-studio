# Blackroad OS · Creator-Studio Pack (Gen-0)

CreatorPack-Gen-0 scaffolds a prompt-first toolkit for designers, writers, and video makers.
It ships with curated prompt presets, tiny agent helpers, and workflow templates that can be
rendered with Handlebars.

## Quickstart

```bash
pnpm i
pnpm br-create list
pnpm br-create run brand-kit
```

Set environment variables using `creator-studio.env.example` and export them before running
remote APIs.

## Layout

- `/prompts` — YAML presets with front-matter metadata for creative tasks.
- `/agents` — TypeScript and Python helpers for prompt generation, media remixing, and Canva
  rendering (stubs).
- `/workflows` — Handlebars JSON templates for Canva and FFmpeg jobs.
- `/lib` — Shared Handlebars renderer and zod schemas.
- `/src` — CLI entry for `br-create` commands.
- `/scripts` — Build-time helpers such as beacon injection.

## Commands

- `pnpm br-create list` — enumerate prompts and workflows.
- `pnpm br-create run <prompt>` — send a prompt preset to the configured agent.
- `pnpm br-create render <workflow>` — fill a workflow JSON template.
- `pnpm br-create render-canva <workflow>` — fill a Canva workflow JSON template.
- `pnpm lint` — run ESLint + Prettier checks.

## Roadmap

- TODO(creator-pack-next): Blender pipeline for 3D packshots.
- TODO(creator-pack-next): Audio mastering agent for podcast polish.
