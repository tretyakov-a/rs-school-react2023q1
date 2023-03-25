import SearchBar from '@components/SearchBar';
import React from 'react';
import CardsList from '@components/CardsList';
import './style.scss';
import PageWrap from '@components/PageWrap';

export default class Homepage extends React.Component {
  render() {
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
  }
}
