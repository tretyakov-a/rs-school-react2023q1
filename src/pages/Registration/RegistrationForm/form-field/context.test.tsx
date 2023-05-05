import { useContext } from 'react';
import { FormFieldOptionsContext, type FormFieldOptions } from '.';
import { render, screen } from '@testing-library/react';

jest.mock('./FormField', () => jest.fn());

const TestComponent = () => {
  const { options } = useContext(FormFieldOptionsContext);
  return <div>{options.name}</div>;
};

const mockFormField: FormFieldOptions = {
  name: 'password',
  label: 'Password',
  type: 'password',
};

describe('FormFieldOptionsContext test', () => {
  test('works correctly', () => {
    render(
      <FormFieldOptionsContext.Provider
        value={{ options: mockFormField, register: null, watch: null }}
      >
        <TestComponent />
      </FormFieldOptionsContext.Provider>
    );
    expect(screen.getByText('password')).toBeInTheDocument();
  });
});
