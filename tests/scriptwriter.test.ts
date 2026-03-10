import { strict as assert } from 'assert';
import {
  draftScript,
  tightenForRuntime,
  ScriptOutline,
  BrandVoiceProfile,
} from '../agents/scriptwriter_longform';

describe('scriptwriter longform', () => {
  const outline: ScriptOutline = {
    title: 'Intro to AI Agents',
    keyPoints: ['What is an agent?', 'How orchestration works', 'Real-world examples'],
    audience: 'Developer operators',
  };

  const brandVoice: BrandVoiceProfile = {
    id: 'blackroad',
    adjectives: ['sharp', 'direct', 'practical'],
    avoid: ['jargon', 'fluff'],
  };

  describe('draftScript', () => {
    it('produces a draft with the same title as the outline', () => {
      const draft = draftScript(outline, brandVoice);
      assert.equal(draft.title, outline.title);
    });

    it('creates one segment per key point', () => {
      const draft = draftScript(outline, brandVoice);
      assert.equal(draft.segments.length, outline.keyPoints.length);
    });

    it('includes brand voice adjectives in tone notes', () => {
      const draft = draftScript(outline, brandVoice);
      brandVoice.adjectives.forEach((adj) => {
        assert.ok(draft.toneNotes.includes(adj), `toneNotes should mention "${adj}"`);
      });
    });

    it('includes avoid words in tone notes', () => {
      const draft = draftScript(outline, brandVoice);
      (brandVoice.avoid ?? []).forEach((word) => {
        assert.ok(draft.toneNotes.includes(word), `toneNotes should mention avoid word "${word}"`);
      });
    });

    it('sets a minimum duration of 5 minutes', () => {
      const shortOutline: ScriptOutline = {
        title: 'Quick intro',
        keyPoints: ['Single point'],
        audience: 'Anyone',
      };
      const draft = draftScript(shortOutline, brandVoice);
      assert.ok(draft.durationMinutes >= 5, 'minimum duration should be 5 minutes');
    });
  });

  describe('tightenForRuntime', () => {
    it('limits segments to fit within the target runtime', () => {
      const draft = draftScript(outline, brandVoice);
      const tight = tightenForRuntime(draft, 3);
      assert.ok(tight.segments.length <= Math.floor(3 / 2));
      assert.equal(tight.durationMinutes, 3);
    });

    it('keeps at least one segment even for very short targets', () => {
      const draft = draftScript(outline, brandVoice);
      const tight = tightenForRuntime(draft, 1);
      assert.ok(tight.segments.length >= 1, 'at least one segment should remain');
    });

    it('preserves title and tone notes after tightening', () => {
      const draft = draftScript(outline, brandVoice);
      const tight = tightenForRuntime(draft, 4);
      assert.equal(tight.title, draft.title);
      assert.equal(tight.toneNotes, draft.toneNotes);
    });
  });
});
