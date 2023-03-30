import { renderHook } from '@testing-library/react';
import useStateWithRef from './use-state-with-ref';

const setStorageValueMock = jest.fn();

const testStoredValue = 'test-stored-value';
jest.mock('./use-local-storage', () => () => [setStorageValueMock, () => testStoredValue]);

describe('UseStateWithRef test', () => {
  test('Should load inital value from storage', async () => {
    const { result } = renderHook(() => useStateWithRef('storageKey'));

    expect(result.current[0]).toBe(testStoredValue);
  });

  test('Should save to storage on unmount', async () => {
    const { unmount } = renderHook(() => useStateWithRef('storageKey'));
    unmount();
    expect(setStorageValueMock).toBeCalled();
  });
});
