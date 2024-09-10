import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primeflex/primeflex.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Login from './pages/Login';
import MenuInicial from './pages/MenuInicial';
import Usuarios from './pages/subpages/Usuarios';
import Cadastro from './pages/subpages/Cadastro';
import Auditoria from './pages/subpages/Auditoria';
import Perfil from './pages/subpages/Perfil';
import Templates from './pages/subpages/Templates';
import Conexoes from './pages/subpages/Conexoes';
import './index.css'
import Recentes from './pages/subpages/Recentes';
import Pesquisar from './pages/subpages/Pesquisar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/menu",
    element: <MenuInicial modo={1}/>,
    children: [
      {
        path: "recentes",
        element: <Recentes />
      },
      {
        path: "pesquisar",
        element: <Pesquisar />,
      },
      {
        path: "perfil",
        element: <Perfil />
      },
    ]
  },
  {
    path: "/config",
    element: <MenuInicial modo={2}/>,
    children: [
      {
        path: "usuarios",
        element: <Usuarios />,
      },
      {
        path: "pendentes",
        element: <Usuarios />
      },
      {
        path: "audit",
        element: <Auditoria />
      },
      {
        path: "templates",
        element: <Templates />
      },
      {
        path: "conexoes",
        element: <Conexoes />
      },
      {
        path: "cadastro",
        element: <Cadastro />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
