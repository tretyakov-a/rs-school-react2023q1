import { imageFileMock } from '@src/__mocks__/file-instance-mock';

import { getAge, cloneFile, renderDate } from './helpers';

describe('Helpers tests', () => {
  test('getAge()', () => {
    expect(getAge('2001/01/01')).toBe(22);
    expect(getAge('2023/01/01')).toBe(0);
  });

  test('cloneFile()', () => {
    const file = cloneFile(imageFileMock);
    expect(file.size).toBe(imageFileMock.size);
    expect(file.type).toBe(imageFileMock.type);
    expect(file.name).toBe(imageFileMock.name);
  });

  test('renderDate()', () => {
    expect(renderDate('2012-01-01')).toBe('January 1, 2012');
    expect(renderDate('2012-01-01', 'ru-RU')).toBe('1 января 2012 г.');
  });
});
