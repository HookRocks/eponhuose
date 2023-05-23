import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Main from './Pages/Main.jsx';
import AdminPage from './Pages/AdminPage';
import {MarkerProvider} from './Contexts/MarkerContext';

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '#/admin',
    element: <AdminPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MarkerProvider>
        <Router>
            <Switch>
              <Route path='/' element={<Main />} />
              <Route path='/admin' element={<AdminPage />} />
            </Switch>
        </Router>
    </MarkerProvider>
  </React.StrictMode>
);
