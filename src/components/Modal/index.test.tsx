import '@src/__mocks__/font-awesome-icon-mock';
import { screen, render, fireEvent } from '@testing-library/react';
import React from 'react';
import Modal from '.';
import { ModalContext, ModalState } from '@components/Modal/context';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

const defaultModalState = {
  isOpen: false,
  question: 'test-question',
  okCallback: () => {},
};

const TestModal = () => <div data-testid="test-modal-testid"></div>;

jest.mock('@components/Modal/context', () => ({
  ModalContext: React.createContext(null),
  getModalComponent: jest.fn(() => TestModal),
}));

const mockOpenModal = jest.fn();
const mockSetModalState = jest.fn();
const TestComponent = (props: { modal: ModalState }) => (
  <ModalContext.Provider
    value={{
      modal: props.modal,
      openModal: mockOpenModal,
      setModalState: mockSetModalState,
    }}
  >
    <Modal />
  </ModalContext.Provider>
);

const getElements = () => {
  const modal = screen.getByRole('modal');
  const modalWindow = screen.getByRole('modal-window');
  return { modal, modalWindow };
};

describe('<Modal /> test', () => {
  beforeEach(() => {
    mockOpenModal.mockClear();
    jest.clearAllTimers();
  });

  test('Should render correctly', () => {
    render(<TestComponent modal={defaultModalState} />);
    const { modal, modalWindow } = getElements();

    expect(modal).toBeInTheDocument();
    expect(modalWindow).toBeInTheDocument();
    expect(screen.getByTestId('test-modal-testid')).toBeInTheDocument();
  });

  test('Should have correct class when opened or closed', () => {
    const { rerender } = render(<TestComponent modal={defaultModalState} />);
    const { modal } = getElements();
    expect(modal).not.toHaveClass('open');

    rerender(<TestComponent modal={{ ...defaultModalState, isOpen: true }} />);
    expect(modal).toHaveClass('open');
  });

  test('Should close on properly clicked area (outside modal window or buttons)', () => {
    const { rerender } = render(<TestComponent modal={{ ...defaultModalState, isOpen: true }} />);
    const { modal, modalWindow } = getElements();
    fireEvent.click(modalWindow);
    expect(modal).toHaveClass('open');

    rerender(<TestComponent modal={{ ...defaultModalState, isOpen: true }} />);
    fireEvent.click(modal);
    expect(modal).toHaveClass('close');
  });

  test('Should close correctly with timeout', () => {
    render(<TestComponent modal={{ ...defaultModalState, isOpen: true }} />);
    const { modal } = getElements();
    fireEvent.click(modal);

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), Modal.animationDuration);

    jest.runAllTimers();
    expect(mockSetModalState).toHaveBeenCalledTimes(1);
  });
});
