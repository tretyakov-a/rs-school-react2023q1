import HeaderMenu from '.';
import { links } from './links';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const onChangeMock = jest.fn((page: string) => {});

describe('<HeaderMenu /> test', () => {
  test('Should render correctly', () => {
    render(
      <BrowserRouter>
        <HeaderMenu onChange={onChangeMock} />
      </BrowserRouter>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(links.length);
  });
});
