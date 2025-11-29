# Creator Studio Pack

Creator-focused pack for BlackRoad OS with content planning, longform scripting, and shortform clip workflows.

## Repo Structure
- `pack.yaml` — pack manifest (id, roles, dependencies)
- `agents/` — agent implementations and metadata
- `workflows/` — orchestrations for campaigns and calendars
- `presets/` — reusable content pillar and brand voice profiles
- `docs/` — playbooks, pipeline map, and rights guidance
- `tests/` — TypeScript and Python tests for agents
- `.github/workflows/` — CI for linting, tests, and YAML validation

## Integration with BlackRoad OS
1. **Register the pack** in your Pack Index using `pack.yaml` so agents and workflows are discoverable.
2. **Trigger workflows** via the Operator API:
   ```ts
   // Example: triggering a campaign via the Operator API
   await client.startWorkflow("creator_campaign_launch", {
     goals,
     audience,
   });
   ```
3. **Customize presets** by editing `presets/content_pillars.yaml` and `presets/brand_voice_profiles.yaml` or layering deployment-specific overrides.
4. **Observe in Prism Console (future hook):** upcoming calendars, running campaigns, and performance metrics can be surfaced once the Prism dashboard adapter is wired.

## Usage
- Use `workflows/campaign_launch.workflow.yaml` for end-to-end campaign orchestration (pillars → scripts → clips → calendar).
- Use `workflows/weekly_content_calendar.workflow.yaml` for recurring calendar refreshes informed by performance signals.

## Testing
- Node/TypeScript tests: `npm test`
- Python tests: `pytest`
- YAML validation: `python scripts/validate_yaml.py`

## Limitations
- Channel adapters (YouTube, TikTok, etc.) are not wired; outputs are adapter-ready stubs.
- Analytics hooks are placeholders; performance insights should be injected via API or data warehouse taps.
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
# blackroad-os-pack-creator-studio

A service for creating and managing OS packs in the BlackRoad OS ecosystem.

## Overview

BlackRoad OS Pack Creator Studio provides tools and APIs for creating, editing, and managing OS packs for the BlackRoad OS platform.

## Local Development

### Prerequisites

- Node.js >= 18.0.0
- npm

### Installation

```bash
npm install
```

### Running Locally

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm run start:studio
```

The service will start on port 8080 by default (or the port specified in the `PORT` environment variable).

## Build & Deploy

### Building

This project uses Nixpacks for building on Railway. No build step is required for JavaScript.

### Deployment

The service is configured to deploy to Railway using the `railway.toml` configuration file.

Deploy command:
```bash
npm run start:studio
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port the server listens on | `8080` |
| `SERVICE_NAME` | Name of the service | `blackroad-os-pack-creator-studio` |
| `ENVIRONMENT` | Deployment environment | `production` |

## Healthcheck

The health endpoint is available at `/health` and returns:

```json
{
  "status": "ok",
  "service": "blackroad-os-pack-creator-studio"
}
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Service information |
| GET | `/health` | Health check endpoint |

## License

MIT
