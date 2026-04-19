import { useEffect, useMemo, useState } from 'react'
import { hasSupabaseConfig, supabase } from '../client'
import Card from './Card'
import PostModal from './PostModal'
import {
  demoPosts,
  getDemoCommentsForPost,
} from '../data/demoContent'

const PostFeed = ({
  eyebrow = 'Community feed',
  title = 'Recent sightings and questions',
  description = 'Search by title, sort by freshness or popularity, and jump into any thread.',
  initialPosts = null,
  emptyTitle = 'No matching posts yet.',
  emptyCopy = 'Try another search term or adjust your filters.',
}) => {
  const [posts, setPosts] = useState(initialPosts ?? [])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('Most Recent')
  const [loading, setLoading] = useState(initialPosts ? false : true)
  const [error, setError] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts)
      setLoading(false)
      return
    }

    const fetchPosts = async () => {
      if (!hasSupabaseConfig || !supabase) {
        setPosts(demoPosts)
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      const { data, error: postError } = await supabase
        .from('post')
        .select('*')
        .order('created_at', { ascending: false })

      if (postError) {
        console.error('Error fetching posts:', postError.message)
        setError('Unable to load the community feed right now.')
        setLoading(false)
        return
      }

      const userIds = [...new Set(data.map((post) => post.posted_by).filter(Boolean))]
      let usersById = {}

      if (userIds.length) {
        const { data: usersData, error: userError } = await supabase
          .from('user')
          .select('id, username, avatar_url')
          .in('id', userIds)

        if (userError) {
          console.error('Error fetching usernames:', userError.message)
        } else {
          usersById = Object.fromEntries(usersData.map((entry) => [entry.id, entry]))
        }
      }

      setPosts(
        data.map((post) => ({
          ...post,
          username: usersById[post.posted_by]?.username || 'Unknown explorer',
          avatar_url: usersById[post.posted_by]?.avatar_url,
          tags: Array.isArray(post.tags) ? post.tags : [],
        }))
      )
      setLoading(false)
    }

    fetchPosts()
  }, [initialPosts])

  const filteredAndSortedPosts = useMemo(() => {
    const loweredSearch = searchTerm.toLowerCase()

    return [...posts]
      .filter((post) => {
        const tags = (post.tags ?? []).join(' ').toLowerCase()
        return (
          post.title.toLowerCase().includes(loweredSearch) ||
          post.username.toLowerCase().includes(loweredSearch) ||
          tags.includes(loweredSearch)
        )
      })
      .sort((a, b) => {
        switch (sortOption) {
          case 'Oldest':
            return new Date(a.created_at) - new Date(b.created_at)
          case 'Most Pearls':
            return b.pearls - a.pearls
          case 'Most Recent':
          default:
            return new Date(b.created_at) - new Date(a.created_at)
        }
      })
  }, [posts, searchTerm, sortOption])

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

  return (
    <section className='page-section'>
      <div className='section-heading'>
        <div>
          <span className='eyebrow'>{eyebrow}</span>
          <h1>{title}</h1>
        </div>
        <p className='section-copy'>{description}</p>
      </div>

      <div className='controls'>
        <input
          type='text'
          id='searchbar'
          placeholder='Search posts, tags, or explorers'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <select
          id='sort-options'
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
        >
          <option>Most Recent</option>
          <option>Oldest</option>
          <option>Most Pearls</option>
        </select>
      </div>

      {loading && <div className='empty-state'><p>Loading posts...</p></div>}
      {error && !loading && <div className='empty-state'><p>{error}</p></div>}

      {!loading && !error && filteredAndSortedPosts.length > 0 && (
        <div className='post-list'>
          {filteredAndSortedPosts.map((post) => (
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
              avatar_url={post.avatar_url}
              onOpenPost={() => setSelectedPost(post)}
            />
          ))}
        </div>
      )}

      {!loading && !error && filteredAndSortedPosts.length === 0 && (
        <div className='empty-state'>
          <h2>{emptyTitle}</h2>
          <p>{emptyCopy}</p>
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

export default PostFeed
