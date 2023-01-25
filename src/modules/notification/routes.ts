import { useAuthStore } from '@/stores/auth'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const routes = {
  path: '/',
  component: () => import('@/layouts/app-layout.vue'),
  meta: {
    shortcut: 'notification',
  },
  children: [
    {
      path: '',
      component: () => import('./module-index.vue'),
      children: [
        {
          path: 'notification',
          component: () => import('./views/index.vue'),
          meta: {
            shortcut: 'notification',
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
