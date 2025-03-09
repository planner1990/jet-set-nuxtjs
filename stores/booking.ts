import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import type { Booking, CreateBookingData } from '~/types/booking'

export const useBookingStore = defineStore('booking', () => {
  const bookings = ref<Booking[]>([])
  const currentBooking = ref<Booking | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const authStore = useAuthStore()

  const userBookings = computed(() => {
    return bookings.value.filter(booking => booking.userId === authStore.user?.id)
  })

  const activeBookings = computed(() => {
    return userBookings.value.filter(booking => booking.status !== 'cancelled')
  })

  const pastBookings = computed(() => {
    return userBookings.value.filter(booking => booking.status === 'completed')
  })

  async function fetchBookings(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch bookings')
      }

      const data = await response.json()
      bookings.value = data.bookings
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch bookings'
      console.error('Fetch bookings error:', err)
    } finally {
      loading.value = false
    }
  }

  async function createBooking(bookingData: CreateBookingData): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.token}`
        },
        body: JSON.stringify(bookingData)
      })

      if (!response.ok) {
        throw new Error('Failed to create booking')
      }

      const data = await response.json()
      bookings.value.push(data.booking)
      currentBooking.value = data.booking

      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to create booking'
      console.error('Create booking error:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  async function cancelBooking(bookingId: string): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to cancel booking')
      }

      const index = bookings.value.findIndex(b => b.id === bookingId)
      if (index !== -1) {
        bookings.value[index].status = 'cancelled'
      }

      if (currentBooking.value?.id === bookingId) {
        currentBooking.value.status = 'cancelled'
      }

      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to cancel booking'
      console.error('Cancel booking error:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    bookings,
    currentBooking,
    loading,
    error,
    // Getters
    userBookings,
    activeBookings,
    pastBookings,
    // Actions
    fetchBookings,
    createBooking,
    cancelBooking
  }
}, {
  persist: true
})
