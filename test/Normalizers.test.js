import { normalizeSimResultKey, normalizeBuildKey, normalizeFightStyleForResults, normalizeFightStyleForTalentBuild } from '../src/utils/Normalizers.module.js';

describe('Normalizers helper', () => {
  test('normalizes sim and build keys', () => {
    expect(normalizeSimResultKey('talents_top')).toBe('talents-top');
    expect(normalizeBuildKey('my_build_name')).toBe('my-build-name');
  });

  test('normalizes result fight styles', () => {
    expect(normalizeFightStyleForResults('twotarget', 'push')).toBe('2T');
    expect(normalizeFightStyleForResults('threetarget', 'push')).toBe('3T');
    expect(normalizeFightStyleForResults('Dungeons', 'weekly')).toBe('Dungeons-Weekly');
    expect(normalizeFightStyleForResults('Composite', 'push')).toBe('Composite');
  });

  test('normalizes talent build fight styles', () => {
    expect(normalizeFightStyleForTalentBuild('twotarget')).toBe('2t');
    expect(normalizeFightStyleForTalentBuild('Dungeons')).toBe('dungeons');
    expect(normalizeFightStyleForTalentBuild('Composite')).toBe('composite');
  });
});


