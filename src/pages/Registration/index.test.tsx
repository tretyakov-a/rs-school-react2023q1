import '@src/__mocks__/page-wrap-mock';
import { getEmptyFileListMock, getFileListMock } from '@src/__mocks__/file-instance-mock';
import Registration from '.';
import { screen, render, fireEvent } from '@testing-library/react';
import { FormFieldOptions } from './RegistrationForm/form-field';
import * as RegistrationForm from './RegistrationForm';
import { FormInputs } from './RegistrationForm/types';

type RegistrationFormMockProps = { onSubmit: (formData: Pick<FormInputs, 'avatar'>) => void };
const RegistrationFormMock = RegistrationForm as { default: React.FC<RegistrationFormMockProps> };

const testFormFields: FormFieldOptions[] = [
  {
    name: 'name',
    type: 'text',
  },
  {
    name: 'programmingLanguage',
    type: 'radio',
  },
];

type TestFormInputs = Pick<FormInputs, 'avatar'>;
const formInputsMock: Pick<FormInputs, 'avatar'> = {
  avatar: getFileListMock(),
};

const formInputsEmptyFileListMock: Pick<FormInputs, 'avatar'> = {
  avatar: getEmptyFileListMock(),
};

jest.mock('@common/helpers', () => ({
  cloneFile: jest.fn(),
}));

jest.mock('./RegistrationForm', () => ({
  __esModule: true,
  default: (props: RegistrationFormMockProps) => (
    <div data-testid="form-testid">
      <button onClick={() => props.onSubmit(formInputsMock)}>submit</button>
    </div>
  ),
}));

jest.mock('./RegistrationList', () => () => <div data-testid="list-testid" />);
jest.mock('./RegistrationForm/form-field', () => ({
  getFormFields: () => testFormFields,
}));

const setValueMock = jest.fn((fn: (prev: TestFormInputs[]) => TestFormInputs[]) => fn([]));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: () => [null, setValueMock],
}));

describe('<Registration /> test', () => {
  beforeEach(() => {
    setValueMock.mockClear();
  });

  test('Should render correctly', () => {
    render(<Registration />);
    expect(screen.getByTestId('page-wrap-testid')).toBeInTheDocument();
    expect(screen.getByTestId('form-testid')).toBeInTheDocument();
    expect(screen.getByTestId('list-testid')).toBeInTheDocument();
  });

  test('Should call submit', () => {
    render(<Registration />);
    const submit = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submit);
    expect(setValueMock).toBeCalledTimes(1);
  });

  test('Should correctly save data', () => {
    RegistrationFormMock.default = (props: RegistrationFormMockProps) => (
      <div data-testid="form-testid">
        <button onClick={() => props.onSubmit(formInputsEmptyFileListMock)}>submit</button>
      </div>
    );

    render(<Registration />);
    const submit = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submit);
    expect(setValueMock).toBeCalledTimes(1);
    expect(setValueMock).toReturnWith([{ avatar: '' }]);
  });
});
