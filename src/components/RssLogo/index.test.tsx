import RssLogo from '.';
import { screen, render } from '@testing-library/react';

describe('<RssLogo /> test', () => {
  test('Should render correctly', () => {
    const testWidth = 100;
    render(<RssLogo width={testWidth} />);

    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveStyle(`width: ${testWidth}px`);
  });
});
