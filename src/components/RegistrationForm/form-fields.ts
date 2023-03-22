import { countries } from './data/countries';
import { genders } from './data/genders';
import { programmingLanguages } from './data/programming-languages';
import { ValidationOptions } from './validation';
import InputRef from './input-ref';

export type InputType =
  | 'text'
  | 'password'
  | 'date'
  | 'email'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'file'
  | '';

export type FormFieldType = 'list' | '';

export type FormField = {
  type: InputType;
  formFieldType?: FormFieldType;
  label?: string;
  defaultSelectOptionValue?: string;
  defaultValue?: string | boolean;
  data?: unknown[];
  validation?: ValidationOptions;
  matchErrorMessage?: string;
};

export type FormFieldOption = FormField & {
  name: string;
  inputRef?: InputRef | InputRef[];
};

const createRefsArray = (length: number) => Array.from({ length }, () => new InputRef());

const formFieldsOptions: Record<string, FormField> = {
  name: {
    label: 'Name',
    type: 'text',
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
    defaultValue: 'Username',
  },
  password: {
    label: 'Password',
    type: 'password',
    validation: {
      required: true,
      minLength: 8,
    },
    defaultValue: '12345678',
  },
  email: {
    label: 'Email',
    type: 'email',
    validation: {
      required: true,
      match: {
        regexp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: `should be valid email address`,
      },
    },
    defaultValue: 'test@test.ru',
  },
  birthday: {
    label: 'Birthday',
    type: 'date',
    validation: {
      age: 16,
    },
    defaultValue: '2001-01-01',
  },
  country: {
    label: 'Country',
    type: 'select',
    data: countries,
    defaultSelectOptionValue: 'Choose country',
    defaultValue: 'China',
  },
  programmingLanguage: {
    label: 'Programming languages:',
    type: 'checkbox',
    formFieldType: 'list',
    data: programmingLanguages,
  },
  gender: {
    label: 'Gender',
    type: 'radio',
    formFieldType: 'list',
    data: genders,
  },
  avatar: {
    label: 'Avatar',
    type: 'file',
    validation: {
      maxFileSize: 100000,
    },
  },
  subscribe: {
    label: 'Subscribe to newsletter',
    type: 'checkbox',
    defaultValue: true,
  },
};

export type FieldName = keyof typeof formFieldsOptions;

const getFormFields = () => {
  return Object.keys(formFieldsOptions).reduce<FormFieldOption[]>((acc, optionKey) => {
    const { formFieldType, data } = formFieldsOptions[optionKey];
    const inputRef =
      formFieldType && data && formFieldType === 'list'
        ? createRefsArray(data.length)
        : new InputRef();
    acc.push({ ...formFieldsOptions[optionKey], inputRef, name: optionKey });
    return acc;
  }, [] as FormFieldOption[]);
};

export const formFields = getFormFields();
