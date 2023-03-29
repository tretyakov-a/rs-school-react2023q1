import React from 'react';
import Layout from '.';
import { screen, render } from '@testing-library/react';
import { useModal } from '@components/Modal/context';

jest.mock('@components/Header', () => () => <div data-testid="header-testid"></div>);
jest.mock('@components/Footer', () => () => <div data-testid="footer-testid"></div>);
jest.mock('@components/Modal', () => () => <div data-testid="modal-testid"></div>);
jest.mock('react-router-dom', () => {
  return {
    Outlet: () => <div data-testid="outlet-testid"></div>,
  };
});
jest.mock('@components/Modal/context', () => ({
  ModalContext: React.createContext(null),
  useModal: jest.fn(() => ({
    modal: { isOpen: true },
    setModal: jest.fn(() => {}),
  })),
}));

describe('<Layout /> test', () => {
  test('Should render correctly', () => {
    render(<Layout />);

    expect(screen.getByRole('scroll-container')).toHaveClass('no-scroll');
    expect(screen.getByTestId('header-testid')).toBeInTheDocument();
    expect(screen.getByTestId('footer-testid')).toBeInTheDocument();
    expect(screen.getByTestId('modal-testid')).toBeInTheDocument();
    expect(screen.getByTestId('outlet-testid')).toBeInTheDocument();
  });

  test(`Should have correct scroll class name`, () => {
    const { rerender } = render(<Layout />);
    expect(screen.getByRole('scroll-container')).toHaveClass('no-scroll');

    (useModal as jest.Mock).mockImplementation(() => ({
      modal: { isOpen: false },
      setModal: jest.fn(() => {}),
    }));
    rerender(<Layout />);
    expect(screen.getByRole('scroll-container')).not.toHaveClass('no-scroll');
  });
});
