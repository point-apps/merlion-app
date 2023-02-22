import { createRouter, createWebHistory } from 'vue-router'
import { routes as authRoutes } from '@/modules/auth/routes'
import { routes as mainRoutes } from '@/modules/main/routes'
import { routes as accountRoutes } from '@/modules/account/routes'
import { routes as templateRoutes, pageRoutes } from '@/modules/template/routes'
import { routes as masterRoutes } from '@/modules/master/routes'
import { routes as strengthMappingRoutes } from '@/modules/strength-mapping/routes'
import { routes as reportRoutes } from '@/modules/report/routes'
import { routes as notificationRoutes } from '@/modules/notification/routes'

const routes = [
  mainRoutes,
  accountRoutes,
  authRoutes,
  masterRoutes,
  strengthMappingRoutes,
  reportRoutes,
  notificationRoutes,
  templateRoutes,
  pageRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
