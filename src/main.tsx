import React from 'react';
import ReactDOM from 'react-dom/client';
import './global/global.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/route';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { store } from './store/stores';

const TRACKING_ID = 'G-F2VB8S3GCE';
ReactGA.initialize(TRACKING_ID);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
