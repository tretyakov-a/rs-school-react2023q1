import { FormFieldOptionsContext } from '@components/RegistrationForm/form-field/context';
import React, { useContext } from 'react';
import { InputProps } from '../types';

const Input = (props: InputProps) => {
  const { options, register } = useContext(FormFieldOptionsContext);

  const { value } = props;
  const { name, type, formFieldType } = options;
  const id = `${value || name}-${type}-input`;
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = { type, id };
  if (value !== undefined && formFieldType === 'list') inputProps.value = value;

  return <input {...inputProps} {...register?.(options)} />;
};

export default Input;
