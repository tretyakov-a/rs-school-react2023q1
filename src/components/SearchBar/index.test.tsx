import SearchBar from '.';
import { render, fireEvent, screen } from '@testing-library/react';

describe('<SearchBar /> test', () => {
  test('Should render correctly', () => {
    render(<SearchBar />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Should load input value from localStorage on mount', () => {
    const testValue = 'loadtest';
    localStorage.setItem(SearchBar.localStorageKey, testValue);

    render(<SearchBar />);

    const searchInputEl = screen.getByRole('textbox') as HTMLInputElement;
    expect(searchInputEl.value).toBe(testValue);
  });

  test('Should save input value to localStorage on unmount', () => {
    const testValue = 'savetest';

    const { unmount } = render(<SearchBar />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: testValue },
    });

    unmount();

    const storedValue = localStorage.getItem(SearchBar.localStorageKey);
    expect(storedValue).toBe(testValue);
  });

  test('handleSubmit should fired on button click', () => {
    const testValue = 'submittest';

    render(<SearchBar />);

    const searchInputEl = screen.getByRole('textbox') as HTMLInputElement;
    const submitButton = screen.getByRole('button') as HTMLButtonElement;

    fireEvent.change(searchInputEl, {
      target: { value: testValue },
    });
    expect(searchInputEl.value).toBe(testValue);

    fireEvent.click(submitButton);
    expect(searchInputEl.value).toBe('');
  });
});
