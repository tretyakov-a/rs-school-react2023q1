import HeaderMenu from '.';
import { links } from './links';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('<HeaderMenu /> test', () => {
  test('Should render correctly', () => {
    render(
      <BrowserRouter>
        <HeaderMenu />
      </BrowserRouter>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(links.length);
  });
});
