import React from 'react';
import './style.scss';
import { ValidationResult, defaultValidationResult, validate } from './validation';
import FormField from './FormField';
import { FormFieldOption, FieldName } from './form-fields';
import { FormFieldOptionsContext } from './FormField/form-field-context';

type Errors = Record<FieldName, ValidationResult>;

interface RegistrationState {
  errors: Errors;
}

interface RegistrationFormProps extends React.PropsWithChildren {
  formFields: FormFieldOption[];
}

export default class RegistrationForm extends React.Component<
  RegistrationFormProps,
  RegistrationState
> {
  constructor(props: RegistrationFormProps) {
    super(props);

    this.state = {
      errors: this.props.formFields
        .map(({ name }) => name)
        .reduce<Errors>((acc, name) => {
          return { ...acc, [name]: { ...defaultValidationResult } };
        }, {} as Errors),
    };
  }

  isErrors = (errors: Errors) => {
    const keys = Object.keys(errors) as (keyof Errors)[];
    return keys.some((key) => !errors[key].isValid);
  };

  clearForm = () => {
    this.props.formFields
      .map(({ inputRef }) => inputRef)
      .forEach((ref) => {
        if (ref === undefined) return;
        if (Array.isArray(ref)) {
          ref.forEach((item) => item.clearValue());
        } else {
          ref.clearValue();
        }
      });
  };

  validate = (formData: FormData): Errors => {
    const errors: Errors = { ...this.state.errors };

    this.props.formFields.forEach((field) => {
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
    return errors;
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    const formData = new FormData(form);
    const errors = this.validate(formData);
    this.setState({ errors });

    if (this.isErrors(errors)) {
      return;
    }

    // show confirmation modal
    // if OK, add new card with formData
    const result = confirm('Are you really want to submit form? (form will be cleared after)');
    if (result) {
      for (const entrie of formData.entries()) {
        console.log(entrie);
      }
      this.clearForm();
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <section className="registration page">
        <div className="container registration__container">
          <form className="registration-form" onSubmit={this.handleSubmit} noValidate>
            <h3 className="registration-form__title">Registration</h3>
            {this.props.formFields.map((field) => (
              <FormFieldOptionsContext.Provider value={{ options: field }} key={field.name}>
                <FormField validationResult={errors[field.name]} />
              </FormFieldOptionsContext.Provider>
            ))}
            <button className="registration-form__button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </section>
    );
  }
}
