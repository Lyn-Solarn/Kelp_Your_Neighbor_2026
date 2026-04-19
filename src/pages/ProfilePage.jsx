import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { hasSupabaseConfig } from '../client'
import { demoProfiles } from '../data/demoContent'
import '../App.css'

const ProfilePage = () => {
    const { user, logout, loading } = useLogin()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
        await logout()
        navigate('/login')
        } catch (err) {
        console.error('Logout error:', err.message)
        }
    }

    if (loading) return <div className='empty-state'><p>Loading profile...</p></div>

    if (!user) {
      return (
        <section className='page-section'>
          <div className='empty-state'>
            <h1>No active account session</h1>
            <p>
              {hasSupabaseConfig
                ? 'Log in to create posts, edit your own sightings, and join the conversation.'
                : 'Since the database is not connected yet, you can browse sample explorer profiles below.'}
            </p>
            <div className='profile-actions'>
              <Link className='primary-action' to='/login'>Go to login</Link>
              <Link className='secondary-action' to='/demo'>Open demo preview</Link>
            </div>
          </div>

          {!hasSupabaseConfig && (
            <div className='profile-directory'>
              {demoProfiles.map((profile) => (
                <Link key={profile.username} className='profile-directory-card' to={`/profiles/${profile.username}`}>
                  <span className='eyebrow'>Explorer</span>
                  <h2>{profile.displayName}</h2>
                  <p className='profile-handle'>@{profile.username}</p>
                  <p>{profile.location}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      )
    }

    if (!hasSupabaseConfig) {
      return (
        <section className='page-section'>
          <div className='profile-card'>
            <span className='eyebrow'>Account</span>
            <h1>{user.username}</h1>
            <p className='section-copy'>
              The database is still offline, so your personal public profile is not available yet. You can still browse the seeded
              explorer profiles to review the layout.
            </p>
            <div className='profile-actions'>
              <Link className='secondary-action' to='/demo'>Open demo preview</Link>
              <button onClick={handleLogout} type='button'>Log out</button>
            </div>
          </div>

          <div className='profile-directory'>
            {demoProfiles.map((profile) => (
              <Link key={profile.username} className='profile-directory-card' to={`/profiles/${profile.username}`}>
                <span className='eyebrow'>Explorer</span>
                <h2>{profile.displayName}</h2>
                <p className='profile-handle'>@{profile.username}</p>
                <p>{profile.location}</p>
              </Link>
            ))}
          </div>
        </section>
      )
    }

    return (
      <section className='page-section'>
        <div className='profile-card'>
          <span className='eyebrow'>Account</span>
          <h1>{user.username}</h1>
          <p className='section-copy'>
            This session is currently stored in local browser storage instead of a full authentication service.
          </p>
          <div className='profile-actions'>
            <Link className='secondary-action' to={`/profiles/${user.username}`}>View public profile</Link>
            <Link className='secondary-action' to='/newpost'>Create a post</Link>
            <button onClick={handleLogout} type='button'>Log out</button>
          </div>
        </div>
      </section>
    )
}

export default ProfilePage
