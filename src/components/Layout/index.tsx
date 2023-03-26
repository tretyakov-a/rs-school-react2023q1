import Header from '@components/Header';
import Footer from '@components/Footer';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Modal from '@components/Modal';
import { ModalContext } from '@components/Modal/context';
import './style.scss';

interface LayoutState {
  isScroll: boolean;
}

export default class Layout extends React.Component<unknown, LayoutState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = {
      isScroll: true,
    };
  }

  handleScrollStateChange = (isScroll: boolean) => {
    this.setState({ isScroll });
  };

  render() {
    const modalRef = React.createRef<Modal>();
    const classes = ['scroll-container', this.state.isScroll ? '' : 'no-scroll'].join(' ');
    return (
      <div className={classes}>
        <Modal ref={modalRef} onScrollStateChange={this.handleScrollStateChange} />
        <ModalContext.Provider value={{ modalRef }}>
          <Header />
          <Outlet />
          <Footer />
        </ModalContext.Provider>
      </div>
    );
  }
}
