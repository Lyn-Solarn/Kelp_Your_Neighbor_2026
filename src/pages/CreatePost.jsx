import { useEffect, useState } from 'react'
import { supabase } from '../client'
import { useLogin } from '../LoginContext.jsx'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const [post, setPost] = useState({ id: null, posted_by: '', title: '', description: '' , image: ''})
    const [isFormValid, setIsFormValid] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [charCount, setCharCount] = useState(0)

    const {user, loading} = useLogin()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login')
        }
    }, [user, loading, navigate])

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost((prev) => ({
            ...prev,
            [name]: value
        }))
        setError(null)
        
        if (name === 'description') {
            setCharCount(value.length)
        }
    }

    useEffect(() => {
        const isTitleValid = post.title.trim() !== ''
        setIsFormValid(isTitleValid)
    }, [post.title])

    const isValidUrl = (url) => {
        if (!url) return true // URL is optional
        try {
            new URL(url)
            return true
        } catch (err) {
            return false
        }
    }

    const createPost = async (event) => {
        event.preventDefault()
        setError(null)

        if (!user) {
            setError('You must be logged in to create a post.')
            navigate('/login')
            return
        }

        if (!post.title.trim()) {
            setError('Please enter a title for your post.')
            return
        }

        if (post.image && !isValidUrl(post.image)) {
            setError('Please enter a valid image URL (e.g., https://example.com/image.jpg)')
            return
        }

        setIsSubmitting(true)

        try {
            const {data, error} = await supabase
                .from('post')
                .insert({
                    posted_by: user.id,
                    title: post.title.trim(),
                    description: post.description.trim(),
                    image: post.image.trim()
                })
                .select()
                .single()

            if (error) {
                console.error('Supabase Insert Error: ', error.message)
                setError(`Failed to create post: ${error.message}`)
                setIsSubmitting(false)
                return
            }

            // Success - redirect to the new post
            window.location = `/post/${data.id}`
        } catch (err) {
            console.error('Unexpected error creating post:', err)
            setError('An unexpected error occurred while creating your post.')
            setIsSubmitting(false)
        }
    }

    if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading...</div>

    return (
        <div>
            <h1 id='post-a-slug'>Post a Slug</h1>
            {error && <div className='error-message' style={{ maxWidth: '600px', margin: '0 auto 1rem' }}>{error}</div>}
            
            <form onSubmit={createPost}>
                <input 
                    type='text'
                    id='title-input'
                    name='title'
                    placeholder='What did you find?'
                    value={post.title}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-label="Post title"
                    required
                />
                <div className='form-box'>
                    <textarea 
                        id='description' 
                        name='description' 
                        placeholder='Tell us more about your discovery...'
                        value={post.description} 
                        onChange={handleChange}
                        disabled={isSubmitting}
                        aria-label="Post description"
                        maxLength="2000"
                    />
                    <div style={{ fontSize: '0.9rem', color: '#518294', textAlign: 'right', marginTop: '0.5rem' }}>
                        {charCount}/2000
                    </div>
                    <input 
                        type='text'
                        id='url-input'
                        name='image'
                        placeholder='Image URL (optional - e.g., https://example.com/image.jpg)'
                        value={post.image}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        aria-label="Image URL"
                    />
                </div>
                <button 
                    type='submit' 
                    id='submit-button' 
                    disabled={!isFormValid || isSubmitting}
                    aria-label="Submit post"
                >
                    {isSubmitting ? 'Posting...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}

export default CreatePost