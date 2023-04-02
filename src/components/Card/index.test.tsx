import { fireEvent, render, screen } from '@testing-library/react';
import Card from '.';
import dataMock from '@src/api/books/dummy-book-result.json';

jest.mock('./Rating', () => ({
  Rating: (props: { value: number }) => <div data-testid="rating-testid">{props.value}</div>,
}));

jest.mock('@common/helpers', () => ({
  renderDate: () => 'January 1, 2006',
}));

describe('<Card /> test', () => {
  test('Should render short card correctly with granted data', () => {
    render(<Card data={dataMock} />);
    const {
      volumeInfo: { title, authors, imageLinks },
    } = dataMock;

    imageLinks &&
      expect((screen.getByRole('img') as HTMLImageElement).src).toBe(imageLinks.thumbnail);
    title && expect(screen.getByText(title)).toBeInTheDocument();
    authors && expect(screen.getByText(authors.join(', '))).toBeInTheDocument();
  });

  test('Should render full card correctly with granted data', () => {
    render(<Card data={dataMock} displayMode="full" />);
    const {
      volumeInfo: { publisher, publishedDate, categories, language, averageRating, description },
    } = dataMock;

    publisher && expect(screen.getByText(publisher)).toBeInTheDocument();
    publishedDate && expect(screen.getByText('- January 1, 2006')).toBeInTheDocument();
    categories && expect(screen.getByText(`${categories.join(', ')}`)).toBeInTheDocument();
    language && expect(screen.getByText(`${language}`)).toBeInTheDocument();
    averageRating && expect(screen.getByTestId('rating-testid')).toBeInTheDocument();
    description && expect(screen.getByText('Book description:')).toBeInTheDocument();
  });

  test('Should render placehodler icon if imageLinks is undefined', () => {
    render(
      <Card data={{ ...dataMock, volumeInfo: { ...dataMock.volumeInfo, imageLinks: undefined } }} />
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  test('Should call onClick on card click', () => {
    const onClickMock = jest.fn();

    const { container } = render(<Card data={dataMock} onClick={onClickMock} />);

    fireEvent.click(container.firstChild!);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
