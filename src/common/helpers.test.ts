import { imageFileMock } from '@src/__mocks__/file-instance-mock';

import { getAge, cloneFile } from './helpers';

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
});
