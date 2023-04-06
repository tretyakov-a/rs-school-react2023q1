import '@src/__mocks__/local-storage-mock';
import { renderHook } from '@testing-library/react';
import useLocalStorage from './use-local-storage';

describe('useLocalStorage test', () => {
  test('Should work correctly', () => {
    const testValue = 'test-value';
    const testKey = 'test-key';
    const {
      result: {
        current: [set, get],
      },
    } = renderHook(() => useLocalStorage(testKey));

    set(testValue);
    expect(get()).toBe(testValue);
    localStorage.removeItem(testKey);
    expect(get()).toBe('');
  });
});
