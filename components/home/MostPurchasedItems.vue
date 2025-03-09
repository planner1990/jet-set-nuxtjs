<template>
  <section class="most-purchased py-8">
    <v-container>
      <div class="d-flex align-center justify-space-between mb-6">
        <h2 class="text-h4">{{ $t('sections.popular_tours') }}</h2>
        <div class="scroll-buttons d-none d-md-flex">
          <v-btn
            icon="mdi-chevron-left"
            variant="outlined"
            class="mr-2"
            :disabled="atStart"
            @click="scrollLeft"
          ></v-btn>
          <v-btn
            icon="mdi-chevron-right"
            variant="outlined"
            :disabled="atEnd"
            @click="scrollRight"
          ></v-btn>
        </div>
      </div>

      <div class="scroll-container" ref="scrollContainer">
        <div class="scroll-content d-flex" :style="{ transform: `translateX(${scrollPosition}px)` }">
          <div
            v-for="tour in popularTours"
            :key="tour.id"
            class="tour-card flex-shrink-0 mr-4"
          >
            <v-card
              :to="tour.link"
              width="300"
              class="h-100"
              elevation="2"
            >
              <v-img
                :src="tour.image"
                :alt="tour.name"
                height="200"
                cover
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>

              <v-card-title class="text-truncate">{{ tour.name }}</v-card-title>
              
              <v-card-text>
                <div class="d-flex align-center mb-2">
                  <v-rating
                    v-model="tour.rating"
                    color="amber"
                    density="compact"
                    readonly
                    half-increments
                  ></v-rating>
                  <span class="text-body-2 ml-2">({{ tour.reviewCount }})</span>
                </div>
                <p class="text-body-2 mb-1">{{ tour.description }}</p>
                <v-chip
                  color="primary"
                  variant="outlined"
                  size="small"
                  class="mt-2"
                >
                  from €{{ tour.price }}
                </v-chip>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface PopularTour {
  id: number
  name: string
  image: string
  description: string
  rating: number
  reviewCount: number
  price: number
  link: string
}

const popularTours = ref<PopularTour[]>([
  {
    id: 1,
    name: 'Amsterdam Canal Cruise',
    image: '/images/tours/amsterdam-canal.jpg',
    description: 'Scenic evening cruise through historic canals',
    rating: 4.8,
    reviewCount: 1250,
    price: 25,
    link: '/tourist/tours/amsterdam-canal'
  },
  {
    id: 2,
    name: 'Paris Food Tour',
    image: '/images/tours/paris-food.jpg',
    description: 'Taste the best of French cuisine',
    rating: 4.9,
    reviewCount: 890,
    price: 85,
    link: '/tourist/tours/paris-food'
  },
  {
    id: 3,
    name: 'Rome Colosseum Skip-the-Line',
    image: '/images/tours/rome-colosseum.jpg',
    description: 'Priority access with expert guide',
    rating: 4.7,
    reviewCount: 2100,
    price: 45,
    link: '/tourist/tours/rome-colosseum'
  },
  {
    id: 4,
    name: 'Barcelona Sagrada Familia',
    image: '/images/tours/barcelona-sagrada.jpg',
    description: 'Guided tour of Gaudí\'s masterpiece',
    rating: 4.8,
    reviewCount: 1680,
    price: 55,
    link: '/tourist/tours/barcelona-sagrada'
  },
  {
    id: 5,
    name: 'London Eye Fast Track',
    image: '/images/tours/london-eye.jpg',
    description: 'Skip the queue at London\'s iconic wheel',
    rating: 4.6,
    reviewCount: 950,
    price: 35,
    link: '/tourist/tours/london-eye'
  },
  {
    id: 6,
    name: 'Venice Gondola Ride',
    image: '/images/tours/venice-gondola.jpg',
    description: 'Traditional gondola experience',
    rating: 4.7,
    reviewCount: 1450,
    price: 65,
    link: '/tourist/tours/venice-gondola'
  }
])

const scrollContainer = ref<HTMLElement | null>(null)
const scrollPosition = ref(0)
const atStart = ref(true)
const atEnd = ref(false)

const SCROLL_AMOUNT = 300

const updateScrollButtons = () => {
  if (!scrollContainer.value) return
  
  atStart.value = scrollPosition.value >= 0
  atEnd.value = Math.abs(scrollPosition.value) >= (scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth)
}

const scrollLeft = () => {
  scrollPosition.value = Math.min(0, scrollPosition.value + SCROLL_AMOUNT)
  updateScrollButtons()
}

const scrollRight = () => {
  if (!scrollContainer.value) return
  
  const maxScroll = -(scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth)
  scrollPosition.value = Math.max(maxScroll, scrollPosition.value - SCROLL_AMOUNT)
  updateScrollButtons()
}

// Handle window resize
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (scrollContainer.value) {
    resizeObserver = new ResizeObserver(() => {
      updateScrollButtons()
    })
    resizeObserver.observe(scrollContainer.value)
  }
  updateScrollButtons()
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<style scoped>
.scroll-container {
  overflow: hidden;
  position: relative;
}

.scroll-content {
  display: flex;
  transition: transform 0.3s ease;
}

.tour-card {
  width: 300px;
}

@media (max-width: 600px) {
  .tour-card {
    width: 260px;
  }
}
</style>
