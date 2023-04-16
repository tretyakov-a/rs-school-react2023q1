import '@src/__mocks__/font-awesome-icon-mock';
import SearchBar from '.';
import { render, fireEvent, screen } from '@testing-library/react';
import { Loading } from '@common/types/loading';

const mockOnSubmit = jest.fn();
const testValue = 'test-value';

jest.mock('./store', () => ({
  setSearch: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn((fn: (value: { search: string }) => void) => (e: Event) => {
      e.preventDefault();
      fn({ search: testValue });
    }),
  })),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => mockDispatch),
  useSelector: jest.fn((fn) => {
    return fn({ search: { value: testValue } });
  }),
}));

const getElements = () => {
  const textbox = screen.getByRole('textbox');
  const button = screen.getByRole('button');
  const searchInputEl = screen.getByRole('textbox') as HTMLInputElement;
  return { textbox, button, searchInputEl };
};

const renderSearchBar = (loading: Loading = Loading.IDLE) => {
  render(<SearchBar onSubmit={mockOnSubmit} loading={loading} />);
};

describe('<SearchBar /> test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should render correctly', () => {
    renderSearchBar();
    const { textbox, button } = getElements();
    expect(textbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Should render button correctly when loading is pending', () => {
    renderSearchBar(Loading.PENDING);
    const { button } = getElements();
    expect(button).toHaveClass('loading');
  });

  test('handleSubmit should be fired on button click', () => {
    renderSearchBar();
    const { button } = getElements();

    fireEvent.click(button);
    expect(mockDispatch).toBeCalled();
    expect(mockOnSubmit).toBeCalledWith(testValue);
  });
});
