import { createRouter, createWebHistory } from 'vue-router'
import { routes as authRoutes } from '@/modules/auth/routes'
import { routes as mainRoutes } from '@/modules/main/routes'
import { routes as templateRoutes, pageRoutes } from '@/modules/template/routes'
import { routes as userRoutes } from '@/modules/user/routes'
import { routes as clusterRoutes } from '@/modules/cluster/routes'
import { routes as institutionRoutes } from '@/modules/institution/routes'
import { routes as masterNotificationRoutes } from '@/modules/master-notification/routes'
import { routes as captureRoutes } from '@/modules/capture/routes'
import { routes as reportRoutes } from '@/modules/report/routes'
import { routes as notificationRoutes } from '@/modules/notification/routes'

const routes = [
  mainRoutes,
  userRoutes,
  clusterRoutes,
  institutionRoutes,
  masterNotificationRoutes,
  captureRoutes,
  reportRoutes,
  notificationRoutes,
  templateRoutes,
  pageRoutes,
  authRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
