import '@src/__mocks__/font-awesome-icon-mock';
import SearchBar from '.';
import { render, fireEvent, screen } from '@testing-library/react';
import { Loading } from '@src/hooks/use-data-loader/types';

const setSearchValueMock = jest.fn();
const onSubmitMock = jest.fn();

jest.mock('@src/hooks/use-state-with-ref', () => () => ['test-value', setSearchValueMock]);

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

  test('handleSubmit should fired on button click', () => {
    renderSearchBar();
    const { searchInputEl, button } = getElements();

    fireEvent.change(searchInputEl, {
      target: { value: 'submittest' },
    });
    expect(setSearchValueMock).toBeCalledTimes(1);
    fireEvent.click(button);
    expect(onSubmitMock).toBeCalledTimes(1);
  });
});
