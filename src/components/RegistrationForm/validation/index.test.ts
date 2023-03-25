import { validate } from '.';
import { FormFieldOptions } from '../form-field';
import { textFileMock, imageFileMock } from '../../../__mocks__/file-instance-mock';

describe('Validation tests', () => {
  test('validate()', () => {
    const nameFormField: FormFieldOptions = {
      name: 'name',
      type: 'text',
      validation: {
        required: true,
        capitalized: true,
        minLength: 3,
        maxLength: 12,
        match: /^[\w]+$/,
      },
    };
    expect(validate(nameFormField, textFileMock)).toEqual({
      isValid: false,
      errors: ['invalid value'],
    });
    expect(validate(nameFormField, 'ValidName')).toEqual({
      isValid: true,
      errors: [],
    });
    expect(validate(nameFormField, '')).toEqual({
      isValid: false,
      errors: ['field is required'],
    });
    expect(validate(nameFormField, '@')).toEqual({
      isValid: false,
      errors: [
        'length should be more or equal then 3',
        `should consist of english letters, numbers and '_'`,
      ],
    });
    expect(validate(nameFormField, 'veryLongUserName')).toEqual({
      isValid: false,
      errors: ['should be capitalized', 'length should be less or equal then 12'],
    });

    const emailFormField: FormFieldOptions = {
      name: 'email',
      type: 'email',
      validation: {
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      },
    };
    expect(validate(emailFormField, textFileMock)).toEqual({
      isValid: false,
      errors: ['invalid value'],
    });
    expect(validate(emailFormField, 'valid@email.ru')).toEqual({
      isValid: true,
      errors: [],
    });
    expect(validate(emailFormField, 'invalid email')).toEqual({
      isValid: false,
      errors: ['should be valid email address'],
    });

    const fileFormField: FormFieldOptions = {
      name: 'file',
      type: 'file',
      validation: {
        maxFileSize: 100000,
        fileType: 'image',
      },
    };
    expect(validate(fileFormField, 'string')).toEqual({
      isValid: false,
      errors: ['invalid value', 'invalid value'],
    });
    expect(validate(fileFormField, imageFileMock)).toEqual({
      isValid: true,
      errors: [],
    });
    expect(validate(fileFormField, textFileMock)).toEqual({
      isValid: false,
      errors: ['should be image file'],
    });

    const birthdayField: FormFieldOptions = {
      name: 'birthday',
      type: 'date',
      validation: {
        age: 16,
      },
    };
    expect(validate(birthdayField, '2005-01-01')).toEqual({
      isValid: true,
      errors: [],
    });
    expect(validate(birthdayField, '2020-01-01')).toEqual({
      isValid: false,
      errors: [`age should be more or equal then ${birthdayField.validation?.age}`],
    });
  });
});
