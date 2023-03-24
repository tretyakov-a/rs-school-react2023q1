import { FormFieldOptions } from '@components/RegistrationForm/form-field';
import { withFormFieldOptions } from '@components/RegistrationForm/form-field/context';
import React from 'react';

export interface InputProps {
  options: FormFieldOptions;
  inputRef: React.RefObject<HTMLElement> | null;
  value?: string;
}

interface InputAttributes extends React.InputHTMLAttributes<HTMLInputElement> {
  ref: React.RefObject<HTMLInputElement>;
}

class Input extends React.Component<InputProps> {
  render() {
    const {
      options: { name, type, defaultValue },
      inputRef,
      value,
    } = this.props;

    const id = `${value || name}-${type}-input`;
    let props: InputAttributes = {
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
    return <input {...props} />;
  }
}

export default withFormFieldOptions(Input);
