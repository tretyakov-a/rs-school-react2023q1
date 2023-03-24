import { Rating } from '.';
import { render, screen } from '@testing-library/react';

describe('<Rating /> test', () => {
  test('Should render correctly with granted data', () => {
    const value = 4.3;

    render(<Rating value={value} />);

    expect(screen.getAllByRole('star').length).toEqual(Rating.NumOfStars);
    expect(screen.getByTitle(`rating ${value}`)).toBeInTheDocument();
  });
});
