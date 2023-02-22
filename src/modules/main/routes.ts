import { useAuthStore } from '@/stores/auth'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const routes = {
  path: '',
  component: () => import('@/layouts/app-layout.vue'),
  meta: {
    shortcut: 'main',
  },
  children: [
    {
      path: '',
      component: () => import('./module-index.vue'),
      children: [
        {
          path: '',
          component: () => import('./views/home.vue'),
          meta: {
            shortcut: 'main',
            menu: 'home',
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
