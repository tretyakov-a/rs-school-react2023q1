import { withFormFieldOptions } from '@components/RegistrationForm/form-field/context';
import React from 'react';
import './style.scss';
import { InputAttributes, InputProps } from '../Input';

class Switch extends React.Component<InputProps> {
  render() {
    const {
      options: { name, type, defaultValue },
      inputRef,
      value,
    } = this.props;
    if (type !== 'checkbox') return;
    const props: InputAttributes = {
      ref: inputRef as React.RefObject<HTMLInputElement>,
      type,
      name,
      id: `${value || name}-${type}-input`,
    };
    if (value !== undefined) props.value = value;
    if (defaultValue !== undefined) props.defaultChecked = defaultValue as boolean;
    return (
      <div className="switch">
        <input {...props} />
        <label htmlFor={`${name}-${type}-input`}>
          <span className="switch__check"></span>
        </label>
      </div>
    );
  }
}

export default withFormFieldOptions(Switch);
