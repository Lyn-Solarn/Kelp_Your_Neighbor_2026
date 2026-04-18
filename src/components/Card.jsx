import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../App.css'
import { supabase } from '../client'
import More_Icon from '../assets/More_Icon.png'
import Profile_Pic from '../assets/Profile_Pic.png'
import Pearls_Icon from '../assets/Pearls_Icon.png'

const Card = (props) => {
    const [count, setCount] = useState(props.pearls)

    const updateCount = async (event) => {
        event.preventDefault();
    
        const { data, error } = await supabase
            .from('post')
            .update({ pearls: count + 1 })
            .eq('id', Number(props.id));

        if (error) {
            console.error('Failed to update pearls:', error.message);
            return;
        }
    
        setCount((count) => count + 1);
      }

    return (
        <div className='post'>
            <div className='top-post'>
                <div className='top-left'>
                    <img className='profile-photo'  src={Profile_Pic}/>
                    <div>
                        <p id='username'>{props.username}</p>
                        <p id='date'>{props.date}</p>
                    </div>
                </div>
                <Link to={'/edit/' + props.id}><img className='icon' src={More_Icon}/></Link>
            </div>
            
            <Link to={'/post/' + props.id}><h1 id='title'>{props.title}</h1></Link>
            
            <div className='post-stats'>
                <input type='image' className='icon' src={Pearls_Icon} onClick={updateCount} />
                <p className='stat'>{count} Pearls</p>
            </div>
        </div>
    )
}

export default Card