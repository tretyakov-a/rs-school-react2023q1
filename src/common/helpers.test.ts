import { imageFileMock } from '@src/__mocks__/file-instance-mock';
import { getAge, cloneFile, renderDate, addCommasToString, loadImage } from './helpers';

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

  test('addCommasToString()', () => {
    expect(addCommasToString('111')).toBe('111');
    expect(addCommasToString('1111')).toBe('1,111');
    expect(addCommasToString('1111111')).toBe('1,111,111');
  });

  test('loadImage()', async () => {
    const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC';
    const LOAD_SUCCESS_SRC = 'http://localhost/test.jpg';

    Object.defineProperty(global.Image.prototype, 'src', {
      set(src) {
        if (src === LOAD_FAILURE_SRC) {
          setTimeout(() => this.onerror(new Error('test error')));
        } else if (src === LOAD_SUCCESS_SRC) {
          setTimeout(() => this.onload());
        }
      },
    });

    await expect(loadImage(LOAD_FAILURE_SRC)).rejects.toThrow('test error');
    await expect(loadImage(LOAD_SUCCESS_SRC)).resolves.toBeInstanceOf(HTMLImageElement);
  });
});
