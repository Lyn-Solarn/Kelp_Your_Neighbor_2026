import { Link } from 'react-router-dom'
import '../App.css'

const Comment = (props) => {
  return (
    <div className='comment'>
      <p className='comment-body'>
        {props.usernameLink ? (
          <Link className='username-link' to={props.usernameLink}>
            <strong>{props.username}</strong>
          </Link>
        ) : (
          <strong>{props.username}</strong>
        )}{' '}
        {props.message}
      </p>
      <p className='comment-date'>{props.date}</p>
    </div>
  )
}

export default Comment
