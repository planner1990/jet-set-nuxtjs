import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, AuthState } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isGuide = computed(() => user.value?.role === 'guide')
  const isTourist = computed(() => user.value?.role === 'tourist')
  const userProfile = computed(() => user.value)
  const isLoggedIn = computed(() => isAuthenticated.value && !!token.value)

  function setUser(newUser: User | null) {
    user.value = newUser
    isAuthenticated.value = !!newUser
  }

  function setToken(newToken: string | null) {
    token.value = newToken
  }

  async function login(email: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      setUser(data.user)
      setToken(data.token)

      return true
    } catch (err: any) {
      error.value = err.message || 'An error occurred during login'
      console.error('Login error:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    loading.value = true
    try {
      user.value = null
      token.value = null
      isAuthenticated.value = false
      error.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    error,
    // Getters
    isGuide,
    isTourist,
    userProfile,
    isLoggedIn,
    // Actions
    setUser,
    setToken,
    login,
    logout
  }
}, {
  persist: true
})
