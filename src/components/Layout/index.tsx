import Header from '@components/Header';
import Footer from '@components/Footer';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.scss';

export default class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </>
    );
  }
}
