import { useEffect, useState } from 'react'
import { hasSupabaseConfig, supabase } from './client'
import { LoginContext } from './context/login-context'
import {
  clearSessionUserId,
  getSessionUserId,
  saveSessionUserId,
} from './lib/session'

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkCurrentUser = async () => {
      if (!hasSupabaseConfig || !supabase) {
        setLoading(false)
        return
      }

      const userId = getSessionUserId()
      if (!userId) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching current user:', error.message)
        clearSessionUserId()
        setUser(null)
      } else {
        setUser(data ?? null)
      }

      setLoading(false)
    }

    checkCurrentUser()
  }, [])

  const login = async (username, secret_code) => {
    if (!hasSupabaseConfig || !supabase) {
      throw new Error('Supabase is not configured yet. Use the demo view or add your environment variables.')
    }

    setLoading(true)

    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('username', username)
      .eq('secret_code', secret_code)
      .single()

    if (error) {
      setLoading(false)
      throw new Error('Invalid credentials')
    }

    saveSessionUserId(data.id)
    setUser(data)
    setLoading(false)
  }

  const logout = async () => {
    clearSessionUserId()
    setUser(null)
    setLoading(false)
  }

  const register = async (username, secret_code) => {
    if (!hasSupabaseConfig || !supabase) {
      throw new Error('Supabase is not configured yet. Use the demo view or add your environment variables.')
    }

    setLoading(true)

    const { data: existingUser, error: checkError } = await supabase
      .from('user')
      .select('id')
      .eq('username', username)
      .maybeSingle()

    if (existingUser) {
      setLoading(false)
      throw new Error('Username already taken')
    }

    if (checkError && checkError.code !== 'PGRST116') {
      setLoading(false)
      throw checkError
    }

    const { data, error } = await supabase
      .from('user')
      .insert([{ username, secret_code }])
      .select()
      .single()

    if (error) {
      setLoading(false)
      throw error
    }

    saveSessionUserId(data.id)
    setUser(data)
    setLoading(false)
  }

  return (
    <LoginContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </LoginContext.Provider>
  )
}
