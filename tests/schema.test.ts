import { strict as assert } from 'assert';
import { promptPresetSchema, workflowTemplateSchema } from '../lib/schema';

describe('schema validation', () => {
  describe('promptPresetSchema', () => {
    it('accepts a valid prompt preset', () => {
      const data = {
        title: 'Brand Kit',
        description: 'Craft a brand story',
        model: 'gpt-4o',
        tags: ['branding'],
        steps: [{ text: 'Write an intro' }],
      };
      const result = promptPresetSchema.safeParse(data);
      assert.ok(result.success, 'valid preset should parse without errors');
    });

    it('accepts a preset with optional notes', () => {
      const data = {
        title: 'Logo Design',
        description: 'Generate logo prompt',
        model: 'gpt-4o',
        tags: ['design'],
        steps: [{ text: 'Step 1' }],
        notes: 'Some notes here',
      };
      const result = promptPresetSchema.safeParse(data);
      assert.ok(result.success, 'preset with notes should parse');
      if (result.success) {
        assert.equal(result.data.notes, 'Some notes here');
      }
    });

    it('rejects a preset missing required fields', () => {
      const data = { title: 'Incomplete' };
      const result = promptPresetSchema.safeParse(data);
      assert.ok(!result.success, 'incomplete preset should fail validation');
    });

    it('rejects a preset with steps that have no text', () => {
      const data = {
        title: 'Bad Steps',
        description: 'test',
        model: 'gpt-4o',
        tags: [],
        steps: [{}],
      };
      const result = promptPresetSchema.safeParse(data);
      assert.ok(!result.success, 'step without text should fail validation');
    });
  });

  describe('workflowTemplateSchema', () => {
    it('accepts a valid workflow template', () => {
      const data = {
        id: 'ffmpeg-transcode',
        description: 'Transcode a video file',
        engine: 'ffmpeg',
        template: { input: '{{input}}', output: '{{output}}' },
      };
      const result = workflowTemplateSchema.safeParse(data);
      assert.ok(result.success, 'valid workflow template should parse');
    });

    it('rejects an unknown engine type', () => {
      const data = {
        id: 'unknown-engine',
        description: 'test',
        engine: 'premiere',
        template: {},
      };
      const result = workflowTemplateSchema.safeParse(data);
      assert.ok(!result.success, 'unknown engine should fail validation');
    });
  });
});
