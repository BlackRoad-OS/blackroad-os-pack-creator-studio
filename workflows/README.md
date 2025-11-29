# 🔁 Creative Workflows

This directory contains workflow definitions for the Creator Studio Pack.

## Overview

Creative workflows encode the lifecycle of content and campaigns from ideation through publishing and measurement.

## Workflows

### 🎬 Content Pipeline (`content-pipeline.yaml`)

The standard flow for any content piece:

```
ideation → draft → review → approve → publish → measure
```

**Stages:**
- **Ideation**: Brainstorm, research, outline
- **Draft**: Create initial content
- **Review**: Editorial/peer review
- **Approve**: Stakeholder sign-off (may include legal/brand)
- **Publish**: Deploy to channel(s)
- **Measure**: Track performance metrics

### 📆 Campaign Flow (`campaign-flow.yaml`)

End-to-end campaign lifecycle:

```
theme → assets → channels → schedule → launch → analyze → archive
```

**Stages:**
- **Theme**: Define campaign concept and goals
- **Assets**: Create/collect all content pieces
- **Channels**: Assign distribution channels
- **Schedule**: Set timing and cadence
- **Launch**: Execute campaign
- **Analyze**: Measure results
- **Archive**: Store for future reference

## Design Principles

Each workflow should answer:

1. 1️⃣ **What are we making?** (artifact type + channels)
2. 2️⃣ **Who must touch it?** (roles/agents: creator, editor, legal, brand, ops)
3. 3️⃣ **How do we track it?** (metrics, archive, dashboards)

## State Transitions

All workflows enforce valid state transitions:
- No skipping required stages
- Required approvals must be obtained before publishing
- High-risk content requires explicit legal/brand review

## 🔐 Safety Notes

```
// HIGH-RISK CAMPAIGN FLOW – LEGAL/BRAND APPROVAL REQUIRED
```

For content involving:
- Financial claims
- Legal/compliance statements
- Medical/health information
- Policy positions

Always require human review before publish.
