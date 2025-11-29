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
# blackroad-os-pack-creator-studio

💼 **Creator Studio Pack** 💼🎬 – content, campaigns, and creative workflows powered by BlackRoad OS.

---

## 🎯 Mission

Turn BlackRoad OS into a **creative production studio** for humans + agents:

- Encode workflows for content, campaigns, assets, and publishing across platforms
- Keep the chaos of "creative work" structured, tagged, and automatable (without killing the vibes)

---

## 🏗️ What This Pack Owns

### 🎬 Creative Workflows

- Flows for ideation → draft → review → approve → publish 🔁
- Content types: posts, threads, videos, emails, landing pages, decks 🧩
- Campaign structures: themes → assets → channels → schedule 📆

### 📓 Templates & Schemas

- Schemas for "creative artifact" (brief, script, copy, visuals, channels) 🧬
- Templates for:
  - Creative briefs 📝
  - Launch campaigns 🚀
  - Social/content calendars 📅
  - Brand/storytelling docs 📖

### 🤖 Creator Agents

- Definitions for creator-style agents (copy-helper, thumbnail-suggester, calendar-bot, repurposer) 🤖
- Guardrails: what they can auto-generate vs what must be human-approved 👀
- Feedback loop patterns (revise, A/B, archive best-performing ideas) 📊

### 🎨 Asset + Brand Integration

- Hooks into `blackroad-os-brand` for colors, logos, typography 🎨
- Fields to reference brand kits, slide decks, and email templates 🔗
- Conventions for storing links to Canva/Figma/etc. (not the assets themselves) 🧾

### 📊 Integration Glue

How campaigns + assets show up in:
- `blackroad-os-prism-console` (campaign/asset dashboards) 🕹️
- `blackroad-os-archive` (major campaign history, performance snapshots) 🧾
- Other Packs (Education courses, Finance promo, Legal reviews) 💼

---

## 🚫 What This Pack Does NOT Own

| Scope | Owned By |
|-------|----------|
| 🧠 Core app logic | `blackroad-os-core` |
| 🖥️ UI shell | `blackroad-os-web` |
| ☁️ Infra-as-code | `blackroad-os-infra` |
| 🎨 Brand system source of truth | `blackroad-os-brand` |
| 📚🏠 Docs/handbook | `blackroad-os-docs` / `blackroad-os-home` |
| 🧪 Raw research/math | `blackroad-os-research` |

---

## 📁 Directory Structure

```
blackroad-os-pack-creator-studio/
├── README.md                    # This file
├── workflows/                   # 🔁 Creative workflow definitions
│   ├── content-pipeline.yaml    # ideation → draft → review → approve → publish
│   ├── campaign-flow.yaml       # Campaign lifecycle workflow
│   └── README.md                # Workflow documentation
├── schemas/                     # 🧬 Creative artifact schemas
│   ├── creative-brief.schema.json
│   ├── campaign.schema.json
│   ├── content-asset.schema.json
│   └── README.md                # Schema documentation
├── templates/                   # 📝 Ready-to-use templates
│   ├── creative-brief.template.md
│   ├── launch-campaign.template.md
│   ├── content-calendar.template.md
│   ├── brand-storytelling.template.md
│   └── README.md                # Template documentation
├── agents/                      # 🤖 Creator agent definitions
│   ├── copy-helper.agent.yaml
│   ├── thumbnail-suggester.agent.yaml
│   ├── calendar-bot.agent.yaml
│   ├── repurposer.agent.yaml
│   └── README.md                # Agent documentation
└── integrations/                # 🔗 Integration hooks
    ├── brand-hooks.yaml         # blackroad-os-brand integration
    ├── cross-pack.yaml          # Connections to other packs
    └── README.md                # Integration documentation
```

---

## 🧪 Testing & Quality

### For Workflows

- ✅ Schema tests for creative objects (briefs, campaigns, assets) 🧬
- ✅ Tests on state transitions (draft → in-review → approved → published) 🔁
- ✅ Tests that prevent publishing without required approvals (e.g., legal/brand on some flows) ⚠️

### For Agent Configs

- 🧪 Validate that agents only touch allowed fields/channels
- 🧪 Ensure they respect brand tokens + constraints from `blackroad-os-brand`
- 🧪 Test "repurpose" flows (e.g., long-form → short-form) for shape + metadata, not subjective "quality"

---

## 🔐 Safety & Risk

Creative output can still be risky (claims, compliance, IP):

- ⚠️ For high-risk content (finance/legal/medical/policy claims) require flag + human/Legal review
- 🧾 Log major published artifacts + campaigns to `archive` with IDs + timestamps
- 🚫 Do not store private platform tokens here; reference secret locations only

For sensitive campaigns, mark clearly:

```
// HIGH-RISK CAMPAIGN FLOW – LEGAL/BRAND APPROVAL REQUIRED
```

---

## 📏 Design Principles

**`blackroad-os-pack-creator-studio` = "creator pipeline as a product Pack"**

- 💼 Universal patterns (brief → draft → review → publish → measure)
- 🎬 Content models and flows live here; rendering and infra live elsewhere

Every workflow/template should answer:

1. 1️⃣ What are we making? (artifact type + channels)
2. 2️⃣ Who must touch it? (roles/agents: creator, editor, legal, brand, ops)
3. 3️⃣ How do we know it's done and how do we track results? (metrics, archive, dashboards)

---

## 🧬 Emoji Legend

| Emoji | Meaning |
|-------|---------|
| 💼 | Pack / Vertical |
| 🎬 | Content / Campaigns |
| 📚 | Briefs / Scripts / Docs |
| 🧬 | Schemas / Creative Objects |
| 🤖 | Creator Agents |
| 📊 | Performance / Metrics |
| 🧾 | History / Best-of Archive |
| 🔁 | Workflow / Pipeline |
| 📆 | Schedule / Calendar |
| 🎨 | Brand / Design |
| 🔗 | Integration / Reference |

---

## 🎯 Success Criteria

If a creative director, marketer, or "Creator-Agent Architect" lands here, they should be able to:

1. 1️⃣ Spin up a new campaign using standard flows and templates
2. 2️⃣ Wire in agents to help draft, repurpose, and schedule content without losing control
3. 3️⃣ See how creative work connects to brand, legal, archive, and dashboards across BlackRoad OS

---

## 🚀 Getting Started

1. Browse [`workflows/`](./workflows/) to understand the creative pipeline
2. Check [`schemas/`](./schemas/) for creative artifact structures
3. Use [`templates/`](./templates/) to start new briefs, campaigns, or calendars
4. Configure [`agents/`](./agents/) to automate parts of your creative process
5. Review [`integrations/`](./integrations/) to connect with other BlackRoad OS packs

---

## 📄 License

Part of the BlackRoad OS ecosystem. See organization-level licensing for details.
