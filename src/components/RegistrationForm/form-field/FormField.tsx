import React, { useContext } from 'react';
import { ValidationResult } from '../validation';
import { FormFieldOptionsContext } from './context';
import { renderInput } from '../Inputs';

interface FormFieldProps {
  validationResult: ValidationResult;
}

const FormField = (props: FormFieldProps) => {
  const { options } = useContext(FormFieldOptionsContext);

  const renderErrors = ({ errors }: ValidationResult) => {
    return errors.map((error, i) => <div key={error.length + i}>{error}</div>);
  };

  const { validationResult } = props;
  const { label, validation } = options;
  const isRequired = validation?.required !== undefined && validation.required;

  return (
    <>
      <div className={`registration-form__row ${validationResult.isValid ? '' : 'invalid'}`}>
        <div className="registration-form__row-title">
          <div>{label || ''}</div>
          {!isRequired && <div className="registration-form__row-subtitle">(optional)</div>}
        </div>
        {renderInput(options)}
      </div>
      <div className="registration-form__error">{renderErrors(validationResult)}</div>
    </>
  );
};

export default FormField;
