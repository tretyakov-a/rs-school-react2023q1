import '@src/__mocks__/page-wrap-mock';
import NotFound from '.';
import { screen, render } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  Link: (props: { to: string }) => <a href={props.to}>{'test-link'}</a>,
}));

describe('<NotFound /> test', () => {
  test('Should render correctly', () => {
    render(<NotFound />);

    expect(screen.getByTestId('page-wrap-testid')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /404/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /page not found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /test-link/i })).toBeInTheDocument();
  });
});
