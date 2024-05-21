import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserContextProvider } from './contexts/UserContext';
import { ToastContextProvider } from './contexts/ToastContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
);
