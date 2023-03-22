import { ValidationOptions } from './types';

export type ExtraMessageKey = 'name' | 'email' | 'default';

export const validationMessages: Record<
  keyof ValidationOptions | ExtraMessageKey,
  (value: unknown) => string
> = {
  required: () => 'field is required',
  capitalized: () => 'should be capitalized',
  match: (value) => `should match '${value}' expression`,
  name: () => `should consist of english letters, numbers and '_'`,
  email: () => `should be valid email address`,
  minLength: (value) => `length should be more or equal then ${value}`,
  maxLength: (value) => `length should be less or equal then ${value}`,
  maxFileSize: (value) => `file size should be less or equal then ${Number(value) / 1000} KB`,
  fileType: (value) => `should be ${value} file`,
  age: (value) => `age should be more or equal then ${value}`,
  default: () => 'invalid value',
};

export const getMessage = (key: keyof ValidationOptions, name: string) => {
  const messageKey = key === 'match' ? (name as ExtraMessageKey) : key;
  const messageFn =
    validationMessages[messageKey] !== undefined
      ? validationMessages[messageKey]
      : validationMessages.default;
  return messageFn;
};
