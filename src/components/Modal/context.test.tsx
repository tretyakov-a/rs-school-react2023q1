import { act, render, renderHook } from '@testing-library/react';
import { useModal, getModalComponent, ModalContext } from './context';
import ConfirmModal from './ConfirmModal';
import InfoModal from './InfoModal';
import { useContext } from 'react';

jest.mock('./ConfirmModal', () => () => <div data-testid="confirm-modal-testid"></div>);
jest.mock('./InfoModal', () => () => <div data-testid="info-modal-testid"></div>);

const TestComponent = () => {
  const { modal, openModal, setModalState } = useContext(ModalContext);
  openModal({ isOpen: true });
  setModalState({ isOpen: false });
  return <div>{modal.content}</div>;
};

describe('ModalContext', () => {
  test('Should change modal state', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.modal.isOpen).toBe(false);
    act(() => {
      result.current.openModal({ isOpen: true });
    });
    expect(result.current.modal.isOpen).toBe(true);

    act(() => {
      result.current.setModalState({ isOpen: false });
    });
    expect(result.current.modal.isOpen).toBe(false);
  });

  test('getModalComponent() works correctly', () => {
    expect(getModalComponent('info')).toBe(InfoModal);
    expect(getModalComponent()).toBe(ConfirmModal);
  });

  test('Context default value should be set', () => {
    const { container } = render(<TestComponent />);
    expect(container.firstChild).not.toHaveClass('open');
  });
});
