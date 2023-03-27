import SearchBar from '@components/SearchBar';
import CardsList from '@components/CardsList';
import './style.scss';
import PageWrap from '@components/PageWrap';

const Homepage = () => {
  return (
    <PageWrap className="homepage">
      <div className="homepage__search-bar-container">
        <SearchBar />
      </div>
      <div className="homepage__card-list-container">
        <CardsList />
      </div>
    </PageWrap>
  );
};

export default Homepage;
