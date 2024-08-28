import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primeflex/primeflex.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Login from './pages/Login';
import MenuInicial from './pages/MenuInicial';
import Modelos from './pages/subpages/Modelos';
import Usuarios from './pages/subpages/Usuarios';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/menu",
    element: <MenuInicial />,
    children: [
      {
        path: "modelos",
        element: <Modelos />,
      },
      {
        path: "usuarios",
        element: <Usuarios />,
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
