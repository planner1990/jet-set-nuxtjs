<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="hero-section" flat>
          <v-img
            src="/images/netherlands-hero.jpg"
            height="400"
            class="align-center justify-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title class="text-white text-h2 text-center">
              Discover the Netherlands
            </v-card-title>
            <v-card-subtitle class="text-white text-h5 text-center mt-4">
              Connect with Local Tour Guides for Authentic Experiences
            </v-card-subtitle>
            <v-row justify="center" class="mt-8">
              <v-col cols="12" sm="8" md="6">
                <v-autocomplete
                  v-model="searchQuery"
                  :items="cities"
                  label="Search by city, activity, or category"
                  variant="solo"
                  hide-details
                  clearable
                  prepend-inner-icon="mdi-magnify"
                >
                  <template v-slot:append>
                    <v-btn
                      color="primary"
                      @click="handleSearch"
                    >
                      Search
                    </v-btn>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <h2 class="text-h4 mb-6">Popular Categories</h2>
        <v-row>
          <v-col
            v-for="category in categories"
            :key="category.id"
            cols="12"
            sm="6"
            md="3"
          >
            <v-card
              :to="'/tourist/tours?category=' + category.id"
              hover
            >
              <v-img
                :src="category.image"
                height="200"
                cover
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <v-card-title>{{ category.name }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <h2 class="text-h4 mb-6">Featured Tours</h2>
        <v-row>
          <v-col
            v-for="tour in featuredTours"
            :key="tour.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              :to="'/tourist/tours/' + tour.id"
              hover
            >
              <v-img
                :src="tour.image"
                height="200"
                cover
              ></v-img>
              <v-card-title>{{ tour.name }}</v-card-title>
              <v-card-subtitle>
                <v-icon small color="amber">mdi-star</v-icon>
                {{ tour.rating }} ({{ tour.reviewCount }} reviews)
              </v-card-subtitle>
              <v-card-text>
                <div class="text-subtitle-1">€{{ tour.price }} per person</div>
                <div class="text-body-2">{{ tour.duration }} • {{ tour.location }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#imports'

interface Category {
  id: string
  name: string
  image: string
}

interface Tour {
  id: number
  name: string
  image: string
  rating: number
  reviewCount: number
  price: number
  duration: string
  location: string
}

const searchQuery = ref('')
const router = useRouter()

const cities = [
  'Amsterdam',
  'Rotterdam',
  'The Hague',
  'Utrecht',
  'Eindhoven',
  'Groningen',
  'Tilburg',
  'Almere'
]

const categories = ref<Category[]>([
  {
    id: 'historical',
    name: 'Historical Tours',
    image: '/images/categories/historical.jpg'
  },
  {
    id: 'culinary',
    name: 'Food & Drinks',
    image: '/images/categories/culinary.jpg'
  },
  {
    id: 'nature',
    name: 'Nature & Adventure',
    image: '/images/categories/nature.jpg'
  },
  {
    id: 'cultural',
    name: 'Cultural Experience',
    image: '/images/categories/cultural.jpg'
  }
])

const featuredTours = ref<Tour[]>([
  {
    id: 1,
    name: 'Amsterdam Canal Tour',
    image: '/images/tours/canal-tour.jpg',
    rating: 4.8,
    reviewCount: 156,
    price: 45,
    duration: '2.5 hours',
    location: 'Amsterdam'
  },
  {
    id: 2,
    name: 'Rotterdam Food Walk',
    image: '/images/tours/food-walk.jpg',
    rating: 4.9,
    reviewCount: 89,
    price: 65,
    duration: '3 hours',
    location: 'Rotterdam'
  },
  {
    id: 3,
    name: 'Dutch Countryside Bike Tour',
    image: '/images/tours/bike-tour.jpg',
    rating: 4.7,
    reviewCount: 203,
    price: 55,
    duration: '4 hours',
    location: 'Amsterdam'
  }
])

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
  margin-top: -16px;
  margin-left: -16px;
  margin-right: -16px;
}
</style>
