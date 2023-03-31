import React from 'react';
import './style.scss';
import RegistrationForm from '@components/RegistrationForm';
import { getFormFields } from '@components/RegistrationForm/form-field';
import RegistrationList from '@components/RegistrationList';
import PageWrap from '@components/PageWrap';

interface RegistrationState {
  data: FormData[];
}

export default class Registration extends React.Component<unknown, RegistrationState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = {
      data: [],
    };
  }

  handleRegistrationFormSubmit = (formData: FormData) => {
    this.setState((prevState) => ({
      data: [...prevState.data, formData],
    }));
  };

  render() {
    const formFields = getFormFields();

    return (
      <PageWrap className="registration">
        <RegistrationForm formFields={formFields} onSubmit={this.handleRegistrationFormSubmit} />
        <RegistrationList formFields={formFields} data={this.state.data} />
      </PageWrap>
    );
  }
}
