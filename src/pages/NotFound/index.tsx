import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default class NotFound extends React.Component {
  render() {
    return (
      <section className="not-found-page">
        <div className="container not-found-page__container">
          <h2 className="not-found-page__title">404</h2>
          <h3 className="not-found-page__subtitle">Page not found</h3>
          <p className="not-found-page__info">Oops! The page you are looking for does not exist. It might have been mooved or deleted</p>
          <Link className="not-found-page__link" to="/">Back to home</Link>
        </div>
      </section>
    );
  }
}
