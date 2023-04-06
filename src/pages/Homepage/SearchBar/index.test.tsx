import '@src/__mocks__/font-awesome-icon-mock';
import SearchBar from '.';
import { render, fireEvent, screen } from '@testing-library/react';
import { Loading } from '@src/hooks/use-data-loader/types';

const setSearchValueMock = jest.fn();
const onSubmitMock = jest.fn();

const testValue = 'test-value';
jest.mock('./hooks/use-state-with-ref', () => () => [testValue, setSearchValueMock]);

const getElements = () => {
  const textbox = screen.getByRole('textbox');
  const button = screen.getByRole('button');
  const searchInputEl = screen.getByRole('textbox') as HTMLInputElement;
  return { textbox, button, searchInputEl };
};

const renderSearchBar = (loading: Loading = Loading.IDLE) => {
  render(<SearchBar onSubmit={onSubmitMock} loading={loading} />);
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

  test('handleInputChange should be fired on input change', () => {
    renderSearchBar();
    const { searchInputEl } = getElements();

    fireEvent.change(searchInputEl, {
      target: { value: 'new value' },
    });
    expect(setSearchValueMock).toBeCalledTimes(1);
  });

  test('handleSubmit should be fired on button click', () => {
    renderSearchBar();
    const { button } = getElements();

    fireEvent.click(button);
    expect(onSubmitMock).toBeCalledWith(testValue);
  });
});
