import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface SearchBarState {
  inputValue: string
}

export default class SearchBar extends React.Component<{}, SearchBarState> {
  static localStorageKey  = "searchInputValue";

  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem(SearchBar.localStorageKey) || "",
    };
  }

  componentDidMount(): void {
    const inputValue = localStorage.getItem(SearchBar.localStorageKey);
    if (inputValue !== null) {
      this.setState(() => ({ inputValue }))
    }
  }

  componentWillUnmount(): void {
    localStorage.setItem(SearchBar.localStorageKey, this.state.inputValue);
  }

  handleInputChange = (e: React.SyntheticEvent) => {
    const el = e.target;

    if (el instanceof HTMLInputElement) {
      this.setState(() => ({ inputValue: el.value }))
    }
  }

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="search-bar">
        <form className="search-bar__form" onSubmit={this.handleSubmit}>
          <div className="search-bar__input-container">
            <input
              placeholder="Search..."
              className="search-bar__input"
              type="text"
              name="search"
              id="search"
              value={this.state.inputValue}
              onChange={this.handleInputChange}/>
          </div>
          <button className="search-bar__submit" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
    )
  }
}