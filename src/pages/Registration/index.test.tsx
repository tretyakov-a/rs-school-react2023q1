import '@src/__mocks__/page-wrap-mock';
import Registration from '.';
import { screen, render, fireEvent } from '@testing-library/react';
import { FormFieldOptions } from '@components/RegistrationForm/form-field';

const testFormFields: FormFieldOptions[] = [
  {
    name: 'text',
    type: 'text',
  },
  {
    name: 'radio',
    type: 'radio',
  },
];

jest.mock('@components/RegistrationForm', () => (props: { onSubmit: () => void }) => (
  <div data-testid="form-testid">
    <button onClick={props.onSubmit}>submit</button>
  </div>
));
jest.mock('@components/RegistrationList', () => () => <div data-testid="list-testid" />);
jest.mock('@components/RegistrationForm/form-field', () => ({
  getFormFields: () => testFormFields,
}));

const setValueMock = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: () => [null, setValueMock],
}));

describe('<Registration /> test', () => {
  beforeEach(() => {
    render(<Registration />);
  });

  test('Should render correctly', () => {
    expect(screen.getByTestId('page-wrap-testid')).toBeInTheDocument();
    expect(screen.getByTestId('form-testid')).toBeInTheDocument();
    expect(screen.getByTestId('list-testid')).toBeInTheDocument();
  });

  test('', () => {
    const submit = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submit);
    expect(setValueMock).toBeCalledTimes(1);
  });
});
