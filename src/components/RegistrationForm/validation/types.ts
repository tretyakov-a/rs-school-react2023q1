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

export type Validator<T, R> = (
  validationValue: T
) => (inputValue: R) => boolean | string | undefined;

export type ExtraMessageKey = 'name' | 'email' | 'default';
export type Message = (value: unknown) => string;
export type ExtraMessage = Record<ExtraMessageKey, Message>;
export type ValidationMessageKey = keyof ValidationOptions | Extract<ExtraMessageKey, 'default'>;

export const isExtraMessage = (msg: object): msg is ExtraMessage => {
  return 'name' in msg && 'email' in msg && 'default' in msg;
};
