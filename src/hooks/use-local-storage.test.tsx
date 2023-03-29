import { renderHook, waitFor } from '@testing-library/react';
import useLocalStorage from './use-local-storage';

const store: Record<string, string> = {};

global.Storage.prototype.setItem = jest.fn((key, value) => {
  store[key] = value;
});
global.Storage.prototype.getItem = jest.fn((key) => store[key]);
global.Storage.prototype.removeItem = jest.fn((key) => delete store[key]);

describe('useLocalStorage test', () => {
  test('Should work correctly', async () => {
    const testValue = 'test-value';
    const testKey = 'test-key';
    const {
      result: {
        current: [set, get],
      },
    } = renderHook(() => useLocalStorage(testKey));

    await waitFor(() => {
      set(testValue);
    });

    expect(get()).toBe(testValue);
    localStorage.removeItem(testKey);
    expect(get()).toBe('');
  });
});
