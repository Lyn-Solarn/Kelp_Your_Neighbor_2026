import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { hasSupabaseConfig, supabase } from '../client'
import '../App.css'
import More_Icon from '../assets/More_Icon.png'
import Profile_Pic from '../assets/Profile_Pic.png'
import Pearls_Icon from '../assets/pearl.png'
import Comment from './Comment'
import { useLogin } from '../hooks/useLogin'
import { getDemoCommentsForPost } from '../data/demoContent'
import TagPill from './TagPill'

const FullCard = (props) => {
  const [count, setCount] = useState(props.pearls)
  const [comments, setComments] = useState([])
  const [commentInput, setCommentInput] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)

  const { user, loading } = useLogin()
  const navigate = useNavigate()

  const loadComments = useCallback(async () => {
    if (props.commentsOverride) {
      setComments(props.commentsOverride)
      return
    }

    if (!hasSupabaseConfig || !supabase) {
      setComments(getDemoCommentsForPost(props.id))
      return
    }

    const { data: commentsData, error } = await supabase
      .from('comment')
      .select('*')
      .eq('og_post', props.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching comments:', error.message)
      return
    }

    const uniqueUserIds = [...new Set(commentsData.map((comment) => comment.posted_by).filter(Boolean))]
    let userLookup = {}

    if (uniqueUserIds.length) {
      const { data: usersData, error: usersError } = await supabase
        .from('user')
        .select('id, username')
        .in('id', uniqueUserIds)

      if (usersError) {
        console.error('Error fetching usernames:', usersError.message)
        return
      }

      userLookup = Object.fromEntries(usersData.map((entry) => [entry.id, entry.username]))
    }

    const enrichedComments = commentsData.map((comment) => ({
      ...comment,
      username: userLookup[comment.posted_by] || 'Unknown explorer',
    }))

    setComments(enrichedComments)
  }, [props.commentsOverride, props.id])

  useEffect(() => {
    setCount(props.pearls)
    loadComments()
  }, [loadComments, props.pearls])

  const updateCount = async (event) => {
    event.preventDefault()
    if (!supabase) {
      setCount((current) => current + 1)
      return
    }

    const { error } = await supabase
      .from('post')
      .update({ pearls: count + 1 })
      .eq('id', Number(props.id))

    if (error) {
      console.error('Failed to update pearls:', error.message)
      return
    }

    setCount((current) => current + 1)
  }

  const createComment = async (event) => {
    event.preventDefault()

    if (!user && !loading) {
      navigate('/login')
      return
    }

    if (!commentInput.trim() || !supabase) return

    setSubmittingComment(true)
    const { error } = await supabase
      .from('comment')
      .insert({
        posted_by: user.id,
        og_post: props.id,
        text: commentInput.trim(),
      })

    if (error) {
      console.error('Failed to submit comment:', error.message)
      setSubmittingComment(false)
      return
    }

    setCommentInput('')
    await loadComments()
    setSubmittingComment(false)
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  return (
    <article className='post-card post-card-full'>
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

      <h1 className='post-title full'>{props.title}</h1>
      {props.tags?.length > 0 && (
        <div className='tag-row'>
          {props.tags.map((tag) => (
            <TagPill key={tag} slug={tag} />
          ))}
        </div>
      )}
      {props.description && <p className='post-description'>{props.description}</p>}
      {props.image && props.image.trim() !== '' && (
        <img className='post-image' src={props.image} alt={props.title} />
      )}

      <div className='post-stats'>
        <button className='icon-button' onClick={updateCount} type='button'>
          <img className='icon' src={Pearls_Icon} alt='' />
        </button>
        <p className='stat'>{count} Pearls</p>
      </div>

      <div className='comments-panel'>
        <div className='comments-header'>
          <h2>Ripples</h2>
          <p>Continue the conversation with the rest of the tidepool community.</p>
        </div>

        {hasSupabaseConfig ? (
          <form className='comment-form' onSubmit={createComment}>
            <input
              type='text'
              id='comment-input'
              name='comment'
              placeholder={user ? 'Add a thought to this sighting' : 'Log in to join the conversation'}
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
              disabled={!user || submittingComment}
              required
            />
            <button id='comment-submit' type='submit' disabled={!user || submittingComment}>
              {submittingComment ? 'Posting...' : 'Start a Ripple'}
            </button>
          </form>
        ) : (
          <p className='helper-copy'>Comments will be available once the database is connected.</p>
        )}

        <div className='comment-list'>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                username={comment.username}
                usernameLink={`/profiles/${comment.username}`}
                message={comment.text}
                date={formatDate(comment.created_at)}
              />
            ))
          ) : (
            <p className='helper-copy'>No ripples yet. Be the first to respond once the app is connected.</p>
          )}
        </div>
      </div>
    </article>
  )
}

export default FullCard
