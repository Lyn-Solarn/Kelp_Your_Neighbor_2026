import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { demoTaxa, getDemoPostsForTaxon, getTopDemoTaxa } from '../data/demoContent'
import '../App.css'

const WikiHomePage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const visibleTaxa = useMemo(() => {
    const loweredSearch = searchTerm.toLowerCase()

    return demoTaxa.filter((taxon) =>
      taxon.commonName.toLowerCase().includes(loweredSearch) ||
      taxon.scientificName.toLowerCase().includes(loweredSearch)
    )
  }, [searchTerm])

  const topTaxa = getTopDemoTaxa().slice(0, 3)

  return (
    <section className='page-section'>
      <div className='section-heading'>
        <div>
          <span className='eyebrow'>Wiki</span>
          <h1>Field guide pages built from the community</h1>
        </div>
        <p className='section-copy'>
          Search by organism name, open a wiki page, and explore posts tagged to that species or habitat.
        </p>
      </div>

      <div className='wiki-landing-grid'>
        <div className='hero-card wiki-hero-card'>
          <span className='eyebrow'>Search organisms</span>
          <h2>Start with a common name or scientific name</h2>
          <input
            id='searchbar'
            type='text'
            placeholder='Search sea lemon, eelgrass, Pisaster...'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className='info-card'>
          <h2>Top wikis</h2>
          <div className='wiki-mini-list'>
            {topTaxa.map((taxon) => (
              <Link key={taxon.slug} className='wiki-mini-card' to={`/wiki/${taxon.slug}`}>
                <strong>{taxon.commonName}</strong>
                <span>{taxon.scientificName}</span>
                <small>{getDemoPostsForTaxon(taxon.slug).length} tagged posts</small>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className='wiki-card-grid'>
        {visibleTaxa.map((taxon) => (
          <Link key={taxon.slug} className='wiki-card' to={`/wiki/${taxon.slug}`}>
            <span className='eyebrow'>{taxon.kingdom}</span>
            <h2>{taxon.commonName}</h2>
            <p className='scientific-name'>{taxon.scientificName}</p>
            <p>{taxon.description}</p>
            <p className='wiki-meta'>{getDemoPostsForTaxon(taxon.slug).length} related posts</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default WikiHomePage
