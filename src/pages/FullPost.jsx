import { useState, useEffect } from 'react'
import { hasSupabaseConfig, supabase } from '../client'
import FullCard from '../components/FullCard'
import { useParams } from 'react-router-dom'
import { getDemoPostById } from '../data/demoContent'
import '../App.css'

const FullPost = () => {
  const { id } = useParams()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      if (!hasSupabaseConfig || !supabase) {
        const demoPost = getDemoPostById(id)

        if (!demoPost) {
          setError('We could not find that post.')
        } else {
          setPost(demoPost)
        }
        setLoading(false)
        return
      }

      const { data, error: postError } = await supabase
        .from('post')
        .select('*')
        .eq('id', Number(id))
        .single()

      if (postError) {
        console.error('Error fetching post:', postError.message)
        setError('We could not find that post.')
        setLoading(false)
        return
      }

      const { data: userData, error: userError } = await supabase
        .from('user')
        .select('username, avatar_url')
        .eq('id', data.posted_by)
        .single()

      if (userError) {
        console.error('Error fetching username:', userError.message)
      }

      setPost({
        ...data,
        username: userData?.username || 'Unknown explorer',
        avatar_url: userData?.avatar_url,
      })
      setLoading(false)
    }

    fetchPost()
  }, [id])

  const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  if (loading) {
    return <div className='empty-state'><p>Loading post...</p></div>
  }

  if (error || !post) {
    return <div className='empty-state'><p>{error || 'Post not found.'}</p></div>
  }

  return (
    <section className='page-section'>
      <FullCard
        id={post.id}
        postedBy={post.posted_by}
        username={post.username}
        date={formatDate(post.created_at)}
        title={post.title}
        description={post.description}
        image={post.image}
        pearls={post.pearls}
        tags={post.tags}
        avatar_url={post.avatar_url}
      />
    </section>
  )
}

export default FullPost
