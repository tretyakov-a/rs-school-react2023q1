import React from 'react';
import { FormFieldOptions } from './types';

const defaultValue: FormFieldOptions = {
  name: '',
  type: '',
};

interface withFormFieldOptionsProps {
  options: FormFieldOptions;
}

export const FormFieldOptionsContext = React.createContext<withFormFieldOptionsProps>({
  options: { ...defaultValue },
});

export const withFormFieldOptions =
  <P extends object>(
    Wrapped: React.ComponentType<P>
  ): React.FC<Omit<P, keyof withFormFieldOptionsProps>> =>
  (props) =>
    (
      <FormFieldOptionsContext.Consumer>
        {({ options }) => <Wrapped {...(props as P)} options={options} />}
      </FormFieldOptionsContext.Consumer>
    );
