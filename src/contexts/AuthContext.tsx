import React, { createContext, useContext, useState, useEffect } from 'react'
import Api, { setAccessToken, loginApi } from '../api/client'

interface User {
  userId: number
  username: string
  fullName: string
  role: string
  token?: string
  refreshToken?: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const savedAuth = localStorage.getItem('pos_auth')
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth)
        setUser(parsed.user)
        setIsAuthenticated(true)
        setAccessToken(parsed.token)
      } catch {}
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await loginApi({ username, password })
      if (res.token) {
        setAccessToken(res.token)
        const u: User = {
          userId: res.user?.id || 0,
            username: res.user?.username || username,
            fullName: res.user?.fullName || username,
            role: res.user?.role || 'User',
            token: res.token,
            refreshToken: res.refreshToken
        }
        setUser(u)
        setIsAuthenticated(true)
        localStorage.setItem('pos_auth', JSON.stringify({ token: res.token, refreshToken: res.refreshToken, user: u }))
        return true
      }
      return false
    } catch (e) {
      console.error('Login failed', e)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('pos_auth')
    setAccessToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}