import Header from '@components/Header';
import Footer from '@components/Footer';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Modal from '@components/Modal';
import { ModalContext } from '@components/Modal/context';
import './style.scss';

const Layout = () => {
  const [isScroll, setIsScroll] = useState<boolean>(true);

  const handleScrollStateChange = (isScroll: boolean) => {
    setIsScroll(isScroll);
  };

  const modalRef = React.createRef<Modal>();
  const classes = ['scroll-container', isScroll ? '' : 'no-scroll'].join(' ');

  return (
    <div className={classes}>
      <Modal ref={modalRef} onScrollStateChange={handleScrollStateChange} />
      <ModalContext.Provider value={{ modalRef }}>
        <Header />
        <Outlet />
        <Footer />
      </ModalContext.Provider>
    </div>
  );
};

export default Layout;
