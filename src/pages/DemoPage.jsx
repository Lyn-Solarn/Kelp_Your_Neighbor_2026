import { Link } from 'react-router-dom'
import '../App.css'

const DemoPage = () => {
  return (
    <section className='demo-layout'>
      <div className='section-heading'>
        <div>
          <span className='eyebrow'>Alternate demo version</span>
          <h1>Layout preview before database work</h1>
        </div>
        <p className='section-copy'>
          This route is now a quick-launch design review area. Use it to jump into the modal post flow, wiki system,
          and iNaturalist-inspired profile layouts before wiring live data.
        </p>
      </div>

      <div className='demo-grid demo-link-grid'>
        <Link className='demo-panel' to='/'>
          <h2>Feed + modal flow</h2>
          <p>Open the home feed and click any post to test the modal experience.</p>
        </Link>
        <Link className='demo-panel' to='/wiki'>
          <h2>Wiki home</h2>
          <p>Browse top organism pages, search the wiki, and open tag-linked field guides.</p>
        </Link>
        <Link className='demo-panel' to='/wiki/sea-lemon'>
          <h2>Wiki detail with side panel</h2>
          <p>Review the learn-more panel, contributors, sources, and conservation groups.</p>
        </Link>
        <Link className='demo-panel' to='/profiles/kelpkeeper'>
          <h2>Profile layout study</h2>
          <p>See the iNaturalist-inspired profile treatment with stats and recent contributions.</p>
        </Link>
      </div>
    </section>
  )
}

export default DemoPage
