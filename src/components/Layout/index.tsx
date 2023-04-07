import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Modal from '@components/Modal';
import { ModalContext, useModal } from '@components/Modal/context';
import './style.scss';
import { ImagesServiceContext, useImagesService } from '@src/api/images';

const Layout = () => {
  const { imagesService } = useImagesService();
  const { modal, setModal } = useModal();

  const classes = ['scroll-container', modal.isOpen ? 'no-scroll' : ''].join(' ');
  return (
    <div className={classes} role="scroll-container">
      <ImagesServiceContext.Provider value={{ imagesService }}>
        <ModalContext.Provider value={{ modal, setModal }}>
          <Modal />
          <Header />
          <Outlet />
          <Footer />
        </ModalContext.Provider>
      </ImagesServiceContext.Provider>
    </div>
  );
};

export default Layout;
