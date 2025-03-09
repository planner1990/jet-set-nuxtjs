import { defineStore } from 'pinia'
import type { Tour } from '~/types/tour'

export interface Tour {
  id: string
  title: string
  description: string
  coverImage: string
  price: number
  duration: string
  location: string
  category: string
  maxGroupSize: number
  rating: number
  reviewCount: number
  guideId: string
  guideName: string
  guidePhoto: string
  languages: string[]
  included: string[]
  notIncluded: string[]
  meetingPoint: string
  availableDates: string[]
}

interface TourState {
  tours: Tour[]
  loading: boolean
  error: string | null
  filters: {
    category: string | null
    location: string | null
    priceRange: [number, number]
    date: string | null
  }
}

export const useTourStore = defineStore('tour', {
  state: (): TourState => ({
    tours: [],
    loading: false,
    error: null,
    filters: {
      category: null,
      location: null,
      priceRange: [0, 1000],
      date: null
    }
  }),

  getters: {
    getTourById: (state) => (id: string) => state.tours.find(tour => tour.id === id),
    filteredTours: (state: TourState) => {
      return state.tours.filter(tour => {
        const categoryMatch = !state.filters.category || tour.category === state.filters.category
        const locationMatch = !state.filters.location || tour.location === state.filters.location
        const priceMatch = tour.price >= state.filters.priceRange[0] && tour.price <= state.filters.priceRange[1]
        const dateMatch = !state.filters.date || tour.availableDates.includes(state.filters.date)
        
        return categoryMatch && locationMatch && priceMatch && dateMatch
      })
    },
    
    featuredTours: (state: TourState) => {
      return state.tours
        .filter(tour => tour.rating >= 4.5)
        .sort((a: Tour, b: Tour) => b.reviewCount - a.reviewCount)
        .slice(0, 6)
    }
  },

  actions: {
    async fetchTours() {
      this.loading = true
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/tours')
        const data = await response.json()
        this.tours = data
        this.error = null
      } catch (error) {
        this.error = 'Failed to fetch tours'
        console.error('Error fetching tours:', error)
      } finally {
        this.loading = false
      }
    },

    setFilters(filters: Partial<TourState['filters']>) {
      this.filters = { ...this.filters, ...filters }
    },

    resetFilters() {
      this.filters = {
        category: null,
        location: null,
        priceRange: [0, 1000],
        date: null
      }
    }
  }
})
