import { strict as assert } from 'assert';
import { renderTemplate } from '../lib/template';

describe('template rendering', () => {
  it('interpolates simple string values', () => {
    const source = '{"input": "{{input}}", "output": "{{output}}"}';
    const result = renderTemplate(source, { input: 'a.mp4', output: 'b.mp4' });
    assert.equal(result, '{"input": "a.mp4", "output": "b.mp4"}');
  });

  it('interpolates array values with #each helper', () => {
    const source = '[{{#each items}}"{{this}}"{{#unless @last}},{{/unless}}{{/each}}]';
    const result = renderTemplate(source, { items: ['x', 'y', 'z'] });
    assert.equal(result, '["x","y","z"]');
  });

  it('handles an empty array without error', () => {
    const source = '[{{#each items}}"{{this}}"{{/each}}]';
    const result = renderTemplate(source, { items: [] });
    assert.equal(result, '[]');
  });

  it('does not escape special characters (noEscape: true)', () => {
    const source = '{{value}}';
    const result = renderTemplate(source, { value: '<b>&amp;</b>' });
    assert.equal(result, '<b>&amp;</b>', 'HTML entities should not be double-escaped');
  });

  it('renders a realistic ffmpeg template', () => {
    const source = `{
  "job": "ffmpeg-transcode",
  "engine": "ffmpeg",
  "input": "{{input}}",
  "output": "{{output}}",
  "filters": [{{#each filters}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}],
  "bitrate": "{{bitrate}}"
}`;
    const result = renderTemplate(source, {
      input: 'input.mp4',
      output: 'output.mp4',
      filters: ['scale=1280:-1', 'format=yuv420p'],
      bitrate: '6M',
    });
    const parsed = JSON.parse(result);
    assert.equal(parsed.job, 'ffmpeg-transcode');
    assert.equal(parsed.input, 'input.mp4');
    assert.deepEqual(parsed.filters, ['scale=1280:-1', 'format=yuv420p']);
    assert.equal(parsed.bitrate, '6M');
  });
});
