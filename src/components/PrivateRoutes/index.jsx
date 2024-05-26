import React from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';

function PrivateRoute({ children, requiredPermissions }) {
  const { data } = useUser();

  if (!data) {
    return <Navigate to="/" />;
  }

  if (!requiredPermissions) {
    return children;
  }

  const userPermissions = [...data.permissions, ...data.rolePermissions];
  const hasRequiredPermissions = requiredPermissions
    .every((permission) => userPermissions.includes(permission));

  if (!hasRequiredPermissions) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default PrivateRoute;
