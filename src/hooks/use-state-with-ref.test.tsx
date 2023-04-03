import { act, renderHook } from '@testing-library/react';
import useStateWithRef from './use-state-with-ref';

const setStorageValueMock = jest.fn();

const testStoredValue = 'test-stored-value';
jest.mock('./use-local-storage', () => () => [setStorageValueMock, () => testStoredValue]);

describe('UseStateWithRef test', () => {
  test('Should load inital value from storage', async () => {
    const { result } = renderHook(() => useStateWithRef('storageKey'));

    expect(result.current[0]).toBe(testStoredValue);
  });

  test('Should save to storage on unmount', () => {
    const { unmount, result } = renderHook(() => useStateWithRef('storageKey'));

    // const [value, setValue] = result.current;
    // code below works only if use methods directly from result.current
    // and doesnt work with destructured ones
    const newValue = 'new-value';
    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toBe(newValue);

    unmount();
    expect(setStorageValueMock).toHaveBeenCalledWith(newValue);
  });
});
