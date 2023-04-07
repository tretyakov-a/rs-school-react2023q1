import { createContext } from 'react';

const mockImagesService = {
  getImageInfo: jest.fn(),
  findImages: jest.fn(() => () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({}), 100);
    });
  }),
};

jest.mock('@src/api/images', () => ({
  ImagesServiceContext: createContext({
    imagesService: mockImagesService,
  }),
}));
