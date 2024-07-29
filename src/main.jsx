import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SelectedFlag from './components/SelectedFlag.jsx'
import SelectedFlagByCode from './components/SelectedFlagByCode.jsx'

const router = createBrowserRouter([
  {
    path: "/REST-Countries-API-with-color-theme-switcher-v2-Redux-Tailwind/",
    element: <App />,
  },
  {
    path: "/REST-Countries-API-with-color-theme-switcher-v2-Redux-Tailwind/:id",
    element: <SelectedFlag />
  },
  {
    path: "/REST-Countries-API-with-color-theme-switcher-v2-Redux-Tailwind/code/:id",
    element: <SelectedFlagByCode />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
