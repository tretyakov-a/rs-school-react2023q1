import CardsList from '.';
import { screen, render } from '@testing-library/react';
import cardsData from '@assets/cards.json';

jest.mock('@components/Card', () => () => <div data-testid="card-testid"></div>);

describe('<CardsList /> test', () => {
  test('Should render correctly', () => {
    render(<CardsList />);

    expect(screen.getByRole('list')).toBeInTheDocument();

    expect(screen.getAllByRole('listitem').length).toEqual(cardsData.length);
    expect(screen.getAllByTestId('card-testid').length).toBe(cardsData.length);
  });
});
