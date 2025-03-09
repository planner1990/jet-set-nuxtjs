<template>
  <section class="most-visited py-8 bg-grey-lighten-4">
    <v-container>
      <h2 class="text-h4 mb-6">{{ $t('sections.top_experiences') }}</h2>
      
      <v-row>
        <v-col
          v-for="activity in topActivities"
          :key="activity.id"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card
            :to="activity.link"
            class="activity-card h-100"
            elevation="2"
          >
            <v-img
              :src="activity.image"
              :alt="activity.name"
              height="200"
              cover
            >
              <!-- Price badge -->
              <v-chip
                color="primary"
                class="position-absolute ma-4"
                size="small"
              >
                from €{{ activity.price }}
              </v-chip>
            </v-img>

            <v-card-title class="text-truncate pt-4">
              {{ activity.name }}
            </v-card-title>

            <v-card-text>
              <div class="d-flex align-center mb-2">
                <v-rating
                  v-model="activity.rating"
                  color="amber"
                  density="compact"
                  readonly
                  half-increments
                ></v-rating>
                <span class="text-body-2 ml-2">
                  {{ activity.rating }} ({{ activity.reviewCount }})
                </span>
              </div>

              <p class="text-body-2 mb-2">{{ activity.description }}</p>

              <!-- Tags -->
              <div class="d-flex flex-wrap gap-1">
                <v-chip
                  v-for="tag in activity.tags"
                  :key="tag"
                  size="x-small"
                  variant="outlined"
                  class="mr-1 mb-1"
                >
                  {{ tag }}
                </v-chip>
              </div>

              <!-- Booking info -->
              <div class="mt-3 d-flex align-center">
                <v-icon size="small" color="success" class="mr-1">
                  mdi-check-circle
                </v-icon>
                <span class="text-caption text-success">
                  Reserve now, pay later
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- View all button -->
      <div class="text-center mt-6">
        <v-btn
          color="primary"
          variant="outlined"
          size="large"
          to="/tourist/activities"
        >
          View All Activities
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
interface Activity {
  id: number
  name: string
  image: string
  description: string
  rating: number
  reviewCount: number
  price: number
  tags: string[]
  link: string
}

const topActivities = ref<Activity[]>([
  {
    id: 1,
    name: 'Skip-the-Line: Van Gogh Museum',
    image: '/images/activities/van-gogh-museum.jpg',
    description: 'Explore the world\'s largest collection of Van Gogh artworks',
    rating: 4.8,
    reviewCount: 2345,
    price: 22,
    tags: ['Museums', 'Art', 'Skip-the-Line'],
    link: '/tourist/activities/van-gogh-museum'
  },
  {
    id: 2,
    name: 'Amsterdam: Evening Canal Cruise',
    image: '/images/activities/canal-cruise.jpg',
    description: 'See the city lights from Amsterdam\'s iconic canals',
    rating: 4.7,
    reviewCount: 1890,
    price: 19,
    tags: ['Evening Tour', 'Boat Tour', 'Drinks Included'],
    link: '/tourist/activities/evening-canal-cruise'
  },
  {
    id: 3,
    name: 'Zaanse Schans Windmills Tour',
    image: '/images/activities/windmills-tour.jpg',
    description: 'Visit traditional Dutch windmills and countryside',
    rating: 4.9,
    reviewCount: 1567,
    price: 45,
    tags: ['Day Trip', 'Cultural', 'Photography'],
    link: '/tourist/activities/windmills-tour'
  },
  {
    id: 4,
    name: 'Amsterdam Food Tour',
    image: '/images/activities/food-tour.jpg',
    description: 'Taste Dutch specialties in local favorite spots',
    rating: 4.8,
    reviewCount: 978,
    price: 65,
    tags: ['Food', 'Walking Tour', 'Small Group'],
    link: '/tourist/activities/food-tour'
  }
])
</script>

<style scoped>
.activity-card {
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
}

.gap-1 {
  gap: 4px;
}
</style>
