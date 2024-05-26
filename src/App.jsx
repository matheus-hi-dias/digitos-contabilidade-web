import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import getRoutes from './routes';
import './App.css';

function App() {
  const routes = getRoutes();
  const router = createBrowserRouter(routes);
  console.log('router', router);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
