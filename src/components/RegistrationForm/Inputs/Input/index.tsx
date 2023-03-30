import { FormFieldOptionsContext } from '@components/RegistrationForm/form-field/context';
import React, { useContext } from 'react';
import './style.scss';
import { InputProps } from '../types';
import { FormInputs } from '@components/RegistrationForm/types';
import { getValidators } from '@components/RegistrationForm/validation';

const Input = (props: InputProps) => {
  const { options, register } = useContext(FormFieldOptionsContext);

  const { value, label } = props;
  const { name, type, formFieldType } = options;
  const id = `${value || name}-${type}-input`;
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = { type, id };
  if (value !== undefined && formFieldType === 'list') inputProps.value = value;

  return (
    <div className="custom-input">
      <input
        {...inputProps}
        {...register?.(name as keyof FormInputs, {
          ...getValidators(options),
        })}
      />
      <label htmlFor={id}>
        <span className="custom-input__check"></span>
        {label && <span>{label}</span>}
      </label>
    </div>
  );
};

export default Input;
