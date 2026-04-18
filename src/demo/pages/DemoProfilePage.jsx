import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockPosts } from '../mockData';

const DemoProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [totalPearls, setTotalPearls] = useState(0);

  useEffect(() => {
    // Get user info and posts
    const usersPosts = mockPosts.filter(p => p.posted_by === parseInt(userId));
    
    if (usersPosts.length === 0) {
      // No posts from this user, try to find user in any post's data
      const userPost = mockPosts.find(p => p.posted_by === parseInt(userId));
      if (!userPost) {
        // User not found in mock data
        setUserData(null);
        return;
      }
    }

    // Set user data from first post
    const firstPost = usersPosts[0] || mockPosts.find(p => p.posted_by === parseInt(userId));
    
    setUserData({
      id: parseInt(userId),
      username: firstPost.username,
    });

    setUserPosts(usersPosts);
    
    // Calculate total pearls
    const total = usersPosts.reduce((sum, post) => sum + (post.pearls || 0), 0);
    setTotalPearls(total);
  }, [userId]);

  if (!userData) {
    return (
      <div className="profile-page">
        <h2>User not found</h2>
        <p>This user doesn't have any posts yet.</p>
        <Link to="/readposts" className="btn-primary">Back to Feed</Link>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <h2>{userData.username}</h2>
          <p className="profile-username">@{userData.username.toLowerCase()}</p>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-number">{userPosts.length}</div>
            <div className="stat-label">Posts</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalPearls}</div>
            <div className="stat-label">Pearls Earned</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{userPosts.reduce((count, post) => count + (post.comments?.length || 0), 0)}</div>
            <div className="stat-label">Comments</div>
          </div>
        </div>
      </div>

      <div className="profile-bio">
        <p>🌿 Passionate tidepool explorer and discoverer of marine life</p>
      </div>

      <div className="profile-posts">
        <h3>Recent Posts</h3>
        
        {userPosts.length === 0 ? (
          <p className="no-posts">This user hasn't posted yet.</p>
        ) : (
          <div className="posts-list">
            {userPosts.map((post) => (
              <Link 
                to={`/post/${post.id}`}
                key={post.id}
                className="post-preview-card"
              >
                <div className="post-preview-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="post-preview-content">
                  <h4>{post.title}</h4>
                  <p className="post-preview-text">
                    {post.description.substring(0, 150)}...
                  </p>
                  <div className="post-preview-meta">
                    <span className="pearl-badge">💎 {post.pearls}</span>
                    <span className="comment-badge">💬 {post.comments?.length || 0}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="profile-actions">
        <Link to="/readposts" className="btn-secondary">← Back to Feed</Link>
      </div>
    </div>
  );
};

export default DemoProfilePage;
