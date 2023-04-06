import SearchBar from './SearchBar';
import CardsList from './CardsList';
import PageWrap from '@components/PageWrap';
import './style.scss';
import { useContext, useState } from 'react';
import { BooksItem, BooksServiceContext } from '@src/api/books';
import { useDataLoader } from '@src/hooks/use-data-loader';
import LoadingResult from '@components/LoadingResult';

const Homepage = () => {
  const { booksService } = useContext(BooksServiceContext);
  const { loadingState, loadData } = useDataLoader();
  const [data, setData] = useState<BooksItem[] | null>(null);

  const handleSearchSubmit = (searchQuery: string) => {
    loadData(booksService!.findBooks.bind(null, searchQuery), setData);
  };

  return (
    <PageWrap className="homepage">
      <div className="homepage__search-bar-container">
        <SearchBar onSubmit={handleSearchSubmit} loading={loadingState.loading} />
      </div>
      <div className="homepage__card-list-container">
        <LoadingResult loadingState={loadingState}>
          {data !== null ? (
            <CardsList data={data} />
          ) : (
            <p>Try to find some books using search form</p>
          )}
        </LoadingResult>
      </div>
    </PageWrap>
  );
};

export default Homepage;
