export interface User {
  id: string
  email: string
  name: string
  role: 'tourist' | 'guide'
  profileImage?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}
