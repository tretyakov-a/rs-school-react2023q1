import HeaderMenu from '.';
import { links } from './links';
import { screen, render } from '@testing-library/react';

jest.mock('react-router-dom', () => {
  return {
    NavLink: (props: { to: string } & React.PropsWithChildren) => (
      <a data-testid="link-testid" href={props.to}>
        {props.children}
      </a>
    ),
  };
});

describe('<HeaderMenu /> test', () => {
  test('Should render correctly', () => {
    render(<HeaderMenu />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(links.length);
    expect(screen.getAllByTestId('link-testid').length).toBe(links.length);
  });
});
