import { act, renderHook } from '@testing-library/react';
import useStateWithRef from './use-state-with-ref';

describe('UseStateWithRef test', () => {
  test('Should work correctly', async () => {
    const initialValue = 'initial value';
    const testValue = 'test';
    const {
      result: {
        current: [value, setValue, searchValueRef],
      },
    } = renderHook(() => useStateWithRef<string>(initialValue));

    expect(value).toBe(initialValue);
    expect(searchValueRef.current).toBe(initialValue);

    act(() => {
      setValue(testValue);
    });
    expect(searchValueRef.current).toBe(testValue);
  });
});
