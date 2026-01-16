import { createMemoryRouter, type RouteObject } from 'react-router-dom';

import { Home } from '@/pages/home';
import { ConfigList } from '@/pages/config-list';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        element: <ConfigList />,
      },
      {
        path: 'editor/:configId',
        lazy: () => import('@/pages/config-editor'),
      },
      {
        path: 'settings',
        lazy: () => import('@/pages/settings'),
      },
    ],
  },
];

export const router = createMemoryRouter(routes, {
  initialEntries: ['/'],
});
