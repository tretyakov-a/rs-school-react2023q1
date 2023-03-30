import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import RegistrationForm from '.';
import { ModalContext } from '@components/Modal/context';

const onSubmitMock = jest.fn();
const setModalMock = jest.fn(({ okCallback }) => okCallback());

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    setValue: jest.fn(),
    register: jest.fn(),
    watch: jest.fn(),
    reset: jest.fn(),
    handleSubmit: jest.fn((fn: () => void) => (e: Event) => {
      e.preventDefault();
      fn();
    }),
    formState: { errors: {} },
  })),
}));

jest.mock('@components/Modal/context', () => ({
  ModalContext: React.createContext(null),
}));

jest.mock('./form-field', () => ({
  FormFieldOptionsContext: React.createContext(null),
  FormField: () => <div data-testid="form-field-testid"></div>,
}));

jest.mock('./config', () => ({
  formFields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'bithday',
      type: 'date',
    },
    {
      name: 'programmingLanguage',
      label: 'Programming languages',
      type: 'checkbox',
    },
  ],
  defautFormValues: {
    name: '',
    birthday: '',
  },
  testFormValues: {
    name: 'test-name',
    birthday: '2001-01-01',
  },
}));

const getElements = () => {
  const submitButton = screen.getByRole('button', { name: /submit/i }) as HTMLButtonElement;
  const fillButton = screen.getByRole('button', {
    name: /fill with test values/i,
  }) as HTMLButtonElement;
  return { submitButton, fillButton };
};

describe('<RegistrationForm /> test', () => {
  beforeEach(() => {
    onSubmitMock.mockClear();
    setModalMock.mockClear();
    render(
      <ModalContext.Provider value={{ setModal: setModalMock }}>
        <RegistrationForm onSubmit={onSubmitMock} />
      </ModalContext.Provider>
    );
  });

  test('Should render correctly', () => {
    const { submitButton, fillButton } = getElements();
    expect(screen.getAllByTestId('form-field-testid').length).toBe(3);
    expect(screen.getByRole('heading', { name: /registration/i })).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(fillButton).toBeInTheDocument();
  });

  test('Should call clear method after submit and confirmation', async () => {
    const { submitButton } = getElements();

    fireEvent.click(submitButton);
    expect(setModalMock).toBeCalledTimes(1);
    expect(onSubmitMock).toBeCalledTimes(1);
  });
});
