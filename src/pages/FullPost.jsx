import { useState, useEffect } from 'react'
import { supabase } from '../client'
import FullCard from '../components/FullCard'
import { useParams } from 'react-router-dom'
import '../App.css'

const FullPost = () => {
    const {id} = useParams()

    const [post, setPost] = useState({ 
        id: null, 
        posted_by: '',
        created_at: '',
        title: '', 
        description: '', 
        image: '',
        pearls: 0,
    })

    useEffect (() => {
        const fetchPost = async () => {
            const {data, error} = await supabase
                .from('post')
                .select('*')
                .eq('id', Number(id))
                .single()

            if (error) {
                console.error('Error Fetching Post: ', error.message)
            }

            const {data: userData, error: userError} = await supabase
                .from('user')
                .select('username')
                .eq('id', data.posted_by)
                .single()

            if (userError) {
                console.error('Error Fetching Username: ', userError.message)
            }

            setPost({
                ...data,
                username: userData?.username || 'Unknown'
            })
        }

        fetchPost()
    }, [id])

    // Fixing the format of the dates to be more readable
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    return (
        <FullCard
            id = {post.id}
            username = {post.username}
            date = {formatDate(post.created_at)}
            title = {post.title}
            description = {post.description}
            image = {post.image}
            pearls = {post.pearls}
        />
    )
}

export default FullPost