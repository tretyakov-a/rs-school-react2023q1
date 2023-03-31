import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import InfoModal from './InfoModal';

export type ModalType = 'confirm' | 'info';

export interface ModalState {
  isOpen: boolean;
  question?: string;
  okCallback?: () => void;
  type?: ModalType;
  id?: string;
}

export interface ModalProps extends ModalState {
  onClose: () => void;
}

export interface ModalContextProps {
  modal?: ModalState;
  setModal?: React.Dispatch<React.SetStateAction<ModalState>>;
}

const defaultModalState: ModalState = {
  isOpen: false,
  question: 'Are you sure?',
};

export const ModalContext = React.createContext<ModalContextProps>({});

export const useModal = () => {
  const [modal, setModal] = useState<ModalState>({ ...defaultModalState });

  return { modal, setModal };
};

export const getModalComponent = (type?: ModalType) => {
  switch (type) {
    case 'info':
      return InfoModal;
    default:
      return ConfirmModal;
  }
};
