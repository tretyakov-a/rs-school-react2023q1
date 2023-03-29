import Header from '@components/Header';
import Footer from '@components/Footer';
import { Outlet } from 'react-router-dom';
import Modal from '@components/Modal';
import { ModalContext, useModal } from '@components/Modal/context';
import './style.scss';

const Layout = () => {
  const { modal, setModal } = useModal();
  const classes = ['scroll-container', modal.isOpen ? 'no-scroll' : ''].join(' ');

  return (
    <div className={classes} role="scroll-container">
      <ModalContext.Provider value={{ modal, setModal }}>
        <Modal />
        <Header />
        <Outlet />
        <Footer />
      </ModalContext.Provider>
    </div>
  );
};

export default Layout;
