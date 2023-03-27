import { getLabel } from './links';

describe('Links tests', () => {
  test('getLabel()', () => {
    expect(getLabel('/')).toBe('Home');
    expect(getLabel('/about')).toBe('About Us');
    expect(getLabel('/forms')).toBe('Forms');
    expect(getLabel('/bad-route')).toBe('404');
  });
});
