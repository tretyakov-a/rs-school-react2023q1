import React from 'react';
import { InputProps } from '../Input';
import { isOptionsDataArray } from '@components/RegistrationForm/data';
import { withFormFieldOptions } from '@components/RegistrationForm/FormField/form-field-context';

class Select extends React.Component<InputProps> {
  renderOptions = (data: unknown) => {
    if (isOptionsDataArray(data)) {
      return data.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ));
    }
  };

  render() {
    const {
      options: { name, type, defaultSelectOptionValue, defaultValue, data },
      inputRef,
    } = this.props;
    const id = `${name}-${type}`;
    return (
      <select
        ref={inputRef as React.RefObject<HTMLSelectElement>}
        name={name}
        id={id}
        defaultValue={defaultValue}
      >
        <option value="" disabled hidden>
          {defaultSelectOptionValue}
        </option>
        {this.renderOptions(data)}
      </select>
    );
  }
}

export default withFormFieldOptions(Select);
