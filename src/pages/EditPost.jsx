import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import { useLogin } from '../LoginContext'
import '../App.css'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, loading } = useLogin()

  const [post, setPost] = useState(null)
  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('post')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching post:', error.message)
        return
      }

      if (!user || data.posted_by !== user.id) {
        setUnauthorized(true)
      } else {
        setPost(data)
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

  const updatePost = async (event) => {
    event.preventDefault()

    const { error } = await supabase
      .from('post')
      .update({
        title: post.title,
        description: post.description,
        image: post.image
      })
      .eq('id', id)

    if (error) {
      console.error('Error with update:', error.message)
    } else {
      navigate(`/post/${id}`)
    }
  }

  const deletePost = async (event) => {
    event.preventDefault()

    const { error } = await supabase.from('post').delete().eq('id', id)

    if (error) {
      console.error('Error with delete:', error.message)
    } else {
      navigate('/readposts')
    }
  }

  if (loading) return <b>Loading...</b>
  if (unauthorized) return <b>You do not have permission to edit this post.</b>
  if (!post) return null

  return (
    <div>
        <form>
            <input 
                type='text'
                id='title-input'
                name='title'
                placeholder='Title'
                value={post.title}
                onChange={handleChange}
                required
            />
            <br/>
            <div className='form-box'>
                <textarea
                id='description'
                name='description'
                value={post.description}
                onChange={handleChange}
                required
                />
                <input 
                type='text'
                id='url-input'
                name='image'
                placeholder='+ Add Image URL'
                value={post.image || ''}
                onChange={handleChange}
                />
            </div>
            <input
                type='submit'
                id='submit-button'
                value='Update Post'
                onClick={updatePost}
            />
            <button id='delete-button' onClick={deletePost}>Delete</button>
        </form>
    </div>
  )
}

export default EditPost