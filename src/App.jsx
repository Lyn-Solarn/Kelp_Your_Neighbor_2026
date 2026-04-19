import { NavLink, useRoutes } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import FullPost from './pages/FullPost'
import HomePage from './pages/HomePage'
import ReadPosts from './pages/ReadPosts'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import PublicProfilePage from './pages/PublicProfilePage'
import Profile_Pic from './assets/Profile_Pic.png'
import { hasSupabaseConfig } from './client'
import { useLogin } from './hooks/useLogin'
import WikiDetailPage from './pages/WikiDetailPage'
import WikiHomePage from './pages/WikiHomePage'
import OceanNewsPage from './pages/OceanNewsPage'
import './App.css'

function App() {
  const { user } = useLogin()

  const element = useRoutes([
    {
      path: "/", 
      element:<HomePage/>
    },
    {
      path: "/readposts",
      element:<ReadPosts/>
    },
    {
      path: "/post/:id",
      element:<FullPost/>
    },
    {
      path: "/edit/:id",
      element: <EditPost/>
    },
    {
      path: "/newpost",
      element: <CreatePost />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/profile",
      element: <ProfilePage />
    },
    {
      path: "/profiles/:username",
      element: <PublicProfilePage />
    },
    {
      path: "/wiki",
      element: <WikiHomePage />
    },
    {
      path: "/wiki/:slug",
      element: <WikiDetailPage />
    },
    {
      path: "/ocean-news",
      element: <OceanNewsPage />
    }
  ])

  return (
    <div className='app-shell'>
      <aside className='sidebar-nav'>
        <div className='sidebar-brand'>
          <NavLink className='brand-link' to='/'>
            <span className='brand-mark'>Marinote</span>
            <span className='brand-tagline'>Community field notes from the living edge of the bay.</span>
          </NavLink>
        </div>

        <nav className='sidebar-links' aria-label='Primary'>
          <NavLink className='sidebar-link' to='/'>
            <span className='sidebar-icon'>01</span>
            <span>Home Feed</span>
          </NavLink>
          <NavLink className='sidebar-link' to='/newpost'>
            <span className='sidebar-icon'>02</span>
            <span>Create Post</span>
          </NavLink>
          <NavLink className='sidebar-link' to='/wiki'>
            <span className='sidebar-icon'>03</span>
            <span>Wiki</span>
          </NavLink>
          <NavLink className='sidebar-link' to='/ocean-news'>
            <span className='sidebar-icon'>04</span>
            <span>Ocean News</span>
          </NavLink>
        </nav>

        <div className='sidebar-footer'>
          <span className={`status-pill ${hasSupabaseConfig ? 'status-live' : 'status-demo'}`}>
            {hasSupabaseConfig ? 'Database connected' : 'Demo data mode'}
          </span>
          <NavLink className='profile-link sidebar-profile' to='/profile'>
            <img className='profile-photo' src={Profile_Pic} alt='' />
            <span>{user?.username ?? 'Profile'}</span>
          </NavLink>
        </div>
      </aside>

      <main className='page-content'>{element}</main>
    </div>
  )
}

export default App
