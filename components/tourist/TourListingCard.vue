&lt;template>
  &lt;v-card class="tour-card" :to="`/tourist/tours/${tour.id}`">
    &lt;v-img
      :src="tour.coverImage"
      :alt="tour.title"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      cover
    >
      &lt;v-card-title class="text-white" v-text="tour.title" />
    &lt;/v-img>

    &lt;v-card-text>
      &lt;div class="d-flex align-center mb-2">
        &lt;v-rating
          :model-value="tour.rating"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        />
        &lt;span class="text-grey-darken-1 ms-2">({{ tour.reviewCount }})</span>
      &lt;/div>

      &lt;div class="d-flex align-center mb-2">
        &lt;v-icon size="small" class="me-1">mdi-map-marker&lt;/v-icon>
        &lt;span class="text-body-2">{{ tour.location }}&lt;/span>
      &lt;/div>

      &lt;div class="d-flex align-center mb-2">
        &lt;v-icon size="small" class="me-1">mdi-clock-outline&lt;/v-icon>
        &lt;span class="text-body-2">{{ tour.duration }}&lt;/span>
      &lt;/div>

      &lt;p class="text-body-2 text-grey-darken-1 mb-2">{{ tour.description }}&lt;/p>
    &lt;/v-card-text>

    &lt;v-card-actions>
      &lt;v-spacer />
      &lt;div class="text-h6 font-weight-bold">€{{ tour.price }}&lt;/div>
      &lt;v-btn
        color="primary"
        variant="tonal"
        :to="`/tourist/tours/${tour.id}`"
      >
        {{ $t('viewDetails') }}
      &lt;/v-btn>
    &lt;/v-card-actions>
  &lt;/v-card>
&lt;/template>

&lt;script setup lang="ts">
interface Tour {
  id: string
  title: string
  coverImage: string
  rating: number
  reviewCount: number
  location: string
  duration: string
  description: string
  price: number
}

defineProps&lt;{
  tour: Tour
}>()
&lt;/script>

&lt;style scoped>
.tour-card {
  transition: transform 0.2s;
}

.tour-card:hover {
  transform: translateY(-4px);
}
&lt;/style>
