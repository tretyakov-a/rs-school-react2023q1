import '@src/__mocks__/font-awesome-icon-mock';
import { screen, render } from '@testing-library/react';
import Footer from '.';

jest.mock('@components/RssLogo', () => () => <div data-testid="rsslogo-testid"></div>);

describe('<Footer /> test', () => {
  test('Should render correctly', () => {
    render(<Footer />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByTitle(/GitHub/i)).toBeInTheDocument();
    expect(screen.getByTestId('rsslogo-testid')).toBeInTheDocument();
    expect(screen.getByTestId('faicon-testid')).toBeInTheDocument();
  });
});
