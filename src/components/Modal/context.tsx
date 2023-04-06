import React, { useState } from 'react';

export interface ModalState {
  isOpen: boolean;
  question?: string;
  okCallback?: () => void;
}

export interface ModalContextProps {
  modal?: ModalState;
  setModal?: React.Dispatch<React.SetStateAction<ModalState>>;
}

const defaultModalState = {
  isOpen: false,
  question: 'Are you sure?',
};

export const ModalContext = React.createContext<ModalContextProps>({});

export const useModal = () => {
  const [modal, setModal] = useState<ModalState>({ ...defaultModalState });

  return { modal, setModal };
};
