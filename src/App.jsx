import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScreensLayout from "./layout/ScreensLayout";
import DocumentType from "./screens/documentType";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ScreensLayout />}>
          <Route path="/" element={<DocumentType />} />
          <Route path="/minha-area" element={<DocumentType />} />
          <Route path="/documentos" element={<DocumentType />} />
          <Route path="/clientes" element={<DocumentType />} />
          <Route path="/tipo-de-documento" element={<DocumentType />} />
          <Route path="/natureza" element={<DocumentType />} />
          <Route path="/local-do-documento" element={<DocumentType />} />
          <Route path="/usuarios" element={<DocumentType />} />
          <Route path="/relatorios" element={<DocumentType />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
