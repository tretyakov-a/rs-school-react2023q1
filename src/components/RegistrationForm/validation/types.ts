export type ValidationOptions = {
  required?: boolean;
  capitalized?: boolean;
  match?: RegExp;
  minLength?: number;
  maxLength?: number;
  maxFileSize?: number;
  fileType?: string;
  age?: number;
};

export type Validator<T> = (validationValue: T, inputValue: FormDataEntryValue) => boolean;

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};
