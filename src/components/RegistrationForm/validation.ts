import { getAge } from '@common/helpers';
import { FormFieldOption } from './form-fields';

export type matchValidationType = {
  regexp: RegExp;
  message?: string;
};

export type ValidationOptions = {
  required?: boolean;
  capitalized?: boolean;
  match?: matchValidationType;
  minLength?: number;
  maxLength?: number;
  maxFileSize?: number;
  fileType?: string;
  email?: matchValidationType;
  age?: number;
};

type Validator<T> = (validationValue: T, inputValue: FormDataEntryValue) => string;

const validateRequired: Validator<boolean> = (validationValue, inputValue) => {
  return validationValue && inputValue === '' ? 'field is required' : '';
};

const capitalizedValidator: Validator<boolean> = (validationValue, inputValue) => {
  if (typeof inputValue !== 'string' || inputValue === '') return '';
  const firstLetter = inputValue[0];

  return validationValue && firstLetter !== firstLetter.toUpperCase()
    ? 'should be capitalized'
    : '';
};

const minLengthValidator: Validator<number> = (validationValue, inputValue) => {
  return inputValue.length < validationValue
    ? `length should be more or equal then ${validationValue}`
    : '';
};

const maxLengthValidator: Validator<number> = (validationValue, inputValue) => {
  return inputValue.length > validationValue
    ? `length should be less or equal then ${validationValue}`
    : '';
};

const matchValidator: Validator<matchValidationType> = (
  { regexp, message }: matchValidationType,
  inputValue
) => {
  if (typeof inputValue !== 'string') return '';
  return !regexp.test(inputValue) ? message || `should match '${regexp}' expression` : '';
};

const maxFileSizeValidator: Validator<number> = (validationValue, file) => {
  if (!(file instanceof File) || file.size === 0) return '';
  return validationValue < file.size
    ? `file size should be less or equal then ${validationValue / 1000} KB`
    : '';
};

const ageValidator: Validator<number> = (validationValue, inputValue) => {
  if (typeof inputValue !== 'string') return '';
  return getAge(inputValue) < validationValue
    ? `age should be more or equal then ${validationValue}`
    : '';
};

const fileTypeValidator: Validator<string> = (validationValue, file) => {
  if (!(file instanceof File) || file.size === 0) return '';
  console.log(file.type);
  return file.type.split('/')[0] !== validationValue ? `should be ${validationValue} file` : '';
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

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export const defaultValidationResult = {
  isValid: true,
  errors: [],
};

export const validate = (field: FormFieldOption, value: FormDataEntryValue): ValidationResult => {
  const { validation } = field;
  const result: ValidationResult = { ...defaultValidationResult };
  if (validation !== undefined) {
    const keys = Object.keys(validation) as (keyof ValidationOptions)[];
    const errors = keys
      .map((key): string => {
        const validationValue = validation[key];
        if (validationValue === undefined) return '';
        const validator = validators[key] as Validator<typeof validationValue>;
        return validator(validationValue, value);
      })
      .filter((error) => error !== '');

    if (errors.length !== 0) {
      result.isValid = false;
      result.errors = errors;
    }
  }
  return result;
};
