import React, { useState } from 'react';
import { BooksContextProps, BooksService } from '../types';

export const useBooksService = (booksServiceConstructor: new () => BooksService) => {
  const [booksService, setBooksService] = useState<BooksService>(new booksServiceConstructor());

  return { booksService, setBooksService };
};

export const BooksServiceContext = React.createContext<BooksContextProps>({});
