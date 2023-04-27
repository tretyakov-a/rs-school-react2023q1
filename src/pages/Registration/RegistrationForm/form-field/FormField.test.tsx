import React from 'react';
import { FormFieldOptionsContext } from './context';
import { FormField } from '.';
import { FormFieldOptions } from './types';
import { render, screen } from '@testing-library/react';

jest.mock('./context', () => ({
  FormFieldOptionsContext: React.createContext(null),
}));

jest.mock('../Inputs', () => ({
  renderInput: jest.fn(() => <input data-testid="input-testid" />),
}));

const TestComponent = (props: {
  options?: Partial<FormFieldOptions>;
  error?: { type: string; message: string };
}) => {
  return (
    <FormFieldOptionsContext.Provider
      value={{
        options: {
          name: 'name',
          type: 'text',
          label: 'test-label',
          ...props.options,
        },
        register: jest.fn(),
        watch: jest.fn(),
      }}
    >
      <FormField fieldError={props.error} />
    </FormFieldOptionsContext.Provider>
  );
};

describe('FormField test', () => {
  test('Should render correctly', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('input-testid')).toBeInTheDocument();
    expect(screen.getByText('test-label')).toBeInTheDocument();
    expect(screen.getByText('(optional)')).toBeInTheDocument();
  });

  test('Should not render field as optional if validation.required', () => {
    render(<TestComponent options={{ validation: { required: true } }} />);
    expect(screen.queryByText('(optional)')).not.toBeInTheDocument();
  });

  test('Should render error correctly', () => {
    const { container } = render(
      <TestComponent error={{ type: '', message: 'test-error-message' }} />
    );

    expect(container.firstChild).toHaveClass('invalid');
    expect(screen.getByText('test-error-message')).toBeInTheDocument();
  });
});
