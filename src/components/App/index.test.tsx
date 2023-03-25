import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '.';

describe('<App /> test', () => {
  test('Test for good route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /about/i })).toHaveClass('active');
    expect(screen.getByRole('main')).toHaveClass('about');
  });

  test('Test for bad route', () => {
    render(
      <MemoryRouter initialEntries={['/bad-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  });
});
