import React from 'react';
import { countries } from './data/countries';
import { genders } from './data/genders';
import { programmingLanguages } from './data/programming-languages';
import { ValidationOptions } from './validation';
import InputRef from './input-ref';

export type FieldName =
  | 'name'
  | 'email'
  | 'password'
  | 'birthday'
  | 'country'
  | 'programmingLanguage'
  | 'gender'
  | 'avatar'
  | '';

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

export type FormFieldOption = {
  name: FieldName;
  type: InputType;
  label?: string;
  defaultSelectOptionValue?: string;
  defaultValue?: string;
  data?: unknown[];
  validation?: ValidationOptions;
  matchErrorMessage?: string;
  inputRef?: InputRef | InputRef[];
};

const createRefsArray = (length: number) => Array.from({ length }, () => new InputRef());

export const formFields: FormFieldOption[] = [
  {
    name: 'name',
    label: 'Name:',
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
    inputRef: new InputRef(),
    defaultValue: 'Username',
  },
  {
    name: 'password',
    label: 'Password:',
    type: 'password',
    validation: {
      required: true,
      minLength: 8,
    },
    inputRef: new InputRef(),
    defaultValue: '12345678',
  },
  {
    name: 'email',
    label: 'Email:',
    type: 'email',
    validation: {
      required: true,
      match: {
        regexp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: `should be valid email address`,
      },
    },
    inputRef: new InputRef(),
    defaultValue: 'test@test.ru',
  },
  {
    name: 'birthday',
    label: 'Birthday:',
    type: 'date',
    validation: {
      age: 16,
    },
    inputRef: new InputRef(),
    defaultValue: '1988-05-21',
  },
  {
    name: 'country',
    label: 'Country:',
    type: 'select',
    data: countries,
    inputRef: new InputRef(),
    defaultSelectOptionValue: 'Choose country',
    defaultValue: 'Angola',
  },
  {
    name: 'programmingLanguage',
    label: 'Programming languages:',
    type: 'checkbox',
    data: programmingLanguages,
    inputRef: createRefsArray(programmingLanguages.length),
  },
  {
    name: 'gender',
    label: 'Gender:',
    type: 'radio',
    data: genders,
    inputRef: createRefsArray(genders.length),
  },
  {
    name: 'avatar',
    label: 'Avatar:',
    type: 'file',
    validation: {
      maxFileSize: 100000,
    },
    inputRef: new InputRef(),
  },
];
