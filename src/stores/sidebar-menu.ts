import { defineStore } from 'pinia'

export interface ShortcutInterface {
  name: string
  meta: string
  icon: string
  menu: Array<MenuInterface>
  active?: boolean
  path?: string
  link?: string
  roles?: string[]
}

export interface MenuInterface {
  name: string
  meta: string
  active?: boolean
  path?: string
  link?: string
  separator?: boolean
  submenu?: Array<SubmenuInterface>
  roles?: string[]
}

export interface SubmenuInterface {
  name: string
  meta: string
  active?: boolean
  path?: string
  link?: string
  separator?: boolean
  roles?: string[]
}

interface StateInterface {
  shortcut: Array<ShortcutInterface>
}

export const useSidebarMenuStore = defineStore('sidebar-menu', {
  state: (): StateInterface => ({
    shortcut: [menuMain, menuAccount, menuNotification],
  }),
})

const menuMain = {
  name: 'Main Menu',
  meta: 'main',
  icon: 'fa-regular fa-house',
  menu: [
    {
      name: 'Home',
      meta: 'home',
      path: '/',
    },
    {
      name: 'Master',
      meta: 'master',
      roles: ['admin'],
      submenu: [
        {
          name: 'User',
          meta: 'user',
          path: '/master/user',
        },
        {
          name: 'Cluster',
          meta: 'cluster',
          path: '/master/cluster',
        },
        {
          name: 'Institution',
          meta: 'institution',
          path: '/master/institution',
        },
        {
          name: 'Notification',
          meta: 'notification',
          path: '/master/notification',
        },
      ],
    },
    {
      name: 'Strength Mapping',
      meta: 'strength-mapping',
      submenu: [
        {
          name: 'Capture',
          meta: 'capture',
          path: '/strength-mapping/capture',
        },
        {
          name: 'Report',
          meta: 'report',
          path: '/strength-mapping/report/spider-chart',
        },
      ],
    },
  ],
}

const menuAccount = {
  name: 'Account',
  meta: 'account',
  icon: 'fa-regular fa-user-circle',
  menu: [
    {
      name: 'Profile',
      meta: 'profile',
      path: '/account/profile',
    },
    {
      name: 'Security',
      meta: 'security',
      path: '/account/security',
    },
  ],
}

const menuNotification = {
  name: 'Notification',
  meta: 'notification',
  icon: 'fa-regular fa-envelope',
  path: '/notification',
  menu: [],
}
