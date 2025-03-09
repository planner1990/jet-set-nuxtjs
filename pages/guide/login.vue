<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Guide Login</v-toolbar-title>
          </v-toolbar>
          
          <v-card-text>
            <v-form @submit.prevent="handleLogin" ref="form">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                prepend-inner-icon="mdi-email"
                type="email"
                variant="outlined"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                variant="outlined"
                required
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"
              ></v-text-field>

              <div class="d-flex align-center mb-4">
                <v-checkbox
                  v-model="rememberMe"
                  label="Remember me"
                  hide-details
                ></v-checkbox>
                <v-spacer></v-spacer>
                <v-btn
                  variant="text"
                  color="primary"
                  to="/guide/forgot-password"
                  class="text-none"
                >
                  Forgot Password?
                </v-btn>
              </div>

              <v-btn
                type="submit"
                color="primary"
                block
                :loading="loading"
                :disabled="loading"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="text-center">
            Don't have an account?
            <v-btn
              variant="text"
              color="primary"
              to="/guide/register"
              class="text-none"
            >
              Register as a Guide
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const form = ref(null)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 8 || 'Password must be at least 8 characters'
]

const handleLogin = async () => {
  const formValid = await (form.value as any)?.validate()
  
  if (!formValid?.valid) {
    return
  }

  loading.value = true

  try {
    const success = await auth.login(email.value, password.value)
    if (success) {
      router.push('/guide/dashboard')
    } else {
      // Handle login error
    }
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>
