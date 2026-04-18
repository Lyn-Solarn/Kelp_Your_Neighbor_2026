import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPost } from '../mockData'
import '../../App.css'
import More_Icon from '../../assets/More_Icon.png'
import Profile_Pic from '../../assets/Profile_Pic.png'
import Pearls_Icon from '../../assets/Pearls_Icon.png'

const DemoFullPost = () => {
    const { id } = useParams()
    const post = getPost(Number(id))
    const [pearls, setPearls] = useState(post?.pearls || 0)
    const [comments, setComments] = useState(post?.comments || [])
    const [commentText, setCommentText] = useState('')

    const formatDate = (isoDate) => {
        const date = new Date(isoDate)
        return date.toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        })
    }

    const handlePearlClick = () => {
        setPearls(pearls + 1)
    }

    const handleAddComment = (e) => {
        e.preventDefault()
        if (!commentText.trim()) return

        const newComment = {
            id: Math.max(...comments.map(c => c.id), 0) + 1,
            posted_by: 1,
            username: 'MarinaExplorer',
            text: commentText,
            created_at: new Date().toISOString()
        }

        setComments([newComment, ...comments])
        setCommentText('')
    }

    if (!post) {
        return <div style={{ textAlign: 'center', padding: '3rem' }}>Post not found</div>
    }

    return (
        <div className='post'>
            <div className='top-post'>
                <Link to={`/profile/${post.posted_by}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img className='profile-photo' src={Profile_Pic} alt="Profile"/>
                    <div>
                        <p id='username' style={{ cursor: 'pointer' }}>{post.username}</p>
                        <p id='date'>{formatDate(post.created_at)}</p>
                    </div>
                </Link>
                <img className='icon' src={More_Icon} alt="Menu" title="Edit"/>
            </div>
            
            <h1 id='title-full'>{post.title}</h1>
            <p id='description-display'>{post.description}</p>
            {post.image && post.image.trim() !== '' && (
                <img className='post-image' src={post.image} alt={post.title}/>
            )}    
            
            <div className='post-stats'>
                <button 
                    onClick={handlePearlClick}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    title="Upvote"
                >
                    <img className='icon' src={Pearls_Icon} alt="Pearl"/>
                </button>
                <p className='stat'>{pearls} Pearls</p>
            </div>

            <div className='comment-inputs'>
                <form onSubmit={handleAddComment}>
                    <input 
                        type='text'
                        id='comment-input'
                        name='comment'
                        placeholder='Start a ripple...'
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button 
                        type='submit' 
                        id='comment-submit'
                        disabled={!commentText.trim()}
                    >
                        Start a Ripple
                    </button>
                </form>

                <div className='all-comments'>
                    {comments.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#518294' }}>No comments yet. Be the first!</p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment.id} className='comment'>
                                <p id='comment-username'>{comment.username}</p>
                                <p id='comment-date'>{formatDate(comment.created_at)}</p>
                                <p>{comment.text}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default DemoFullPost
