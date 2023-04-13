import React, { useState } from 'react';
import FlickrService from '../flickr-service';

export const useImagesService = () => {
  const [imagesService, setImagesService] = useState(new FlickrService());

  return { imagesService, setImagesService };
};

export const ImagesServiceContext = React.createContext<{ imagesService?: FlickrService }>({});
