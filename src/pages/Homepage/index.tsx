import SearchBar from '@components/SearchBar';
import CardsList from '@components/CardsList';
import PageWrap from '@components/PageWrap';
import './style.scss';
import { BooksItem } from '@src/api/books/types';
import { useState } from 'react';
import { findBooks } from '@src/api/books';
import Loader from '@components/Loader';

const Homepage = () => {
  const [data, setData] = useState<BooksItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const handleSearchSubmit = async (searchQuery: string) => {
    setIsLoading(true);
    setLoadingError(null);
    try {
      const data = await findBooks(searchQuery);
      if (data !== null) {
        setData(data);
      }
    } catch (error) {
      setLoadingError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderError = (error: Error) => {
    return <div>{error.message}</div>;
  };

  return (
    <PageWrap className="homepage">
      <div className="homepage__search-bar-container">
        <SearchBar onSubmit={handleSearchSubmit} />
      </div>
      <div className="homepage__card-list-container">
        {isLoading ? (
          <Loader />
        ) : loadingError ? (
          renderError(loadingError)
        ) : (
          <CardsList data={data} />
        )}
      </div>
    </PageWrap>
  );
};

export default Homepage;
