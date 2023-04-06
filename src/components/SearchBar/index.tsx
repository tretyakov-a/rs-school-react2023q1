import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useStateWithRef from '@src/hooks/use-state-with-ref';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useStateWithRef(SearchBar.localStorageKey);

  const handleInputChange = (e: React.ChangeEvent) => {
    const el = e.target;

    if (el instanceof HTMLInputElement) {
      setSearchValue(el.value);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSearchValue('');
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
