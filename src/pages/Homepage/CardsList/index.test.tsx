import React from 'react';
import CardsList from '.';
import { screen, render, fireEvent } from '@testing-library/react';
import data from '@src/api/books/data/dummy-result.json';
import { ModalContext } from '@components/Modal/context';

const cardsDataMock = data.items;
const setModalMock = jest.fn();

jest.mock('@components/Card', () => ({ onClick }: { onClick: () => void }) => (
  <div data-testid="card-testid" onClick={onClick}></div>
));

jest.mock('@components/Modal/context', () => ({
  ModalContext: React.createContext(null),
}));

describe('<CardsList /> test', () => {
  test('Should render correctly', () => {
    render(
      <ModalContext.Provider value={{ setModal: setModalMock, modal: { isOpen: false } }}>
        <CardsList data={cardsDataMock} />
      </ModalContext.Provider>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(cardsDataMock.length);

    const cards = screen.getAllByTestId('card-testid');
    expect(cards.length).toBe(cardsDataMock.length);

    fireEvent.click(cards[0]);
    expect(setModalMock).toHaveBeenCalledTimes(1);
  });
});
