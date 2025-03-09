<template>
  <section class="recent-packages py-12 bg-grey-lighten-4">
    <v-container>
      <div class="d-flex align-center justify-space-between mb-8">
        <div>
          <h2 class="text-h4 font-weight-bold mb-2">{{ $t('sections.recent_packages') }}</h2>
          <p class="text-subtitle-1 text-medium-emphasis">{{ $t('sections.recent_packages_subtitle') }}</p>
        </div>
        <v-btn
          variant="outlined"
          color="primary"
          :to="$localePath('/tourist/packages')"
          class="hidden-sm-and-down"
        >
          {{ $t('common.view_all') }}
        </v-btn>
      </div>
      
      <v-row>
        <v-col
          v-for="travelPackage in recentPackages"
          :key="travelPackage.id"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card
            :to="travelPackage.link"
            class="package-card h-100 rounded-lg"
            elevation="1"
            hover
          >
            <v-img
              :src="travelPackage.image"
              :alt="travelPackage.name"
              height="280"
              cover
              class="package-image"
            >
              <div class="image-overlay d-flex flex-column justify-space-between pa-4">
                <div class="d-flex justify-space-between align-center">
                  <v-chip
                    v-if="travelPackage.discount"
                    color="error"
                    size="small"
                    class="font-weight-medium"
                  >
                    {{ travelPackage.discount }}% OFF
                  </v-chip>
                  <v-chip
                    color="primary"
                    size="small"
                    class="font-weight-medium"
                  >
                    {{ travelPackage.duration }}
                  </v-chip>
                </div>
                <div class="text-white">
                  <div class="text-h6 font-weight-bold text-truncate mb-1">
                    {{ travelPackage.name }}
                  </div>
                  <div class="d-flex align-center">
                    <v-icon color="amber" size="small" class="mr-1">mdi-map-marker</v-icon>
                    <span class="text-body-2">{{ travelPackage.location }}</span>
                  </div>
                </div>
              </div>
            </v-img>



            <v-card-text>
              <!-- Duration and Group Size -->
              <div class="d-flex align-center mb-2">
                <v-icon size="small" class="mr-1">mdi-clock-outline</v-icon>
                <span class="text-body-2 mr-4">{{ travelPackage.duration }}</span>
                <v-icon size="small" class="mr-1">mdi-account-group</v-icon>
                <span class="text-body-2">{{ travelPackage.groupSize }}</span>
              </div>

              <!-- Rating -->
              <div class="d-flex align-center mb-2">
                <v-rating
                  v-model="travelPackage.rating"
                  color="amber"
                  density="compact"
                  readonly
                  half-increments
                ></v-rating>
                <span class="text-body-2 ml-2">
                  {{ travelPackage.rating }} ({{ travelPackage.reviewCount }})
                </span>
              </div>

              <p class="text-body-2 mb-2">{{ travelPackage.description }}</p>

              <!-- Highlights -->
              <v-list density="compact" class="bg-transparent pa-0">
                <v-list-item
                  v-for="highlight in travelPackage.highlights"
                  :key="highlight"
                  class="px-0"
                >
                  <template v-slot:prepend>
                    <v-icon size="small" color="success">mdi-check</v-icon>
                  </template>
                  <v-list-item-title class="text-body-2">
                    {{ highlight }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>

              <!-- Price -->
              <div class="mt-3">
                <div class="d-flex align-center">
                  <span class="text-h6 font-weight-bold">€{{ travelPackage.price }}</span>
                  <span class="text-body-2 ml-2">per person</span>
                </div>
                <span v-if="travelPackage.originalPrice" class="text-decoration-line-through text-grey">
                  €{{ travelPackage.originalPrice }}
                </span>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                block
                color="primary"
                variant="tonal"
              >
                View Details
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
interface TravelPackage {
  id: number
  name: string
  image: string
  description: string
  duration: string
  groupSize: string
  rating: number
  reviewCount: number
  price: number
  originalPrice?: number
  discount?: number
  highlights: string[]
  link: string
  location: string
}

const recentPackages = ref<TravelPackage[]>([
  {
    id: 1,
    name: '3-Day Amsterdam Explorer',
    image: '/images/packages/amsterdam-explorer.jpg',
    location: 'Amsterdam, Netherlands',
    description: 'Experience the best of Amsterdam in 3 days',
    duration: '3 days',
    groupSize: 'Max 12 people',
    rating: 4.9,
    reviewCount: 128,
    price: 399,
    originalPrice: 449,
    discount: 10,
    highlights: [
      'Canal cruise with dinner',
      'Van Gogh Museum skip-the-line',
      'Bike tour with local guide',
      'Traditional Dutch dinner'
    ],
    link: '/tourist/packages/amsterdam-explorer'
  },
  {
    id: 2,
    name: 'Dutch Countryside Tour',
    image: '/images/packages/countryside-tour.jpg',
    location: 'Zaanse Schans, Netherlands',
    description: 'Discover the charm of Dutch villages',
    duration: '2 days',
    groupSize: 'Max 8 people',
    rating: 4.8,
    reviewCount: 96,
    price: 299,
    highlights: [
      'Zaanse Schans windmills',
      'Volendam fishing village',
      'Cheese tasting workshop',
      'Traditional accommodation'
    ],
    link: '/tourist/packages/countryside-tour'
  },
  {
    id: 3,
    name: 'Rotterdam Modern Architecture',
    image: '/images/packages/rotterdam-architecture.jpg',
    location: 'Rotterdam, Netherlands',
    description: 'Explore Rotterdam\'s iconic buildings',
    duration: '2 days',
    groupSize: 'Max 10 people',
    rating: 4.7,
    reviewCount: 84,
    price: 279,
    highlights: [
      'Cube Houses tour',
      'Market Hall visit',
      'Harbor boat tour',
      'Architectural workshop'
    ],
    link: '/tourist/packages/rotterdam-architecture'
  },
  {
    id: 4,
    name: 'Dutch Food & Culture',
    image: '/images/packages/food-culture.jpg',
    location: 'Amsterdam, Netherlands',
    description: 'Immerse yourself in Dutch cuisine',
    duration: '4 days',
    groupSize: 'Max 8 people',
    rating: 4.9,
    reviewCount: 156,
    price: 599,
    originalPrice: 699,
    discount: 15,
    highlights: [
      'Cooking workshop',
      'Market tours',
      'Restaurant tastings',
      'Food photography session'
    ],
    link: '/tourist/packages/food-culture'
  }
])
</script>

<style scoped>
.package-card {
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
}

:deep(.v-list-item) {
  min-height: 32px !important;
}
</style>
