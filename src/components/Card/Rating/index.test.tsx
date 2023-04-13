import { Rating } from '.';
import { render, screen } from '@testing-library/react';

describe('<Rating /> test', () => {
  test('Should render correctly with granted data', () => {
    const value = 3.3;
    const count = 999;

    render(<Rating value={value} count={count} />);

    expect(screen.getAllByRole('star').length).toEqual(Rating.NumOfStars);
    expect(screen.getByTitle(`rating ${value}`)).toBeInTheDocument();
    expect(screen.getByText(`${count}`)).toBeInTheDocument();
  });
});
