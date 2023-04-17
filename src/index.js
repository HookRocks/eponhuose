import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Main from "./Pages/Main.jsx";
import AdminPage from "./Pages/AdminPage";
import MarkerContext from './Contexts/MarkerContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/admin",
    element: <AdminPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MarkerContext.Provider>
      <RouterProvider router={router} />
    </MarkerContext.Provider>
  </React.StrictMode>
);