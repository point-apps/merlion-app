import { defineStore } from 'pinia'
import cookie from '@point-hub/vue-cookie'
import axios from '@/axios'
import apiConfig from '@/config/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      name: '',
      email: '',
      role: '',
      googleScopes: '',
    },
  }),
  actions: {
    async requestPassword(email: string) {
      const response = await axios.post('/auth/request-password', {
        email: email,
      })

      return response
    },
    async resetPassword(email: string, newPassword: string, code: string) {
      console.log({
        email: email,
        newPassword: newPassword,
        code: code,
      })
      const response = await axios.post('/auth/reset-password', {
        email: email,
        newPassword: newPassword,
        code: code,
      })

      return response
    },
    async login(username: string, password: string) {
      const response = await axios.post('/auth/signin', {
        username: username,
        password: password,
      })

      if (response.status === 200) {
        this.$state.user.name = response.data.name
        this.$state.user.email = response.data.email
        this.$state.user.role = response.data.role
        this.$state.user.googleScopes = response.data.googleScopes
        cookie.set('accessToken', response.data.accessToken)
        cookie.set('refreshToken', response.data.refreshToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie.get('accessToken')}`
      }

      return response
    },
    async loginUsingGoogle() {
      try {
        const response = await axios.get(
          `${apiConfig.baseURL}/auth/google-drive/get-auth-url?callback=//${window.location.hostname}${
            window.location.port ? ':' : ''
          }${window.location.port}/auth/google-callback`
        )
        if (response.status === 200) {
          window.open(response.data, '_self')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async exchangeOAuthToken(vendor: string, code: string) {
      const response = await axios.post('/auth/exchange-token', {
        vendor: vendor,
        code: code,
      })

      if (response.status === 200) {
        this.$state.user.name = response.data.name
        this.$state.user.email = response.data.email
        this.$state.user.role = response.data.role
        this.$state.user.googleScopes = response.data.googleScopes
        cookie.set('accessToken', response.data.accessToken)
        cookie.set('refreshToken', response.data.refreshToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie.get('accessToken')}`
      }

      return response
    },
    async verifyToken() {
      try {
        const response = await axios.post('/auth/verify-token')
        if (response.status === 200) {
          console.log(response.data)
          this.$state.user.name = response.data.name
          this.$state.user.email = response.data.email
          this.$state.user.role = response.data.role
          this.$state.user.googleScopes = response.data.googleScopes
        }
      } catch (error) {
        this.logout()
      }
    },
    logout() {
      this.$state.user.name = ''
      this.$state.user.email = ''
      this.$state.user.role = ''
      this.$state.user.googleScopes = ''
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
