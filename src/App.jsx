import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import ScreensLayout from './layout/ScreensLayout';
import LoginScreen from './screens/loginScreen';
import DocumentTypeScreen from './screens/documentTypeScreen';
import MyAreaScreen from './screens/myAreaScreen';
import DocumentsScreen from './screens/documentsScreen';
import ClientsScreen from './screens/clientsScreen';
import DocumentsNatureScreen from './screens/documentsNatureScreen';
import DocumentStorageLocalScreen from './screens/documentStorageLocalScreen';
import UsersScreen from './screens/usersScreen';
import RolesScreen from './screens/rolesScreen';
import UnauthorizedScreen from './screens/unauthorizedScreen';
import PrivateRoute from './components/PrivateRoutes';
import PublicRoute from './components/PublicRoutes';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          )}
        />
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
        </Route>
        <Route path="/unauthorized" element={<UnauthorizedScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
