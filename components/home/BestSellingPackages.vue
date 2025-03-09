<template>
  <section class="best-selling py-12">
    <v-container>
      <div class="d-flex align-center justify-space-between mb-8">
        <div>
          <h2 class="text-h4 font-weight-bold mb-2">{{ $t('sections.best_selling') }}</h2>
          <p class="text-subtitle-1 text-medium-emphasis">{{ $t('sections.best_selling_subtitle') }}</p>
        </div>
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
            v-for="travelPackage in bestSellers"
            :key="travelPackage.id"
            class="package-card flex-shrink-0 mr-4"
          >
            <v-card
              :to="travelPackage.link"
              width="320"
              class="h-100"
              elevation="2"
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
                      color="success"
                      size="small"
                      class="font-weight-medium"
                    >
                      {{ $t('common.bestseller') }}
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

                <!-- Quick highlights -->
                <div class="d-flex flex-wrap gap-1 mb-3">
                  <v-chip
                    v-for="feature in travelPackage.features"
                    :key="feature"
                    size="x-small"
                    variant="outlined"
                    class="mr-1 mb-1"
                  >
                    {{ feature }}
                  </v-chip>
                </div>

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

                <!-- Booking info -->
                <div class="mt-3 d-flex align-center">
                  <v-icon size="small" color="success" class="mr-1">
                    mdi-check-circle
                  </v-icon>
                  <span class="text-caption text-success">
                    {{ travelPackage.bookingInfo }}
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
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface BestSellerPackage {
  id: number
  name: string
  image: string
  duration: string
  groupSize: string
  rating: number
  reviewCount: number
  price: number
  originalPrice?: number
  features: string[]
  bookingInfo: string
  link: string
  location: string
}

const bestSellers = ref<BestSellerPackage[]>([
  {
    id: 1,
    name: 'Ultimate Netherlands Tour',
    image: '/images/packages/ultimate-netherlands.jpg',
    location: 'Multiple Cities, Netherlands',
    duration: '7 days',
    groupSize: 'Max 15',
    rating: 4.9,
    reviewCount: 458,
    price: 1299,
    originalPrice: 1499,
    features: ['All-inclusive', 'Luxury Hotels', 'Private Guide', 'Skip-the-line'],
    bookingInfo: 'Free cancellation available',
    link: '/tourist/packages/ultimate-netherlands'
  },
  {
    id: 2,
    name: 'Amsterdam Weekend Escape',
    image: '/images/packages/weekend-escape.jpg',
    location: 'Amsterdam, Netherlands',
    duration: '3 days',
    groupSize: 'Max 10',
    rating: 4.8,
    reviewCount: 312,
    price: 499,
    features: ['Breakfast Included', 'Canal Cruise', 'Guided Tours'],
    bookingInfo: 'Reserve now, pay later',
    link: '/tourist/packages/weekend-escape'
  },
  {
    id: 3,
    name: 'Dutch Culture & Heritage',
    image: '/images/packages/culture-heritage.jpg',
    location: 'Utrecht & Delft, Netherlands',
    duration: '5 days',
    groupSize: 'Max 12',
    rating: 4.9,
    reviewCount: 286,
    price: 899,
    originalPrice: 999,
    features: ['Museum Pass', 'Traditional Stays', 'Local Experiences'],
    bookingInfo: 'Instant confirmation',
    link: '/tourist/packages/culture-heritage'
  },
  {
    id: 4,
    name: 'Tulip Season Special',
    image: '/images/packages/tulip-season.jpg',
    location: 'Lisse, Netherlands',
    duration: '4 days',
    groupSize: 'Max 8',
    rating: 4.7,
    reviewCount: 195,
    price: 799,
    features: ['Keukenhof Gardens', 'Flower Fields', 'Photography Tour'],
    bookingInfo: 'Limited availability',
    link: '/tourist/packages/tulip-season'
  },
  {
    id: 5,
    name: 'Rotterdam & The Hague',
    image: '/images/packages/rotterdam-hague.jpg',
    location: 'Rotterdam & The Hague, Netherlands',
    duration: '3 days',
    groupSize: 'Max 10',
    rating: 4.8,
    reviewCount: 234,
    price: 599,
    features: ['Modern Architecture', 'Political Tour', 'Harbor Cruise'],
    bookingInfo: 'Reserve now, pay later',
    link: '/tourist/packages/rotterdam-hague'
  },
  {
    id: 6,
    name: 'Dutch Food Journey',
    image: '/images/packages/food-journey.jpg',
    location: 'Multiple Cities, Netherlands',
    duration: '4 days',
    groupSize: 'Max 8',
    rating: 4.9,
    reviewCount: 167,
    price: 849,
    features: ['Cooking Classes', 'Market Tours', 'Restaurant Tastings'],
    bookingInfo: 'Instant confirmation',
    link: '/tourist/packages/food-journey'
  }
])

const scrollContainer = ref<HTMLElement | null>(null)
const scrollPosition = ref(0)
const atStart = ref(true)
const atEnd = ref(false)

const SCROLL_AMOUNT = 320 // Width of one card

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
.best-selling {
  background-color: rgb(var(--v-theme-surface));
}

.scroll-container {
  overflow: hidden;
  position: relative;
  margin: 0 -16px;
  padding: 16px;
}

.scroll-content {
  display: flex;
  transition: transform 0.3s ease;
}

.package-card {
  width: 320px;
  margin-right: 24px;
  transition: all 0.3s ease;
}

.package-card:hover {
  transform: translateY(-8px);
}

.v-card {
  border: 1px solid rgba(var(--v-border-color), 0.1);
  transition: box-shadow 0.3s ease;
}

.v-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
}

.package-image {
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

.gap-1 {
  gap: 4px;
}

@media (max-width: 600px) {
  .package-card {
    width: 280px;
    margin-right: 16px;
  }

  .scroll-container {
    margin: 0 -8px;
    padding: 8px;
  }
}
</style>
