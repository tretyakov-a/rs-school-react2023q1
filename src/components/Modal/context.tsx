import React from 'react';
import Modal from '.';

interface withModalProps {
  modalRef: React.RefObject<Modal> | null;
}

export const ModalContext = React.createContext<withModalProps>({
  modalRef: null,
});

export const withModal =
  <P extends object>(Wrapped: React.ComponentType<P>): React.FC<Omit<P, keyof withModalProps>> =>
  (props) =>
    (
      <ModalContext.Consumer>
        {({ modalRef }) => <Wrapped {...(props as P)} modalRef={modalRef} />}
      </ModalContext.Consumer>
    );
