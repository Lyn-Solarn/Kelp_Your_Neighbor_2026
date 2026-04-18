import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import '../App.css';
import More_Icon from '../assets/More_Icon.png'
import Profile_Pic from '../assets/Profile_Pic.png'
import Pearls_Icon from '../assets/Pearls_Icon.png'
import Comment from './Comment';
import { useLogin } from '../LoginContext'

const FullCard = (props) => {
    const [count, setCount] = useState(props.pearls || 0)
    const [comments, setComments] = useState([])
    const [commentInput, setCommentInput] = useState({ id: null, posted_by: '',  og_post: '', text: ''})
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const {user, loading} = useLogin()
    const navigate = useNavigate()

    const loadComments = async () => {
        try {
            setError(null)
            const { data: commentsData, error } = await supabase
                .from('comment')
                .select('*')
                .eq('og_post', props.id)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching comments:', error.message)
                setError('Failed to load comments. Please try again.')
                return
            }

            const uniqueUserIds = [...new Set(commentsData.map(comment => comment.posted_by))]

            if (uniqueUserIds.length === 0) {
                setComments([])
                return
            }

            const { data: usersData, error: usersError } = await supabase
                .from('user')
                .select('id, username')
                .in('id', uniqueUserIds)

            if (usersError) {
                console.error('Error fetching usernames:', usersError.message)
                setError('Failed to load usernames.')
                return
            }

            const userLookup = {}
            usersData.forEach(user => {
                userLookup[user.id] = user.username
            });

            const enrichedComments = commentsData.map(comment => ({
                ...comment,
                username: userLookup[comment.posted_by] || 'Unknown'
            }));

            setComments(enrichedComments)
        } catch (err) {
            console.error('Unexpected error loading comments:', err)
            setError('An unexpected error occurred while loading comments.')
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        setCount(props.pearls || 0)
        loadComments()
    }, [props.id, props.pearls])

    const updateCount = async (event) => {
        event.preventDefault()
        try {
            const { error } = await supabase
                .from('post')
                .update({ pearls: count + 1 })
                .eq('id', Number(props.id))
        
            if (error) {
                console.error('Failed to Update Pearls: ', error.message)
                setError('Failed to update pearls. Please try again.')
                return
            }

            setCount((prevCount) => prevCount + 1)
        } catch (err) {
            console.error('Unexpected error updating pearls:', err)
            setError('An unexpected error occurred.')
        }
    }

    const handleChange = (event) => {
        setCommentInput({
            ...commentInput,
            text: event.target.value,
        })
        setError(null)
    }

    const createComment = async (event) => {
        event.preventDefault()

        if (!user && !loading) {
            navigate('/login')
            return
        }

        if (!commentInput.text.trim()) {
            setError('Please enter a comment.')
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            const { error } = await supabase
                .from('comment')
                .insert({
                    posted_by: user.id,
                    og_post: props.id,
                    text: commentInput.text
                })

            if (error) {
                console.error('Failed to Submit Comment: ', error.message)
                setError('Failed to post comment. Please try again.')
                return
            }

            setCommentInput({ id: null, posted_by: '', og_post: '', text: '' })
            await loadComments()
        } catch (err) {
            console.error('Unexpected error creating comment:', err)
            setError('An unexpected error occurred while posting your comment.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatDate = (isoDate) => {
        if (!isoDate) return 'Just now'
        const date = new Date(isoDate)
        return date.toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        })
    }

    return (
        <div className='post'>
            <div className='top-post'>
                <div className='top-left'>
                    <img className='profile-photo'  src={Profile_Pic} alt="Profile"/>
                    <div>
                        <p id='username'>{props.username}</p>
                        <p id='date'>{props.date}</p>
                    </div>
                </div>
                {user && user.id === props.posted_by && (
                    <Link to={'/edit/' + props.id}><img className='icon' src={More_Icon} alt="Edit"/></Link>
                )}
            </div>
            
            <h1 id='title-full'>{props.title}</h1>
            <p id='description-display'>{props.description}</p>
            {props.image && props.image.trim() !== '' && (
                <img className='post-image' src={props.image} alt={props.title}/>
            )}    
            
            <div className='post-stats'>
                <button 
                    onClick={updateCount}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    title="Add a pearl"
                    aria-label="Upvote with pearl"
                >
                    <img className='icon' src={Pearls_Icon} alt="Pearl icon" />
                </button>
                <p className='stat' aria-label={`${count} pearls`}>{count} Pearls</p>
            </div>

            <div className='comment-inputs'>
                {error && <div className='error-message'>{error}</div>}
                
                <form onSubmit={createComment}>
                    <input 
                        type='text'
                        id='comment-input'
                        name='comment'
                        placeholder='Start a ripple...'
                        value={commentInput.text}
                        onChange={handleChange}
                        disabled={isSubmitting || (!user && !loading)}
                        aria-label="Comment input"
                    />
                    <button 
                        type='submit' 
                        id='comment-submit' 
                        disabled={isSubmitting || !commentInput.text.trim()}
                        aria-label="Submit comment"
                    >
                        {isSubmitting ? 'Posting...' : 'Start a Ripple'}
                    </button>
                </form>

                <div className='all-comments'>
                    {isLoading ? (
                        <p style={{ textAlign: 'center', color: '#518294' }}>Loading comments...</p>
                    ) : comments.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#518294' }}>No comments yet. Be the first!</p>
                    ) : (
                        comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                username={comment.username}
                                message={comment.text}
                                date={formatDate(comment.created_at)}
                                postId={props.id}
                                currentUserId={user?.id}
                                onCommentDeleted={loadComments}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default FullCard