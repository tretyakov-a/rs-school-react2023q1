import InputRef from '../input-ref';
import { ValidationOptions } from '../validation/types';

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
  inputRef?: InputRef | InputRef[];
};
