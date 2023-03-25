import Homepage from '.';
import { screen, render } from '@testing-library/react';

describe('<Homepage /> test', () => {
  test('Should render correctly', () => {
    render(<Homepage />);

    const mainEl = screen.getByRole('main');

    expect(mainEl).toBeInTheDocument();
    expect(mainEl).toHaveClass('homepage');
  });
});
