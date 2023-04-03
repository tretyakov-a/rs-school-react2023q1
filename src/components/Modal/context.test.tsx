import { act, renderHook } from '@testing-library/react';
import { useModal } from './context';

describe('ModalContext', () => {
  test('Should change modal on setModal call', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.modal.isOpen).toBe(false);
    act(() => {
      result.current.setModal({ isOpen: true });
    });
    expect(result.current.modal.isOpen).toBe(true);
  });
});
