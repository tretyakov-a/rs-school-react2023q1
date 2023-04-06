import '@src/__mocks__/font-awesome-icon-mock';
import { screen, render, fireEvent } from '@testing-library/react';
import React from 'react';
import Modal from '.';
import { ModalContext, ModalState } from '@components/Modal/context';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

const setModalMock = jest.fn(() => {});
const defaultModalState = {
  isOpen: false,
  question: 'test-question',
  okCallback: () => {},
};

jest.mock('@components/Modal/context', () => ({
  ModalContext: React.createContext(null),
}));

const TestComponent = (props: { modal: ModalState }) => (
  <ModalContext.Provider
    value={{
      modal: props.modal,
      setModal: setModalMock,
    }}
  >
    <Modal />
  </ModalContext.Provider>
);

const getElements = () => {
  const modal = screen.getByRole('modal');
  const modalWindow = screen.getByRole('modal-window');
  const okButton = screen.getByRole('button', { name: /ok/i }) as HTMLButtonElement;
  const cancelButton = screen.getByRole('button', { name: /cancel/i }) as HTMLButtonElement;
  return { modal, modalWindow, okButton, cancelButton };
};

describe('<Modal /> test', () => {
  beforeEach(() => {
    setModalMock.mockClear();
    jest.clearAllTimers();
  });

  test('Should render correctly', () => {
    render(<TestComponent modal={defaultModalState} />);
    const { modal, modalWindow, okButton, cancelButton } = getElements();

    expect(modal).toBeInTheDocument();
    expect(modalWindow).toBeInTheDocument();
    expect(okButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(screen.getByText(defaultModalState.question)).toBeInTheDocument();
  });

  test('Should have correct class when opened or closed', async () => {
    const { rerender } = render(<TestComponent modal={defaultModalState} />);
    const { modal } = getElements();
    expect(modal).not.toHaveClass('open');

    rerender(<TestComponent modal={{ ...defaultModalState, isOpen: true }} />);
    expect(modal).toHaveClass('open');
  });

  test('Should close on properly clicked area (outside modal window or buttons)', async () => {
    const { rerender } = render(<TestComponent modal={{ ...defaultModalState, isOpen: true }} />);
    const { modal, modalWindow, cancelButton, okButton } = getElements();
    fireEvent.click(modalWindow);
    expect(modal).toHaveClass('open');
    fireEvent.click(cancelButton);
    expect(modal).toHaveClass('close');

    rerender(<TestComponent modal={{ ...defaultModalState, isOpen: true }} />);
    fireEvent.click(modal);
    expect(modal).toHaveClass('close');

    rerender(<TestComponent modal={{ ...defaultModalState, isOpen: true }} />);
    fireEvent.click(okButton);
    expect(modal).toHaveClass('close');
  });

  test('Should close correctly with timeout', async () => {
    render(<TestComponent modal={{ ...defaultModalState, isOpen: true }} />);
    const { okButton } = getElements();
    fireEvent.click(okButton);

    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), Modal.animationDuration);

    jest.runAllTimers();
    expect(setModalMock).toHaveBeenCalledTimes(1);
  });
});
