import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://digitos-contabilidade-backend.vercel.app',
});

export const getToken = () => {
  const sessionData = localStorage.getItem('session');
  return JSON.parse(sessionData);
};

export const configHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
