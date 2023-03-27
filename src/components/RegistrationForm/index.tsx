import React, { useContext, useRef, useState } from 'react';
import './style.scss';
import { defaultValidationResult, validate, Errors, isErrors } from './validation';
import { FormField, FormFieldOptions, FormFieldOptionsContext } from './form-field';
import { ModalContext } from '@components/Modal/context';

interface RegistrationFormProps extends React.PropsWithChildren {
  formFields: FormFieldOptions[];
  onSubmit: (data: FormData) => void;
}

const RegistrationForm = (props: RegistrationFormProps) => {
  const { setModal } = useContext(ModalContext);
  const [errors, setErrors] = useState<Errors>(() =>
    props.formFields
      .map(({ name }) => name)
      .reduce<Errors>((acc, name) => {
        return { ...acc, [name]: { ...defaultValidationResult } };
      }, {} as Errors)
  );
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (formData: FormData) => {
    const errors: Errors = {};
    props.formFields.forEach((field) => {
      if (field.validation !== undefined) {
        const values = formData.getAll(field.name);
        const value = values.length > 1 ? values.join('') : values[0] || '';
        errors[field.name] = validate(field, value);
      }
    });
    return errors;
  };

  const clearForm = () => {
    props.formFields.forEach((field) => {
      const { inputRef } = field;
      if (inputRef === undefined) return;
      if (Array.isArray(inputRef)) {
        inputRef.forEach((item) => item.clearValue());
      } else {
        inputRef.clearValue();
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form as HTMLFormElement);
    const newErrors = validateForm(formData);

    setErrors((prev) => ({ ...prev, ...newErrors }));
    if (isErrors(newErrors)) {
      return;
    }
    props.onSubmit(formData);
    setModal!({
      isOpen: true,
      question: 'Form data has been saved. Do you want to clear form?',
      okCallback: () => {
        clearForm();
      },
    });
  };

  const fillFormWithTestValues = () => {
    props.formFields.forEach((field) => {
      const { inputRef } = field;
      if (inputRef === undefined) return;
      if (Array.isArray(inputRef)) {
        inputRef.forEach((item) => item.setValue(field));
      } else {
        inputRef.setValue(field);
      }
    });
    const formData = new FormData(formRef.current as HTMLFormElement);
    const newErrors = validateForm(formData);
    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit} ref={formRef} noValidate>
      <h3 className="registration-form__title">Registration</h3>
      {props.formFields.map((field) => (
        <FormFieldOptionsContext.Provider value={{ options: field }} key={field.name}>
          <FormField validationResult={errors[field.name]} />
        </FormFieldOptionsContext.Provider>
      ))}
      <div className="registration-form__buttons">
        <button
          className="registration-form__button button"
          type="button"
          onClick={fillFormWithTestValues}
        >
          Fill with test values
        </button>
        <button className="registration-form__button button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
