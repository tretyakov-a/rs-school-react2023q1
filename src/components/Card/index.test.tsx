import { render, screen } from '@testing-library/react';
import Card from '.';
import cardsData from '@assets/cards.json';
import { imagesUrl } from '@common/product';

jest.mock('./Rating', () => {
  return {
    Rating: () => <div data-testid="rating-testid"></div>,
  };
});

describe('<Card /> test', () => {
  test('Should render correctly with granted data', () => {
    const data = cardsData[0];
    render(<Card data={data} />);

    expect(screen.getByAltText(data.brand)).toBeInTheDocument();
    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByAltText(data.title)).toBeInTheDocument();

    const images = screen.getAllByRole('img') as HTMLImageElement[];
    expect(images[0].src).toContain(`${imagesUrl}${data.imgs[0]}`);
    expect(images[1].src).toContain(`${imagesUrl}${data.brandImage}`);

    expect(screen.getByTestId('rating-testid')).toBeInTheDocument();
    expect(screen.getByText(`${data.price} ₽`)).toBeInTheDocument();
  });
});
