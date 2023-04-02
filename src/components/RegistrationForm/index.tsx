import React, { useCallback, useContext, useEffect } from 'react';
import './style.scss';
import { FormField, FormFieldOptionsContext } from './form-field';
import { ModalContext } from '@components/Modal/context';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInputs } from './types';
import { defautFormValues, formFields, testFormValues } from './config';
import { registerInput } from './Inputs';

interface RegistrationFormProps extends React.PropsWithChildren {
  onSubmit: (data: FormInputs) => void;
}

const RegistrationForm = (props: RegistrationFormProps) => {
  const {
    setValue,
    register,
    watch,
    reset: resetForm,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues: defautFormValues });
  const { setModal } = useContext(ModalContext);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    props.onSubmit(data);
    setModal({
      type: 'confirm',
      isOpen: true,
      question: 'Form data has been saved. Do you want to clear form?',
      okCallback: () => {
        resetForm();
      },
    });
  };

  const fillFormWithTestValues = useCallback(() => {
    const keys = Object.keys(testFormValues) as (keyof typeof testFormValues)[];
    keys.forEach((key) => {
      const value = testFormValues[key];
      if (value !== undefined) setValue(key, value);
    });
  }, [setValue]);

  useEffect(() => {
    fillFormWithTestValues();
  }, [fillFormWithTestValues]);

  return (
    <form className="registration-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3 className="registration-form__title">Registration</h3>
      {formFields.map((field) => (
        <FormFieldOptionsContext.Provider
          value={{ options: field, register: registerInput(register), watch }}
          key={field.name}
        >
          <FormField fieldError={errors[field.name as keyof FormInputs]} />
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
