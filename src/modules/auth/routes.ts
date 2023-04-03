import { useAuthStore } from '@/stores/auth'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const routes = {
  path: '/',
  component: () => import('@/layouts/full-layout.vue'),
  children: [
    {
      path: '',
      component: () => import('./module-index.vue'),
      children: [
        {
          path: 'signin',
          component: () => import('./views/signin.vue'),
        },
        {
          path: 'forgot-password',
          component: () => import('./views/forgot-password.vue'),
        },
        {
          path: 'reset-password',
          component: () => import('./views/reset-password.vue'),
        },
      ],
    },
    {
      path: '/auth',
      component: () => import('./module-index.vue'),
      children: [
        {
          path: 'google-callback',
          component: () => import('./views/google-callback.vue'),
        },
      ],
    },
  ],
  beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore()
    if (!(await authStore.isAuthenticated())) {
      next()
    } else {
      next('/')
    }
  },
}
