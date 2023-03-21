import React from 'react';
import './style.scss';
import RegistrationForm from '@components/RegistrationForm';
import { formFields } from '@components/RegistrationForm/form-fields';

export default class Registration extends React.Component {
  render() {
    return (
      <section className="registration page">
        <div className="container registration__container">
          <RegistrationForm formFields={formFields} />
        </div>
      </section>
    );
  }
}
