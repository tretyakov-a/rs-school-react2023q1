import { BooksResponseResult, BooksItem, BooksItemExtra, BookResponseResult } from './types';
// import dummyResponseResult from './dummy-result.json';
// import dummyBookResponseResult from './dummy-book-result.json';

const baseUrl = 'https://books.googleapis.com/books/v1/volumes';

// ?q<text>+inauthor:<text> - search by author
// ?q<text>+intitle:<text> - search by title
// &startIndex - start index in results
// &maxResults - max results by page
// &key - API_KEY
// &langRestrict=en|ru|other
// &printType=books - only books
// &orderBy=relevance|newest

const queryParams = {
  langRestrict: 'en',
  printType: 'books',
  maxResults: 10,
};

const getQueryParams = (queryParams: Record<string, string | number>) => {
  return Object.entries(queryParams)
    .map((item) => item.join('='))
    .join('&');
};

const getUrl = ({ q, id }: { q?: string; id?: string }) => {
  if (id !== undefined) {
    return `${baseUrl}/${id}`;
  } else if (q !== undefined) {
    return `${baseUrl}?${getQueryParams({ ...queryParams, q })}`;
  }
  return '';
};

const httpRequest = async (request: Promise<Response>) => {
  try {
    const res = await request;
    if (!res.ok) throw new Error(`Loading error occured`);

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const findBooks = async (q: string, abortSignal?: AbortSignal) => {
  if (q === '') throw new Error('Search query is empty');

  const data: BooksResponseResult = await httpRequest(
    fetch(getUrl({ q }), { signal: abortSignal })
  );
  return data.items || null;

  // return new Promise<BooksItem[]>((resolve) => {
  //   setTimeout(() => {
  //     resolve(dummyResponseResult.items);
  //   }, 500);
  // });
};

export const getBookById = async (
  id: string,
  abortSignal?: AbortSignal
): Promise<BooksItemExtra | null> => {
  if (id === '') throw new Error('Book id is invalid');

  const data: BookResponseResult = await httpRequest(
    fetch(getUrl({ id }), { signal: abortSignal })
  );
  return data || null;

  // return new Promise<BooksItemExtra>((resolve, reject) => {
  //   abortSignal?.addEventListener('abort', (e) => {
  //     reject((e.target as AbortSignal).reason);
  //   });
  //   setTimeout(() => {
  //     resolve(dummyBookResponseResult);
  //   }, 500);
  // });
};
