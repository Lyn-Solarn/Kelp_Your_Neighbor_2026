import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts, searchPosts, sortPosts } from '../mockData'
import '../../App.css'
import More_Icon from '../../assets/More_Icon.png'
import Profile_Pic from '../../assets/Profile_Pic.png'
import Pearls_Icon from '../../assets/Pearls_Icon.png'

const DemoReadPosts = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOption, setSortOption] = useState('Most Recent')
    const [pearlCounts, setPearlCounts] = useState({})

    const allPosts = getAllPosts()
    const searched = searchPosts(searchTerm)
    const filteredAndSortedPosts = sortPosts(searched, sortOption)

    const formatDate = (isoDate) => {
        const date = new Date(isoDate)
        return date.toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        })
    }

    const handlePearlClick = (postId, currentPearls) => {
        setPearlCounts(prev => ({
            ...prev,
            [postId]: (prev[postId] || currentPearls) + 1
        }))
    }

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
                    <div key={post.id} className='post'>
                        <div className='top-post'>
                            <Link to={`/profile/${post.posted_by}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <img className='profile-photo'  src={Profile_Pic} alt="Profile"/>
                                <div>
                                    <p id='username' style={{ cursor: 'pointer' }}>{post.username}</p>
                                    <p id='date'>{formatDate(post.created_at)}</p>
                                </div>
                            </Link>
                            <img className='icon' src={More_Icon} title="Menu"/>
                        </div>
                        
                        <Link to={'/post/' + post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h1 id='title' style={{ cursor: 'pointer' }}>{post.title}</h1>
                        </Link>
                        
                        <div className='post-stats'>
                            <button 
                                onClick={() => handlePearlClick(post.id, post.pearls)}
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                                title="Upvote"
                            >
                                <img className='icon' src={Pearls_Icon} alt="Pearl"/>
                            </button>
                            <p className='stat'>{pearlCounts[post.id] || post.pearls} Pearls</p>
                        </div>
                    </div>
                ))
            ) : (
                <h3 style={{ textAlign: 'center', color: '#518294' }}>No posts match your search...</h3>
            )}
        </div>
    )
}

export default DemoReadPosts
