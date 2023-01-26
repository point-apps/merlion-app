import { useAuthStore } from '@/stores/auth'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const routes = {
  path: '/account',
  component: () => import('@/layouts/app-layout.vue'),
  meta: {
    shortcut: 'account',
  },
  children: [
    {
      path: '',
      component: () => import('./module-index.vue'),
      meta: {
        shortcut: 'account',
      },
      children: [
        {
          path: '',
          component: () => import('./views/index.vue'),
          meta: {
            shortcut: 'account',
          },
        },
        {
          path: 'profile',
          component: () => import('./views/profile.vue'),
          meta: {
            shortcut: 'account',
            menu: 'profile',
          },
        },
        {
          path: 'security',
          component: () => import('./views/security.vue'),
          meta: {
            shortcut: 'account',
            menu: 'security',
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
