&lt;template>
  &lt;v-card :to="'/tourist/tours/' + tour.id" hover>
    &lt;v-img
      :src="tour.image"
      height="200"
      cover
      :alt="tour.name"
    >
      &lt;template v-slot:placeholder>
        &lt;v-row class="fill-height ma-0" align="center" justify="center">
          &lt;v-progress-circular indeterminate color="primary">&lt;/v-progress-circular>
        &lt;/v-row>
      &lt;/template>
    &lt;/v-img>

    &lt;v-card-title>{{ tour.name }}&lt;/v-card-title>

    &lt;v-card-subtitle>
      &lt;div class="d-flex align-center">
        &lt;v-rating
          :model-value="tour.rating"
          color="amber"
          density="compact"
          size="small"
          readonly
          half-increments
        >&lt;/v-rating>
        &lt;span class="ml-2">({{ tour.reviewCount }})&lt;/span>
      &lt;/div>
    &lt;/v-card-subtitle>

    &lt;v-card-text>
      &lt;div class="d-flex justify-space-between align-center mb-2">
        &lt;div class="text-subtitle-1 font-weight-bold">€{{ tour.price }} per person&lt;/div>
        &lt;v-chip size="small" color="primary">{{ tour.category }}&lt;/v-chip>
      &lt;/div>
      
      &lt;div class="d-flex align-center text-body-2 text-medium-emphasis">
        &lt;v-icon size="small" class="mr-1">mdi-clock-outline&lt;/v-icon>
        {{ tour.duration }}
        &lt;v-icon size="small" class="mr-1 ml-3">mdi-map-marker&lt;/v-icon>
        {{ tour.location }}
      &lt;/div>

      &lt;div class="mt-2 text-truncate">{{ tour.description }}&lt;/div>
    &lt;/v-card-text>

    &lt;v-divider>&lt;/v-divider>

    &lt;v-card-actions>
      &lt;v-btn
        variant="text"
        color="primary"
        :to="'/tourist/tours/' + tour.id"
      >
        View Details
      &lt;/v-btn>
      &lt;v-spacer>&lt;/v-spacer>
      &lt;v-btn
        icon
        variant="text"
        @click.stop.prevent="toggleFavorite"
      >
        &lt;v-icon :color="isFavorite ? 'red' : undefined">
          {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
        &lt;/v-icon>
      &lt;/v-btn>
    &lt;/v-card-actions>
  &lt;/v-card>
&lt;/template>

&lt;script setup lang="ts">
interface Tour {
  id: number
  name: string
  image: string
  rating: number
  reviewCount: number
  price: number
  duration: string
  location: string
  category: string
  description: string
}

const props = defineProps&lt;{
  tour: Tour
}>()

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  // TODO: Implement favorite functionality with backend
}
&lt;/script>
