import SearchBar from '@components/SearchBar';
import CardsList from '@components/CardsList';
import PageWrap from '@components/PageWrap';
import './style.scss';
import { useContext, useState } from 'react';
import Loader from '@components/Loader';
import { BooksItem, BooksServiceContext } from '@src/api/books';
import useDataLoader from '@src/hooks/use-data-loader';

const Homepage = () => {
  const { booksService } = useContext(BooksServiceContext);
  const { isLoading, loadingError, loadData } = useDataLoader(false);
  const [data, setData] = useState<BooksItem[] | null>(null);

  const handleSearchSubmit = async (searchQuery: string) => {
    if (booksService === undefined) return;

    await loadData(booksService.findBooks(searchQuery), setData);
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
        ) : data !== null ? (
          <CardsList data={data} />
        ) : (
          <p>Try to find some books using search form</p>
        )}
      </div>
    </PageWrap>
  );
};

export default Homepage;
