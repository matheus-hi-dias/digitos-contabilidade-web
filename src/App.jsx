import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScreensLayout from "./layout/ScreensLayout";
import LoginScreen from "./screens/loginScreen";
import MyAreaScreen from "./screens/myAreaScreen";
import DocumentsScreen from "./screens/documentsScreen";
import ClientsScreen from "./screens/clientsScreen";
import DocumentType from "./screens/documentTypeScreen";
import DocumentNatureScreen from "./screens/documentNatureScreen";
import DocumentStorageLocalScreen from "./screens/documentStorageLocalScreen";
import UsersScreen from "./screens/usersScreen";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route element={<ScreensLayout />}>
          <Route path="/minha-area" element={<MyAreaScreen />} />
          <Route path="/documentos" element={<DocumentsScreen />} />
          <Route path="/clientes" element={<ClientsScreen />} />
          <Route path="/tipo-de-documento" element={<DocumentType />} />
          <Route path="/natureza" element={<DocumentNatureScreen />} />
          <Route
            path="/local-do-documento"
            element={<DocumentStorageLocalScreen />}
          />
          <Route path="/usuarios" element={<UsersScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
