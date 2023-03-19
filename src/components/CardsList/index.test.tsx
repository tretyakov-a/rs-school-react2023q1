import '@testing-library/jest-dom';
import CardsList from '.';
import { render, screen } from '@testing-library/react';
import cardsData from '@assets/cards.json';

describe('<CardsList /> test', () => {
  test('Should render correctly', () => {
    const { container } = render(<CardsList />);
    const list = container.querySelector('ul.cards-list');
    const listItems = container.querySelectorAll('li.cards-list__item');
    const cards = container.querySelectorAll('.card');

    expect(list).not.toBeNull();
    expect(listItems.length).toEqual(cardsData.length);
    expect(cards.length).toEqual(cardsData.length);
  });
});
