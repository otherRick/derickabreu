import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/home';
import Layout from '../components/layout/layout';
import { Photography } from '../pages/photography/Photography';
import { About } from '../pages/about/About';
import { Contract } from '../pages/contract/Contract';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/photography',
        element: <Photography />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contract',
        element: <Contract />
      }
    ]
  }
]);
