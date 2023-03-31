import React from 'react';
import './style.scss';
import { defaultValidationResult, validate } from './validation';
import { ValidationResult } from './validation/types';
import { FormField, FieldName, FormFieldOptions, FormFieldOptionsContext } from './form-field';
import Modal from '@components/Modal';
import { withModal } from '@components/Modal/context';

type Errors = Record<FieldName, ValidationResult>;

interface RegistrationState {
  errors: Errors;
}

interface RegistrationFormProps extends React.PropsWithChildren {
  formFields: FormFieldOptions[];
  onSubmit: (data: FormData) => void;
  modalRef: React.RefObject<Modal>;
}

export class RegistrationForm extends React.Component<RegistrationFormProps, RegistrationState> {
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

    const formData = new FormData(form as HTMLFormElement);
    const errors = this.validate(formData);
    this.setState({ errors });

    if (this.isErrors(errors)) {
      return;
    }

    this.props.onSubmit(formData);
    setTimeout(() => {
      this.props.modalRef.current?.open(() => {
        this.clearForm();
      }, 'Form data has been saved. Do you want to clear form?');
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

    const formData = new FormData(this.formRef.current as HTMLFormElement);
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
            className="registration-form__button button"
            type="button"
            onClick={this.fillFormWithTestValues}
          >
            Fill with test values
          </button>
          <button className="registration-form__button button" type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default withModal(RegistrationForm);
