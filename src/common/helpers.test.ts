import { getAge } from './helpers';

describe('Helpers tests', () => {
  test('getAge()', () => {
    expect(getAge('2001/01/01')).toBe(22);
    expect(getAge('2023/01/01')).toBe(0);
  });
});
