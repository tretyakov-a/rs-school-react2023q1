import React, { useContext } from 'react';
import { isOptionsDataArray } from '@components/RegistrationForm/data';
import { FormFieldOptionsContext } from '@components/RegistrationForm/form-field';
import { getValidators } from '@components/RegistrationForm/validation';
import { FormInputs } from '@components/RegistrationForm/types';

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
    <select
      name={name}
      id={`${name}-${type}`}
      {...register?.(name as keyof FormInputs, {
        ...getValidators(options),
      })}
    >
      <option value="" disabled hidden>
        {defaultSelectOptionValue}
      </option>
      {renderOptions(data)}
    </select>
  );
};

export default Select;
