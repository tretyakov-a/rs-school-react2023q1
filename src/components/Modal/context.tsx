import React, { useCallback, useState } from 'react';
import ConfirmModal from './ConfirmModal';
import InfoModal from './InfoModal';
import { LoadingState } from '@common/types/loading';

export type ModalType = 'confirm' | 'info';

export interface ModalState {
  isOpen: boolean;
  okCallback?: () => void;
  type?: ModalType;
  content?: JSX.Element | string;
  loadingState?: LoadingState;
  imageRatio?: number;
}

export interface ModalProps extends ModalState {
  onClose: () => void;
}

export interface ModalContextProps {
  modal: ModalState;
  openModal: (modalProps: Partial<ModalState>) => void;
  setModalState: (modalProps: Partial<ModalState>) => void;
}

const defaultModalState: ModalState = {
  isOpen: false,
};

export const ModalContext = React.createContext<ModalContextProps>({
  modal: defaultModalState,
  openModal: () => {},
  setModalState: () => {},
});

export const useModal = () => {
  const [modal, setModal] = useState<ModalState>({ ...defaultModalState });

  const openModal = useCallback((modalProps: Partial<ModalState>) => {
    setModal({ isOpen: true, ...modalProps });
  }, []);

  const setModalState = useCallback((modalProps: Partial<ModalState>) => {
    setModal((prev) => ({ ...prev, ...modalProps }));
  }, []);

  return { modal, openModal, setModalState };
};

export const getModalComponent = (type?: ModalType) => {
  switch (type) {
    case 'info':
      return InfoModal;
    default:
      return ConfirmModal;
  }
};
