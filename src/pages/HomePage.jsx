import { Link } from 'react-router-dom'
import PostFeed from '../components/PostFeed'
import { demoProfiles, getTopDemoTaxa } from '../data/demoContent'
import '../App.css'

const HomePage = () => {
  const featuredTaxa = getTopDemoTaxa().slice(0, 3)

  return (
    <div className='feed-page-grid'>
      <PostFeed
        description='Open any post in a modal, browse community tags, and jump straight into the organism wiki from the feed.'
        title='Your intertidal feed'
      />

      <aside className='feed-side-column'>
        <div className='info-card'>
          <span className='eyebrow'>Top wikis</span>
          <h2>Most active organism pages</h2>
          <div className='wiki-mini-list'>
            {featuredTaxa.map((taxon) => (
              <Link key={taxon.slug} className='wiki-mini-card' to={`/wiki/${taxon.slug}`}>
                <strong>{taxon.commonName}</strong>
                <span>{taxon.scientificName}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className='info-card'>
          <span className='eyebrow'>Featured explorers</span>
          <h2>Profiles to review</h2>
          <div className='wiki-mini-list'>
            {demoProfiles.map((profile) => (
              <Link key={profile.username} className='wiki-mini-card' to={`/profiles/${profile.username}`}>
                <strong>{profile.displayName}</strong>
                <span>@{profile.username}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default HomePage
