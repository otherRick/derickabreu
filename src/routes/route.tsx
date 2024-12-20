import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/home';
import Layout from '../components/layout/layout';
import { About } from '../pages/about/About';
import { Contract } from '../pages/contract/Contract';
import { ProfileUser } from '../pages/profile/profileUser';
import { Photography } from '../pages/photography/Photography';
import { PortifolioBlank } from '../pages/photography/components/portifolioBlank/PortifolioBlank';
import { PublicBlank } from '../pages/photography/components/publicBlank/PublicBlank';

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
      },
      {
        path: '/profile',
        element: <ProfileUser />
      },
      {
        path: '/photography/portifolio',
        element: <PortifolioBlank />
      },
      {
        path: '/photography/public',
        element: <PublicBlank />
      }
    ]
  }
]);
