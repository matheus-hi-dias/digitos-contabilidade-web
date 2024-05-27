import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import getRoutes from './routes';
import './App.css';

function App() {
  const routes = getRoutes();
  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
