type ImageLinks = {
  smallThumbnail?: string;
  thumbnail?: string;
};

type VolumeInfo = {
  title?: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  categories?: string[];
  imageLinks?: ImageLinks;
  language?: string;
};

export type BooksItem = {
  id: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
};

export type BooksItemExtra = BooksItem & {
  volumeInfo: VolumeInfo & {
    averageRating?: number;
    ratingsCount?: number;
    imageLinks: ImageLinks & {
      small?: string;
      medium?: string;
      large?: string;
      extraLarge?: string;
    };
  };
};

export type BooksResponseResult = {
  kind: string;
  totalItems: number;
  items?: BooksItem[];
};

export type BookResponseResult = BooksItemExtra & {
  kind: string;
};

export interface BooksService {
  findBooks: (q: string, abortSignal?: AbortSignal) => Promise<BooksItem[] | null>;
  getBookById: (id: string, abortSignal?: AbortSignal) => Promise<BooksItemExtra | null>;
}

export interface BooksContextProps {
  booksService?: BooksService;
}
