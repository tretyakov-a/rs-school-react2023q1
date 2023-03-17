import React from 'react';
import './style.scss';
import HeaderMenu from '@components/HeaderMenu';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="container header__container">
          <nav className="header__menu-container">
            <HeaderMenu />
          </nav>
        </div>
      </header>
    );
  }
}
