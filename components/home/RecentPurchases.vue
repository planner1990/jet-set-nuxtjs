<template>
  <section class="recent-purchases py-8">
    <v-container>
      <h2 class="text-h4 mb-6">{{ $t('sections.recent_adventures') }}</h2>
      <v-row>
        <v-col
          v-for="destination in recentDestinations"
          :key="destination.id"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card
            :to="destination.link"
            class="destination-card h-100"
            elevation="2"
          >
            <v-img
              :src="destination.image"
              :alt="destination.name"
              height="200"
              cover
              class="position-relative"
            >
              <!-- Gradient overlay -->
              <div class="img-overlay"></div>
              
              <!-- Location name -->
              <v-card-title class="text-white position-absolute bottom-0">
                {{ destination.name }}
              </v-card-title>
            </v-img>
            
            <v-card-text>
              <div class="d-flex align-center mb-2">
                <v-rating
                  v-model="destination.rating"
                  color="amber"
                  density="compact"
                  readonly
                  half-increments
                ></v-rating>
                <span class="text-body-2 ml-2">({{ destination.reviewCount }})</span>
              </div>
              <p class="text-subtitle-1 mb-1">{{ destination.description }}</p>
              <p class="text-caption text-grey">from €{{ destination.price }} per person</p>
            </v-card-text>
          </v-card>
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
  price: number
  link: string
}

const recentDestinations = ref<Destination[]>([
  {
    id: 1,
    name: 'Amalfi Coast, Italy',
    image: '/images/destinations/amalfi-coast.jpg',
    description: 'Scenic coastal tour with local cuisine',
    rating: 4.8,
    reviewCount: 324,
    price: 89,
    link: '/tourist/tours/amalfi-coast'
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    image: '/images/destinations/santorini.jpg',
    description: 'Sunset cruise and wine tasting',
    rating: 4.9,
    reviewCount: 512,
    price: 120,
    link: '/tourist/tours/santorini'
  },
  {
    id: 3,
    name: 'French Riviera',
    image: '/images/destinations/french-riviera.jpg',
    description: 'Luxury yacht experience',
    rating: 4.7,
    reviewCount: 289,
    price: 150,
    link: '/tourist/tours/french-riviera'
  },
  {
    id: 4,
    name: 'Croatian Islands',
    image: '/images/destinations/croatian-islands.jpg',
    description: 'Island hopping adventure',
    rating: 4.6,
    reviewCount: 178,
    price: 95,
    link: '/tourist/tours/croatian-islands'
  }
])
</script>

<style scoped>
.destination-card {
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }
}

.img-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
}
</style>
