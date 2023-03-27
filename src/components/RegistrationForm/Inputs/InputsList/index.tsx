import React, { useContext } from 'react';
import { isRadioInputDataArray } from '@components/RegistrationForm/data';
import { Input } from '..';
import { FormFieldOptionsContext } from '@components/RegistrationForm/form-field/context';
import InputRef from '@components/RegistrationForm/input-ref';

const InputsList = () => {
  const { options } = useContext(FormFieldOptionsContext);

  const renderItems = () => {
    const { data } = options;
    const inputRefs = options.inputRef as InputRef[];

    if (isRadioInputDataArray(data)) {
      return data.map(({ label, name }, index) => (
        <li key={name}>
          <Input inputRef={inputRefs[index].ref} value={name} label={label} />
        </li>
      ));
    }
  };

  return <ul className="registration-form__inputs-list">{renderItems()}</ul>;
};

export default InputsList;
