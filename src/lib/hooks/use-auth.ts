import { create } from 'zustand'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (userData: {
    fullName: string
    email: string
    phone: string
    password: string
  }) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      // Add your API call here
      // Example:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // })
      // const data = await response.json()
      
      // For now, using mock data
      const mockUser = {
        id: '1',
        email,
        name: 'Test User',
      }
      
      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      console.error('Login failed:', error)
      set({ isLoading: false })
      throw error
    }
  },

  signup: async (userData) => {
    set({ isLoading: true })
    try {
      // Add your API call here
      // Example:
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // })
      // const data = await response.json()
      
      set({ isLoading: false })
    } catch (error) {
      console.error('Signup failed:', error)
      set({ isLoading: false })
      throw error
    }
  },

  logout: () => {
    // Add your logout logic here
    set({
      user: null,
      isAuthenticated: false,
    })
  },
}))