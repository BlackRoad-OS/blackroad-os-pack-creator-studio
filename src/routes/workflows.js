'use strict';

const express = require('express');
const fs = require('node:fs/promises');
const path = require('node:path');
const { renderTemplate } = require('../../lib/template');
const rateLimit = require('express-rate-limit');

const router = express.Router();

const workflowsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(workflowsLimiter);

/**
 * GET /api/workflows
 * List all available workflow template names.
 */
router.get('/', async (req, res) => {
  try {
    const workflowsDir = path.join(process.cwd(), 'workflows');
    const entries = await fs.readdir(workflowsDir);
    const names = entries
      .filter((f) => f.endsWith('.json.hbs'))
      .map((f) => f.replace('.json.hbs', ''));
    return res.json({ workflows: names });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/workflows/:name/render
 * Render a Handlebars workflow template with a provided context object.
 * Body: { context: Record<string, unknown> }
 */
router.post('/:name/render', async (req, res) => {
  const { name } = req.params;
  const context = req.body?.context;
  if (!context || typeof context !== 'object') {
    return res.status(400).json({ error: 'A context object is required.' });
  }
  try {
    const filePath = path.join(process.cwd(), 'workflows', `${name}.json.hbs`);
    const source = await fs.readFile(filePath, 'utf-8');
    const rendered = renderTemplate(source, context);
    return res.json({ rendered });
  } catch (err) {
    const isNotFound = err.code === 'ENOENT';
    return res.status(isNotFound ? 404 : 500).json({ error: err.message });
  }
});

module.exports = router;
