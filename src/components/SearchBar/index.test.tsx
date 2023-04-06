import '@src/__mocks__/font-awesome-icon-mock';
import SearchBar from '.';
import { render, fireEvent, screen } from '@testing-library/react';

const setSearchValueMock = jest.fn();

jest.mock('@src/hooks/use-state-with-ref', () => () => ['test-value', setSearchValueMock]);

const getElements = () => {
  const textbox = screen.getByRole('textbox');
  const button = screen.getByRole('button');
  const searchInputEl = screen.getByRole('textbox') as HTMLInputElement;
  return { textbox, button, searchInputEl };
};
describe('<SearchBar /> test', () => {
  beforeEach(() => {
    setSearchValueMock.mockClear();
    render(<SearchBar />);
  });

  test('Should render correctly', () => {
    const { textbox, button } = getElements();
    expect(textbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('handleSubmit should fired on button click', () => {
    const { searchInputEl, button } = getElements();

    fireEvent.change(searchInputEl, {
      target: { value: 'submittest' },
    });
    expect(setSearchValueMock).toBeCalledTimes(1);
    fireEvent.click(button);
    expect(setSearchValueMock).toBeCalledTimes(2);
  });
});
