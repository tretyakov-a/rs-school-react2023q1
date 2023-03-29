import { FormInputs } from '@components/RegistrationForm/form-field';

export type StandardValidationOptions = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
};

export type NonStandardValidationOptions = {
  capitalized?: boolean;
  maxFileSize?: number;
  fileType?: string;
  age?: number;
};

export type ValidationOptions = StandardValidationOptions & NonStandardValidationOptions;

export type Validator<T> = (
  validationValue: T
) => (inputValue: string | FileList | File) => boolean | string | undefined;

export type ExtraMessageKey = 'name' | 'email' | 'default';
export type Message = (value: unknown) => string;
export type ExtraMessage = Record<ExtraMessageKey, Message>;
export type ValidationMessageKey = keyof ValidationOptions | Extract<ExtraMessageKey, 'default'>;
