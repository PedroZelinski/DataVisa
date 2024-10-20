import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primeflex/primeflex.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Login from './pages/Login';
import MenuInicial from './pages/MenuInicial';
import Usuarios from './pages/subpage-config/Usuarios';
import Cadastro from './pages/subpage-config/Cadastro';
import Auditoria from './pages/subpage-config/Auditoria';
import Perfil from './pages/subpage-menu/Perfil';
import Templates from './pages/subpage-config/Templates';
import Conexoes from './pages/subpage-config/Conexoes';
import './index.css'
import Recentes from './pages/subpage-menu/Recentes';
import Pesquisar from './pages/subpage-menu/Pesquisar';
import Gerar from './pages/subpage-menu/Gerar';
import Criar from './pages/subpage-menu/Criar';

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
      {
        path: "criar",
        element: <Criar />
      },
      {
        path: "gerar",
        element: <Gerar />
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
        path: "cadastro/:type",
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
