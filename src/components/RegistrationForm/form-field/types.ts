import { ValidationOptions } from '../validation/types';

export type FormInputs = {
  name: string;
  password: string;
  email: string;
  birthday: string;
  country: string;
  programmingLanguage: string;
  gender: string;
  avatar: FileList | File;
  subscribe: string;
};

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

export type FormFieldBaseOptions = {
  type: InputType;
  formFieldType?: FormFieldType;
  label?: string;
  defaultSelectOptionValue?: string;
  defaultValue?: string | boolean;
  data?: unknown[];
  validation?: ValidationOptions;
  matchErrorMessage?: string;
};

export type FormFieldOptions = FormFieldBaseOptions & {
  name: string;
};

export type FormValues = Record<
  keyof Omit<FormInputs, 'programmingLanguage' | 'gender' | 'avatar'>,
  string
>;
