import { screen, render } from '@testing-library/react';
import Header from '.';

jest.mock('./HeaderMenu', () => () => <div data-testid="header-menu-testid"></div>);
jest.mock('./HeaderMenu/links', () => {
  return {
    getLabel: jest.fn(() => 'test-label'),
  };
});
jest.mock('react-router-dom', () => {
  return {
    useLocation: jest.fn(() => ({ pathname: '/test-pathname' })),
  };
});

describe('<Header /> test', () => {
  test('Should render correctly', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /test-label/i })).toBeInTheDocument();
    expect(screen.getByTestId('header-menu-testid')).toBeInTheDocument();
  });
});
