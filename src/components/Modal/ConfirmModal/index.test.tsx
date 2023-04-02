import { screen, render, fireEvent } from '@testing-library/react';
import ConfirmModal from '.';

const onCloseMock = jest.fn();
const okCallbackMock = jest.fn();

const getElements = () => {
  const okButton = screen.getByRole('button', { name: /ok/i }) as HTMLButtonElement;
  const cancelButton = screen.getByRole('button', { name: /cancel/i }) as HTMLButtonElement;
  return { okButton, cancelButton };
};

describe('ConfirmModal test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<ConfirmModal onClose={onCloseMock} isOpen={true} okCallback={okCallbackMock} />);
  });

  test('Should render correctly', () => {
    const { okButton, cancelButton } = getElements();

    expect(okButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('Ok button should work correctly', () => {
    const { okButton } = getElements();

    fireEvent.click(okButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
    expect(okCallbackMock).toHaveBeenCalledTimes(1);
  });

  test('Cancel button should work correctly', () => {
    const { cancelButton } = getElements();

    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
