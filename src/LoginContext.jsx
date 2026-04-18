import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './client'

const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On startup, check if any user is marked as the current user
  useEffect(() => {
    const checkCurrentUser = async () => {
      const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('current_user', true)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error fetching current user:', error.message)
      } else {
        setUser(data ?? null)
      }

      setLoading(false)
    };

    checkCurrentUser()
  }, []);

  // Login using username + secret_code
  const login = async (username, secret_code) => {
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

    // Flip current_user = true
    const { error: updateError } = await supabase
      .from('user')
      .update({ current_user: true })
      .eq('id', data.id)

    if (updateError) {
      setLoading(false)
      throw updateError
    }

    setUser({ ...data, current_user: true })
    setLoading(false)
  };

  // Logout
  const logout = async () => {
    if (!user) return

    setLoading(true)

    const { error } = await supabase
      .from('user')
      .update({ current_user: false })
      .eq('id', user.id)

    if (error) {
      setLoading(false)
      throw error
    }

    setUser(null);
    setLoading(false)
  };

  //Create Account
  const register = async (username, secret_code) => {
    setLoading(true);

    // Check if username already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('user')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUser) {
      setLoading(false);
      throw new Error('Username already taken');
    }

    if (checkError && checkError.code !== 'PGRST116') {
      setLoading(false);
      throw checkError;
    }

    // Create new user
    const { data, error } = await supabase
      .from('user')
      .insert([{ username, secret_code, current_user: true }])
      .select()
      .single();

    if (error) {
      setLoading(false);
      throw error;
    }

    setUser(data);
    setLoading(false);
  };

  return (
    <LoginContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext)