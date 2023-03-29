import '@src/__mocks__/font-awesome-icon-mock';
import SearchBar from '.';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import React from 'react';

const setStorageValueMock = jest.fn();
const setSearchValueMock = jest.fn();
const testStoredValue = 'test-stored-value';

jest.mock('@src/hooks/use-local-storage', () => () => [setStorageValueMock, () => testStoredValue]);

jest.mock('@src/hooks/use-state-with-ref', () => (value: string) => [
  value,
  setSearchValueMock,
  React.createRef(),
]);

const getElements = () => {
  const textbox = screen.getByRole('textbox');
  const button = screen.getByRole('button');
  const searchInputEl = screen.getByRole('textbox') as HTMLInputElement;
  return { textbox, button, searchInputEl };
};
describe('<SearchBar /> test', () => {
  beforeEach(() => {
    setStorageValueMock.mockClear();
    setSearchValueMock.mockClear();
    render(<SearchBar />);
  });

  test('Should render correctly', () => {
    const { textbox, button } = getElements();
    expect(textbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Should load input value from localStorage on mount', () => {
    const { searchInputEl } = getElements();
    expect(searchInputEl.value).toBe(testStoredValue);
  });

  test('Should save input value to localStorage on unmount', () => {
    cleanup();
    setStorageValueMock.mockClear();
    const { unmount } = render(<SearchBar />);

    const { textbox } = getElements();
    fireEvent.change(textbox, {
      target: { value: 'savetest' },
    });
    expect(setSearchValueMock).toBeCalledTimes(1);
    unmount();
    expect(setStorageValueMock).toBeCalledTimes(1);
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
