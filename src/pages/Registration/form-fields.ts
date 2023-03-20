export type matchValidationType = {
  regexp: RegExp;
  message?: string;
};

export type ValidationOptions = {
  required?: boolean;
  capitalized?: boolean;
  match?: matchValidationType;
  minLength?: number;
  maxLength?: number;
  maxFileSize?: number;
  email?: matchValidationType;
  age?: number;
};

export type FieldName =
  | 'name'
  | 'email'
  | 'password'
  | 'birthday'
  | 'country'
  | 'programmingLanguage'
  | 'gender'
  | 'avatar';

export type FormFieldOption = {
  name: FieldName;
  validation?: ValidationOptions;
  matchErrorMessage?: string;
};

export const formFields: FormFieldOption[] = [
  {
    name: 'name',
    validation: {
      required: true,
      capitalized: true,
      match: {
        regexp: /^[\w]+$/,
        message: `should consist of english letters, numbers and '_'`,
      },
      minLength: 3,
      maxLength: 12,
    },
  },
  {
    name: 'password',
    validation: {
      required: true,
      minLength: 8,
    },
  },
  {
    name: 'email',
    validation: {
      required: true,
      match: {
        regexp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: `should be valid email address`,
      },
    },
  },
  {
    name: 'birthday',
    validation: {
      age: 16,
    },
  },
  {
    name: 'country',
  },
  {
    name: 'programmingLanguage',
  },
  {
    name: 'gender',
  },
  {
    name: 'avatar',
    validation: {
      maxFileSize: 100000,
    },
  },
];
