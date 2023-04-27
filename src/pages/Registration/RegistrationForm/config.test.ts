import { formFieldsOptions, formFields } from './config';
import { isRadioInputDataArray, isOptionsDataArray } from './data';

describe('Test config', () => {
  const configItems = [
    'name',
    'password',
    'email',
    'birthday',
    'country',
    'programmingLanguage',
    'gender',
    'avatar',
    'subscribe',
  ];

  test('config is correct', () => {
    const keys = Object.keys(formFieldsOptions);
    configItems.forEach((item) => {
      expect(keys.includes(item)).toBe(true);
      expect(formFields.find((field) => field.name === item)).not.toBeUndefined();
    });
  });

  test('data check functions work correctly', () => {
    expect(isRadioInputDataArray(formFieldsOptions.gender.data)).toBe(true);
    expect(isRadioInputDataArray(formFieldsOptions.country.data)).toBe(false);

    expect(isOptionsDataArray(formFieldsOptions.gender.data)).toBe(false);
    expect(isOptionsDataArray(formFieldsOptions.country.data)).toBe(true);
  });
});
