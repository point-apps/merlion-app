export const routes = {
  path: '/template',
  component: () => import('@/layouts/app-layout.vue'),
  meta: {
    shortcut: 'template',
  },
  children: [
    {
      path: 'element',
      component: () => import('./module-index.vue'),
      meta: {
        shortcut: 'template',
        menu: 'element',
      },
      children: [
        {
          path: 'alert',
          component: () => import('./views/element/alert.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'alert',
          },
        },
        {
          path: 'avatar',
          component: () => import('./views/element/avatar.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'avatar',
          },
        },
        {
          path: 'badge',
          component: () => import('./views/element/badge.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'badge',
          },
        },
        {
          path: 'breadcrumb',
          component: () => import('./views/element/breadcrumb.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'breadcrumb',
          },
        },
        {
          path: 'button',
          component: () => import('./views/element/button.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'button',
          },
        },
        {
          path: 'button-group',
          component: () => import('./views/element/button-group.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'button-group',
          },
        },
        {
          path: 'card',
          component: () => import('./views/element/card.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'card',
          },
        },
        {
          path: 'divider',
          component: () => import('./views/element/divider.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'divider',
          },
        },
        {
          path: 'mask',
          component: () => import('./views/element/mask.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'mask',
          },
        },
        {
          path: 'progress',
          component: () => import('./views/element/progress.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'progress',
          },
        },
        {
          path: 'skeleton',
          component: () => import('./views/element/skeleton.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'skeleton',
          },
        },
        {
          path: 'spinner',
          component: () => import('./views/element/spinner.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'spinner',
          },
        },
        {
          path: 'tag',
          component: () => import('./views/element/tag.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'tag',
          },
        },
        {
          path: 'tooltip',
          component: () => import('./views/element/tooltip.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'tooltip',
          },
        },
        {
          path: 'typography',
          component: () => import('./views/element/typography.vue'),
          meta: {
            shortcut: 'template',
            menu: 'element',
            submenu: 'typography',
          },
        },
      ],
    },
    {
      path: 'component',
      component: () => import('./module-index.vue'),
      meta: {
        shortcut: 'template',
        menu: 'component',
      },
      children: [
        {
          path: 'accordion',
          component: () => import('./views/component/accordion.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'accordion',
          },
        },
        {
          path: 'collapse',
          component: () => import('./views/component/collapse.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'collapse',
          },
        },
        {
          path: 'dropdown',
          component: () => import('./views/component/dropdown.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'dropdown',
          },
        },
        {
          path: 'menu-list',
          component: () => import('./views/component/menu-list.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'menu-list',
          },
        },
        {
          path: 'modal',
          component: () => import('./views/component/modal.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'modal',
          },
        },
        {
          path: 'notification',
          component: () => import('./views/component/notification.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'notification',
          },
        },
        {
          path: 'popover',
          component: () => import('./views/component/popover.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'popover',
          },
        },
        {
          path: 'steps',
          component: () => import('./views/component/steps.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'steps',
          },
        },
        {
          path: 'tab',
          component: () => import('./views/component/tab.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'tab',
          },
        },
        {
          path: 'timeline',
          component: () => import('./views/component/timeline.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'timeline',
          },
        },
        {
          path: 'treeview',
          component: () => import('./views/component/treeview.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'treeview',
          },
        },
        {
          path: 'table',
          component: () => import('./views/component/table.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'table',
          },
        },
        {
          path: 'table-advance',
          component: () => import('./views/component/table-advance.vue'),
          meta: {
            shortcut: 'template',
            menu: 'component',
            submenu: 'table-advance',
          },
        },
      ],
    },
    {
      path: 'form',
      component: () => import('./module-index.vue'),
      meta: {
        shortcut: 'template',
        menu: 'form',
      },
      children: [
        {
          path: 'form-layout-1',
          component: () => import('./views/form/form-layout-1.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'form-layout-1',
          },
        },
        {
          path: 'form-layout-2',
          component: () => import('./views/form/form-layout-2.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'form-layout-2',
          },
        },
        {
          path: 'form-layout-3',
          component: () => import('./views/form/form-layout-3.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'form-layout-3',
          },
        },
        {
          path: 'form-layout-4',
          component: () => import('./views/form/form-layout-4.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'form-layout-4',
          },
        },
        {
          path: 'form-layout-5',
          component: () => import('./views/form/form-layout-5.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'form-layout-5',
          },
        },
        {
          path: 'checkbox',
          component: () => import('./views/form/checkbox.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'checkbox',
          },
        },
        {
          path: 'datepicker',
          component: () => import('./views/form/datepicker.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'datepicker',
          },
        },
        {
          path: 'input-group',
          component: () => import('./views/form/input-group.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'input-group',
          },
        },
        {
          path: 'input-mask',
          component: () => import('./views/form/input-mask.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'input-mask',
          },
        },
        {
          path: 'input-text',
          component: () => import('./views/form/input-text.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'input-text',
          },
        },
        {
          path: 'radio',
          component: () => import('./views/form/radio.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'radio',
          },
        },
        {
          path: 'range',
          component: () => import('./views/form/range.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'range',
          },
        },
        {
          path: 'select',
          component: () => import('./views/form/select.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'select',
          },
        },
        {
          path: 'switch',
          component: () => import('./views/form/switch.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'switch',
          },
        },
        {
          path: 'text-editor',
          component: () => import('./views/form/text-editor.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'text-editor',
          },
        },
        {
          path: 'textarea',
          component: () => import('./views/form/textarea.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'textarea',
          },
        },
        {
          path: 'form-upload',
          component: () => import('./views/form/form-upload.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'form-upload',
          },
        },
        {
          path: 'form-validation',
          component: () => import('./views/form/form-validation.vue'),
          meta: {
            shortcut: 'template',
            menu: 'form',
            submenu: 'form-validation',
          },
        },
      ],
    },
  ],
}

export const pageRoutes = {
  path: '/page',
  component: () => import('@/layouts/full-layout.vue'),
  children: [
    {
      path: '',
      component: () => import('./module-index.vue'),
      children: [
        {
          path: 'signin',
          component: () => import('./views/page/signin.vue'),
        },
      ],
    },
  ],
}
