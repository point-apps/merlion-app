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
      path: 'institution',
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
            submenu: 'institution',
          },
        },
        {
          path: 'create',
          component: () => import('./views/create.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'institution',
          },
        },
        {
          path: ':id/edit',
          component: () => import('./views/edit.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'institution',
          },
        },
        {
          path: ':id',
          component: () => import('./views/show.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'institution',
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
