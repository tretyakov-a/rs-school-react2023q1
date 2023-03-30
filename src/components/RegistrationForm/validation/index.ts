import { getAge } from '@common/helpers';
import {
  NonStandardValidationOptions,
  ValidationOptions,
  Validator,
  ValidatorInputValue,
} from './types';
import { getValidationMessage } from './messages';
import { FormFieldOptions, FormInputs } from '../form-field';
import { RegisterOptions, Validate } from 'react-hook-form';

const capitalizedValidator: Validator<boolean> = (validationValue) => (inputValue) => {
  const firstLetter = (inputValue as string)[0];
  return (
    (validationValue && firstLetter === firstLetter.toUpperCase()) ||
    getValidationMessage('capitalized')(validationValue)
  );
};

const maxFileSizeValidator: Validator<number> = (validationValue) => (fileList) => {
  if (fileList === undefined || fileList.length === 0) return;
  return (
    validationValue >= (fileList as FileList)[0].size ||
    getValidationMessage('maxFileSize')(validationValue)
  );
};

const ageValidator: Validator<number> = (validationValue) => (inputValue) => {
  const date = new Date(inputValue as string);
  if (date.toString() === 'Invalid Date') return;
  return (
    getAge(inputValue as string) >= validationValue || getValidationMessage('age')(validationValue)
  );
};

const fileTypeValidator: Validator<string> = (validationValue) => (fileList) => {
  if (fileList === undefined || fileList.length === 0) return;
  return (
    (fileList as FileList)[0].type.split('/')[0] === validationValue ||
    getValidationMessage('fileType')(validationValue)
  );
};

export const nonStandardValidators = {
  fileType: fileTypeValidator,
  maxFileSize: maxFileSizeValidator,
  age: ageValidator,
  capitalized: capitalizedValidator,
};

export const isStandardValidation = (key: keyof ValidationOptions) => {
  const standard = ['required', 'minLength', 'maxLength', 'pattern'] as (keyof ValidationOptions)[];
  return standard.includes(key);
};

const getNonStandardValidators = (validation: ValidationOptions) => {
  const keys = Object.keys(validation) as (keyof ValidationOptions)[];
  return keys
    .filter((key) => !isStandardValidation(key))
    .reduce((acc, key) => {
      const validationValue = validation[key];
      const validator = nonStandardValidators[
        key as keyof NonStandardValidationOptions
      ] as Validator<typeof validationValue>;
      return {
        ...acc,
        validate: {
          ...acc.validate,
          [key]: validator(validationValue),
        },
      };
    }, {} as { validate: Record<string, Validate<ValidatorInputValue, FormInputs>> | undefined });
};

export const getValidators = (field: FormFieldOptions) => {
  const { validation, name } = field;
  if (validation === undefined) return null;
  const keys = Object.keys(validation) as (keyof ValidationOptions)[];
  const standardValidators = keys.filter(isStandardValidation).reduce((acc, key) => {
    const validationValue = validation[key];
    return {
      ...acc,
      [key]: {
        value: validationValue,
        message: getValidationMessage(key, name)(validationValue),
      },
    };
  }, {} as RegisterOptions);

  return { ...standardValidators, ...getNonStandardValidators(validation) };
};

export type { ValidationOptions, Validator };
