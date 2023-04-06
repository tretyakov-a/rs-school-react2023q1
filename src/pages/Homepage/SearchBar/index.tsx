import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useStateWithRef from '@src/hooks/use-state-with-ref';
import { Loading } from '@src/hooks/use-data-loader/types';

type SearchBarProps = {
  onSubmit: (searchQuery: string) => void;
  loading: Loading;
};

const SearchBar = ({ onSubmit, loading }: SearchBarProps) => {
  const [searchValue, setSearchValue, storageSet] = useStateWithRef(SearchBar.localStorageKey);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    setSearchValue(el.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    storageSet(searchValue);
    onSubmit(searchValue);
  };

  const loadingClass = loading === Loading.PENDING ? 'loading' : '';
  return (
    <div className="search-bar">
      <form className="search-bar__form" onSubmit={handleSubmit}>
        <div className="search-bar__input-container">
          <input
            placeholder="Search for books..."
            className="search-bar__input"
            type="text"
            name="search"
            id="search"
            value={searchValue}
            onChange={handleInputChange}
          />
        </div>
        <button className={`search-bar__submit ${loadingClass}`} type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
};

SearchBar.localStorageKey = 'searchInputValue';

export default SearchBar;
