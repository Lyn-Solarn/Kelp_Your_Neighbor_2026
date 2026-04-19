import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import PostModal from '../components/PostModal'
import Profile_Pic from '../assets/Profile_Pic.png'
import { hasSupabaseConfig, supabase } from '../client'
import {
  demoComments,
  demoPosts,
  demoProfilesByUsername,
  getDemoCommentsForPost,
} from '../data/demoContent'
import '../App.css'

const PublicProfilePage = () => {
  const { username } = useParams()
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [commentCount, setCommentCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true)
      setError('')

      if (!hasSupabaseConfig || !supabase) {
        const demoProfile = demoProfilesByUsername[username]

        if (!demoProfile) {
          setError('That explorer profile does not exist in the demo data yet.')
          setLoading(false)
          return
        }

        const demoUserPosts = demoPosts.filter((post) => post.username === username)
        const totalComments = Object.values(demoComments)
          .flat()
          .filter((comment) => comment.username === username).length

        setProfile(demoProfile)
        setPosts(demoUserPosts)
        setCommentCount(totalComments)
        setLoading(false)
        return
      }

      const { data: userData, error: userError } = await supabase
        .from('user')
        .select('id, username, created_at, avatar_url')
        .eq('username', username)
        .single()

      if (userError || !userData) {
        setError('We could not find that explorer.')
        setLoading(false)
        return
      }

      const { data: userPosts, error: postsError } = await supabase
        .from('post')
        .select('*')
        .eq('posted_by', userData.id)
        .order('created_at', { ascending: false })

      if (postsError) {
        console.error('Error fetching user posts:', postsError.message)
      }

      const { count, error: commentError } = await supabase
        .from('comment')
        .select('*', { count: 'exact', head: true })
        .eq('posted_by', userData.id)

      if (commentError) {
        console.error('Error counting comments:', commentError.message)
      }

      setProfile({
        ...userData,
        displayName: userData.username,
        location: 'Location not added yet',
        favoriteFind: 'Favorite find not added yet',
        bio: 'This explorer has not added a public bio yet.',
        joinedAt: userData.created_at,
        observations: (userPosts ?? []).length,
        species: 0,
        identifications: count ?? 0,
      })
      setPosts(
        (userPosts ?? []).map((post) => ({
          ...post,
          username: userData.username,
        }))
      )
      setCommentCount(count ?? 0)
      setLoading(false)
    }

    loadProfile()
  }, [username])

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

  const formatJoinedDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString(undefined, {
      dateStyle: 'long',
    })

  if (loading) {
    return <div className='empty-state'><p>Loading profile...</p></div>
  }

  if (error || !profile) {
    return (
      <section className='page-section'>
        <div className='empty-state'>
          <h1>Profile unavailable</h1>
          <p>{error || 'We could not load that explorer.'}</p>
          <Link className='primary-action' to='/demo'>Back to demo preview</Link>
        </div>
      </section>
    )
  }

  return (
    <section className='page-section'>
      <div className='profile-inat-header'>
        <div className='profile-identity-card'>
          {profile.avatar_url && (
            <img src={profile.avatar_url} alt={profile.username} style={{ width: '100px', height: '100px', borderRadius: '8px', marginBottom: '16px' }} />
          )}
          <span className='eyebrow'>Explorer profile</span>
          <h1>{profile.displayName}</h1>
          <p className='profile-handle'>@{profile.username}</p>
          <p className='section-copy'>{profile.bio}</p>
          <div className='profile-meta-list'>
            <span><strong>Location:</strong> {profile.location}</span>
            <span><strong>Favorite find:</strong> {profile.favoriteFind}</span>
            <span><strong>Joined:</strong> {formatJoinedDate(profile.joinedAt)}</span>
          </div>
        </div>

        <div className='profile-summary-panel'>
          <div className='profile-summary-grid'>
            <div className='profile-stat-card'>
              <span>Observations</span>
              <strong>{profile.observations ?? posts.length}</strong>
            </div>
            <div className='profile-stat-card'>
              <span>Species</span>
              <strong>{profile.species ?? 0}</strong>
            </div>
            <div className='profile-stat-card'>
              <span>Identifications</span>
              <strong>{profile.identifications ?? commentCount}</strong>
            </div>
            <div className='profile-stat-card'>
              <span>Comments</span>
              <strong>{commentCount}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className='profile-detail-grid inat-profile-grid'>
        <div className='profile-card'>
          <h2>About this explorer</h2>
          <p>{profile.bio}</p>
        </div>

        <div className='profile-card'>
          <h2>Contribution snapshot</h2>
          <p className='helper-copy'>
            This layout is an inference inspired by iNaturalist profiles: left-aligned identity, clear contribution counts,
            and recent activity modules.
          </p>
        </div>

        <div className='profile-card'>
          <h2>Recent observations</h2>
          <p className='helper-copy'>
            {hasSupabaseConfig
              ? 'Showing live posts from the connected database.'
              : 'Showing seeded mock posts for the design preview.'}
          </p>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className='post-list'>
          {posts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              postedBy={post.posted_by}
              username={post.username}
              date={formatDate(post.created_at)}
              title={post.title}
              description={post.description}
              pearls={post.pearls}
              tags={post.tags}
              image={post.image}
              avatar_url={profile.avatar_url}
              onOpenPost={() => setSelectedPost(post)}
            />
          ))}
        </div>
      ) : (
        <div className='empty-state'>
          <p>This explorer has not posted yet.</p>
        </div>
      )}

      <PostModal
        comments={
          selectedPost && !hasSupabaseConfig
            ? getDemoCommentsForPost(selectedPost.id)
            : undefined
        }
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </section>
  )
}

export default PublicProfilePage
