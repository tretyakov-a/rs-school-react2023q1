import { imageFileMock } from '@src/__mocks__/file-instance-mock';
import RegistrationList from '.';
import { screen, render } from '@testing-library/react';
import { StoredFormInputs } from '@pages/Registration';

jest.mock('@components/RegistrationForm/config', () => ({
  formFieldsOptions: {
    name: { type: 'text', label: 'name' },
    password: { type: 'password', label: 'password' },
    email: { type: 'email', label: 'email' },
    birthday: { type: 'date', label: 'birthday' },
    country: { type: 'select', label: 'country' },
    subscribe: { type: 'checkbox', label: 'subscribe' },
    programmingLanguage: { type: 'checkbox', label: 'programmingLanguage' },
    gender: { type: 'radio', label: 'gender' },
    avatar: { type: 'file', label: 'avatar' },
  },
}));

const dataItemMock = {
  name: 'test-name',
  password: '12345678',
  email: 'test@test.ru',
  birthday: '2001-01-01',
  country: 'test-country',
  subscribe: 'on',
  programmingLanguage: ['test-language1', 'test-language2'],
  gender: 'test-gender',
  avatar: imageFileMock,
};

const dataMock: StoredFormInputs[] = [dataItemMock];
const dataMockEmptyFields: StoredFormInputs[] = [{ ...dataItemMock, avatar: '', birthday: '' }];

const testUrl = 'http://test-url.ru/';
global.URL.createObjectURL = jest.fn(() => testUrl);

describe('<RegistrationList /> test', () => {
  test('Should render correctly', () => {
    render(<RegistrationList data={dataMock} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(dataMock.length);
    expect(screen.getByText(/test-name/i)).toBeInTheDocument();
    expect(screen.getByText(/12345678/i)).toBeInTheDocument();
    expect(screen.getByText(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByText(/1\/1\/2001/i)).toBeInTheDocument();
    expect(screen.getByText(/on/i)).toBeInTheDocument();
    expect(screen.getByText(/test-language1, test-language2/i)).toBeInTheDocument();
    expect(screen.getByText(/test-gender/i)).toBeInTheDocument();
    expect((screen.getByRole('img') as HTMLImageElement).src).toBe(testUrl);
  });

  test('Should render correctly with empty data fields', () => {
    render(<RegistrationList data={dataMockEmptyFields} />);

    expect(screen.queryByText(/birthday/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/avatar/i)).not.toBeInTheDocument();
  });
});
