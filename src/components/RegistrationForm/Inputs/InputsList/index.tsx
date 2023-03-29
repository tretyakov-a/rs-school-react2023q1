import React, { useContext } from 'react';
import { isRadioInputDataArray } from '@components/RegistrationForm/data';
import { Input } from '..';
import { FormFieldOptionsContext } from '@components/RegistrationForm/form-field/context';

const InputsList = () => {
  const { options } = useContext(FormFieldOptionsContext);

  const renderItems = () => {
    const { data } = options;

    if (isRadioInputDataArray(data)) {
      return data.map(({ label, name }) => (
        <li key={name}>
          <Input value={name} label={label} />
        </li>
      ));
    }
  };

  return <ul className="registration-form__inputs-list">{renderItems()}</ul>;
};

export default InputsList;
