import { getAge } from '@common/helpers';
import { FormFieldOptions } from '../form-field';
import { ValidationOptions, ValidationResult, Validator } from './types';
import { getMessage } from './messages';

const withStringCheck =
  <T>(fn: Validator<T>) =>
  (...args: Parameters<Validator<T>>) => {
    if (typeof args[1] !== 'string') return null;
    return fn(...args);
  };

const withFileCheck =
  <T>(fn: Validator<T>) =>
  (...args: Parameters<Validator<T>>) => {
    if (!(args[1] instanceof File)) return null;
    if (args[1].size === 0) return false;
    return fn(...args);
  };

const validateRequired: Validator<boolean> = withStringCheck((validationValue, inputValue) => {
  return validationValue && inputValue === '';
});

const capitalizedValidator: Validator<boolean> = withStringCheck((validationValue, inputValue) => {
  const firstLetter = (inputValue as string)[0];
  return validationValue && firstLetter !== firstLetter.toUpperCase();
});

const minLengthValidator: Validator<number> = withStringCheck((validationValue, inputValue) => {
  return inputValue.length < validationValue;
});

const maxLengthValidator: Validator<number> = withStringCheck((validationValue, inputValue) => {
  return inputValue.length > validationValue;
});

const matchValidator: Validator<RegExp> = withStringCheck((regexp, inputValue) => {
  return !regexp.test(inputValue as string);
});

const maxFileSizeValidator: Validator<number> = withFileCheck((validationValue, file) => {
  return validationValue < (file as File).size;
});

const ageValidator: Validator<number> = withStringCheck((validationValue, inputValue) => {
  return getAge(inputValue as string) < validationValue;
});

const fileTypeValidator: Validator<string> = withFileCheck((validationValue, file) => {
  return (file as File).type.split('/')[0] !== validationValue;
});

const validators = {
  required: validateRequired,
  capitalized: capitalizedValidator,
  match: matchValidator,
  minLength: minLengthValidator,
  maxFileSize: maxFileSizeValidator,
  maxLength: maxLengthValidator,
  email: matchValidator,
  age: ageValidator,
  fileType: fileTypeValidator,
};

export const defaultValidationResult: ValidationResult = {
  isValid: true,
  errors: [],
};

export const validate = (field: FormFieldOptions, value: FormDataEntryValue): ValidationResult => {
  const { validation, name } = field;
  const result: ValidationResult = { ...defaultValidationResult };
  if (validation !== undefined) {
    if (validation.required !== undefined) {
      const validationResult = validateRequired(validation.required, value);
      if (validationResult === null || validationResult === true) {
        const errorMsg =
          validationResult === null ? getMessage('default')(value) : getMessage('required')(value);
        return { ...result, isValid: false, errors: [errorMsg] };
      }
    }
    const keys = Object.keys(validation) as (keyof ValidationOptions)[];
    const errors = keys
      .map((key): string => {
        const validationValue = validation[key];
        if (validationValue === undefined) return '';
        const validator = validators[key] as Validator<typeof validationValue>;
        const validationResult = validator(validationValue, value);
        if (validationResult === null) return getMessage('default')(validationValue);
        return validationResult ? getMessage(key, name)(validationValue) : '';
      })
      .filter((error) => error !== '');

    if (errors.length !== 0) {
      result.isValid = false;
      result.errors = errors;
    }
  }
  return result;
};

export type { ValidationOptions, ValidationResult, Validator };
