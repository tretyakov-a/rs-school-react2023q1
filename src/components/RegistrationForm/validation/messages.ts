import { ValidationOptions } from './types';

export type ExtraMessageKey = 'name' | 'email' | 'default';

export type Message = (value: unknown) => string;
export type ExtraMessage = Record<ExtraMessageKey, Message>;
export type ValidationMessageKey = keyof ValidationOptions | Extract<ExtraMessageKey, 'default'>;

export const validationMessages: Record<ValidationMessageKey, Message | ExtraMessage> = {
  required: () => 'field is required',
  capitalized: () => 'should be capitalized',
  match: {
    name: () => `should consist of english letters, numbers and '_'`,
    email: () => `should be valid email address`,
    default: (value) => `should match '${value}' expression`,
  },
  minLength: (value) => `length should be more or equal then ${value}`,
  maxLength: (value) => `length should be less or equal then ${value}`,
  maxFileSize: (value) => `file size should be less or equal then ${Number(value) / 1000} KB`,
  fileType: (value) => `should be ${value} file`,
  age: (value) => `age should be more or equal then ${value}`,
  default: () => 'invalid value',
};

export const getMessage = (key: ValidationMessageKey, name?: string) => {
  const messageFn =
    key === 'match'
      ? name === undefined
        ? (validationMessages[key] as ExtraMessage)['default']
        : (validationMessages[key] as ExtraMessage)[name as ExtraMessageKey]
      : validationMessages[key];
  return messageFn as Message;
};
