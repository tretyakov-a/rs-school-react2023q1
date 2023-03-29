import { FormFieldOptionsContext } from '@components/RegistrationForm/form-field/context';
import React, { useContext } from 'react';
import './style.scss';
import { InputProps } from '../types';
import { FormInputs } from '@components/RegistrationForm/form-field';
import { getValidators } from '@components/RegistrationForm/validation';

const Switch = (props: InputProps) => {
  const { options, register } = useContext(FormFieldOptionsContext);
  const { value } = props;
  const { name, type } = options;
  const id = `${value || name}-${type}-input`;
  if (type !== 'checkbox') return null;
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = { type, id };
  if (value !== undefined) inputProps.value = value;

  return (
    <div className="switch">
      <input
        {...inputProps}
        {...register?.(name as keyof FormInputs, {
          ...getValidators(options),
        })}
      />
      <label htmlFor={id}>
        <span className="switch__check"></span>
      </label>
    </div>
  );
};

export default Switch;
