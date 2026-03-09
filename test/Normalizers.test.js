const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('Normalizers helper', () => {
  let context;

  beforeAll(() => {
    context = vm.createContext({});
    const scriptPath = path.join(__dirname, '..', 'js', 'internal', 'helper', 'Normalizers.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    const script = new vm.Script(scriptContent);
    script.runInContext(context);
  });

  test('normalizes sim and build keys', () => {
    expect(context.normalizeSimResultKey('talents_top')).toBe('talents-top');
    expect(context.normalizeBuildKey('my_build_name')).toBe('my-build-name');
  });

  test('normalizes result fight styles', () => {
    expect(context.normalizeFightStyleForResults('twotarget', 'push')).toBe('2T');
    expect(context.normalizeFightStyleForResults('threetarget', 'push')).toBe('3T');
    expect(context.normalizeFightStyleForResults('Dungeons', 'weekly')).toBe('Dungeons-Weekly');
    expect(context.normalizeFightStyleForResults('Composite', 'push')).toBe('Composite');
  });

  test('normalizes talent build fight styles', () => {
    expect(context.normalizeFightStyleForTalentBuild('twotarget')).toBe('2t');
    expect(context.normalizeFightStyleForTalentBuild('Dungeons')).toBe('dungeons');
    expect(context.normalizeFightStyleForTalentBuild('Composite')).toBe('composite');
  });
});
