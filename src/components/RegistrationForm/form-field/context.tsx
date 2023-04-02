import React from 'react';
import { FormFieldOptions } from './types';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { FormInputs } from '../types';

const defaultValue: FormFieldOptions = {
  name: 'name',
  type: '',
};

interface withFormFieldOptionsProps {
  options: FormFieldOptions;
  register: ((options: FormFieldOptions) => ReturnType<UseFormRegister<FormInputs>>) | null;
  watch: UseFormWatch<FormInputs> | null;
}

export const FormFieldOptionsContext = React.createContext<withFormFieldOptionsProps>({
  options: { ...defaultValue },
  register: null,
  watch: null,
});
