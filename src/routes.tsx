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
        path: 'starship',
        lazy: () => import('@/pages/starship'),
      },
      {
        path: 'starship/modules/character',
        lazy: () => import('@/pages/starship/modules/character-module'),
      },
      {
        path: 'starship/modules/directory',
        lazy: () => import('@/pages/starship/modules/directory-module'),
      },
      {
        path: 'starship/modules/git',
        lazy: () => import('@/pages/starship/modules/git-module'),
      },
      {
        path: 'starship/modules/time',
        lazy: () => import('@/pages/starship/modules/time-module'),
      },
      {
        path: 'starship/modules/languages',
        lazy: () => import('@/pages/starship/modules/language-modules'),
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
