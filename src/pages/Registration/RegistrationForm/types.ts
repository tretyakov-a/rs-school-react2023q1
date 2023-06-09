export type FormInputs = {
  name: string;
  password: string;
  email: string;
  birthday: string;
  country: string;
  programmingLanguage: string | string[];
  gender: string;
  avatar: FileList | File;
  subscribe: boolean;
};

export type FormInputsTypes = FormInputs[keyof FormInputs];

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
