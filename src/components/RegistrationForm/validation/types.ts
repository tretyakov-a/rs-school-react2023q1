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

export type ValidatorInputValue = string | string[] | FileList | File;
export type Validator<T> = (
  validationValue: T
) => (inputValue: ValidatorInputValue) => boolean | string | undefined;

export type ExtraMessageKey = 'name' | 'email' | 'default';
export type Message = (value: unknown) => string;
export type ExtraMessage = Record<ExtraMessageKey, Message>;
export type ValidationMessageKey = keyof ValidationOptions | Extract<ExtraMessageKey, 'default'>;
