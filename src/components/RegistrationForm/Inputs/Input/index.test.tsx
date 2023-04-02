import React from 'react';
import Input from '.';
import { screen, render } from '@testing-library/react';

import { FormFieldOptionsContext } from '@components/RegistrationForm/form-field/context';
import { FormFieldOptions } from '@components/RegistrationForm/form-field';

jest.mock('@components/RegistrationForm/form-field/context', () => ({
  FormFieldOptionsContext: React.createContext({
    options: {
      name: 'name',
      type: 'text',
    },
  }),
}));

const TestComponent = (props: { options: FormFieldOptions }) => {
  const { formFieldType } = props.options;
  return (
    <FormFieldOptionsContext.Provider
      value={{ options: props.options, register: jest.fn(), watch: jest.fn() }}
    >
      <Input value={formFieldType === 'list' ? 'javascript' : undefined} />
    </FormFieldOptionsContext.Provider>
  );
};

describe('<Input /> test', () => {
  test('Should render correctly', () => {
    render(
      <TestComponent
        options={{
          name: 'name',
          type: 'text',
        }}
      />
    );

    const textEl = screen.getByRole('textbox');
    expect(textEl).toBeInTheDocument();
    expect(textEl.getAttribute('id')).toBe('name-text-input');
  });

  test('Should render list input correctly', () => {
    render(
      <TestComponent
        options={{
          name: 'programmingLanguage',
          type: 'checkbox',
          formFieldType: 'list',
        }}
      />
    );
    const checkboxEl = screen.getByRole('checkbox');
    expect(checkboxEl).toBeInTheDocument();
    expect(checkboxEl.getAttribute('id')).toBe('javascript-checkbox-input');
  });
});
