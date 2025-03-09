<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <nuxt-link :to="$localePath('/')" class="text-white text-decoration-none">{{ t('welcome') }}</nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <!-- Language Selector -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="loc in availableLocales"
            :key="loc.code"
            @click="switchLocale(loc.code as 'en' | 'de' | 'fr' | 'fa')"
          >
            <v-list-item-title>{{ loc.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Theme Toggle -->
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>

      <!-- Navigation Buttons -->
      <v-btn variant="text" :to="$localePath('/tourist/tours')">
        {{ t('nav.tours') }}
      </v-btn>
      <v-btn variant="text" :to="$localePath('/tourist/guides')">
        {{ t('nav.guides') }}
      </v-btn>
      <v-btn variant="text" :to="$localePath('/tourist/destinations')">
        {{ t('nav.destinations') }}
      </v-btn>

      <!-- Auth Buttons -->
      <template v-if="!isAuthenticated">
        <v-btn variant="text" @click="login">
          {{ t('auth.login') }}
        </v-btn>
        <v-btn variant="elevated" color="secondary" @click="register">
          {{ t('auth.signup') }}
        </v-btn>
      </template>
      <v-btn v-else variant="text" :to="$localePath('/dashboard')">
        {{ t('auth.dashboard') }}
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item :to="$localePath('/')" prepend-icon="mdi-home">
          <v-list-item-title>{{ t('nav.home') }}</v-list-item-title>
        </v-list-item>
        <v-list-item :to="$localePath('/tourist/tours')" prepend-icon="mdi-map-marker">
          <v-list-item-title>{{ t('nav.tours') }}</v-list-item-title>
        </v-list-item>
        <v-list-item :to="$localePath('/tourist/guides')" prepend-icon="mdi-account-group">
          <v-list-item-title>{{ t('nav.guides') }}</v-list-item-title>
        </v-list-item>
        <v-list-item :to="$localePath('/tourist/destinations')" prepend-icon="mdi-earth">
          <v-list-item-title>{{ t('nav.destinations') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>

    <v-footer app color="primary" dark>
      <v-row justify="center" no-gutters>
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>{{ t('welcome') }}</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/stores/auth'

const { locale, t } = useI18n()
const { $localePath } = useNuxtApp()
const authStore = useAuthStore()
const drawer = ref(false)
const isDark = ref(false)

const isAuthenticated = computed(() => authStore.isAuthenticated)

const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'fa', name: 'فارسی' }
] as const

type LocaleCode = typeof availableLocales[number]['code']

const switchLocale = async (code: LocaleCode) => {
  locale.value = code
}

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const login = () => {
  navigateTo('/auth/login')
}

const register = () => {
  navigateTo('/auth/register')
}
</script>

<style scoped>
.v-toolbar-title {
  cursor: pointer;
}
</style>
