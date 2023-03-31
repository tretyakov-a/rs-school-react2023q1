import Header from '@components/Header';
import Footer from '@components/Footer';
import { Outlet } from 'react-router-dom';
import Modal from '@components/Modal';
import { ModalContext, useModal } from '@components/Modal/context';
import './style.scss';
import {
  useBooksService,
  BooksServiceContext,
  GoogleBooksService,
  DummyBooksService,
} from '@src/api/books';

const Layout = () => {
  const { booksService } = useBooksService(GoogleBooksService);
  const { modal, setModal } = useModal();
  const classes = ['scroll-container', modal.isOpen ? 'no-scroll' : ''].join(' ');

  return (
    <div className={classes} role="scroll-container">
      <BooksServiceContext.Provider value={{ booksService }}>
        <ModalContext.Provider value={{ modal, setModal }}>
          <Modal />
          <Header />
          <Outlet />
          <Footer />
        </ModalContext.Provider>
      </BooksServiceContext.Provider>
    </div>
  );
};

export default Layout;
