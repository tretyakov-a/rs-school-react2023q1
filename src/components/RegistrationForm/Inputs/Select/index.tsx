import React, { useContext } from 'react';
import { isOptionsDataArray } from '@components/RegistrationForm/data';
import { InputProps } from '../types';
import { FormFieldOptionsContext } from '@components/RegistrationForm/form-field';

const Select = (props: InputProps) => {
  const { options } = useContext(FormFieldOptionsContext);

  const renderOptions = (data: unknown) => {
    if (isOptionsDataArray(data)) {
      return data.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ));
    }
  };

  const { inputRef } = props;
  const { name, type, defaultSelectOptionValue, defaultValue, data } = options;
  const id = `${name}-${type}`;
  return (
    <select
      ref={inputRef as React.RefObject<HTMLSelectElement>}
      name={name}
      id={id}
      defaultValue={defaultValue as string}
    >
      <option value="" disabled hidden>
        {defaultSelectOptionValue}
      </option>
      {renderOptions(data)}
    </select>
  );
};

export default Select;
