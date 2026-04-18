import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import FullPost from './pages/FullPost'
import HomePage from './pages/HomePage'
import ReadPosts from './pages/ReadPosts'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { Link } from 'react-router-dom'
import Profile_Pic from './assets/Profile_Pic.png'
import './App.css'

function App() {
  let element = useRoutes([
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
    }
  ]);

  return (
    <div className='page'>

      <div className='header'>
        <div className='left-side-header'>
          <Link to='/readposts'><h1 id='header-title'>Nudi Noted</h1></Link>
          <p>Slugs, sea stars, and seaside surprises.</p>
        </div>

        <div className='right-side-header'>
          <Link to='/newpost'><button id='create-post-button'>Post a Slug</button></Link>
          <Link to='/profile'><img className='profile-photo'  src={Profile_Pic}/></Link>
        </div>
      </div>

      {element}
      
    </div>
  )
}

export default App
