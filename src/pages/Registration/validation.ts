import { FormFieldOption, ValidationOptions, matchValidationType } from './form-fields';

type Validator<T> = (validationValue: T, inputValue: string) => string;

const validateRequired: Validator<boolean> = (validationValue: boolean, inputValue: string) => {
  return validationValue && inputValue === '' ? 'field is required' : '';
};

const capitalizedValidator: Validator<boolean> = (validationValue: boolean, inputValue: string) => {
  if (inputValue === '') return '';
  const firstLetter = inputValue[0];

  return validationValue && firstLetter !== firstLetter.toUpperCase()
    ? 'should be capitalized'
    : '';
};

const minLengthValidator: Validator<number> = (validationValue: number, inputValue: string) => {
  return inputValue.length < validationValue
    ? `length should be more or equal then ${validationValue}`
    : '';
};

const maxLengthValidator: Validator<number> = (validationValue: number, inputValue: string) => {
  return inputValue.length > validationValue
    ? `length should be less or equal then ${validationValue}`
    : '';
};

const matchValidator: Validator<matchValidationType> = (
  { regexp, message }: matchValidationType,
  inputValue: string
) => {
  return !regexp.test(inputValue) ? message || `should match '${regexp}' expression` : '';
};

const maxFileSizeValidator: Validator<number> = (validationValue: number, inputValue: string) => {
  return validationValue < Number(inputValue)
    ? `file size should be less or equal then ${validationValue / 1000} KB`
    : '';
};

const ageValidator: Validator<number> = (validationValue: number, inputValue: string) => {
  const bornDate = new Date(inputValue);
  const ageDate = new Date(Date.now() - bornDate.getTime());
  const ageInYears = Math.abs(ageDate.getUTCFullYear() - 1970);
  return ageInYears < validationValue ? `age should be more or equal then ${validationValue}` : '';
};

const validationOptions = {
  required: validateRequired,
  capitalized: capitalizedValidator,
  match: matchValidator,
  minLength: minLengthValidator,
  maxFileSize: maxFileSizeValidator,
  maxLength: maxLengthValidator,
  email: matchValidator,
  age: ageValidator,
};

export const validate = (field: FormFieldOption, value: string) => {
  const { validation } = field;
  if (validation !== undefined) {
    const keys = Object.keys(validation) as (keyof ValidationOptions)[];
    const errors = keys.map((key) => {
      const validationValue = validation[key];
      if (validationValue === undefined) return;
      const validator = validationOptions[key] as Validator<typeof validationValue>;
      return validator(validationValue, value);
    });
    return errors.filter((error) => error !== '').join('\n');
  }
  return '';
};
