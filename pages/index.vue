<template>
  <div class="page-container">
    <!-- Header -->
    <TheHeader />

    <!-- Main Content -->
    <main>
      <HeroSection />
      <PopularDestinations />
      <TopExperiences />
      <RecentPackages />
      <BestSellingPackages />
    </main>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
// Import layout components
import TheHeader from '~/components/layout/TheHeader.vue'
import TheFooter from '~/components/layout/TheFooter.vue'

// Import home page components
import HeroSection from '~/components/home/HeroSection.vue'
import PopularDestinations from '~/components/home/PopularDestinations.vue'
import TopExperiences from '~/components/home/TopExperiences.vue'
import RecentPackages from '~/components/home/RecentPackages.vue'
import BestSellingPackages from '~/components/home/BestSellingPackages.vue'
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
