import React from 'react';
import { FormFieldOption } from '../form-fields';
import { ValidationResult } from '../validation';
import { renderInput } from '../Inputs';
import { withFormFieldOptions } from './form-field-context';

export interface FormFieldProps {
  options: FormFieldOption;
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
      options: { label },
      validationResult,
    } = this.props;

    return (
      <>
        <div className={`registration-form__row ${validationResult.isValid ? '' : 'invalid'}`}>
          <div className="registration-form__row-title">{label || ''}</div>
          {renderInput(this.props.options)}
        </div>
        <div className="registration-form__error">{this.renderErrors(validationResult)}</div>
      </>
    );
  }
}

export default withFormFieldOptions(FormField);
