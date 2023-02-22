export const routes = {
  path: '',
  component: () => import('@/layouts/full-layout.vue'),
  meta: {
    shortcut: 'main',
  },
  children: [
    {
      path: '',
      component: () => import('./module-index.vue'),
      children: [
        {
          path: 'terms',
          component: () => import('./views/terms.vue'),
        },
        {
          path: 'privacy',
          component: () => import('./views/privacy.vue'),
        },
      ],
    },
  ],
}
