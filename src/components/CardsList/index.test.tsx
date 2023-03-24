import CardsList from '.';
import { screen, render } from '@testing-library/react';
import cardsData from '@assets/cards.json';

describe('<CardsList /> test', () => {
  test('Should render correctly', () => {
    render(<CardsList />);

    expect(screen.getByRole('list')).toBeInTheDocument();

    const items = screen.getAllByRole('listitem');
    expect(items.length).toEqual(cardsData.length);
    expect(items.every((item) => item.firstElementChild?.classList.contains('card'))).toEqual(true);
  });
});
