import { defineStore } from 'pinia'
import cookie from '@point-hub/vue-cookie'
import axios from '@/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      name: '',
      email: '',
      role: '',
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
        this.$state.user.email = response.data.email
        this.$state.user.role = response.data.role
        cookie.set('accessToken', response.data.accessToken)
        cookie.set('refreshToken', response.data.refreshToken)
      }

      return response
    },
    async exchangeOAuthToken(vendor: string, code: string) {
      const response = await axios.post('/auth/exchange-token', {
        vendor: vendor,
        code: code,
      })
      console.log(response.data)
      if (response.status === 200) {
        this.$state.user.name = response.data.name
        this.$state.user.email = response.data.email
        this.$state.user.role = response.data.role
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
          this.$state.user.email = response.data.email
          this.$state.user.role = response.data.role
        }
      } catch (error) {
        this.logout()
      }
    },
    logout() {
      this.$state.user.name = ''
      this.$state.user.email = ''
      this.$state.user.role = ''
      cookie.remove('accessToken')
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
