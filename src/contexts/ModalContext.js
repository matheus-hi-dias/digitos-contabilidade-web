"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [propsModal, setPropsModal] = useState({
    title: "",
    description: "",
    children: null,
    primaryButtonText: "",
    secondaryButtonText: "",
    clickPrimaryButton: () => {},
    clickSecondaryButton: () => {},
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, setPropsModal, propsModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};