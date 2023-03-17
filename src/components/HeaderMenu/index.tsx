import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

export default class HeaderMenu extends React.Component {
  render() {
    return (
      <ul className="header__menu header-menu">
        <li className="header-menu__item">
          <NavLink className="header-menu__link" to="/">Home</NavLink>
        </li>
        <li className="header-menu__item">
          <NavLink className="header-menu__link" to="/about">About Us</NavLink>
        </li>
      </ul>
    )
  }
}