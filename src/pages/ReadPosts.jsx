import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Card from '../components/Card'
import '../App.css'

const ReadPosts = () => {
    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOption, setSortOption] = useState('Most Recent')

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('post')
                .select()
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error Fetching Posts: ', error.message)
                return
            }

            const postsAndUsernames = await Promise.all(
                data.map(async (post) => {
                    const { data: userData } = await supabase
                        .from('user')
                        .select('username')
                        .eq('id', post.posted_by)
                        .single()

                    return {
                        ...post,
                        username: userData?.username || 'Unknown',
                    }
                })
            )

            setPosts(postsAndUsernames)
        }

        fetchPosts()
    }, [])

    // Fixing the format of the dates to be more readable
    const formatDate = (isoDate) => {
        const date = new Date(isoDate)
        return date.toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        })
    }

    const filteredAndSortedPosts = [...posts]
        .filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortOption) {
                case 'Oldest':
                    return new Date(a.created_at) - new Date(b.created_at)
                case 'Most Pearls':
                    return b.pearls - a.pearls
                case 'Most Recent':
                default:
                    return new Date(b.created_at) - new Date(a.created_at)
            }
        })

    return (
        <div className='ReadPosts'>
            <div className="controls">
                <input
                    type="text"
                    id='searchbar'
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    id='sort-options'
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="sort-select"
                >
                    <option>Most Recent</option>
                    <option>Oldest</option>
                    <option>Most Pearls</option>
                </select>
            </div>

            {filteredAndSortedPosts.length > 0 ? (
                filteredAndSortedPosts.map((post) => (
                    <Card
                        key={post.id}
                        id={post.id}
                        username={post.username}
                        date={formatDate(post.created_at)}
                        title={post.title}
                        pearls={post.pearls}
                    />
                ))
            ) : (
                <h3>{'No Posts Yet...'}</h3>
            )}
        </div>
    )
}

export default ReadPosts