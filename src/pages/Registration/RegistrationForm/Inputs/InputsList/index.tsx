import React, { useContext } from 'react';
import { isRadioInputDataArray } from '../../data';
import { Input } from '..';
import { FormFieldOptionsContext } from '../../form-field/context';
import CustomInput from '../CustomInput';

const InputsList = () => {
  const { options } = useContext(FormFieldOptionsContext);

  const renderItems = () => {
    const { data, type } = options;
    if (isRadioInputDataArray(data)) {
      return data.map(({ label, name }) => (
        <li key={name}>
          <CustomInput id={`${name}-${type}-input`} label={label}>
            <Input value={name} />
          </CustomInput>
        </li>
      ));
    }
  };

  return <ul className="registration-form__inputs-list">{renderItems()}</ul>;
};

export default InputsList;
