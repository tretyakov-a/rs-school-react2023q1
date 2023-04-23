import React, { useContext } from 'react';
import { FormFieldOptionsContext } from './context';
import { renderInput } from '../Inputs';
import { FieldError } from 'react-hook-form';

interface FormFieldProps {
  fieldError?: FieldError;
}

const FormField = (props: FormFieldProps) => {
  const { options } = useContext(FormFieldOptionsContext);
  const { fieldError } = props;
  const { label, validation } = options;
  const isRequired = validation?.required !== undefined && validation.required;

  return (
    <>
      <div className={`registration-form__row ${fieldError ? 'invalid' : ''}`}>
        <div className="registration-form__row-title">
          <div>{label}</div>
          {!isRequired && <div className="registration-form__row-subtitle">(optional)</div>}
        </div>
        {renderInput(options)}
      </div>
      {fieldError && <div className="registration-form__error">{fieldError.message}</div>}
    </>
  );
};

export default FormField;
