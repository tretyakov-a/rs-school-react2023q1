import { renderHook } from '@testing-library/react';
import useStateWithRef from './use-state-with-ref';

describe('UseStateWithRef test', () => {
  test('Should work correctly', async () => {
    const initialValue = 'initial value';
    const {
      result: {
        current: [value, _, searchValueRef],
      },
    } = renderHook(() => useStateWithRef<string>(initialValue));

    expect(value).toBe(initialValue);
    expect(searchValueRef.current).toBe(initialValue);
  });
});
