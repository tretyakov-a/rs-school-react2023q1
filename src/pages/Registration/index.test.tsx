import '@src/__mocks__/page-wrap-mock';
import { getEmptyFileListMock, getFileListMock } from '@src/__mocks__/file-instance-mock';
import Registration from '.';
import { screen, render, fireEvent } from '@testing-library/react';
import { FormFieldOptions } from './RegistrationForm/form-field';
import * as RegistrationForm from './RegistrationForm';
import { FormInputs } from './RegistrationForm/types';
import { addListItem as mockAddListItem } from './store';

type RegistrationFormMockProps = { onSubmit: (formData: Pick<FormInputs, 'avatar'>) => void };
const RegistrationFormMock = RegistrationForm as { default: React.FC<RegistrationFormMockProps> };

jest.mock('./store', () => ({
  addListItem: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => mockDispatch),
  useSelector: jest.fn((fn) => {
    fn({ registrationList: { data: [] } });
    return [];
  }),
}));

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
const formInputsMock: TestFormInputs = {
  avatar: getFileListMock(),
};

const formInputsEmptyFileListMock: TestFormInputs = {
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

describe('<Registration /> test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockAddListItem).toBeCalledTimes(1);
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
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockAddListItem).toBeCalledWith({ avatar: '' });
  });
});
