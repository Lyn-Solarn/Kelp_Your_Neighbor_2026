import { useEffect, useState } from 'react'
import { hasSupabaseConfig, supabase } from '../client'
import { useLogin } from '../hooks/useLogin'
import { demoTaxa } from '../data/demoContent'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const [post, setPost] = useState({ title: '', description: '', image: '', tags: [] })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { user, loading } = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    if (hasSupabaseConfig && !loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

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

  const isFormValid = post.title.trim() !== ''

  const createPost = async (event) => {
    event.preventDefault()

    if (!hasSupabaseConfig || !supabase) {
      setError('Demo mode is enabled. The form is available for layout review, but publishing requires the database schema and auth setup.')
      return
    }

    if (!user) {
      setError('Please log in before creating a live post.')
      return
    }

    setSubmitting(true)
    setError('')

    const { data, error: insertError } = await supabase
      .from('post')
      .insert({
        posted_by: user.id,
        title: post.title.trim(),
        description: post.description.trim(),
        image: post.image.trim(),
        tags: post.tags,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Supabase insert error:', insertError.message)
      setError('Your post could not be created right now.')
      setSubmitting(false)
      return
    }

    navigate(`/post/${data.id}`)
  }

  return (
    <section className='page-section'>
      <div className='section-heading'>
        <div>
          <span className='eyebrow'>Create a post</span>
          <h1>Share a new sighting</h1>
        </div>
        <p className='section-copy'>A title is required. Description, image URL, and organism tags are optional.</p>
      </div>

      {!hasSupabaseConfig && (
        <div className='info-card'>
          <p className='helper-copy'>
            Demo mode is active, so this form is currently for preview only. Once Supabase is connected, the selected tags
            should be stored in a `tags` array column on the `post` table.
          </p>
        </div>
      )}

      <form className='entry-form' onSubmit={createPost}>
        <input
          type='text'
          id='title-input'
          name='title'
          placeholder='Give your sighting a short title'
          value={post.title}
          onChange={handleChange}
          required
        />

        <div className='form-box'>
          <label className='field-label' htmlFor='description'>Story or notes</label>
          <textarea
            id='description'
            name='description'
            placeholder='What did you find, where were you, and what do you want the community to weigh in on?'
            value={post.description}
            onChange={handleChange}
          />

          <label className='field-label' htmlFor='url-input'>Image URL</label>
          <input
            type='url'
            id='url-input'
            name='image'
            placeholder='https://example.com/tidepool-photo.jpg'
            value={post.image}
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

        <button id='submit-button' type='submit' disabled={!isFormValid || submitting}>
          {submitting ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </section>
  )
}

export default CreatePost
