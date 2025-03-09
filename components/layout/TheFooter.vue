<template>
  <v-footer
    class="bg-grey-darken-4"
  >
    <v-container>
      <v-row>
        <!-- Company Info -->
        <v-col cols="12" md="4" class="mb-6 mb-md-0">
          <div class="d-flex align-center mb-4">
            <v-img
              src="/images/logo-white.svg"
              alt="Jet Set"
              max-width="120"
              class="mr-4"
            />
          </div>
          <p class="text-body-2 text-grey-lighten-1 mb-4">
            Discover the Netherlands with local guides. Experience authentic Dutch culture,
            from historic cities to picturesque countryside.
          </p>
          <div class="d-flex align-center">
            <v-btn
              v-for="social in socials"
              :key="social.icon"
              :href="social.link"
              target="_blank"
              icon
              variant="text"
              color="grey-lighten-1"
              class="mr-2"
            >
              <v-icon>{{ social.icon }}</v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- Quick Links -->
        <v-col
          v-for="(section, index) in footerSections"
          :key="index"
          cols="12"
          sm="6"
          md="2"
          class="mb-6 mb-md-0"
        >
          <h3 class="text-h6 font-weight-medium text-white mb-4">
            {{ section.title }}
          </h3>
          <v-list
            class="bg-transparent pa-0"
            density="compact"
          >
            <v-list-item
              v-for="link in section.links"
              :key="link.text"
              :to="link.to"
              class="px-0"
              density="compact"
            >
              <v-list-item-title class="text-grey-lighten-1">
                {{ link.text }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Newsletter -->
        <v-col cols="12" md="4">
          <h3 class="text-h6 font-weight-medium text-white mb-4">
            Newsletter
          </h3>
          <p class="text-body-2 text-grey-lighten-1 mb-4">
            Subscribe to our newsletter and get exclusive offers on tours and activities.
          </p>
          <v-form @submit.prevent="subscribeNewsletter">
            <v-row no-gutters>
              <v-col cols="8">
                <v-text-field
                  v-model="email"
                  placeholder="Your email"
                  variant="outlined"
                  density="compact"
                  bg-color="grey-darken-3"
                  color="white"
                  hide-details
                />
              </v-col>
              <v-col cols="4">
                <v-btn
                  type="submit"
                  color="primary"
                  class="ml-2"
                  block
                >
                  Subscribe
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>

      <!-- Bottom Bar -->
      <v-divider
        class="my-6 border-opacity-25"
        color="white"
      />

      <v-row align="center">
        <v-col cols="12" md="6" class="text-center text-md-left">
          <div class="text-caption text-grey-lighten-1">
            © {{ new Date().getFullYear() }} Jet Set. All rights reserved.
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex flex-wrap justify-center justify-md-end">
            <v-btn
              v-for="link in legalLinks"
              :key="link.text"
              :to="link.to"
              variant="text"
              color="grey-lighten-1"
              size="small"
              class="text-caption mx-2"
            >
              {{ link.text }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')

const socials = [
  { icon: 'mdi-facebook', link: 'https://facebook.com' },
  { icon: 'mdi-twitter', link: 'https://twitter.com' },
  { icon: 'mdi-instagram', link: 'https://instagram.com' },
  { icon: 'mdi-linkedin', link: 'https://linkedin.com' }
]

const footerSections = [
  {
    title: 'Discover',
    links: [
      { text: 'Popular Tours', to: '/tourist/tours' },
      { text: 'Tour Guides', to: '/tourist/guides' },
      { text: 'Destinations', to: '/tourist/destinations' },
      { text: 'Seasonal Offers', to: '/tourist/offers' }
    ]
  },
  {
    title: 'Company',
    links: [
      { text: 'About Us', to: '/about' },
      { text: 'Careers', to: '/careers' },
      { text: 'Blog', to: '/blog' },
      { text: 'Contact', to: '/contact' }
    ]
  },
  {
    title: 'Support',
    links: [
      { text: 'Help Center', to: '/help' },
      { text: 'FAQs', to: '/faqs' },
      { text: 'Booking Guide', to: '/booking-guide' },
      { text: 'Cancellation Policy', to: '/cancellation-policy' }
    ]
  }
]

const legalLinks = [
  { text: 'Privacy Policy', to: '/privacy-policy' },
  { text: 'Terms of Service', to: '/terms-of-service' },
  { text: 'Cookie Policy', to: '/cookie-policy' }
]

const subscribeNewsletter = () => {
  // TODO: Implement newsletter subscription
  console.log('Newsletter subscription:', email.value)
  email.value = ''
}
</script>

<style scoped>
:deep(.v-list-item) {
  min-height: 32px !important;
}

:deep(.v-list-item__content) {
  padding: 4px 0;
}

:deep(.v-list-item-title) {
  transition: color 0.2s;
}

:deep(.v-list-item:hover .v-list-item-title) {
  color: white !important;
}
</style>
