# 🤖 Creator Agents

This directory contains definitions for creator-style agents that assist with content creation workflows.

## Overview

Creator agents automate parts of the creative process while maintaining human oversight for quality and brand consistency.

## Available Agents

### ✍️ Copy Helper (`copy-helper.agent.yaml`)

Assists with copywriting tasks:
- Draft generation for various content types
- Headline and subject line variations
- Copy editing and refinement
- Tone adjustment

**Guardrails:** Generates suggestions only; human approval required for all published content.

### 🖼️ Thumbnail Suggester (`thumbnail-suggester.agent.yaml`)

Assists with visual content planning:
- Thumbnail concepts and descriptions
- Image composition suggestions
- Visual hook ideas
- A/B test variations

**Guardrails:** Provides suggestions and references only; does not create final assets.

### 📅 Calendar Bot (`calendar-bot.agent.yaml`)

Assists with content scheduling:
- Optimal timing suggestions
- Content calendar population
- Publishing cadence recommendations
- Cross-channel coordination

**Guardrails:** Suggests schedules; human confirmation required before publishing.

### 🔄 Repurposer (`repurposer.agent.yaml`)

Assists with content repurposing:
- Long-form to short-form adaptation
- Cross-channel format suggestions
- Content atomization
- Archive mining for evergreen content

**Guardrails:** Generates derivatives; human review required for accuracy and relevance.

## Design Principles

### Agent Guardrails 👀

All agents follow these rules:
1. **Suggestions, not decisions** - Agents propose, humans approve
2. **Brand compliance** - All output respects `blackroad-os-brand` constraints
3. **Allowed fields only** - Agents can only modify designated fields
4. **Audit trail** - All agent actions are logged with timestamps
5. **Rollback capability** - Human can always override or undo agent actions

### What Agents CAN Do ✅
- Generate draft content
- Suggest improvements
- Propose schedules
- Analyze performance data
- Surface relevant archived content

### What Agents CANNOT Do 🚫
- Publish content without human approval
- Modify approved/published content
- Access sensitive platform tokens
- Override legal/brand review requirements
- Make claims about finance/legal/medical topics

## Feedback Loop Patterns 📊

### Revise Pattern
```
Agent generates → Human reviews → Human requests changes → Agent revises → Human approves
```

### A/B Pattern
```
Agent generates variants → Human selects for testing → System measures performance → Best performer archived
```

### Archive Best-of Pattern
```
Published content measured → Top performers flagged → Archived with success markers → Agent learns from patterns
```

## Integration with Workflows

Agents integrate with workflows defined in `/workflows/`:
- Check `allowed_agents` in each workflow state
- Respect state transition rules
- Honor approval requirements for high-risk content

## 🔐 Safety Notes

- Agents never store or access platform tokens directly
- Secret references point to external secret managers
- All agent-generated content is clearly marked (`agent_generated: true`)
- High-risk content always requires human + legal/brand review
