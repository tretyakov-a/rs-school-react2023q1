export type BooksItem = {
  id: string;
  selfLink: string;
  volumeInfo: {
    title?: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    categories?: string[];
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    language?: string;
  };
};

export type BooksResonseResult = {
  kind: string;
  totalItems: number;
  items?: BooksItem[];
};
