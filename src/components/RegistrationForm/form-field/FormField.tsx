import React from 'react';
import { FormFieldOptions } from './types';
import { ValidationResult } from '../validation';
import { withFormFieldOptions } from './context';
import { renderInput } from '../Inputs';

interface FormFieldProps {
  options: FormFieldOptions;
  validationResult: ValidationResult;
}

class FormField extends React.Component<FormFieldProps> {
  constructor(props: FormFieldProps) {
    super(props);
  }

  renderErrors = ({ errors }: ValidationResult) => {
    return errors.map((error, i) => <div key={error.length + i}>{error}</div>);
  };

  render() {
    const {
      options: { label, validation },
      validationResult,
    } = this.props;

    const isRequired = validation?.required !== undefined && validation.required;

    return (
      <>
        <div className={`registration-form__row ${validationResult.isValid ? '' : 'invalid'}`}>
          <div className="registration-form__row-title">
            <div>{label || ''}</div>
            {!isRequired && <div className="registration-form__row-subtitle">(optional)</div>}
          </div>
          {renderInput(this.props.options)}
        </div>
        <div className="registration-form__error">{this.renderErrors(validationResult)}</div>
      </>
    );
  }
}

export default withFormFieldOptions(FormField);
