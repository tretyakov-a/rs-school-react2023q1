import {
  ExtraMessage,
  ExtraMessageKey,
  Message,
  ValidationMessageKey,
  isExtraMessage,
} from './types';

export const validationMessages: Record<ValidationMessageKey, Message | ExtraMessage> = {
  required: () => 'field is required',
  capitalized: () => 'should be capitalized',
  pattern: {
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

export const getValidationMessage = (key: ValidationMessageKey, name?: string) => {
  const msg = validationMessages[key];
  if (isExtraMessage(msg)) {
    return key === 'pattern' && name === undefined ? msg['default'] : msg[name as ExtraMessageKey];
  }
  return msg;
};
