<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <v-card class="mb-4">
          <v-card-title>Filters</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="filters.search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="comfortable"
              hide-details
              class="mb-4"
            ></v-text-field>

            <v-select
              v-model="filters.city"
              :items="cities"
              label="City"
              variant="outlined"
              density="comfortable"
              hide-details
              class="mb-4"
            ></v-select>

            <v-select
              v-model="filters.category"
              :items="categories"
              label="Category"
              variant="outlined"
              density="comfortable"
              hide-details
              class="mb-4"
            ></v-select>

            <v-range-slider
              v-model="filters.priceRange"
              :min="0"
              :max="200"
              :step="10"
              label="Price Range (€)"
              thumb-label="always"
              class="mb-4"
            ></v-range-slider>

            <v-select
              v-model="filters.duration"
              :items="durations"
              label="Duration"
              variant="outlined"
              density="comfortable"
              hide-details
              class="mb-4"
            ></v-select>

            <v-select
              v-model="filters.rating"
              :items="ratings"
              label="Minimum Rating"
              variant="outlined"
              density="comfortable"
              hide-details
              class="mb-4"
            ></v-select>

            <v-btn
              color="primary"
              block
              @click="applyFilters"
            >
              Apply Filters
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-row>
          <v-col cols="12">
            <div class="d-flex align-center">
              <h1 class="text-h4">Search Results</h1>
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                :items="sortOptions"
                label="Sort by"
                hide-details
                density="comfortable"
                variant="outlined"
                style="max-width: 200px"
              ></v-select>
            </div>
          </v-col>

          <v-col
            v-for="tour in filteredTours"
            :key="tour.id"
            cols="12"
            sm="6"
            lg="4"
          >
            &lt;TourCard :tour="tour" />
          </v-col>

          <v-col v-if="filteredTours.length === 0" cols="12">
            <v-alert
              type="info"
              text="No tours found matching your criteria. Try adjusting your filters."
            ></v-alert>
          </v-col>
        </v-row>

        <v-row v-if="filteredTours.length > 0">
          <v-col cols="12" class="text-center">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              :total-visible="7"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Import the TourCard component
const TourCard = defineAsyncComponent(() => import('@/components/tourist/TourCard.vue'))

// Filter options
const cities = ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven']
const categories = ['Historical', 'Cultural', 'Food & Drinks', 'Nature', 'Adventure']
const durations = ['1-2 hours', '2-4 hours', '4-6 hours', '6+ hours']
const ratings = [
  { title: 'All Ratings', value: 0 },
  { title: '4+ Stars', value: 4 },
  { title: '4.5+ Stars', value: 4.5 }
]
const sortOptions = [
  { title: 'Price: Low to High', value: 'price_asc' },
  { title: 'Price: High to Low', value: 'price_desc' },
  { title: 'Rating: High to Low', value: 'rating_desc' },
  { title: 'Most Popular', value: 'popular' }
]

// State
const filters = ref({
  search: '',
  city: '',
  category: '',
  priceRange: [0, 200],
  duration: '',
  rating: 0
})
const sortBy = ref('popular')
const currentPage = ref(1)

// Mock data - Replace with API call
const tours = ref([
  {
    id: 1,
    name: 'Amsterdam Canal Tour',
    image: '/images/tours/canal-tour.jpg',
    rating: 4.8,
    reviewCount: 156,
    price: 45,
    duration: '2-4 hours',
    location: 'Amsterdam',
    category: 'Historical',
    description: 'Experience Amsterdam\'s beautiful canals with a local guide.'
  },
  {
    id: 2,
    name: 'Rotterdam Food Walk',
    image: '/images/tours/food-walk.jpg',
    rating: 4.9,
    reviewCount: 89,
    price: 65,
    duration: '4-6 hours',
    location: 'Rotterdam',
    category: 'Food & Drinks',
    description: 'Taste the best local dishes Rotterdam has to offer.'
  },
  // Add more mock tours as needed
])

// Computed properties
const filteredTours = computed(() => {
  let result = [...tours.value]

  // Apply filters
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase()
    result = result.filter(tour => 
      tour.name.toLowerCase().includes(searchTerm) ||
      tour.description.toLowerCase().includes(searchTerm)
    )
  }

  if (filters.value.city) {
    result = result.filter(tour => tour.location === filters.value.city)
  }

  if (filters.value.category) {
    result = result.filter(tour => tour.category === filters.value.category)
  }

  if (filters.value.rating) {
    result = result.filter(tour => tour.rating >= filters.value.rating)
  }

  result = result.filter(tour => 
    tour.price >= filters.value.priceRange[0] &&
    tour.price <= filters.value.priceRange[1]
  )

  if (filters.value.duration) {
    result = result.filter(tour => tour.duration === filters.value.duration)
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating_desc':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'popular':
      result.sort((a, b) => b.reviewCount - a.reviewCount)
      break
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredTours.value.length / 9))

// Methods
const applyFilters = () => {
  currentPage.value = 1
  // You can add additional logic here if needed
}

// Watch for route query changes
const route = useRoute()
onMounted(() => {
  if (route.query.q) {
    filters.value.search = route.query.q as string
  }
})
</script>
