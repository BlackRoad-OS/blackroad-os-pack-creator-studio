'use strict';

const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const { loadPromptPreset, renderPrompt } = require('../../agents/generate_prompt');
const rateLimit = require('express-rate-limit');

const router = express.Router();

const promptsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(promptsLimiter);

/**
 * GET /api/prompts
 * List all available prompt preset slugs.
 */
router.get('/', (req, res) => {
  try {
    const promptsDir = path.join(process.cwd(), 'prompts');
    const slugs = fs
      .readdirSync(promptsDir)
      .filter((f) => f.endsWith('.yml'))
      .map((f) => f.replace('.yml', ''));
    return res.json({ prompts: slugs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/prompts/:slug
 * Retrieve a specific prompt preset by slug.
 */
router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  try {
    const preset = loadPromptPreset(slug);
    return res.json({ preset });
  } catch (err) {
    const isNotFound = err.code === 'ENOENT';
    return res.status(isNotFound ? 404 : 500).json({ error: err.message });
  }
});

/**
 * POST /api/prompts/:slug/render
 * Render a prompt preset as text, optionally specifying an agent name.
 * Body: { agentName?: string }
 */
router.post('/:slug/render', (req, res) => {
  const { slug } = req.params;
  const agentName = req.body?.agentName || process.env.CREATOR_AGENT || 'lucidia';
  try {
    const preset = loadPromptPreset(slug);
    const rendered = renderPrompt(preset, agentName);
    return res.json({ rendered });
  } catch (err) {
    const isNotFound = err.code === 'ENOENT';
    return res.status(isNotFound ? 404 : 500).json({ error: err.message });
  }
});

module.exports = router;
