import { render, screen } from '@testing-library/react';
import { Card } from '.';
import data from '@assets/cards.json';
import { imagesUrl } from '@common/product';

describe('<Card /> test', () => {
  test('Should render correctly with granted data', () => {
    const cardData = data[0];
    render(<Card data={cardData} />);

    expect(screen.getByAltText(cardData.brand)).toBeInTheDocument();
    expect(screen.getByText(cardData.title)).toBeInTheDocument();
    expect(screen.getByAltText(cardData.title)).toBeInTheDocument();

    const images = screen.getAllByRole('img') as HTMLImageElement[];
    expect(images[0].src).toContain(`${imagesUrl}${cardData.imgs[0]}`);
    expect(images[1].src).toContain(`${imagesUrl}${cardData.brandImage}`);

    expect(screen.getByTitle(`rating ${cardData.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`${cardData.price} ₽`)).toBeInTheDocument();
  });
});
