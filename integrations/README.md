# 🔗 Integrations

This directory contains integration hooks for connecting the Creator Studio Pack with other parts of the BlackRoad OS ecosystem.

## Overview

Integrations define how creative workflows, assets, and campaigns connect with:
- Brand system (`blackroad-os-brand`)
- Archive system (`blackroad-os-archive`)
- Dashboard console (`blackroad-os-prism-console`)
- Other vertical packs

## Integration Files

### 🎨 Brand Hooks (`brand-hooks.yaml`)

Defines how Creator Studio connects to brand assets:
- Color palette sync
- Typography references
- Logo variant usage
- Voice and tone guidelines
- Visual style constraints

### 💼 Cross-Pack (`cross-pack.yaml`)

Defines connections to other BlackRoad OS packs:
- Education Pack (course launches)
- Finance Pack (financial promotions)
- Legal Pack (compliance reviews)
- Archive (campaign history)
- Prism Console (dashboards)

## Integration Principles

### Reference, Don't Duplicate
- Store **links** to assets, not the assets themselves
- Reference brand tokens by ID, not embedded values
- Point to external tools (Canva, Figma) via URLs

### Respect Ownership
- Brand system is source of truth for visual identity
- Legal pack owns compliance review workflows
- Archive owns historical data

### Security
- Never store platform tokens in this pack
- Reference secret locations only
- Log all cross-pack data exchanges

## Common Integration Patterns

### On Create
When a new brief/campaign is created:
1. Sync brand references from `blackroad-os-brand`
2. Register with `blackroad-os-prism-console` for tracking

### On Publish
When content is published:
1. Log to `blackroad-os-archive` with timestamps
2. Update dashboard metrics in `blackroad-os-prism-console`

### On Archive
When content/campaign is archived:
1. Create full record in `blackroad-os-archive`
2. Include performance snapshots
3. Mark for future repurposing analysis
