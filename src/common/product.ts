export const imagesUrl = 'https://raw.githubusercontent.com/tretyakov-a/online-store/main/';

export interface Product {
  id: string;
  imgs: string[];
  title: string;
  price: number;
  rating: number;
  year: number;
  brand: string;
  brandImage: string;
}
