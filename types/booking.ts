export interface Booking {
  id: string
  tourId: string
  userId: string
  date: string
  numberOfPeople: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  paymentMethod: 'credit_card' | 'on_site' | null
  createdAt: string
  updatedAt: string
}

export interface BookingState {
  bookings: Booking[]
  currentBooking: Booking | null
  loading: boolean
  error: string | null
}

export interface CreateBookingData {
  tourId: string
  date: string
  numberOfPeople: number
  paymentMethod: 'credit_card' | 'on_site'
}
