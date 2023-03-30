import { render, screen } from '@testing-library/react';
import Card from '.';
import { BooksItem } from '@src/api/books/types';

const dataMock: BooksItem = {
  id: '',
  selfLink: '',
  volumeInfo: {
    title: 'test-title',
    authors: ['test-author1', 'test-author-2'],
    publisher: 'test-publisher',
    publishedDate: '2006-01-01',
    categories: ['test-category'],
    language: 'test-language',
    imageLinks: {
      thumbnail: 'http://test-link.ru/',
    },
  },
};

describe('<Card /> test', () => {
  test('Should render correctly with granted data', () => {
    render(<Card data={dataMock} />);
    const {
      volumeInfo: { title, authors, publisher, publishedDate, categories, language, imageLinks },
    } = dataMock;
    imageLinks &&
      expect((screen.getByRole('img') as HTMLImageElement).src).toBe(imageLinks.thumbnail);
    title && expect(screen.getByText(title)).toBeInTheDocument();
    authors && expect(screen.getByText(authors.join(', '))).toBeInTheDocument();
    publisher && expect(screen.getByText(publisher)).toBeInTheDocument();
    publishedDate && expect(screen.getByText('January 1, 2006')).toBeInTheDocument();
    categories &&
      expect(screen.getByText(`Categories: ${categories.join(', ')}`)).toBeInTheDocument();
    language && expect(screen.getByText(`Book language: ${language}`)).toBeInTheDocument();
  });

  test('Should render placehodler icon if imageLinks is undefined', () => {
    render(
      <Card data={{ ...dataMock, volumeInfo: { ...dataMock.volumeInfo, imageLinks: undefined } }} />
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
