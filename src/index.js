import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Main from './Pages/Main.jsx';
import AdminPage from './Pages/AdminPage';
import {MarkerProvider} from './Contexts/MarkerContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/Admin',
    element: <AdminPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <MarkerProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="Admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
    </MarkerProvider>
  </React.StrictMode>
);
