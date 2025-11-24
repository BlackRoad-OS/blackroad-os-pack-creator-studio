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
