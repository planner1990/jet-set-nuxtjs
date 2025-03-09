<template>
  <section class="popular-destinations py-12">
    <v-container>
      <div class="d-flex align-center justify-space-between mb-8">
        <div>
          <h2 class="text-h4 font-weight-bold mb-2">{{ $t('sections.popular_destinations') }}</h2>
          <p class="text-subtitle-1 text-medium-emphasis">{{ $t('sections.popular_destinations_subtitle') }}</p>
        </div>
        <v-btn
          variant="outlined"
          color="primary"
          :to="$localePath('/tourist/destinations')"
          class="hidden-sm-and-down"
        >
          {{ $t('common.view_all') }}
        </v-btn>
      </div>

      <v-row>
        <v-col cols="12" md="6">
          <v-card
            :to="destinations[0].link"
            class="destination-card h-100 rounded-lg"
            elevation="1"
            hover
          >
            <v-img
              :src="destinations[0].image"
              :alt="destinations[0].name"
              height="400"
              cover
              class="destination-image"
            >
              <div class="image-overlay d-flex flex-column justify-end pa-6">
                <div class="text-white">
                  <div class="text-h4 font-weight-bold mb-2">{{ destinations[0].name }}</div>
                  <div class="d-flex align-center mb-4">
                    <v-icon color="amber" size="small" class="mr-2">mdi-star</v-icon>
                    <span class="text-body-1">{{ destinations[0].rating }} ({{ destinations[0].reviewCount }})</span>
                    <v-divider vertical class="mx-3" color="white"></v-divider>
                    <span class="text-body-1">{{ destinations[0].tourCount }} {{ $t('common.tours') }}</span>
                  </div>
                  <p class="text-body-1 mb-4">{{ destinations[0].description }}</p>
                  <v-btn
                    color="primary"
                    variant="flat"
                    size="large"
                    block
                  >
                    {{ $t('common.explore_destination') }}
                  </v-btn>
                </div>
              </div>
            </v-img>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-row>
            <v-col
              v-for="destination in destinations.slice(1)"
              :key="destination.id"
              cols="12"
              sm="6"
            >
              <v-card
                :to="destination.link"
                class="destination-card h-100 rounded-lg"
                elevation="1"
                hover
              >
                <v-img
                  :src="destination.image"
                  :alt="destination.name"
                  height="190"
                  cover
                  class="destination-image"
                >
                  <div class="image-overlay d-flex flex-column justify-end pa-4">
                    <div class="text-white">
                      <div class="text-h6 font-weight-bold mb-1">{{ destination.name }}</div>
                      <div class="d-flex align-center">
                        <v-icon color="amber" size="small" class="mr-1">mdi-star</v-icon>
                        <span class="text-body-2">{{ destination.rating }}</span>
                        <span class="mx-1">•</span>
                        <span class="text-body-2">{{ destination.tourCount }} {{ $t('common.tours') }}</span>
                      </div>
                    </div>
                  </div>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
interface Destination {
  id: number
  name: string
  image: string
  description: string
  rating: number
  reviewCount: number
  tourCount: number
  link: string
}

const destinations = ref<Destination[]>([
  {
    id: 1,
    name: 'Amsterdam',
    image: '/images/destinations/amsterdam.jpg',
    description: 'Discover the charm of historic canals, world-class museums, and vibrant culture in the heart of the Netherlands.',
    rating: 4.9,
    reviewCount: 2456,
    tourCount: 124,
    link: '/tourist/destinations/amsterdam'
  },
  {
    id: 2,
    name: 'Rotterdam',
    image: '/images/destinations/rotterdam.jpg',
    description: 'Experience modern architecture and innovative design in this dynamic port city.',
    rating: 4.8,
    reviewCount: 1876,
    tourCount: 86,
    link: '/tourist/destinations/rotterdam'
  },
  {
    id: 3,
    name: 'The Hague',
    image: '/images/destinations/the-hague.jpg',
    description: 'Visit the seat of Dutch government and beautiful coastal resorts.',
    rating: 4.7,
    reviewCount: 1543,
    tourCount: 64,
    link: '/tourist/destinations/the-hague'
  },
  {
    id: 4,
    name: 'Utrecht',
    image: '/images/destinations/utrecht.jpg',
    description: 'Explore medieval architecture and lively canals in this historic university city.',
    rating: 4.8,
    reviewCount: 1234,
    tourCount: 52,
    link: '/tourist/destinations/utrecht'
  }
])
</script>

<style scoped>
.destination-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--v-border-color), 0.1);
}

.destination-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
}

.destination-image {
  position: relative;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8));
}

.v-card-text {
  position: relative;
  z-index: 1;
}
</style>
