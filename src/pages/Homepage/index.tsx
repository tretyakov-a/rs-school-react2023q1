import SearchBar from './SearchBar';
import CardsList from './CardsList';
import PageWrap from '@components/PageWrap';
import './style.scss';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDataLoader } from '@src/hooks/use-data-loader';
import LoadingResult from '@components/LoadingResult';
import useLocalStorage from '@src/hooks/use-local-storage';
import { ImagesServiceContext } from '@src/api/images/hooks/use-images-service';
import { Photo, Photos } from '@src/api/images/types';

export type PaginationData = {
  totalItems: number;
  currentPage: number;
};

const paginationDefault = { totalItems: 0, currentPage: 0 };

const Homepage = () => {
  const [setStorage, getStorage] = useLocalStorage(SearchBar.localStorageKey);
  const { imagesService } = useContext(ImagesServiceContext);
  const { loadingState, loadData } = useDataLoader();
  const [images, setImages] = useState<Photo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(getStorage());

  const setData = useCallback((data: Photos) => {
    const { photo } = data;
    if (photo.length > 0) setImages(photo);
  }, []);

  const handleSearchSubmit = (searchQuery: string) => {
    loadData(imagesService!.findImages.bind(null, { text: searchQuery }), setData);
    setSearchQuery(searchQuery);
    setStorage(searchQuery);
  };

  useEffect(() => {
    if (searchQuery === '') return;
    loadData(imagesService!.findImages.bind(null, { text: searchQuery }), setData);
  }, [loadData, imagesService, getStorage, searchQuery, setData]);

  return (
    <PageWrap className="homepage">
      <div className="homepage__search-bar-container">
        <SearchBar onSubmit={handleSearchSubmit} loading={loadingState.loading} />
      </div>
      <div className="homepage__card-list-container">
        <LoadingResult loadingState={loadingState}>
          {images !== null && images.length > 0 ? (
            <>
              <CardsList data={images} />
            </>
          ) : (
            <p>Try to find some images using search form</p>
          )}
        </LoadingResult>
      </div>
    </PageWrap>
  );
};

export default Homepage;
