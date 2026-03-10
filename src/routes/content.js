'use strict';

const express = require('express');
const { designContentPillars, generateContentCalendar } = require('../../agents/content_strategist');
const { draftScript, tightenForRuntime } = require('../../agents/scriptwriter_longform');

const router = express.Router();

/**
 * POST /api/content/pillars
 * Design content pillars from brand goals and audience profile.
 * Body: { goals: BrandGoals, audience: AudienceProfile }
 */
router.post('/pillars', (req, res) => {
  const { goals, audience } = req.body;
  if (!goals || !audience) {
    return res.status(400).json({ error: 'Both goals and audience are required.' });
  }
  try {
    const pillars = designContentPillars(goals, audience);
    return res.json({ pillars });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/content/calendar
 * Generate a content calendar from pillars and cadence configuration.
 * Body: { pillars: ContentPillar[], cadence: CadenceConfig }
 */
router.post('/calendar', (req, res) => {
  const { pillars, cadence } = req.body;
  if (!pillars || !cadence) {
    return res.status(400).json({ error: 'Both pillars and cadence are required.' });
  }
  try {
    const calendar = generateContentCalendar(pillars, cadence);
    return res.json({ calendar });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/content/scripts/draft
 * Draft a script from an outline and brand voice profile.
 * Body: { outline: ScriptOutline, brandVoice: BrandVoiceProfile, targetMinutes?: number }
 */
router.post('/scripts/draft', (req, res) => {
  const { outline, brandVoice, targetMinutes } = req.body;
  if (!outline || !brandVoice) {
    return res.status(400).json({ error: 'Both outline and brandVoice are required.' });
  }
  try {
    let draft = draftScript(outline, brandVoice);
    if (typeof targetMinutes === 'number' && targetMinutes > 0) {
      draft = tightenForRuntime(draft, targetMinutes);
    }
    return res.json({ draft });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
