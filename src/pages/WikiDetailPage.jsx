import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  demoTaxaBySlug,
  getDemoCommentsForPost,
  getDemoPostsForTaxon,
} from '../data/demoContent'
import Card from '../components/Card'
import PostModal from '../components/PostModal'
import '../App.css'

const WikiDetailPage = () => {
  const { slug } = useParams()
  const [showPanel, setShowPanel] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  const taxon = demoTaxaBySlug[slug]
  const relatedPosts = useMemo(() => getDemoPostsForTaxon(slug), [slug])

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

  if (!taxon) {
    return (
      <section className='page-section'>
        <div className='empty-state'>
          <h1>Wiki not found</h1>
          <p>That organism does not have a seeded wiki page yet.</p>
          <Link className='primary-action' to='/wiki'>Back to wiki home</Link>
        </div>
      </section>
    )
  }

  return (
    <section className='page-section wiki-detail-page'>
      <div className='wiki-detail-header'>
        <span className='eyebrow'>{taxon.kingdom}</span>
        <h1>{taxon.commonName}</h1>
        <p className='scientific-name'>{taxon.scientificName}</p>
        <button className='secondary-action learn-more-button' onClick={() => setShowPanel((value) => !value)} type='button'>
          {showPanel ? 'Hide details' : 'Learn more'}
        </button>
      </div>

      <div className='wiki-detail-layout'>
        <div className='wiki-main-column'>

          <div className='post-list'>
            {relatedPosts.map((post) => (
              <Card
                key={post.id}
                id={post.id}
                postedBy={post.posted_by}
                username={post.username}
                date={formatDate(post.created_at)}
                title={post.title}
                description={post.description}
                pearls={post.pearls}
                tags={post.tags}
                image={post.image}
                onOpenPost={() => setSelectedPost(post)}
              />
            ))}
          </div>
        </div>
      </div>

      {showPanel && (
        <div className='wiki-panel-backdrop' onClick={() => setShowPanel(false)} role='presentation'>
          <aside
            aria-modal='true'
            className='wiki-panel-modal'
            onClick={(event) => event.stopPropagation()}
            role='dialog'
          >
            <div className='wiki-panel-modal-top'>
              <div>
                <span className='eyebrow'>{taxon.kingdom}</span>
                <h2>About {taxon.commonName}</h2>
                <p className='scientific-name'>{taxon.scientificName}</p>
              </div>
              <button className='icon-button panel-close-button' onClick={() => setShowPanel(false)} type='button'>
                Close
              </button>
            </div>

            <p>{taxon.description}</p>

            <div className='wiki-panel-section'>
              <h3>Contributors</h3>
              <ul>
                {taxon.contributors.map((contributor) => (
                  <li key={contributor}>
                    <Link className='username-link-dark' to={`/profiles/${contributor}`}>@{contributor}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='wiki-panel-section'>
              <h3>Sources cited</h3>
              <ul>
                {taxon.sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </div>

            <div className='wiki-panel-section'>
              <h3>Conservation organizations</h3>
              <ul>
                {taxon.organizations.map((organization) => (
                  <li key={organization}>{organization}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}

      <PostModal
        comments={selectedPost ? getDemoCommentsForPost(selectedPost.id) : []}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </section>
  )
}

export default WikiDetailPage
