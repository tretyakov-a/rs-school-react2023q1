import React from 'react';
import './style.scss';
import { defaultValidationResult, validate } from './validation';
import { ValidationResult } from './validation/types';
import { FormField, FieldName, FormFieldOptions, FormFieldOptionsContext } from './form-field';

type Errors = Record<FieldName, ValidationResult>;

interface RegistrationState {
  errors: Errors;
}

interface RegistrationFormProps extends React.PropsWithChildren {
  formFields: FormFieldOptions[];
  onSubmit: (data: FormData) => void;
}

export default class RegistrationForm extends React.Component<
  RegistrationFormProps,
  RegistrationState
> {
  private formRef: React.RefObject<HTMLFormElement>;
  constructor(props: RegistrationFormProps) {
    super(props);

    this.formRef = React.createRef<HTMLFormElement>();
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
        errors[field.name] = validate(field, value);
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
    setTimeout(() => {
      const result = confirm('Are you really want to submit form? (form will be cleared)');
      if (result) {
        this.props.onSubmit(formData);
        this.clearForm();
      }
    });
  };

  fillFormWithTestValues = () => {
    this.props.formFields.forEach((field) => {
      const { inputRef } = field;
      if (inputRef === undefined) return;
      if (Array.isArray(inputRef)) {
        inputRef.forEach((item) => item.setValue(field));
      } else {
        inputRef.setValue(field);
      }
    });

    if (this.formRef.current === null) return;
    const formData = new FormData(this.formRef.current);
    const errors = this.validate(formData);
    this.setState({ errors });
  };

  render() {
    const { errors } = this.state;
    return (
      <form
        className="registration-form"
        onSubmit={this.handleSubmit}
        ref={this.formRef}
        noValidate
      >
        <h3 className="registration-form__title">Registration</h3>
        {this.props.formFields.map((field) => (
          <FormFieldOptionsContext.Provider value={{ options: field }} key={field.name}>
            <FormField validationResult={errors[field.name]} />
          </FormFieldOptionsContext.Provider>
        ))}
        <div className="registration-form__buttons">
          <button
            className="registration-form__button"
            type="button"
            onClick={this.fillFormWithTestValues}
          >
            Fill with test values
          </button>
          <button className="registration-form__button" type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  }
}
