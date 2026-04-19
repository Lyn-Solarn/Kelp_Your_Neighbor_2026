import FullCard from './FullCard'
import '../App.css'

const PostModal = ({ post, comments, onClose }) => {
  if (!post) return null

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

  return (
    <div className='modal-backdrop' onClick={onClose} role='presentation'>
      <div className='modal-shell' onClick={(event) => event.stopPropagation()} role='dialog' aria-modal='true'>
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
          commentsOverride={comments}
        />
      </div>
    </div>
  )
}

export default PostModal
