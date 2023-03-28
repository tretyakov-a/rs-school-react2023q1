import '@testing-library/jest-dom';
import { Rating } from '.';
import { render, screen } from '@testing-library/react';

describe('<Rating /> test', () => {
  test('Should render correctly with granted data', () => {
    const value = 4.3;

    const { container } = render(<Rating value={value} />);
    const el = container.querySelector('.product-rating');
    const stars = container.querySelectorAll('.product-rating__star .product-rating__star-inner');

    expect(el).not.toBeNull();
    expect(stars.length).toEqual(Rating.NumOfStars);
    expect(screen.getByTitle(`rating ${value}`)).toBeInTheDocument();
  });
});
