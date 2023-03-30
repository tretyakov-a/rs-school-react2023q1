import { BooksResonseResult, BooksItem } from './types';
// import dummyResponseResult from './dummy-result.json';

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

const getUrl = (searchQuery: string) => {
  return `${baseUrl}?${getQueryParams({ ...queryParams, q: searchQuery })}`;
};

const httpRequest = async (request: Promise<Response>) => {
  try {
    const res = await request;
    console.log(res);
    if (!res.ok) throw new Error(`Loading error occured`);

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const getBooks = async (q: string) => {
  if (q === '') throw new Error('Search query is empty');
  const data: BooksResonseResult = await httpRequest(fetch(getUrl(q)));
  return data.items || null;

  // return new Promise<BooksItem[]>((resolve) => {
  //   setTimeout(() => {
  //     resolve(dummyResponseResult.items);
  //   }, 1000);
  // });
};
