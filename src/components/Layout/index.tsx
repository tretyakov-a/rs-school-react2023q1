import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Modal from '@components/Modal';
import { ModalContext, useModal } from '@components/Modal/context';
import './style.scss';

const Layout = () => {
  const modalValue = useModal();

  const classes = ['scroll-container', modalValue.modal.isOpen ? 'no-scroll' : ''].join(' ');
  return (
    <div className={classes} role="scroll-container">
      <ModalContext.Provider value={modalValue}>
        <Modal />
        <Header />
        <Outlet />
        <Footer />
      </ModalContext.Provider>
    </div>
  );
};

export default Layout;
