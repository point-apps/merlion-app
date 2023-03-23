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
      path: 'user',
      component: () => import('./module-index.vue'),
      meta: {
        shortcut: 'main',
        menu: 'master',
      },
      children: [
        {
          path: '',
          component: () => import('./views/user/index.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'user',
          },
        },
        {
          path: 'invite',
          component: () => import('./views/user/invite.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'user',
          },
        },
        {
          path: ':id/edit',
          component: () => import('./views/user/edit.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'user',
          },
        },
        {
          path: ':id',
          component: () => import('./views/user/show.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'user',
          },
        },
      ],
    },
    {
      path: '',
      component: () => import('./module-index.vue'),
      children: [
        {
          path: '',
          component: () => import('./views/index.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
          },
        },
      ],
    },
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
          component: () => import('./views/notification/index.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'notification',
          },
        },
        {
          path: 'create',
          component: () => import('./views/notification/create.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'notification',
          },
        },
        {
          path: ':id/edit',
          component: () => import('./views/notification/edit.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'notification',
          },
        },
        {
          path: ':id',
          component: () => import('./views/notification/show.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'notification',
          },
        },
      ],
    },
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
          component: () => import('./views/institution/index.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'institution',
          },
        },
        {
          path: 'create',
          component: () => import('./views/institution/create.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'institution',
          },
        },
        {
          path: ':id/edit',
          component: () => import('./views/institution/edit.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'institution',
          },
        },
        {
          path: ':id',
          component: () => import('./views/institution/show.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'institution',
          },
        },
      ],
    },
    {
      path: 'cluster',
      component: () => import('./module-index.vue'),
      meta: {
        shortcut: 'main',
        menu: 'master',
      },
      children: [
        {
          path: '',
          component: () => import('./views/cluster/index.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'cluster',
          },
        },
        {
          path: ':id/edit',
          component: () => import('./views/cluster/edit.vue'),
          meta: {
            shortcut: 'main',
            menu: 'master',
            submenu: 'cluster',
          },
        },
      ],
    },
  ],
  beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore()
    if (!(await authStore.isAuthenticated()) || authStore.$state.user.role === 'user') {
      next('/signin')
    } else {
      next()
    }
  },
}
