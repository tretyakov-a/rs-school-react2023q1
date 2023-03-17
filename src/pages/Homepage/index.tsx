import SearchBar from '@components/SeachBar';
import React from 'react';
import './style.scss';

export default class Homepage extends React.Component {
  render() {
    return (
      <section className="homepage">
        <div className="container">
          <div className="homepage__search-bar-container">
            <SearchBar />
          </div>
        </div>
      </section>
    );
  }
}
