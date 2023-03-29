import React from 'react';
import { FormFieldOptions, FormInputs } from './types';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

const defaultValue: FormFieldOptions = {
  name: '',
  type: '',
};

interface withFormFieldOptionsProps {
  options: FormFieldOptions;
  register: UseFormRegister<FormInputs> | null;
  watch: UseFormWatch<FormInputs> | null;
}

export const FormFieldOptionsContext = React.createContext<withFormFieldOptionsProps>({
  options: { ...defaultValue },
  register: null,
  watch: null,
});
