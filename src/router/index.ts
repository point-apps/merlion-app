import { createRouter, createWebHistory } from 'vue-router'
import { routes as authRoutes } from '@/modules/auth/routes'
import { routes as mainRoutes } from '@/modules/main/routes'
import { routes as templateRoutes, pageRoutes } from '@/modules/template/routes'
import { routes as masterUserRoutes } from '@/modules/user/routes'
import { routes as captureRoutes } from '@/modules/capture/routes'

const routes = [mainRoutes, masterUserRoutes, captureRoutes, templateRoutes, pageRoutes, authRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
