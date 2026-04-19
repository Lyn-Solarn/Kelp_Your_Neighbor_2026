import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { hasSupabaseConfig, supabase } from '../client'
import { useLogin } from '../hooks/useLogin'
import { demoTaxa } from '../data/demoContent'
import '../App.css'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, loading } = useLogin()

  const [post, setPost] = useState(null)
  const [unauthorized, setUnauthorized] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      if (!hasSupabaseConfig || !supabase) {
        setError('Add Supabase credentials before editing live posts.')
        return
      }

      const { data, error } = await supabase
        .from('post')
        .select('*')
        .eq('id', Number(id))
        .single()

      if (error) {
        console.error('Error fetching post:', error.message)
        return
      }

      if (!user || data.posted_by !== user.id) {
        setUnauthorized(true)
      } else {
        setPost({
          ...data,
          tags: Array.isArray(data.tags) ? data.tags : [],
        })
      }
    }

    if (!loading) {
      fetchPost()
    }
  }, [id, user, loading])

  const handleChange = (event) => {
    const { name, value } = event.target
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleTag = (slug) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.includes(slug)
        ? prev.tags.filter((tag) => tag !== slug)
        : [...prev.tags, slug],
    }))
  }

  const updatePost = async (event) => {
    event.preventDefault()
    if (!supabase) return

    setSubmitting(true)
    setError('')

    const { error } = await supabase
      .from('post')
      .update({
        title: post.title.trim(),
        description: post.description.trim(),
        image: post.image.trim(),
        tags: post.tags,
      })
      .eq('id', Number(id))

    if (error) {
      console.error('Error with update:', error.message)
      setError('Unable to save your changes right now.')
    } else {
      navigate(`/post/${id}`)
    }

    setSubmitting(false)
  }

  const deletePost = async (event) => {
    event.preventDefault()
    if (!supabase) return

    const { error } = await supabase.from('post').delete().eq('id', Number(id))

    if (error) {
      console.error('Error with delete:', error.message)
      setError('Unable to delete this post right now.')
    } else {
      navigate('/readposts')
    }
  }

  if (loading) return <div className='empty-state'><p>Loading editor...</p></div>
  if (unauthorized) return <div className='empty-state'><p>You do not have permission to edit this post.</p></div>
  if (!post) return null

  return (
    <section className='page-section'>
      <div className='section-heading'>
        <div>
          <span className='eyebrow'>Manage post</span>
          <h1>Edit your sighting</h1>
        </div>
      </div>

      <form className='entry-form' onSubmit={updatePost}>
        <input
          type='text'
          id='title-input'
          name='title'
          placeholder='Title'
          value={post.title}
          onChange={handleChange}
          required
        />
        <div className='form-box'>
          <label className='field-label' htmlFor='description'>Story or notes</label>
          <textarea
            id='description'
            name='description'
            value={post.description}
            onChange={handleChange}
          />
          <label className='field-label' htmlFor='url-input'>Image URL</label>
          <input
            type='url'
            id='url-input'
            name='image'
            placeholder='https://example.com/tidepool-photo.jpg'
            value={post.image || ''}
            onChange={handleChange}
          />

          <div>
            <label className='field-label'>Organism tags</label>
            <div className='tag-selector'>
              {demoTaxa.map((taxon) => (
                <label key={taxon.slug} className={`tag-option ${post.tags.includes(taxon.slug) ? 'selected' : ''}`}>
                  <input
                    checked={post.tags.includes(taxon.slug)}
                    onChange={() => toggleTag(taxon.slug)}
                    type='checkbox'
                  />
                  <span>{taxon.commonName}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {error && <p className='form-error'>{error}</p>}

        <div className='form-actions'>
          <button id='submit-button' type='submit' disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button id='delete-button' onClick={deletePost} type='button'>Delete Post</button>
        </div>
      </form>
    </section>
  )
}

export default EditPost
