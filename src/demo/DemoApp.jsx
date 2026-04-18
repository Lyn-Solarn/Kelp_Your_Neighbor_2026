import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import DemoHomePage from './pages/DemoHomePage'
import DemoReadPosts from './pages/DemoReadPosts'
import DemoFullPost from './pages/DemoFullPost'
import DemoProfilePage from './pages/DemoProfilePage'
import { Link } from 'react-router-dom'
import Profile_Pic from '../assets/Profile_Pic.png'
import '../App.css'

function DemoApp() {
  let element = useRoutes([
    {
      path: "/", 
      element: <DemoHomePage />
    },
    {
      path: "/readposts",
      element: <DemoReadPosts />
    },
    {
      path: "/post/:id",
      element: <DemoFullPost />
    },
    {
      path: "/profile/:userId",
      element: <DemoProfilePage />
    }
  ]);

  return (
    <div className='page'>
      <div className='header'>
        <div className='left-side-header'>
          <Link to='/readposts'><h1 id='header-title'>Nudi Noted</h1></Link>
          <p>Slugs, sea stars, and seaside surprises.</p>
          <div style={{ marginLeft: '1rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '4px', fontSize: '0.9rem' }}>
            <strong>📋 DEMO MODE</strong> - No database needed
          </div>
        </div>

        <div className='right-side-header'>
          <Link to='/profile/1' style={{ textDecoration: 'none' }}>
            <img className='profile-photo'  src={Profile_Pic} alt="Demo" style={{ cursor: 'pointer' }}/>
          </Link>
        </div>
      </div>

      {element}
      
    </div>
  )
}

export default DemoApp
