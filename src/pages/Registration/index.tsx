import React from 'react';
import './style.scss';
import RegistrationForm from '@components/RegistrationForm';
import { formFields } from '@components/RegistrationForm/form-field';
import RegistrationList from '@components/RegistrationList';

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
    return (
      <section className="registration page">
        <div className="container registration__container">
          <RegistrationForm formFields={formFields} onSubmit={this.handleRegistrationFormSubmit} />
          <RegistrationList data={this.state.data} />
        </div>
      </section>
    );
  }
}
