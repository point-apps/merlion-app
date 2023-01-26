import { defineStore } from 'pinia'
import cookie from '@point-hub/vue-cookie'
import axios from '@/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      name: '',
    },
  }),
  actions: {
    async login(username: string, password: string) {
      const response = await axios.post('/auth/signin', {
        username: username,
        password: password,
      })

      if (response.status === 200) {
        this.$state.user.name = response.data.name
        cookie.set('accessToken', response.data.accessToken)
        cookie.set('refreshToken', response.data.refreshToken)
      }

      return response
    },
    async verifyToken() {
      try {
        const response = await axios.post('/auth/verify-token')
        if (response.status === 200) {
          this.$state.user.name = response.data.name
        }
      } catch (error) {
        this.logout()
      }
    },
    logout() {
      this.$state.user.name = ''
      cookie.remove('token')
    },
    async isAuthenticated() {
      const accessToken = cookie.get('accessToken')
      if (this.$state.user.name === '' && !accessToken) {
        return false
      }

      if (this.$state.user.name === '' && accessToken) {
        await this.verifyToken()
      }
      return true
    },
  },
})
