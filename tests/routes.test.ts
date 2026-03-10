import { strict as assert } from 'assert';
import request from 'supertest';

// The app is CommonJS JavaScript; with tsx active it can require TS agent modules.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const app = require('../src/index');

describe('API routes', () => {
  describe('GET /', () => {
    it('returns service info with endpoint map', async () => {
      const res = await request(app).get('/').expect(200);
      assert.equal(res.body.service, 'blackroad-os-pack-creator-studio');
      assert.ok(res.body.endpoints, 'response should include endpoints map');
    });
  });

  describe('GET /health', () => {
    it('returns status ok', async () => {
      const res = await request(app).get('/health').expect(200);
      assert.equal(res.body.status, 'ok');
    });
  });

  describe('GET /api/prompts', () => {
    it('lists available prompt slugs', async () => {
      const res = await request(app).get('/api/prompts').expect(200);
      assert.ok(Array.isArray(res.body.prompts), 'prompts should be an array');
      assert.ok(res.body.prompts.includes('brand-kit'), 'should include brand-kit prompt');
    });
  });

  describe('GET /api/prompts/:slug', () => {
    it('returns a prompt preset by slug', async () => {
      const res = await request(app).get('/api/prompts/brand-kit').expect(200);
      assert.equal(res.body.preset.title, 'Brand Kit Narrative');
      assert.ok(Array.isArray(res.body.preset.steps), 'steps should be an array');
    });

    it('returns 404 for an unknown slug', async () => {
      await request(app).get('/api/prompts/does-not-exist').expect(404);
    });
  });

  describe('POST /api/prompts/:slug/render', () => {
    it('renders a prompt preset with default agent', async () => {
      const res = await request(app)
        .post('/api/prompts/brand-kit/render')
        .send({})
        .expect(200);
      assert.ok(res.body.rendered.includes('Brand Kit Narrative'), 'rendered output should include title');
    });

    it('renders with a custom agent name', async () => {
      const res = await request(app)
        .post('/api/prompts/brand-kit/render')
        .send({ agentName: 'aria' })
        .expect(200);
      assert.ok(res.body.rendered.includes('agent: aria'), 'rendered output should include "agent: aria" in header');
    });
  });

  describe('GET /api/workflows', () => {
    it('lists available workflow template names', async () => {
      const res = await request(app).get('/api/workflows').expect(200);
      assert.ok(Array.isArray(res.body.workflows), 'workflows should be an array');
      assert.ok(res.body.workflows.includes('ffmpeg-transcode'), 'should include ffmpeg-transcode');
    });
  });

  describe('POST /api/workflows/:name/render', () => {
    it('renders an ffmpeg workflow template', async () => {
      const res = await request(app)
        .post('/api/workflows/ffmpeg-transcode/render')
        .send({
          context: {
            input: 'clip.mp4',
            output: 'out.mp4',
            filters: ['scale=1280:-1'],
            bitrate: '6M',
          },
        })
        .expect(200);
      const parsed = JSON.parse(res.body.rendered);
      assert.equal(parsed.input, 'clip.mp4');
      assert.equal(parsed.bitrate, '6M');
    });

    it('returns 400 when context is missing', async () => {
      await request(app)
        .post('/api/workflows/ffmpeg-transcode/render')
        .send({})
        .expect(400);
    });

    it('returns 404 for an unknown workflow name', async () => {
      await request(app)
        .post('/api/workflows/nonexistent/render')
        .send({ context: { input: 'x' } })
        .expect(404);
    });
  });

  describe('POST /api/content/pillars', () => {
    it('designs content pillars from goals and audience', async () => {
      const res = await request(app)
        .post('/api/content/pillars')
        .send({
          goals: { primaryObjective: 'Build community', secondaryObjectives: ['signups'] },
          audience: {
            name: 'Builders',
            motivations: ['ship faster'],
            painPoints: ['context switching'],
            preferredChannels: ['youtube', 'twitter'],
          },
        })
        .expect(200);
      assert.ok(Array.isArray(res.body.pillars), 'pillars should be an array');
      assert.ok(res.body.pillars.length > 0, 'should return at least one pillar');
      res.body.pillars.forEach((p: { id: string; label: string }) => {
        assert.ok(p.id, 'each pillar should have an id');
        assert.ok(p.label, 'each pillar should have a label');
      });
    });

    it('returns 400 when required fields are missing', async () => {
      await request(app)
        .post('/api/content/pillars')
        .send({ goals: { primaryObjective: 'test' } })
        .expect(400);
    });
  });

  describe('POST /api/content/calendar', () => {
    it('generates a content calendar from pillars and cadence', async () => {
      const pillarsRes = await request(app)
        .post('/api/content/pillars')
        .send({
          goals: { primaryObjective: 'Grow audience' },
          audience: {
            name: 'Creators',
            motivations: ['create more'],
            painPoints: ['time'],
            preferredChannels: ['twitter'],
          },
        });
      const { pillars } = pillarsRes.body;

      const res = await request(app)
        .post('/api/content/calendar')
        .send({
          pillars,
          cadence: { frequency: 'weekly', slotsPerWeek: 3, preferredDays: ['Mon', 'Wed', 'Fri'] },
        })
        .expect(200);
      assert.ok(Array.isArray(res.body.calendar), 'calendar should be an array');
      assert.equal(res.body.calendar.length, 3);
    });

    it('returns 400 when required fields are missing', async () => {
      await request(app)
        .post('/api/content/calendar')
        .send({ pillars: [] })
        .expect(400);
    });
  });

  describe('POST /api/content/scripts/draft', () => {
    it('drafts a script from outline and brand voice', async () => {
      const res = await request(app)
        .post('/api/content/scripts/draft')
        .send({
          outline: {
            title: 'Agent Intro',
            keyPoints: ['What are agents?', 'Why use them?'],
            audience: 'Developers',
          },
          brandVoice: {
            id: 'blackroad',
            adjectives: ['sharp', 'clear'],
            avoid: ['hype'],
          },
        })
        .expect(200);
      assert.equal(res.body.draft.title, 'Agent Intro');
      assert.ok(Array.isArray(res.body.draft.segments));
    });

    it('applies targetMinutes when provided', async () => {
      const res = await request(app)
        .post('/api/content/scripts/draft')
        .send({
          outline: {
            title: 'Long video',
            keyPoints: ['A', 'B', 'C', 'D', 'E'],
            audience: 'Everyone',
          },
          brandVoice: { id: 'test', adjectives: ['calm'] },
          targetMinutes: 3,
        })
        .expect(200);
      assert.equal(res.body.draft.durationMinutes, 3);
    });

    it('returns 400 when required fields are missing', async () => {
      await request(app)
        .post('/api/content/scripts/draft')
        .send({ outline: { title: 'test', keyPoints: [], audience: 'x' } })
        .expect(400);
    });
  });
});
