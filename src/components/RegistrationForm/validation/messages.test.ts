import { getValidationMessage } from './messages';

const testValue = 'test';
const testNumberValue = 2000;

describe('Messages tests', () => {
  test('getValidationMessage()', () => {
    let msg;

    msg = getValidationMessage('required');
    expect(msg(testValue)).toBe('field is required');

    msg = getValidationMessage('capitalized');
    expect(msg(testValue)).toBe('should be capitalized');

    msg = getValidationMessage('pattern');
    expect(msg(testValue)).toBe(`should match '${testValue}' expression`);
    msg = getValidationMessage('pattern', 'name');
    expect(msg(testValue)).toBe(`should consist of english letters, numbers and '_'`);
    msg = getValidationMessage('pattern', 'email');
    expect(msg(testValue)).toBe(`should be valid email address`);

    msg = getValidationMessage('minLength');
    expect(msg(testValue)).toBe(`length should be more or equal then ${testValue}`);

    msg = getValidationMessage('maxLength');
    expect(msg(testValue)).toBe(`length should be less or equal then ${testValue}`);

    msg = getValidationMessage('maxFileSize');
    expect(msg(testNumberValue)).toBe(
      `file size should be less or equal then ${Number(testNumberValue) / 1000} KB`
    );

    msg = getValidationMessage('fileType');
    expect(msg(testValue)).toBe(`should be ${testValue} file`);

    msg = getValidationMessage('age');
    expect(msg(testValue)).toBe(`age should be more or equal then ${testValue}`);

    msg = getValidationMessage('default');
    expect(msg(testValue)).toBe('invalid value');
  });
});
