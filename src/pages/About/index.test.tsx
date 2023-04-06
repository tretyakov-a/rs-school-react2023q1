import '@src/__mocks__/page-wrap-mock';
import About from '.';
import { screen, render } from '@testing-library/react';

describe('<About /> test', () => {
  test('Should render correctly', () => {
    render(<About />);

    expect(screen.getByTestId('page-wrap-testid')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
