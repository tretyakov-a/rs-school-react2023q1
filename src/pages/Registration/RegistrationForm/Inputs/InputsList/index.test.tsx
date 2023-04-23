import React from 'react';
import InputsList from '.';
import { screen, render } from '@testing-library/react';
import { FormFieldOptionsContext } from '../../form-field/context';

jest.mock('../../data', () => ({
  isRadioInputDataArray: jest.fn(() => true),
}));

jest.mock('../CustomInput', () => (props: React.PropsWithChildren & { label: string }) => (
  <div data-testid="custom-input-testid">
    {props.children}
    <label>{props.label}</label>
  </div>
));

jest.mock('../Input', () => (props: { value: string }) => (
  <input data-testid="input-testid" defaultValue={props.value}></input>
));

jest.mock('../../form-field/context', () => ({
  FormFieldOptionsContext: React.createContext(null),
}));

const dataMock = [
  { name: 'test-name-1', label: 'test-label-1' },
  { name: 'test-name-2', label: 'test-label-2' },
];

const TestComponent = () => {
  return (
    <FormFieldOptionsContext.Provider
      value={{
        options: {
          name: 'programmingLanguage',
          type: 'checkbox',
          data: [
            { name: 'test-name-1', label: 'test-label-1' },
            { name: 'test-name-2', label: 'test-label-2' },
          ],
        },
        register: jest.fn(),
        watch: jest.fn(),
      }}
    >
      <InputsList />
    </FormFieldOptionsContext.Provider>
  );
};

describe('<InputsList /> test', () => {
  test('Should render correctly', () => {
    render(<TestComponent />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(dataMock.length);

    const inputs = screen.getAllByTestId('input-testid') as HTMLInputElement[];

    dataMock.forEach(({ name, label }, i) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(inputs[i].value).toBe(name);
    });
  });
});
