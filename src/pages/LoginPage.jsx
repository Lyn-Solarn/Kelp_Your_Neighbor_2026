import { useState } from 'react'
import { useLogin } from '../LoginContext'
import '../App.css'

const LoginPage = () => {
    const { login, register, user, loading } = useLogin()
    const [username, setUsername] = useState('')
    const [secret, setSecret] = useState('')
    const [error, setError] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
        if (isRegistering) {
            await register(username, secret)
        } else {
            await login(username, secret)
        }
        } catch (err) {
            setError(err.message)
        }
    }

    if (loading) return <b>Loading...</b>

    if (user) return <b>Welcome, {user.username}!</b>

    return (
        <div className='login-page'>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id='username-login'
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id='password-login'
                    placeholder="Secret Code"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    required
                />
                <button id='submit-button' type="submit">
                    {isRegistering ? 'Register' : 'Login'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p style={{ marginTop: '1rem' }}>
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Login here' : 'Register here'}
                    </button>
                </p>
            </form>
        </div>
    )
}

export default LoginPage