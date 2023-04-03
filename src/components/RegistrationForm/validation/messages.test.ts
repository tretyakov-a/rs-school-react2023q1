import { getValidationMessage } from './messages';
import { ValidationMessageKey } from './types';

const testValue = '2000';

const testData: [[key: ValidationMessageKey, name?: string], string][] = [
  [['required'], 'field is required'],
  [['capitalized'], 'should be capitalized'],
  [['pattern'], `should match '${testValue}' expression`],
  [['pattern', 'name'], `should consist of english letters, numbers and '_'`],
  [['pattern', 'email'], `should be valid email address`],
  [['minLength'], `length should be more or equal then ${testValue}`],
  [['maxLength'], `length should be less or equal then ${testValue}`],
  [['maxFileSize'], `file size should be less or equal then ${Number(testValue) / 1000} KB`],
  [['fileType'], `should be ${testValue} file`],
  [['age'], `age should be more or equal then ${testValue}`],
  [['default'], 'invalid value'],
];

describe('Messages tests', () => {
  test('getValidationMessage()', () => {
    let msg;

    testData.forEach(([params, expected]) => {
      msg = getValidationMessage(...params);
      expect(msg(testValue)).toBe(expected);
    });
  });
});
