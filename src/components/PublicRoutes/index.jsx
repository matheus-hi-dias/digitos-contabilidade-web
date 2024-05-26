import React from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';

function PublicRoute({ children }) {
  const { data } = useUser();

  if (data) {
    return <Navigate to="/minha-area" />;
  }

  return children;
}

export default PublicRoute;
