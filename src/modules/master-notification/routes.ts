import { useAuthStore } from '@/stores/auth'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const routes = {
  path: '/master',
  component: () => import('@/layouts/app-layout.vue'),
  meta: {
    shortcut: 'main',
  },
  children: [
    {
      path: 'notification',
      component: () => import('./module-index.vue'),
      meta: {
        shortcut: 'main',
        menu: 'master',
      },
      children: [
        {
          path: '',
          component: () => import('./views/index.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'notification',
          },
        },
        {
          path: 'create',
          component: () => import('./views/create.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'notification',
          },
        },
        {
          path: ':id/edit',
          component: () => import('./views/edit.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'notification',
          },
        },
        {
          path: ':id',
          component: () => import('./views/show.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'notification',
          },
        },
      ],
    },
  ],
  beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore()
    if (!(await authStore.isAuthenticated())) {
      next('/signin')
    } else {
      next()
    }
  },
}
