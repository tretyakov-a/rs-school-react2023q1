import { FormFieldOptionsContext } from '@components/RegistrationForm/form-field/context';
import React, { useContext } from 'react';
import './style.scss';
import { InputAttributes, InputProps } from '../types';

const Switch = (props: InputProps) => {
  const { options } = useContext(FormFieldOptionsContext);
  const { inputRef, value } = props;
  const { name, type, defaultValue } = options;
  if (type !== 'checkbox') return null;
  const inputProps: InputAttributes = {
    ref: inputRef as React.RefObject<HTMLInputElement>,
    type,
    name,
    id: `${value || name}-${type}-input`,
  };
  if (value !== undefined) inputProps.value = value;
  if (defaultValue !== undefined) inputProps.defaultChecked = defaultValue as boolean;

  return (
    <div className="switch">
      <input {...inputProps} />
      <label htmlFor={`${name}-${type}-input`}>
        <span className="switch__check"></span>
      </label>
    </div>
  );
};

export default Switch;
