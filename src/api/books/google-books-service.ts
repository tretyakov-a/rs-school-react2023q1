import {
  BooksResponseResult,
  BooksItem,
  BooksItemExtra,
  BookResponseResult,
  BooksService,
} from './types';
import { fetchData } from '../http';

// ?q<text>+inauthor:<text> - search by author
// ?q<text>+intitle:<text> - search by title
// &startIndex - start index in results
// &maxResults - max results by page
// &key - API_KEY
// &langRestrict=en|ru|other
// &printType=books - only books
// &orderBy=relevance|newest

const baseUrl = 'https://books.googleapis.com/books/v1/volumes';

const searchQueryParams = {
  langRestrict: 'en',
  printType: 'books',
  maxResults: 10,
  orderBy: 'relevance',
};

class GoogleBooksService implements BooksService {
  findBooks = async (q: string, abortSignal?: AbortSignal): Promise<BooksItem[] | null> => {
    if (q === '') throw new Error('Search query is empty');

    const data: BooksResponseResult = await fetchData(
      baseUrl,
      { ...searchQueryParams, q },
      { signal: abortSignal }
    );
    return data.items || null;
  };

  getBookById = async (id: string, abortSignal?: AbortSignal): Promise<BooksItemExtra | null> => {
    if (id === '') throw new Error('Book id is invalid');

    const data: BookResponseResult = await fetchData(
      `${baseUrl}/${id}`,
      {},
      { signal: abortSignal }
    );
    return data || null;
  };
}

export default GoogleBooksService;
