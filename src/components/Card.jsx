import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../App.css'
import { supabase } from '../client'
import More_Icon from '../assets/More_Icon.png'
import Profile_Pic from '../assets/Profile_Pic.png'
import Pearls_Icon from '../assets/pearl.svg'
import { useLogin } from '../hooks/useLogin'
import TagPill from './TagPill'

const Card = (props) => {
  const [count, setCount] = useState(props.pearls)
  const [updating, setUpdating] = useState(false)
  const { user } = useLogin()

  const openPost = () => {
    if (props.onOpenPost) {
      props.onOpenPost()
    }
  }

  const updateCount = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (updating) return

    if (!supabase) {
      setCount((current) => current + 1)
      return
    }

    setUpdating(true)
    const { error } = await supabase
      .from('post')
      .update({ pearls: count + 1 })
      .eq('id', Number(props.id))

    if (error) {
      console.error('Failed to update pearls:', error.message)
    } else {
      setCount((current) => current + 1)
    }

    setUpdating(false)
  }

  return (
    <article className='post-card'>
      <div className='post-card-top'>
        <div className='post-meta'>
          <img className='profile-photo' src={Profile_Pic} alt='' />
          <div>
            <Link className='username-link' to={`/profiles/${props.username}`}>
              <p className='username'>{props.username}</p>
            </Link>
            <p className='post-date'>{props.date}</p>
          </div>
        </div>

        {user?.id === props.postedBy && (
          <Link aria-label='Edit post' className='icon-button' to={`/edit/${props.id}`}>
            <img className='icon' src={More_Icon} alt='' />
          </Link>
        )}
      </div>

      {props.tags?.length > 0 && (
        <div className='tag-row'>
          {props.tags.map((tag) => (
            <TagPill key={tag} slug={tag} />
          ))}
        </div>
      )}

      {props.onOpenPost ? (
        <button className='post-open-button' onClick={openPost} type='button'>
          <h2 className='post-title'>{props.title}</h2>
          {props.description && <p className='post-preview'>{props.description}</p>}
        </button>
      ) : (
        <Link className='post-title-link' to={`/post/${props.id}`}>
          <h2 className='post-title'>{props.title}</h2>
        </Link>
      )}

      {props.image && (
        <button className='post-image-button' onClick={openPost} type='button'>
          <img className='post-image card-image' src={props.image} alt={props.title} />
        </button>
      )}

      <div className='post-stats'>
        <button className='icon-button' onClick={updateCount} type='button'>
          <img className='icon' src={Pearls_Icon} alt='' />
        </button>
        <p className='stat'>{count} Pearls</p>
      </div>
    </article>
  )
}

export default Card
