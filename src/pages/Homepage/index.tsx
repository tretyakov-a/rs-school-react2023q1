import SearchBar from './SearchBar';
import CardsList from './CardsList';
import PageWrap from '@components/PageWrap';
import './style.scss';
import { useEffect } from 'react';
import LoadingResult from '@components/LoadingResult';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@src/store';
import { findImages } from './store';

const Homepage = () => {
  const { data: images, loading, error } = useSelector((state: RootState) => state.imagesList);
  const dispatch: AppDispatch = useDispatch();

  const handleSearchSubmit = (searchQuery: string) => {
    dispatch(findImages(searchQuery));
  };

  useEffect(() => {
    dispatch(findImages('nature'));
  }, [dispatch]);

  return (
    <PageWrap className="homepage">
      <div className="homepage__search-bar-container">
        <SearchBar onSubmit={handleSearchSubmit} loading={loading} />
      </div>
      <div className="homepage__card-list-container">
        <LoadingResult loadingState={{ loading, error }}>
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
