import { getAge } from '@common/helpers';
import { FormFieldOptions } from '../form-field';
import { ValidationOptions, ValidationResult, Validator } from './types';
import { getMessage } from './messages';

const validateRequired: Validator<boolean> = (validationValue, inputValue) => {
  return validationValue && inputValue === '';
};

const capitalizedValidator: Validator<boolean> = (validationValue, inputValue) => {
  if (typeof inputValue !== 'string' || inputValue === '') return false;
  const firstLetter = inputValue[0];
  return validationValue && firstLetter !== firstLetter.toUpperCase();
};

const minLengthValidator: Validator<number> = (validationValue, inputValue) => {
  return inputValue.length < validationValue;
};

const maxLengthValidator: Validator<number> = (validationValue, inputValue) => {
  return inputValue.length > validationValue;
};

const matchValidator: Validator<RegExp> = (regexp, inputValue) => {
  if (typeof inputValue !== 'string') return false;
  return !regexp.test(inputValue);
};

const maxFileSizeValidator: Validator<number> = (validationValue, file) => {
  if (!(file instanceof File) || file.size === 0) return false;
  return validationValue < file.size;
};

const ageValidator: Validator<number> = (validationValue, inputValue) => {
  if (typeof inputValue !== 'string') return false;
  return getAge(inputValue) < validationValue;
};

const fileTypeValidator: Validator<string> = (validationValue, file) => {
  if (!(file instanceof File) || file.size === 0) return false;
  return file.type.split('/')[0] !== validationValue;
};

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
    const keys = Object.keys(validation) as (keyof ValidationOptions)[];
    const errors = keys
      .map((key): string => {
        const validationValue = validation[key];
        if (validationValue === undefined) return '';
        const validator = validators[key] as Validator<typeof validationValue>;
        return validator(validationValue, value) ? getMessage(key, name)(validationValue) : '';
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
