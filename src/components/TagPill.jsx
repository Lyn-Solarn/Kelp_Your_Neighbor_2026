import { Link } from 'react-router-dom'
import { demoTaxaBySlug } from '../data/demoContent'

const TagPill = ({ slug }) => {
  const taxon = demoTaxaBySlug[slug]
  const label = taxon?.commonName ?? slug

  return (
    <Link
      className='tag-pill'
      onClick={(event) => event.stopPropagation()}
      to={`/wiki/${slug}`}
    >
      {label}
    </Link>
  )
}

export default TagPill
