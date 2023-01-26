import { useAuthStore } from '@/stores/auth'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const routes = {
  path: '/strength-mapping',
  component: () => import('@/layouts/app-layout.vue'),
  meta: {
    shortcut: 'main',
  },
  children: [
    {
      path: 'capture',
      component: () => import('./module-index.vue'),
      meta: {
        shortcut: 'main',
        menu: 'strength-mapping',
      },
      children: [
        {
          path: '',
          component: () => import('./views/index.vue'),
          meta: {
            shortcut: 'main',
            menu: 'strength-mapping',
            submenu: 'capture',
          },
        },
        {
          path: 'create',
          component: () => import('./views/create.vue'),
          meta: {
            shortcut: 'main',
            menu: 'strength-mapping',
            submenu: 'capture',
          },
        },
        {
          path: ':id/edit',
          component: () => import('./views/edit.vue'),
          meta: {
            shortcut: 'main',
            menu: 'strength-mapping',
            submenu: 'capture',
          },
        },
        {
          path: ':id',
          component: () => import('./views/show.vue'),
          meta: {
            shortcut: 'main',
            menu: 'strength-mapping',
            submenu: 'capture',
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
