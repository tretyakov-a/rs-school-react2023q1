import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Loading } from '@common/types/loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { setSearch } from './store';
import { useForm } from 'react-hook-form';

type SearchBarProps = {
  onSubmit: (searchQuery: string) => void;
  loading: Loading;
};

type SearchFormValues = { search: string };

const SearchBar = ({ onSubmit, loading }: SearchBarProps) => {
  const searchValue = useSelector((state: RootState) => state.search.value);
  const { register, handleSubmit } = useForm<SearchFormValues>({
    defaultValues: { search: searchValue },
  });
  const dispatch = useDispatch();

  const handleFormSubmit = ({ search }: SearchFormValues) => {
    dispatch(setSearch(search));
    onSubmit(search);
  };

  const loadingClass = loading === Loading.PENDING ? 'loading' : '';
  return (
    <div className="search-bar">
      <form className="search-bar__form" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="search-bar__input-container">
          <input
            placeholder="Search for books..."
            className="search-bar__input"
            type="text"
            id="search"
            {...register('search')}
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
