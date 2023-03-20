import SearchBar from '@components/SeachBar';
import React from 'react';
import CardsList from '@components/CardsList';
import './style.scss';

export default class Homepage extends React.Component {
  render() {
    return (
      <section className="homepage page">
        <div className="container">
          <div className="homepage__search-bar-container">
            <SearchBar />
          </div>
          <div className="homepage__card-list-container">
            <CardsList />
          </div>
        </div>
      </section>
    );
  }
}
