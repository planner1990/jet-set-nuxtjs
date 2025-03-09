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

export interface TourFilters {
  category: string | null
  location: string | null
  priceRange: [number, number]
  date: string | null
}

export interface TourState {
  tours: Tour[]
  loading: boolean
  error: string | null
  filters: TourFilters
}
