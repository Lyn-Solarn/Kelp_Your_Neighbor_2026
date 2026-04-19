import { useEffect, useState } from 'react'
import '../App.css'

const NEWS_ENDPOINT = 'https://newsapi.org/v2/top-headlines'
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY

const OceanNewsPage = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const fetchNews = async () => {
      if (!NEWS_API_KEY) {
        setError('Missing NewsAPI key. Add VITE_NEWS_API_KEY to your .env.local file.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')

        const params = new URLSearchParams({
          category: 'science',
          q: 'ocean',
          country: 'us',
          pageSize: '3',
        })

        const response = await fetch(`${NEWS_ENDPOINT}?${params.toString()}`, {
          headers: {
            'X-Api-Key': NEWS_API_KEY,
          },
          signal: controller.signal,
        })

        const data = await response.json()

        if (!response.ok || data.status === 'error') {
          throw new Error(data.message || 'Unable to load ocean headlines right now.')
        }

        const normalizedArticles = (data.articles ?? [])
          .filter((article) => article?.url && article?.title)
          .slice(0, 3)

        setArticles(normalizedArticles)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load ocean headlines right now.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNews()

    return () => controller.abort()
  }, [])

  return (
    <section className='page-section'>
      <div className='section-heading'>
        <div>
          <span className='eyebrow'>Ocean News</span>
          <h1>Top science headlines about the ocean</h1>
        </div>
        <p className='section-copy'>Powered by NewsAPI top-headlines</p>
      </div>

      {loading && (
        <div className='empty-state'>
          <p>Loading headlines...</p>
        </div>
      )}

      {!loading && error && (
        <div className='empty-state'>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className='empty-state'>
          <p>No ocean science headlines are available right now.</p>
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className='news-list'>
          {articles.map((article) => (
            <a
              key={article.url}
              className='news-card'
              href={article.url}
              rel='noreferrer noopener'
              target='_blank'
            >
              {article.urlToImage ? (
                <img className='news-image' src={article.urlToImage} alt={article.title} />
              ) : (
                <div className='news-image-fallback'>No image provided</div>
              )}

              <div className='news-content'>
                <p className='news-source'>Source: {article.source?.name || 'Unknown source'}</p>
                <p className='news-author'>Author: {article.author || 'Unknown author'}</p>
                <h2 className='news-title'>{article.title}</h2>
                <p className='news-description'>{article.description || 'No description available.'}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

export default OceanNewsPage
