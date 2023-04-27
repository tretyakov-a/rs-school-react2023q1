import { render } from '@testing-library/react';
import Loader from '.';

describe('<Loader /> test', () => {
  test('Should render correctly', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toHaveClass('loader-container');
  });
});
