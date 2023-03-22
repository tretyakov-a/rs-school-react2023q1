import { countries } from '../data/countries';
import { genders } from '../data/genders';
import { programmingLanguages } from '../data/programming-languages';
import InputRef from '../input-ref';
import { FormFieldBaseOptions, FormFieldOptions } from './types';

const createRefsArray = (length: number) => Array.from({ length }, () => new InputRef());

const formFieldsOptions: Record<string, FormFieldBaseOptions> = {
  name: {
    label: 'Name',
    type: 'text',
    validation: {
      required: true,
      capitalized: true,
      match: /^[\w]+$/,
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
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
      fileType: 'image',
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
  return Object.keys(formFieldsOptions).reduce<FormFieldOptions[]>((acc, optionKey) => {
    const { formFieldType, data } = formFieldsOptions[optionKey];
    const inputRef =
      formFieldType && data && formFieldType === 'list'
        ? createRefsArray(data.length)
        : new InputRef();
    acc.push({ ...formFieldsOptions[optionKey], inputRef, name: optionKey });
    return acc;
  }, [] as FormFieldOptions[]);
};

export const formFields = getFormFields();
