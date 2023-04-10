import { getAge } from '@common/helpers';
import {
  NonStandardValidationOptions,
  StandardValidationOptions,
  ValidationOptions,
  Validator,
} from './types';
import { getValidationMessage } from './messages';
import { FormFieldOptions } from '../form-field';
import { RegisterOptions, Validate } from 'react-hook-form';
import { FormInputs, FormInputsTypes } from '../types';

const capitalizedValidator: Validator<boolean, string> = (validationValue) => (inputValue) => {
  const firstLetter = inputValue[0];
  return (
    (validationValue && firstLetter === firstLetter.toUpperCase()) ||
    getValidationMessage('capitalized')(validationValue)
  );
};

const isValidFileList = (fileList: FileList) => {
  return fileList instanceof FileList && fileList.length > 0;
};

const maxFileSizeValidator: Validator<number, FileList> = (validationValue) => (fileList) => {
  if (!isValidFileList(fileList)) return;
  return (
    validationValue >= fileList[0].size || getValidationMessage('maxFileSize')(validationValue)
  );
};

const ageValidator: Validator<number, string> = (validationValue) => (inputValue) => {
  const date = new Date(inputValue);
  if (date.toString() === 'Invalid Date') return;
  return getAge(inputValue) >= validationValue || getValidationMessage('age')(validationValue);
};

const fileTypeValidator: Validator<string, FileList> = (validationValue) => (fileList) => {
  if (!isValidFileList(fileList)) return;
  return (
    fileList[0].type.split('/')[0] === validationValue ||
    getValidationMessage('fileType')(validationValue)
  );
};

export const nonStandardValidators = {
  fileType: fileTypeValidator,
  maxFileSize: maxFileSizeValidator,
  age: ageValidator,
  capitalized: capitalizedValidator,
};

export const isStandardValidation = (
  key: keyof ValidationOptions
): key is keyof StandardValidationOptions => {
  return ['required', 'minLength', 'maxLength', 'pattern'].includes(key);
};

export const isNonStandardValidation = (
  key: keyof ValidationOptions
): key is keyof NonStandardValidationOptions => {
  return Object.keys(nonStandardValidators).includes(key);
};

type getNonStandardValidatorsReturn = {
  validate: Record<string, Validate<FormInputsTypes, FormInputs>> | undefined;
};
const getNonStandardValidators = (validation: ValidationOptions) => {
  const keys = Object.keys(validation) as (keyof ValidationOptions)[];
  return keys.filter(isNonStandardValidation).reduce<getNonStandardValidatorsReturn>(
    (acc, key) => {
      const validationValue = validation[key];
      const validator = nonStandardValidators[key] as Validator<
        typeof validationValue,
        FormInputsTypes
      >;
      return {
        ...acc,
        validate: {
          ...acc.validate,
          [key]: validator(validationValue),
        },
      };
    },
    { validate: {} }
  );
};

export const getValidators = (field: FormFieldOptions) => {
  const { validation, name } = field;
  if (validation === undefined) return null;
  const keys = Object.keys(validation) as (keyof ValidationOptions)[];
  const standardValidators = keys
    .filter(isStandardValidation)
    .reduce<RegisterOptions>((acc, key) => {
      const validationValue = validation[key];
      return {
        ...acc,
        [key]: {
          value: validationValue,
          message: getValidationMessage(key, name)(validationValue),
        },
      };
    }, {});

  return { ...standardValidators, ...getNonStandardValidators(validation) };
};

export type { ValidationOptions, Validator };
