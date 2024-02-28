import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScreensLayout from './layout/ScreensLayout'
import DocumentType from './screens/documentType';

import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<ScreensLayout/>}>
        <Route path='tipo-de-documento' element={<DocumentType/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
