<template>
  <section class="top-experiences py-12">
    <v-container>
      <div class="d-flex align-center justify-space-between mb-8">
        <div>
          <h2 class="text-h4 font-weight-bold mb-2">{{ $t('sections.top_experiences') }}</h2>
          <p class="text-subtitle-1 text-medium-emphasis">{{ $t('sections.top_experiences_subtitle') }}</p>
        </div>
        <v-btn
          variant="outlined"
          color="primary"
          :to="$localePath('/tourist/experiences')"
          class="hidden-sm-and-down"
        >
          {{ $t('common.view_all') }}
        </v-btn>
      </div>

      <v-row>
        <v-col
          v-for="experience in topExperiences"
          :key="experience.id"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card
            :to="experience.link"
            class="experience-card h-100 rounded-lg"
            elevation="1"
            hover
          >
            <v-img
              :src="experience.image"
              :alt="experience.name"
              height="280"
              cover
              class="experience-image"
            >
              <div class="image-overlay d-flex flex-column justify-space-between pa-4">
                <div class="d-flex justify-space-between align-center">
                  <v-chip
                    v-if="experience.discount"
                    color="error"
                    size="small"
                    class="font-weight-medium"
                  >
                    {{ experience.discount }}% OFF
                  </v-chip>
                  <v-chip
                    color="success"
                    size="small"
                    class="font-weight-medium"
                  >
                    {{ experience.category }}
                  </v-chip>
                </div>
                <div class="text-white">
                  <div class="text-h6 font-weight-bold text-truncate mb-1">
                    {{ experience.name }}
                  </div>
                  <div class="d-flex align-center">
                    <v-icon color="amber" size="small" class="mr-1">mdi-map-marker</v-icon>
                    <span class="text-body-2">{{ experience.location }}</span>
                  </div>
                </div>
              </div>
            </v-img>

            <v-card-text>
              <div class="d-flex align-center mb-2">
                <v-rating
                  v-model="experience.rating"
                  color="amber"
                  density="compact"
                  readonly
                  half-increments
                ></v-rating>
                <span class="text-body-2 ml-2">
                  {{ experience.rating }} ({{ experience.reviewCount }})
                </span>
              </div>

              <p class="text-body-2 mb-4">{{ experience.description }}</p>

              <div class="d-flex align-center justify-space-between">
                <div>
                  <div class="text-h6 font-weight-bold">€{{ experience.price }}</div>
                  <span class="text-caption text-medium-emphasis">{{ $t('common.per_person') }}</span>
                </div>
                <v-btn
                  color="primary"
                  variant="tonal"
                  size="small"
                >
                  {{ $t('common.book_now') }}
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
interface Experience {
  id: number
  name: string
  image: string
  description: string
  category: string
  location: string
  rating: number
  reviewCount: number
  price: number
  discount?: number
  link: string
}

const topExperiences = ref<Experience[]>([
  {
    id: 1,
    name: 'Canal Tour & Wine Tasting',
    image: '/images/experiences/canal-wine-tasting.jpg',
    description: 'Explore Amsterdam\'s canals while enjoying local wines',
    category: 'Food & Drink',
    location: 'Amsterdam, Netherlands',
    rating: 4.9,
    reviewCount: 156,
    price: 89,
    link: '/tourist/experiences/canal-wine-tasting'
  },
  {
    id: 2,
    name: 'Bike Tour with Local Guide',
    image: '/images/experiences/bike-tour.jpg',
    description: 'Discover hidden gems of the city by bike',
    category: 'Adventure',
    location: 'Amsterdam, Netherlands',
    rating: 4.8,
    reviewCount: 124,
    price: 45,
    discount: 15,
    link: '/tourist/experiences/bike-tour'
  },
  {
    id: 3,
    name: 'Dutch Cheese Workshop',
    image: '/images/experiences/cheese-workshop.jpg',
    description: 'Learn to make traditional Dutch cheese',
    category: 'Workshop',
    location: 'Gouda, Netherlands',
    rating: 4.9,
    reviewCount: 98,
    price: 75,
    link: '/tourist/experiences/cheese-workshop'
  },
  {
    id: 4,
    name: 'Windmill Photography Tour',
    image: '/images/experiences/windmill-photo.jpg',
    description: 'Capture stunning photos of iconic windmills',
    category: 'Photography',
    location: 'Zaanse Schans, Netherlands',
    rating: 4.7,
    reviewCount: 86,
    price: 65,
    link: '/tourist/experiences/windmill-photography'
  }
])
</script>

<style scoped>
.experience-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--v-border-color), 0.1);
}

.experience-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
}

.experience-image {
  position: relative;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
}

.rating-chip {
  background: rgba(255, 255, 255, 0.9) !important;
}

.v-card-text {
  position: relative;
  z-index: 1;
}
</style>
