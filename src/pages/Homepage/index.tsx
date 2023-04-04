import SearchBar from './SearchBar';
import CardsList from './CardsList';
import PageWrap from '@components/PageWrap';
import './style.scss';
import { useContext, useState } from 'react';
import Loader from '@components/Loader';
import { BooksItem, BooksServiceContext } from '@src/api/books';
import { useDataLoader } from '@src/hooks/use-data-loader';
import { Loading } from '@src/hooks/use-data-loader/types';

const Homepage = () => {
  const { booksService } = useContext(BooksServiceContext);
  const {
    loadingState: { loading, error },
    loadData,
  } = useDataLoader();
  const [data, setData] = useState<BooksItem[] | null>(null);

  const handleSearchSubmit = async (searchQuery: string) => {
    await loadData(booksService!.findBooks.bind(null, searchQuery), setData);
  };

  const renderError = (error: Error) => {
    return <div>{error.message}</div>;
  };

  return (
    <PageWrap className="homepage">
      <div className="homepage__search-bar-container">
        <SearchBar onSubmit={handleSearchSubmit} loading={loading} />
      </div>
      <div className="homepage__card-list-container">
        {loading === Loading.PENDING ? (
          <Loader />
        ) : error ? (
          renderError(error)
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
