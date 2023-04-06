import { render, screen } from '@testing-library/react';
import { MemoryRouter, Outlet } from 'react-router-dom';
import App from '.';

jest.mock('@pages/Homepage', () => () => <div data-testid="homepage-testid" />);
jest.mock('@pages/About', () => () => <div data-testid="about-page-testid" />);
jest.mock('@pages/NotFound', () => () => <div data-testid="notfound-page-testid" />);
jest.mock('@components/Layout', () => () => <Outlet />);
jest.mock('@pages/Registration', () => () => <div data-testid="registration-page-testid" />);

describe('<App /> test', () => {
  test('Should correctly process good route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('about-page-testid')).toBeInTheDocument();
  });

  test('Should correctly process bad route', () => {
    render(
      <MemoryRouter initialEntries={['/bad-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('notfound-page-testid')).toBeInTheDocument();
  });
});
