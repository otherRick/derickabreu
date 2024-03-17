import React from 'react';
import ReactDOM from 'react-dom/client';
import './global/global.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/route';
import ReactGA from 'react-ga';

const TRACKING_ID = 'G-F2VB8S3GCE'; // Substitua pelo seu próprio ID de rastreamento
ReactGA.initialize(TRACKING_ID);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
