import { createContext } from 'react';
const mockBookService = {
  getBookById: jest.fn(),
  findBooks: jest.fn(() => () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({}), 100);
    });
  }),
};

jest.mock('@src/api/books', () => ({
  BooksServiceContext: createContext({
    booksService: mockBookService,
  }),
}));
