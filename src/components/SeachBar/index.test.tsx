import '@testing-library/jest-dom';
import SearchBar from '.';
import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';

afterEach(() => {
  cleanup();
});

describe('<SearchBar /> test', () => {
  test('Should render correctly', () => {
    const { container } = render(<SearchBar />);
    const el = container.querySelector('.search-bar');
    const searchInputEl = container.querySelector('input[name="search"]') as HTMLInputElement;

    expect(el).not.toBeNull();
    expect(searchInputEl).not.toBeNull();
  });

  test('Should load input value from localStorage on mount', () => {
    const testValue = 'loadtest';
    localStorage.setItem(SearchBar.localStorageKey, testValue);

    const { container } = render(<SearchBar />);
    const searchInputEl = container.querySelector('input[name="search"]') as HTMLInputElement;

    expect(searchInputEl.value).toBe(testValue);
  });

  test('Should save input value to localStorage on unmount', () => {
    const testValue = 'savetest';

    const { container, unmount } = render(<SearchBar />);
    const searchInputEl = container.querySelector('input[name="search"]') as HTMLInputElement;

    fireEvent.change(searchInputEl, {
      target: { value: testValue },
    });

    unmount();

    const storedValue = localStorage.getItem(SearchBar.localStorageKey);
    expect(storedValue).toBe(testValue);
  });

  test('handleSubmit should fired on button click', () => {
    const testValue = 'submittest';

    const { container } = render(<SearchBar />);
    const searchInputEl = container.querySelector('input[name="search"]') as HTMLInputElement;
    const submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;

    fireEvent.change(searchInputEl, {
      target: { value: testValue },
    });
    expect(searchInputEl.value).toBe(testValue);

    fireEvent.click(submitButton);
    expect(searchInputEl.value).toBe('');
  });
});
