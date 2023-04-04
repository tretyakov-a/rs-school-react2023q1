import React, { useContext } from 'react';
import { isOptionsDataArray } from '../../data';
import { FormFieldOptionsContext } from '../../form-field';

const Select = () => {
  const { options, register } = useContext(FormFieldOptionsContext);

  const renderOptions = (data: unknown) => {
    if (isOptionsDataArray(data)) {
      return data.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ));
    }
  };

  const { name, type, defaultSelectOptionValue, data } = options;
  return (
    <select name={name} id={`${name}-${type}`} {...register?.(options)}>
      <option value="" disabled hidden>
        {defaultSelectOptionValue}
      </option>
      {renderOptions(data)}
    </select>
  );
};

export default Select;
