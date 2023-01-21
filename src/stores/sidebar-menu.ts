import { defineStore } from 'pinia'

export interface ShortcutInterface {
  name: string
  meta: string
  icon: string
  menu: Array<MenuInterface>
  active?: boolean
  path?: string
  link?: string
}

export interface MenuInterface {
  name: string
  meta: string
  active?: boolean
  path?: string
  link?: string
  separator?: boolean
  submenu?: Array<SubmenuInterface>
}

export interface SubmenuInterface {
  name: string
  meta: string
  active?: boolean
  path?: string
  link?: string
  separator?: boolean
}

interface StateInterface {
  shortcut: Array<ShortcutInterface>
}

export const useSidebarMenuStore = defineStore('sidebar-menu', {
  state: (): StateInterface => ({
    shortcut: [menuMain, menuTemplate],
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
          path: '/strength-mapping/report',
        },
      ],
    },
    {
      name: 'Subject Monitoring',
      meta: 'subject-monitoring',
      submenu: [
        {
          name: 'Capture',
          meta: 'capture',
          path: '/subject-monitoring/capture',
        },
        {
          name: 'Report',
          meta: 'report',
          path: '/subject-monitoring/report',
        },
      ],
    },
  ],
}

const menuTemplate = {
  name: 'Template',
  meta: 'template',
  icon: 'fa-regular fa-wand-magic-sparkles',
  menu: [
    {
      name: 'Element',
      meta: 'element',
      submenu: [
        {
          name: 'Avatar',
          meta: 'avatar',
          path: '/template/element/avatar',
        },
        {
          name: 'Alert',
          meta: 'alert',
          path: '/template/element/alert',
        },
        {
          name: 'Badge',
          meta: 'badge',
          path: '/template/element/badge',
        },
        {
          name: 'Button',
          meta: 'button',
          path: '/template/element/button',
        },
        {
          name: 'Button Group',
          meta: 'button-group',
          path: '/template/element/button-group',
        },
        {
          name: 'Breadcrumb',
          meta: 'breadcrumb',
          path: '/template/element/breadcrumb',
        },
        {
          name: 'Card',
          meta: 'card',
          path: '/template/element/card',
        },
        {
          name: 'Divider',
          meta: 'divider',
          path: '/template/element/divider',
        },
        {
          name: 'Mask',
          meta: 'mask',
          path: '/template/element/mask',
        },
        {
          name: 'Progress',
          meta: 'progress',
          path: '/template/element/progress',
        },
        {
          name: 'Skeleton',
          meta: 'skeleton',
          path: '/template/element/skeleton',
        },
        {
          name: 'Spinner',
          meta: 'spinner',
          path: '/template/element/spinner',
        },
        {
          name: 'Tag',
          meta: 'tag',
          path: '/template/element/tag',
        },
        {
          name: 'Tooltip',
          meta: 'tooltip',
          path: '/template/element/tooltip',
        },
        {
          name: 'Typography',
          meta: 'typography',
          path: '/template/element/typography',
        },
      ],
    },
    {
      name: 'Component',
      meta: 'component',
      submenu: [
        {
          name: 'Accordion',
          meta: 'accordion',
          path: '/template/component/accordion',
        },
        {
          name: 'Collapse',
          meta: 'collapse',
          path: '/template/component/collapse',
        },
        {
          name: 'Dropdown',
          meta: 'dropdown',
          path: '/template/component/dropdown',
        },
        {
          name: 'Menu List',
          meta: 'menu-list',
          path: '/template/component/menu-list',
        },
        {
          name: 'Modal',
          meta: 'modal',
          path: '/template/component/modal',
        },
        {
          name: 'Notification',
          meta: 'notification',
          path: '/template/component/notification',
        },
        {
          name: 'Popover',
          meta: 'popover',
          path: '/template/component/popover',
        },
        {
          name: 'Steps',
          meta: 'steps',
          path: '/template/component/steps',
        },
        {
          name: 'Tab',
          meta: 'tab',
          path: '/template/component/tab',
        },
        {
          name: 'Timeline',
          meta: 'timeline',
          path: '/template/component/timeline',
        },
        {
          name: 'Treeview',
          meta: 'treeview',
          path: '/template/component/treeview',
          separator: true,
        },
        {
          name: 'Table',
          meta: 'table',
          path: '/template/component/table',
        },
        {
          name: 'Table Advance',
          meta: 'table-advance',
          path: '/template/component/table-advance',
        },
      ],
    },
    {
      name: 'Form',
      meta: 'form',
      separator: true,
      submenu: [
        {
          name: 'Form Layout 1',
          meta: 'form-layout-1',
          path: '/template/form/form-layout-1',
        },
        {
          name: 'Form Layout 2',
          meta: 'form-layout-2',
          path: '/template/form/form-layout-2',
        },
        {
          name: 'Form Layout 3',
          meta: 'form-layout-3',
          path: '/template/form/form-layout-3',
        },
        {
          name: 'Form Layout 4',
          meta: 'form-layout-4',
          path: '/template/form/form-layout-4',
        },
        {
          name: 'Form Layout 5',
          meta: 'form-layout-5',
          path: '/template/form/form-layout-5',
          separator: true,
        },
        {
          name: 'Input Text',
          meta: 'input-text',
          path: '/template/form/input-text',
        },
        {
          name: 'Input Group',
          meta: 'input-group',
          path: '/template/form/input-group',
        },
        {
          name: 'Input Mask',
          meta: 'input-mask',
          path: '/template/form/input-mask',
        },
        {
          name: 'Checkbox',
          meta: 'checkbox',
          path: '/template/form/checkbox',
        },
        {
          name: 'Datepicker',
          meta: 'datepicker',
          path: '/template/form/datepicker',
        },
        {
          name: 'Radio',
          meta: 'radio',
          path: '/template/form/radio',
        },
        {
          name: 'Switch',
          meta: 'switch',
          path: '/template/form/switch',
        },
        {
          name: 'Select',
          meta: 'select',
          path: '/template/form/select',
        },
        {
          name: 'Range',
          meta: 'range',
          path: '/template/form/range',
        },
        {
          name: 'Textarea',
          meta: 'textarea',
          path: '/template/form/textarea',
        },
        {
          name: 'Text Editor',
          meta: 'text-editor',
          path: '/template/form/text-editor',
          separator: true,
        },
        {
          name: 'Form Upload',
          meta: 'form-upload',
          path: '/template/form/form-upload',
        },
        {
          name: 'Form Validation',
          meta: 'form-validation',
          path: '/template/form/form-validation',
        },
      ],
    },
    {
      name: 'tailwindcss.com',
      meta: 'tailwindcss',
      link: 'https://tailwindcss.com/',
    },
    {
      name: 'fontawesome.com',
      meta: 'fontawesome',
      link: 'https://fontawesome.com/search',
    },
    {
      name: 'undraw.co',
      meta: 'undraw',
      link: 'https://undraw.co/illustrations',
    },
    {
      name: 'vuejs.org',
      meta: 'vuejs',
      link: 'https://vuejs.org/',
    },
    {
      name: 'vitejs.dev',
      meta: 'vite',
      link: 'https://vitejs.dev/',
    },
  ],
}
