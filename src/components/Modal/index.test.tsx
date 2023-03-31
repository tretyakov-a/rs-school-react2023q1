import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import Modal from '.';
import { ModalContext, withModal } from './context';

const TestComponent = withModal((props: { modalRef: React.RefObject<Modal> }) => {
  return (
    <>
      <button
        onClick={() => {
          props.modalRef.current?.open(() => {}, 'Test question');
        }}
      >
        Open
      </button>
    </>
  );
});

const onScrollStateChangeMock = jest.fn(() => {});
const modalRef = React.createRef<Modal>();
const testComponent = (
  <>
    <Modal ref={modalRef} onScrollStateChange={onScrollStateChangeMock} />
    <ModalContext.Provider value={{ modalRef }}>
      <TestComponent />
    </ModalContext.Provider>
  </>
);

const getElements = () => {
  const modal = screen.getByRole('modal');
  const modalWindow = screen.getByRole('modal-window');
  const okButton = screen.getByRole('button', { name: /ok/i }) as HTMLButtonElement;
  const cancelButton = screen.getByRole('button', { name: /cancel/i }) as HTMLButtonElement;
  const openButton = screen.getByRole('button', { name: /open/i }) as HTMLButtonElement;
  return { modal, modalWindow, okButton, cancelButton, openButton };
};

beforeEach(() => {
  onScrollStateChangeMock.mockClear();
});

describe('<HeaderMenu /> test', () => {
  test('Should render properly', () => {
    render(testComponent);
    const { modal, modalWindow, okButton, cancelButton } = getElements();

    expect(modal).toBeInTheDocument();
    expect(modalWindow).toBeInTheDocument();
    expect(okButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('Should open properly', async () => {
    render(testComponent);
    const { modal, openButton } = getElements();

    fireEvent.click(openButton);
    expect(modal).toHaveClass('open');
    expect(screen.getByText(/test question/i)).toBeInTheDocument();
  });

  test('Should trigger scroll state properly', async () => {
    render(testComponent);
    const { modal, okButton, openButton } = getElements();

    fireEvent.click(openButton);
    fireEvent.click(okButton);
    expect(modal).toHaveClass('close');
    await waitFor(
      () => {
        expect(modal).not.toHaveClass('close');
        expect(onScrollStateChangeMock).toBeCalledTimes(2);
      },
      { timeout: Modal.animationDuration + 50 }
    );
  });

  test('Should close properly', async () => {
    const { rerender } = render(testComponent);
    const { modal, modalWindow, cancelButton, openButton } = getElements();

    fireEvent.click(openButton);
    fireEvent.click(modalWindow);
    expect(modal).toHaveClass('open');

    fireEvent.click(cancelButton);
    expect(modal).toHaveClass('close');

    rerender(testComponent);
    fireEvent.click(openButton);
    fireEvent.click(modal);
    expect(modal).toHaveClass('close');
  });
});
