import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primeflex/primeflex.css'
import {
  createBrowserRouter, 
  RouterProvider
} from 'react-router-dom'
import Login from './pages/Login';
import MenuInicial from './pages/MenuInicial';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/menu",
    element: <MenuInicial />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
