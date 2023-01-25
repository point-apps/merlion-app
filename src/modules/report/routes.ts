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
      path: 'report',
      component: () => import('./module-index.vue'),
      meta: {
        shortcut: 'main',
        menu: 'strength-mapping',
      },
      children: [
        {
          path: '',
          component: () => import('./views/ikigai/index.vue'),
          meta: {
            shortcut: 'main',
            menu: 'strength-mapping',
            submenu: 'report',
          },
        },
        {
          path: ':id',
          component: () => import('./views/ikigai/detail.vue'),
          meta: {
            shortcut: 'main',
            menu: 'strength-mapping',
            submenu: 'report',
          },
        },
      ],
    },
  ],
  beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore()
    if (!(await authStore.isAuthenticated())) {
      // next('/signin')
      next()
    } else {
      next()
    }
  },
}
