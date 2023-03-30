import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useStateWithRef from '@src/hooks/use-state-with-ref';

type SearchBarProps = {
  onSubmit: (searchQuery: string) => void;
};

const SearchBar = (props: SearchBarProps) => {
  const [searchValue, setSearchValue] = useStateWithRef(SearchBar.localStorageKey);

  const handleInputChange = (e: React.ChangeEvent) => {
    const el = e.target;

    if (el instanceof HTMLInputElement) {
      setSearchValue(el.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit(searchValue);
  };

  return (
    <div className="search-bar">
      <form className="search-bar__form" onSubmit={handleSubmit}>
        <div className="search-bar__input-container">
          <input
            placeholder="Search..."
            className="search-bar__input"
            type="text"
            name="search"
            id="search"
            value={searchValue}
            onChange={handleInputChange}
          />
        </div>
        <button className="search-bar__submit" type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
};

SearchBar.localStorageKey = 'searchInputValue';

export default SearchBar;
