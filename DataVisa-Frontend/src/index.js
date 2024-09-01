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
import Cadastro from './pages/subpages/Cadastro';
import Auditoria from './pages/subpages/Auditoria';
import Perfil from './pages/subpages/Perfil';
import Templates from './pages/subpages/Templates';
import Conexoes from './pages/subpages/Conexoes';

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
      },
      {
        path: "cadastro",
        element: <Cadastro />
      },
      {
        path: "audit",
        element: <Auditoria />
      },
      {
        path: "perfil",
        element: <Perfil />
      },
      {
        path: "templates",
        element: <Templates />
      },
      {
        path: "conexoes",
        element: <Conexoes />
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
