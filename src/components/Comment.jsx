import '../App.css'
import { supabase } from '../client'

const Comment = (props) => {
    return (
        <div className='comment'>
            <p id='comment-username'><b>{props.username} - </b>{props.message}</p>
            <p id='comment-date'>{props.date}</p>
        </div>
    )
}

export default Comment