import React from 'react';
import { programmingLanguages } from '../../common/programming-languages';
import { countries } from '../../common/countries';
import './style.scss';
import { formFields, FieldName } from './form-fields';
import { validate } from './validation';

type Errors = Record<FieldName, string>;

interface RegistrationState {
  errors: Errors;
}

export default class Registration extends React.Component<{}, RegistrationState> {
  private nameInput: React.RefObject<HTMLInputElement>;
  private emailInput: React.RefObject<HTMLInputElement>;
  private passwordInput: React.RefObject<HTMLInputElement>;
  private birthdayInput: React.RefObject<HTMLInputElement>;
  private countrySelect: React.RefObject<HTMLSelectElement>;
  private languageCheckboxes: React.RefObject<HTMLInputElement>[];
  private genderRadios: React.RefObject<HTMLInputElement>[];
  private fileInput: React.RefObject<HTMLInputElement>;

  constructor(props: React.PropsWithChildren) {
    super(props);

    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.birthdayInput = React.createRef();
    this.countrySelect = React.createRef();
    this.languageCheckboxes = Array.from({ length: programmingLanguages.length }, () =>
      React.createRef()
    );
    this.genderRadios = Array.from({ length: 2 }, () => React.createRef());
    this.fileInput = React.createRef();

    this.state = {
      errors: {
        name: '',
        email: '',
        password: '',
        birthday: '',
        country: '',
        programmingLanguage: '',
        gender: '',
        avatar: '',
      },
    };
  }

  isErrors = (errors: Errors) => {
    const keys = Object.keys(errors) as (keyof Errors)[];
    return keys.some((key) => errors[key] !== '');
  };

  renderError = (message: string) => {
    return message.split('\n').map((part, i) => <div key={part.length + i}>{part}</div>);
  };

  clearForm = () => {
    const clearValue = (ref: React.RefObject<HTMLInputElement | HTMLSelectElement>) => {
      if (ref.current !== null) {
        ref.current.value = '';
        if (ref.current instanceof HTMLInputElement) ref.current.checked = false;
      }
    };
    [
      this.nameInput,
      this.emailInput,
      this.passwordInput,
      this.birthdayInput,
      this.countrySelect,
      this.languageCheckboxes,
      this.genderRadios,
      this.fileInput,
    ].forEach((ref) => {
      if (Array.isArray(ref)) {
        ref.forEach((item) => clearValue(item));
      } else {
        clearValue(ref);
      }
    });
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    const formData = new FormData(form);
    const errors: Errors = { ...this.state.errors };

    formFields.forEach((field) => {
      if (field.validation !== undefined) {
        const values = formData.getAll(field.name);
        const value = values.length > 1 ? values.join('') : values[0] || '';
        if (value instanceof File && value.size !== 0) {
          errors[field.name] = validate(field, String(value.size));
        } else if (typeof value === 'string') {
          errors[field.name] = validate(field, value);
        }
      }
    });

    this.setState({ errors });

    if (this.isErrors(errors)) {
      return;
    }
    for (const entrie of formData.entries()) {
      console.log(entrie);
    }
    this.clearForm();
  };

  render() {
    const { errors } = this.state;
    return (
      <section className="registration page">
        <div className="container registration__container">
          <form className="registration-form" onSubmit={this.handleSubmit} noValidate>
            <h3 className="registration-form__title">Registration</h3>
            <div className={`registration-form__row ${errors.name === '' ? '' : 'invalid'}`}>
              <label className="registration-form__row-title" htmlFor="name-text-input">
                Name:
              </label>
              <input
                ref={this.nameInput}
                defaultValue={'Username'}
                type="text"
                name="name"
                id="name-text-input"
              />
            </div>
            <div className="registration-form__error">{this.renderError(errors.name)}</div>

            <div className={`registration-form__row ${errors.email === '' ? '' : 'invalid'}`}>
              <label className="registration-form__row-title" htmlFor="email-text-input">
                Email:
              </label>
              <input
                ref={this.emailInput}
                defaultValue={'username@test.ru'}
                type="email"
                name="email"
                id="email-text-input"
              />
            </div>
            <div className="registration-form__error">{this.renderError(errors.email)}</div>

            <div className={`registration-form__row ${errors.password === '' ? '' : 'invalid'}`}>
              <label className="registration-form__row-title" htmlFor="password-password-input">
                Password:
              </label>
              <input
                ref={this.passwordInput}
                defaultValue={'12345678'}
                type="password"
                name="password"
                id="password-password-input"
              />
            </div>
            <div className="registration-form__error">{this.renderError(errors.password)}</div>

            <div className={`registration-form__row ${errors.birthday === '' ? '' : 'invalid'}`}>
              <label className="registration-form__row-title" htmlFor="birthday-date-input">
                Birthday:
              </label>
              <input
                ref={this.birthdayInput}
                defaultValue={new Date('2004-05-21').toLocaleDateString('en-CA')}
                type="date"
                name="birthday"
                id="birthday-date-input"
              />
            </div>
            <div className="registration-form__error">{this.renderError(errors.birthday)}</div>

            <div className={`registration-form__row ${errors.country === '' ? '' : 'invalid'}`}>
              <label className="registration-form__row-title" htmlFor="countries-select">
                Country:
              </label>
              <select ref={this.countrySelect} name="country" id="country-select" defaultValue="">
                <option value="" disabled hidden>
                  Choose country
                </option>
                {countries.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="registration-form__error">{this.renderError(errors.country)}</div>

            <div
              className={`registration-form__row ${
                errors.programmingLanguage === '' ? '' : 'invalid'
              }`}
            >
              <span className="registration-form__row-title">Programming language:</span>
              <ul className="registration-form__languages">
                {programmingLanguages.map(({ label, name }, index) => (
                  <li key={name}>
                    <input
                      ref={this.languageCheckboxes[index]}
                      type="checkbox"
                      name="programmingLanguage"
                      value={name}
                      id={`${name}-checkbox`}
                    />
                    <label htmlFor={`${name}-checkbox`}>
                      <span>{label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="registration-form__error">
              {this.renderError(errors.programmingLanguage)}
            </div>

            <div className={`registration-form__row ${errors.gender === '' ? '' : 'invalid'}`}>
              <span className="registration-form__row-title">Gender:</span>
              <ul className="registration-form__genders">
                <li>
                  <input
                    ref={this.genderRadios[0]}
                    type="radio"
                    name="gender"
                    id="gender-male-radio"
                    value="male"
                  />
                  <label htmlFor="gender-male-radio">
                    <span>Male</span>
                  </label>
                </li>
                <li>
                  <input
                    ref={this.genderRadios[1]}
                    type="radio"
                    name="gender"
                    id="gender-female-radio"
                    value="female"
                  />
                  <label htmlFor="gender-female-radio">
                    <span>Female</span>
                  </label>
                </li>
              </ul>
            </div>
            <div className="registration-form__error">{this.renderError(errors.gender)}</div>

            <div className={`registration-form__row ${errors.avatar === '' ? '' : 'invalid'}`}>
              <label className="registration-form__row-title" htmlFor="avatar-file-input">
                Avatar:
              </label>
              <input ref={this.fileInput} type="file" name="avatar" id="avatar-file-input" />
            </div>
            <div className="registration-form__error">{this.renderError(errors.avatar)}</div>

            <button className="registration-form__button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </section>
    );
  }
}
