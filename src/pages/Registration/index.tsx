import React from 'react';
import { programmingLanguages } from '../../common/programming-languages';
import { countries } from '../../common/countries';
import './style.scss';

export default class Registration extends React.Component {
  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  render() {
    return (
      <section className="registration page">
        <div className="container registration__container">
          <form className="registration-form" onSubmit={this.handleSubmit}>
            <h3 className="registration-form__title">Registration</h3>
            <div className="registration-form__row">
              <label className="registration-form__row-title" htmlFor="name-text-input">
                Name:
              </label>
              <input type="text" name="name" id="name-text-input" />
            </div>
            <div className="registration-form__row">
              <label className="registration-form__row-title" htmlFor="sirname-text-input">
                Sirname:
              </label>
              <input type="text" name="sirname" id="sirname-text-input" />
            </div>
            <div className="registration-form__row">
              <label className="registration-form__row-title" htmlFor="password-password-input">
                Password:
              </label>
              <input type="password" name="password" id="password-password-input" />
            </div>
            <div className="registration-form__row">
              <label className="registration-form__row-title" htmlFor="birthday-date-input">
                Birthday:
              </label>
              <input type="date" name="birthday" id="birthday-date-input" />
            </div>
            <div className="registration-form__row">
              <label className="registration-form__row-title" htmlFor="countries-select">
                Country:
              </label>
              <select name="countries" id="countries-select" defaultValue="">
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
            <div className="registration-form__row">
              <span className="registration-form__row-title">Programming language:</span>
              <ul className="registration-form__languages">
                {programmingLanguages.map(({ label, name }) => (
                  <li key={name}>
                    <input type="checkbox" name={name} id={`${name}-checkbox`} />
                    <label htmlFor={`${name}-checkbox`}>
                      <span>{label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="registration-form__row">
              <span className="registration-form__row-title">Gender:</span>
              <ul className="registration-form__genders">
                <li>
                  <input type="radio" name="gender" id="gender-male-radio" value="male" />
                  <label htmlFor="gender-male-radio">
                    <span>Male</span>
                  </label>
                </li>
                <li>
                  <input type="radio" name="gender" id="gender-female-radio" value="female" />
                  <label htmlFor="gender-female-radio">
                    <span>Female</span>
                  </label>
                </li>
              </ul>
            </div>
            <div className="registration-form__row">
              <label className="registration-form__row-title" htmlFor="avatar-file-input">
                Avatar:
              </label>
              <input type="file" name="avatar" id="avatar-file-input" />
            </div>
            <button className="registration-form__button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </section>
    );
  }
}
