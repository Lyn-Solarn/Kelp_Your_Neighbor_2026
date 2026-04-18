import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import { useLogin } from '../LoginContext';
import '../App.css'

const ProfilePage = () => {
    const { user, logout, loading } = useLogin()
    const navigate = useNavigate()
    const [userPosts, setUserPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalPearls, setTotalPearls] = useState(0)

    useEffect(() => {
        if (!loading && !user) {
        navigate('/login')
        }
    }, [user, loading, navigate])

    useEffect(() => {
        if (user) {
            fetchUserPosts()
        }
    }, [user])

    const fetchUserPosts = async () => {
        try {
            setError(null)
            const { data: posts, error } = await supabase
                .from('post')
                .select('*')
                .eq('posted_by', user.id)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching posts:', error.message)
                setError('Failed to load your posts.')
                return
            }

            setUserPosts(posts || [])

            // Calculate total pearls
            const total = (posts || []).reduce((sum, post) => sum + (post.pearls || 0), 0)
            setTotalPearls(total)
        } catch (err) {
            console.error('Unexpected error:', err)
            setError('An unexpected error occurred.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
        await logout();
        navigate('/login')
        } catch (err) {
        console.error('Logout error:', err.message)
        setError('Failed to logout. Please try again.')
        }
    };

    const formatDate = (isoDate) => {
        if (!isoDate) return 'Just now'
        const date = new Date(isoDate)
        return date.toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        })
    }

    if (loading) return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Loading profile...</p>

    if (!user) return null;

    return (
        <div className="profile-page">
            <h2>Welcome, {user.username}!</h2>
            
            {error && <div className='error-message'>{error}</div>}

            <div className='profile-stats'>
                <div className='profile-stat'>
                    <h3>{userPosts.length}</h3>
                    <p>Posts</p>
                </div>
                <div className='profile-stat'>
                    <h3>{totalPearls}</h3>
                    <p>Pearls Earned</p>
                </div>
            </div>

            <button onClick={handleLogout} style={{ marginTop: '1rem' }}>Logout</button>

            {isLoading ? (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p>Loading your posts...</p>
                </div>
            ) : (
                <div className='profile-posts'>
                    <h3>Your Recent Posts</h3>
                    {userPosts.length === 0 ? (
                        <p className='no-posts'>You haven't posted any slugs yet! <a href='/newpost' style={{ color: '#dea824', fontWeight: 'bold' }}>Create your first post</a></p>
                    ) : (
                        <div>
                            {userPosts.map((post) => (
                                <div key={post.id} className='post' style={{ marginTop: '1rem' }}>
                                    <div style={{ padding: '1rem' }}>
                                        <a href={`/post/${post.id}`} style={{ color: '#dea824', textDecoration: 'none' }}>
                                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#2e4556' }}>{post.title}</h3>
                                        </a>
                                        <p style={{ margin: '0.5rem 0', color: '#518294', fontSize: '0.9rem' }}>
                                            {formatDate(post.created_at)} • {post.pearls || 0} Pearls
                                        </p>
                                        {post.description && (
                                            <p style={{ margin: '0.75rem 0', color: '#2e4556', lineHeight: '1.5' }}>
                                                {post.description.substring(0, 150)}
                                                {post.description.length > 150 ? '...' : ''}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProfilePage