import { act, render, renderHook, screen } from '@testing-library/react';
import { useModal, getModalComponent, ModalContext } from './context';
import ConfirmModal from './ConfirmModal';
import InfoModal from './InfoModal';
import { useContext } from 'react';

jest.mock('./ConfirmModal', () => () => <div data-testid="confirm-modal-testid"></div>);
jest.mock('./InfoModal', () => () => <div data-testid="info-modal-testid"></div>);

const TestComponent = () => {
  const { modal, setModal } = useContext(ModalContext);
  setModal({ isOpen: true });
  return <div>{modal.question}</div>;
};

describe('ModalContext', () => {
  test('Should change modal on setModal call', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.modal.isOpen).toBe(false);
    act(() => {
      result.current.setModal({ isOpen: true });
    });
    expect(result.current.modal.isOpen).toBe(true);
  });

  test('getModalComponent() works correctly', () => {
    expect(getModalComponent('info')).toBe(InfoModal);
    expect(getModalComponent()).toBe(ConfirmModal);
  });

  test('Context default value should be set', () => {
    render(<TestComponent />);
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });
});
