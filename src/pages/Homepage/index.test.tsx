import '@src/__mocks__/page-wrap-mock';
import Homepage from '.';
import { screen, render } from '@testing-library/react';

jest.mock('@components/SearchBar', () => () => <div data-testid="search-bar-testid" />);
jest.mock('@components/CardsList', () => () => <div data-testid="cards-list-testid" />);

describe('<Homepage /> test', () => {
  test('Should render correctly', () => {
    render(<Homepage />);

    expect(screen.getByTestId('search-bar-testid')).toBeInTheDocument();
    expect(screen.getByTestId('cards-list-testid')).toBeInTheDocument();
    expect(screen.getByTestId('page-wrap-testid')).toBeInTheDocument();
  });
});
