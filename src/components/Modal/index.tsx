import React, { useContext, useEffect, useState } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { ModalContext } from '@components/Modal/context';

const Modal = () => {
  const { modal, setModal } = useContext(ModalContext);
  const [display, setDisplay] = useState<string>(modal!.isOpen ? 'open' : '');

  useEffect(() => {
    setDisplay(modal.isOpen ? 'open' : '');
  }, [modal.isOpen]);

  const close = () => {
    setDisplay('close');

    setTimeout(() => {
      setModal({ isOpen: false });
    }, Modal.animationDuration);
  };

  const handleOKClick = () => {
    const { okCallback } = modal;
    if (okCallback !== undefined) {
      okCallback();
    }
    close();
  };

  const classes = ['modal', display].join(' ');

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
        <div className="modal__content">
          <div className="modal__icon">
            <FontAwesomeIcon icon={faQuestion} />
          </div>
          <div className="modal__message">{modal.question}</div>
        </div>
        <div className="modal__buttons">
          <button className="button" onClick={close}>
            Cancel
          </button>
          <button className="button" onClick={handleOKClick}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.animationDuration = 400;
export default Modal;
