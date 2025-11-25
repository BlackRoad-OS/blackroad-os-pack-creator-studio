# 🧬 Creative Artifact Schemas

This directory contains JSON schemas for creative artifacts in the Creator Studio Pack.

## Overview

Schemas define the structure and validation rules for creative objects like briefs, campaigns, and content assets.

## Schemas

### 📝 Creative Brief (`creative-brief.schema.json`)

Structure for creative briefs that kick off content creation:

- Project overview
- Target audience
- Key messages
- Deliverables
- Timeline
- Stakeholders

### 📆 Campaign (`campaign.schema.json`)

Structure for marketing campaigns:

- Campaign metadata
- Theme and goals
- Assets inventory
- Channel distribution
- Schedule
- Performance tracking

### 🎬 Content Asset (`content-asset.schema.json`)

Structure for individual content pieces:

- Asset metadata
- Content type
- Status and workflow state
- Channel assignments
- Brand references
- Performance metrics

## Usage

These schemas can be used for:

1. **Validation**: Ensure creative objects have required fields
2. **Automation**: Agents can generate compliant artifacts
3. **Integration**: Other systems can consume structured data
4. **Documentation**: Clear contract for creative objects

## Schema Design Principles

1. All schemas include `$schema` reference for JSON Schema draft-07
2. Required fields are explicitly listed
3. Enums constrain allowed values where appropriate
4. Descriptions explain each field's purpose
5. References to brand and other packs are URLs/IDs (not embedded data)

## 🔐 Safety Notes

Schemas include:
- `risk_level` field for content classification
- `requires_legal_review` flag for compliance
- `requires_brand_review` flag for brand consistency
- Timestamps for audit trails
