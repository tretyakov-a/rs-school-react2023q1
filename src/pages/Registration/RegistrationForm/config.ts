import { countries, genders, programmingLanguages } from './data';
import { FormFieldBaseOptions, FormFieldOptions, FormValues } from './form-field/types';
import { FormInputs } from './types';

export const formFieldsOptions: Record<keyof FormInputs, FormFieldBaseOptions> = {
  name: {
    label: 'Name',
    type: 'text',
    validation: {
      required: true,
      capitalized: true,
      pattern: /^[\w]+$/,
      minLength: 3,
      maxLength: 12,
    },
  },
  password: {
    label: 'Password',
    type: 'password',
    validation: {
      required: true,
      minLength: 8,
    },
  },
  email: {
    label: 'Email',
    type: 'email',
    validation: {
      required: true,
      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
  },
  birthday: {
    label: 'Birthday',
    type: 'date',
    validation: {
      required: true,
      age: 16,
    },
  },
  country: {
    label: 'Country',
    type: 'select',
    data: countries,
    defaultSelectOptionValue: 'Choose country',
    validation: {
      required: true,
    },
  },
  programmingLanguage: {
    label: 'Programming languages',
    type: 'checkbox',
    formFieldType: 'list',
    data: programmingLanguages,
    validation: {
      required: true,
    },
  },
  gender: {
    label: 'Gender',
    type: 'radio',
    formFieldType: 'list',
    data: genders,
    validation: {
      required: true,
    },
  },
  avatar: {
    label: 'Avatar',
    type: 'file',
    validation: {
      maxFileSize: 100000,
      fileType: 'image',
      required: true,
    },
  },
  subscribe: {
    label: 'Subscribe to newsletter',
    type: 'checkbox',
    validation: {
      required: true,
    },
  },
};

export const defautFormValues: FormValues = {
  name: '',
  password: '',
  email: '',
  birthday: '',
  country: '',
  subscribe: false,
};

export const testFormValues: FormValues = {
  name: 'Username',
  password: '12345678',
  email: 'test@test.ru',
  birthday: '2001-01-01',
  country: 'China',
  subscribe: true,
};

export type FieldName = keyof typeof formFieldsOptions;

const keys = Object.keys(formFieldsOptions) as (keyof FormInputs)[];
export const formFields = keys.reduce<FormFieldOptions[]>((acc, optionKey) => {
  acc.push({ ...formFieldsOptions[optionKey], name: optionKey });
  return acc;
}, []);
