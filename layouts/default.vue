&lt;template>
  &lt;v-app>
    &lt;v-app-bar app color="primary" dark>
      &lt;v-app-bar-nav-icon @click="drawer = !drawer">&lt;/v-app-bar-nav-icon>
      &lt;v-toolbar-title>
        &lt;nuxt-link to="/" class="text-white text-decoration-none">Jet Set&lt;/nuxt-link>
      &lt;/v-toolbar-title>
      &lt;v-spacer>&lt;/v-spacer>
      &lt;v-btn icon @click="toggleTheme">
        &lt;v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}&lt;/v-icon>
      &lt;/v-btn>
      &lt;v-btn text to="/tourist/search">
        &lt;v-icon left>mdi-magnify&lt;/v-icon>
        Search Tours
      &lt;/v-btn>
      &lt;v-btn text to="/guide/login" v-if="!isAuthenticated">
        Guide Login
      &lt;/v-btn>
    &lt;/v-app-bar>

    &lt;v-navigation-drawer v-model="drawer" app>
      &lt;v-list>
        &lt;v-list-item to="/" prepend-icon="mdi-home">
          &lt;v-list-item-title>Home&lt;/v-list-item-title>
        &lt;/v-list-item>
        &lt;v-list-item to="/tourist/tours" prepend-icon="mdi-map-marker">
          &lt;v-list-item-title>Tours&lt;/v-list-item-title>
        &lt;/v-list-item>
        &lt;v-list-item to="/tourist/guides" prepend-icon="mdi-account-group">
          &lt;v-list-item-title>Tour Guides&lt;/v-list-item-title>
        &lt;/v-list-item>
        &lt;v-list-item to="/tourist/packages" prepend-icon="mdi-package-variant">
          &lt;v-list-item-title>Packages&lt;/v-list-item-title>
        &lt;/v-list-item>
      &lt;/v-list>
    &lt;/v-navigation-drawer>

    &lt;v-main>
      &lt;v-container fluid>
        &lt;slot />
      &lt;/v-container>
    &lt;/v-main>

    &lt;v-footer app color="primary" dark>
      &lt;v-row justify="center" no-gutters>
        &lt;v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} — &lt;strong>Jet Set&lt;/strong>
        &lt;/v-col>
      &lt;/v-row>
    &lt;/v-footer>
  &lt;/v-app>
&lt;/template>

&lt;script setup lang="ts">
const { locale, setLocale } = useI18n()
const drawer = ref(false)
const isDark = ref(false)
const isAuthenticated = ref(false) // Will be connected to auth store later

const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'fa', name: 'فارسی' }
]

const switchLanguage = async (code: string) => {
  await setLocale(code)
}

const toggleTheme = () => {
  isDark.value = !isDark.value
}
&lt;/script>

&lt;style scoped>
.v-toolbar-title {
  cursor: pointer;
}
&lt;/style>
