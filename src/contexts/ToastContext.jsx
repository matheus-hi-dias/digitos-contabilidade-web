/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useReducer } from 'react';
import toastReducer from '../reducers/toastReducer';
import ToastsContainer from '../components/ToastsContainer';

export const ToastContext = createContext();

const initialState = {
  toasts: [],
};

export function ToastContextProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (type, message) => {
    const id = Math.floor(Math.random() * 10000000);
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type } });
  };

  const successToast = (message) => {
    addToast('success', message);
  };

  const errorToast = (message) => {
    addToast('error', message);
  };

  const removeToast = (id) => {
    dispatch({ type: 'DELETE_TOAST', payload: id });
  };

  const value = { successToast, errorToast, removeToast };
  return (
    <ToastContext.Provider value={value}>
      <ToastsContainer toasts={state.toasts} />
      {children}
    </ToastContext.Provider>
  );
}
