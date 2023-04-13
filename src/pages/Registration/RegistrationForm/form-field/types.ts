import { FormInputs, InputType } from '../types';
import { ValidationOptions } from '../validation/types';

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
  name: keyof FormInputs;
};

export type FormValues = Partial<FormInputs>;
