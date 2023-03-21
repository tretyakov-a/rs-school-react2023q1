import React from 'react';
import { FormFieldOption } from '../form-fields';

const defaultValue: FormFieldOption = {
  name: '',
  type: '',
};

interface withFormFieldOptionsProps {
  options: FormFieldOption;
}

const FormFieldOptionsContext = React.createContext<withFormFieldOptionsProps>({
  options: { ...defaultValue },
});

const withFormFieldOptions =
  <P extends object>(
    Wrapped: React.ComponentType<P>
  ): React.FC<Omit<P, keyof withFormFieldOptionsProps>> =>
  (props) =>
    (
      <FormFieldOptionsContext.Consumer>
        {({ options }) => <Wrapped {...(props as P)} options={options} />}
      </FormFieldOptionsContext.Consumer>
    );

export { FormFieldOptionsContext, withFormFieldOptions };
