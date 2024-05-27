import { Routes, Route, Navigate } from 'react-router-dom';
import ScreensLayout from '../layout/ScreensLayout';
import LoginScreen from '../screens/loginScreen';
import DocumentTypeScreen from '../screens/documentTypeScreen';
import MyAreaScreen from '../screens/myAreaScreen';
import DocumentsScreen from '../screens/documentsScreen';
import ClientsScreen from '../screens/clientsScreen';
import DocumentsNatureScreen from '../screens/documentsNatureScreen';
import DocumentStorageLocalScreen from '../screens/documentStorageLocalScreen';
import UsersScreen from '../screens/usersScreen';
import RolesScreen from '../screens/rolesScreen';
import UnauthorizedScreen from '../screens/unauthorizedScreen';
import LoadingScreen from '../screens/LoadingScreen';

import useUser from '../hooks/useUser';

function PrivateRoute({ children, requiredPermissions }) {
  const { data, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <Navigate to="/" />;
  }

  if (!requiredPermissions) {
    return children;
  }

  const userPermissions = [...(data.permissions || []), ...(data.rolePermissions || [])];
  const hasRequiredPermissions = requiredPermissions
    .every((permission) => userPermissions.includes(permission));

  if (!hasRequiredPermissions) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<ScreensLayout />}>
        <Route
          path="/minha-area"
          element={(
            <PrivateRoute>
              <MyAreaScreen />
            </PrivateRoute>
          )}
        />
        <Route
          path="/documentos"
          element={(
            <PrivateRoute requiredPermissions={['SEE_DOCUMENTS']}>
              <DocumentsScreen />
            </PrivateRoute>
          )}
        />
        <Route
          path="/clientes"
          element={(
            <PrivateRoute requiredPermissions={['SEE_CLIENTS']}>
              <ClientsScreen />
            </PrivateRoute>
          )}
        />
        <Route
          path="/tipo-de-documento"
          element={(
            <PrivateRoute requiredPermissions={['SEE_DOCUMENT_TYPES']}>
              <DocumentTypeScreen />
            </PrivateRoute>
          )}
        />
        <Route
          path="/natureza"
          element={(
            <PrivateRoute requiredPermissions={['SEE_DOCUMENT_NATURES']}>
              <DocumentsNatureScreen />
            </PrivateRoute>
          )}
        />
        <Route
          path="/local-do-documento"
          element={(
            <PrivateRoute requiredPermissions={['SEE_DOCUMENT_LOCATION']}>
              <DocumentStorageLocalScreen />
            </PrivateRoute>
          )}
        />
        <Route
          path="/usuarios"
          element={(
            <PrivateRoute requiredPermissions={['SEE_USERS']}>
              <UsersScreen />
            </PrivateRoute>
          )}
        />
        <Route
          path="/cargos"
          element={(
            <PrivateRoute requiredPermissions={['SEE_USERS']}>
              <RolesScreen />
            </PrivateRoute>
          )}
        />
        <Route path="/unauthorized" element={<UnauthorizedScreen />} />
        <Route path="/*" element={<Navigate to="/minha-area" />} />
      </Route>
    </Routes>
  );
}

function NonAuthenticatedRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LoginScreen />}
      />
      <Route path="/unauthorized" element={<UnauthorizedScreen />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function getRoutes() {
  const { isLoggedIn, loading } = useUser();
  console.log('isLoggedIn, isLoading', isLoggedIn, loading);

  if (loading) {
    return [
      {
        path: '*',
        element: (
          <LoadingScreen />
        ),
      },
    ];
  }
  return [
    {
      path: '/',
      element: isLoggedIn ? (
        <Navigate to="/minha-area" />
      ) : (
        <NonAuthenticatedRoutes />
      ),
    },
    {
      path: '/*',
      element: isLoggedIn ? (
        <AuthenticatedRoutes />
      ) : (
        <Navigate to="/" />
      ),
    },
  ];
}
