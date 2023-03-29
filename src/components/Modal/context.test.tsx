import { renderHook, waitFor } from '@testing-library/react';
import { useModal } from './context';

describe('ModalContext', () => {
  test('Should change modal on setModal call', async () => {
    const { result } = renderHook(() => useModal());

    await waitFor(() => {
      result.current.setModal({ isOpen: true });
    });

    expect(result.current.modal.isOpen).toBe(true);
  });
});
