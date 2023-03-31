import { FormFieldOptions } from '@components/RegistrationForm/form-field';
import { withFormFieldOptions } from '@components/RegistrationForm/form-field/context';
import React from 'react';
import './style.scss';

export interface InputProps {
  options: FormFieldOptions;
  inputRef: React.RefObject<HTMLElement> | null;
  value?: string;
  label?: string;
}

export interface InputAttributes extends React.InputHTMLAttributes<HTMLInputElement> {
  ref: React.RefObject<HTMLInputElement>;
}

class Input extends React.Component<InputProps> {
  render() {
    const {
      options: { name, type, defaultValue },
      inputRef,
      value,
      label,
    } = this.props;

    const id = `${value || name}-${type}-input`;
    const props: InputAttributes = {
      ref: inputRef as React.RefObject<HTMLInputElement>,
      type,
      name,
      id,
    };
    if (value !== undefined) props.value = value;
    if (defaultValue !== undefined) {
      if (typeof defaultValue === 'string') props.defaultValue = defaultValue;
      else props.defaultChecked = defaultValue;
    }
    if (type === 'file') props.accept = 'image/*';
    return (
      <div className="custom-input">
        <input {...props} />
        <label htmlFor={`${value}-${type}-input`}>
          <span className="custom-input__check"></span>
          {label && <span>{label}</span>}
        </label>
      </div>
    );
  }
}

export default withFormFieldOptions(Input);
