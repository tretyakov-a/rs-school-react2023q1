import React, { useContext, useEffect, useState } from 'react';
import './style.scss';
import { ModalContext, getModalComponent } from '@components/Modal/context';

const Modal = () => {
  const { modal, setModalState } = useContext(ModalContext);
  const [display, setDisplay] = useState<string>(modal.isOpen ? 'open' : '');

  useEffect(() => {
    setDisplay(modal.isOpen ? 'open' : '');
  }, [modal.isOpen]);

  const close = () => {
    setDisplay('close');

    setTimeout(() => {
      setModalState({ isOpen: false });
    }, Modal.animationDuration);
  };

  const classes = ['modal', display].join(' ');
  const modalComponent = React.createElement(getModalComponent(modal.type), {
    ...modal,
    onClose: close,
  });

  return (
    <div
      role="modal"
      className={classes}
      onClick={close}
      style={{
        animationDuration: `${Modal.animationDuration}ms`,
      }}
    >
      <div role="modal-window" className="modal__window" onClick={(e) => e.stopPropagation()}>
        {modalComponent}
      </div>
    </div>
  );
};

Modal.animationDuration = 400;
export default Modal;
