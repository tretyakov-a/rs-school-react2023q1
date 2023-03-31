import { BooksItem, BooksItemExtra, BooksService } from './types';
import dummyResponseResult from './dummy-result.json';
import dummyBookResponseResult from './dummy-book-result.json';

class DummyBooksService implements BooksService {
  findBooks = async (q: string, abortSignal?: AbortSignal): Promise<BooksItem[] | null> => {
    if (q === '') throw new Error('Search query is empty');

    return new Promise<BooksItem[]>((resolve, reject) => {
      abortSignal?.addEventListener('abort', (e) => {
        reject((e.target as AbortSignal).reason);
      });
      setTimeout(() => {
        resolve(dummyResponseResult.items);
      }, 500);
    });
  };

  getBookById = async (id: string, abortSignal?: AbortSignal): Promise<BooksItemExtra | null> => {
    if (id === '') throw new Error('Book id is invalid');

    return new Promise<BooksItemExtra>((resolve, reject) => {
      abortSignal?.addEventListener('abort', (e) => {
        reject((e.target as AbortSignal).reason);
      });
      setTimeout(() => {
        resolve(dummyBookResponseResult);
      }, 500);
    });
  };
}

export default DummyBooksService;
