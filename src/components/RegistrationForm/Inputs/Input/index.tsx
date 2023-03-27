import { FormFieldOptionsContext } from '@components/RegistrationForm/form-field/context';
import React, { useContext } from 'react';
import './style.scss';
import { InputProps, InputAttributes } from '../types';

const Input = (props: InputProps) => {
  const { options } = useContext(FormFieldOptionsContext);

  const { inputRef, value, label } = props;
  const { name, type, defaultValue } = options;
  const id = `${value || name}-${type}-input`;
  const inputProps: InputAttributes = {
    ref: inputRef as React.RefObject<HTMLInputElement>,
    type,
    name,
    id,
  };
  if (value !== undefined) inputProps.value = value;
  if (defaultValue !== undefined) {
    if (typeof defaultValue === 'string') inputProps.defaultValue = defaultValue;
    else inputProps.defaultChecked = defaultValue;
  }
  return (
    <div className="custom-input">
      <input {...inputProps} />
      <label htmlFor={`${value}-${type}-input`}>
        <span className="custom-input__check"></span>
        {label && <span>{label}</span>}
      </label>
    </div>
  );
};

export default Input;
