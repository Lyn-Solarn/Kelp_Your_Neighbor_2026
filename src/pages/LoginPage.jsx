import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { hasSupabaseConfig } from '../client'
import '../App.css'

const LoginPage = () => {
  const { login, register, user, loading } = useLogin()
  const [username, setUsername] = useState('')
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      if (isRegistering) {
        await register(username.trim(), secret)
      } else {
        await login(username.trim(), secret)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className='empty-state'><p>Loading account access...</p></div>

  if (user) return <Navigate to='/profile' replace />

  return (
    <section className='auth-layout'>
      <div className='auth-panel'>
        <span className='eyebrow'>{isRegistering ? 'Create account' : 'Welcome back'}</span>
        <h1>{isRegistering ? 'Join the tidepool community' : 'Log in to post and comment'}</h1>
        <p className='section-copy'>
          This project still uses lightweight pseudo-auth. It is enough for prototyping, but not for production-grade
          account security.
        </p>

        {!hasSupabaseConfig && (
          <p className='helper-copy'>
            Live login is disabled until Supabase is configured. You can still review the updated interface in the{' '}
            <Link className='text-link' to='/demo'>demo preview</Link>.
          </p>
        )}

        <form className='auth-form' onSubmit={handleSubmit}>
          <input
            type='text'
            id='username-login'
            placeholder='Username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <input
            type='password'
            id='password-login'
            placeholder='Secret code'
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            required
          />
          {error && <p className='form-error'>{error}</p>}
          <button id='submit-button' type='submit' disabled={!hasSupabaseConfig}>
            {isRegistering ? 'Create Account' : 'Log In'}
          </button>
        </form>

        <p className='helper-copy'>
          {isRegistering ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button className='text-button' type='button' onClick={() => setIsRegistering((value) => !value)}>
            {isRegistering ? 'Switch to login' : 'Create one here'}
          </button>
        </p>
      </div>
    </section>
  )
}

export default LoginPage
