import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'admin' | 'staff'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        // Mock successful login
        set({
          user: {
            id: '1',
            email,
            name: 'John Doe',
            role: 'admin',
          },
          isAuthenticated: true,
        })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      register: async (email: string, password: string, name: string, role: UserRole) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        // Mock successful registration
        set({
          user: {
            id: Math.random().toString(36).slice(2),
            email,
            name,
            role,
          },
          isAuthenticated: true,
        })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)