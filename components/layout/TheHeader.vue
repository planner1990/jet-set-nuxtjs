<template>
  <v-app-bar flat>
    <v-container class="d-flex align-center">
      <!-- Logo -->
      <nuxt-link to="/" class="text-decoration-none">
        <v-img
          src="/images/logo.svg"
          alt="Jet Set"
          max-width="120"
          class="mr-4"
        />
      </nuxt-link>

      <!-- Navigation Menu -->
      <v-spacer />
      
      <div class="d-none d-md-flex">
        <v-btn variant="text" to="/tourist/tours">{{ $t('nav.tours') }}</v-btn>
        <v-btn variant="text" to="/tourist/guides">{{ $t('nav.guides') }}</v-btn>
        <v-btn variant="text" to="/tourist/destinations">{{ $t('nav.destinations') }}</v-btn>
      </div>

      <!-- Language Selector -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
            class="mx-2"
          >
            <v-icon>mdi-earth</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="locale in ['en', 'de', 'fr', 'fa']"
            :key="locale"
            :value="locale"
            @click="switchLocale(locale)"
          >
            <v-list-item-title>{{ locale.toUpperCase() }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Auth Buttons -->
      <template v-if="!isAuthenticated">
        <v-btn
          variant="text"
          class="mx-2"
          @click="login"
        >
          {{ $t('auth.login') }}
        </v-btn>
        <v-btn
          color="primary"
          @click="register"
        >
          {{ $t('auth.signup') }}
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          icon
          class="mx-2"
          to="/tourist/dashboard"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#imports'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const login = () => router.push('/auth/login')
const register = () => router.push('/auth/register')
const switchLocale = (locale: string) => {
  // TODO: Implement locale switching
  console.log('Switching to locale:', locale)
}
</script>
