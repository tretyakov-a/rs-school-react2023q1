import React from 'react';
import { isRadioInputDataArray } from '@components/RegistrationForm/data';
import { Input } from '..';
import { FormFieldOptions } from '@components/RegistrationForm/form-field';
import { withFormFieldOptions } from '@components/RegistrationForm/form-field/context';
import InputRef from '@components/RegistrationForm/input-ref';

interface InputsListProps {
  options: FormFieldOptions;
}

class InputsList extends React.Component<InputsListProps> {
  renderItems = () => {
    const { options } = this.props;
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

  render() {
    return <ul className="registration-form__inputs-list">{this.renderItems()}</ul>;
  }
}

export default withFormFieldOptions(InputsList);
