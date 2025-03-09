<template>
  <section class="hero-section">
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" md="6" class="hero-content pa-8">
          <div class="hero-text">
            <h1 class="text-h2 font-weight-bold mb-4">{{ t('hero.title') }}</h1>
            <p class="text-h6 mb-8">{{ t('hero.subtitle') }}</p>
          </div>

          <!-- Search Box -->
          <v-card class="search-card" elevation="3" max-width="600">
            <v-row no-gutters>
              <v-col cols="12">
                <v-autocomplete
                  v-model="searchQuery"
                  :items="searchSuggestions"
                  :loading="isLoading"
                  :placeholder="t('hero.search_placeholder')"
                  prepend-inner-icon="mdi-magnify"
                  hide-details
                  variant="solo"
                  class="search-input"
                >
                  <template v-slot:append>
                    <v-btn
                      color="primary"
                      size="large"
                      class="search-btn"
                      @click="handleSearch"
                    >
                      {{ t('hero.search_button') }}
                    </v-btn>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-card>

          <!-- Popular searches -->
          <div class="mt-6">
            <p class="text-subtitle-1 mb-2">{{ t('hero.popular_searches') }}</p>
            <div class="d-flex flex-wrap gap-2">
              <v-chip
                v-for="tag in popularSearches"
                :key="tag"
                variant="outlined"
                color="primary"
                @click="searchQuery = tag"
                class="mr-2 mb-2"
              >
                {{ tag }}
              </v-chip>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="hero-image-container">
          <v-img
            src="/images/hero/travel-collage.jpg"
            height="100%"
            cover
          >
            <!-- Decorative elements -->
            <div class="decorative-circle circle-1"></div>
            <div class="decorative-circle circle-2"></div>
          </v-img>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#imports'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const searchQuery = ref('')
const isLoading = ref(false)

const searchSuggestions = [
  'Paris, France',
  'Tokyo, Japan',
  'New York, USA',
  'Dubai, UAE',
  'London, UK',
  'Rome, Italy',
  'Barcelona, Spain',
  'Istanbul, Turkey'
]

const popularSearches = [
  'Beach Resorts',
  'City Breaks',
  'Adventure Tours',
  'Cultural Experiences',
  'Food & Wine',
  'Luxury Getaways'
]

const handleSearch = () => {
  if (searchQuery.value) {
    router.push({
      path: '/tourist/search',
      query: { q: searchQuery.value }
    })
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 600px;
  background-color: #f8f9fa;
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem !important;
}

.hero-text {
  max-width: 600px;
}

.hero-image-container {
  position: relative;
  min-height: 600px;
}

.search-card {
  border-radius: 16px;
  overflow: hidden;
  background: white;
}

.search-input {
  padding: 8px 16px;
}

.search-btn {
  margin: 8px;
  height: 48px !important;
}

:deep(.v-field__input) {
  padding: 16px !important;
  font-size: 1.1rem !important;
}

.decorative-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  right: 10%;
  background: rgba(var(--v-theme-primary), 0.1);
}

.circle-2 {
  width: 150px;
  height: 150px;
  bottom: 15%;
  left: 15%;
  background: rgba(var(--v-theme-secondary), 0.1);
}

.gap-2 {
  gap: 8px;
}
</style>
