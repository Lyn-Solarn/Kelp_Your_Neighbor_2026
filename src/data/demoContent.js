export const demoTaxa = [
  {
    slug: 'sea-lemon',
    commonName: 'Sea Lemon',
    scientificName: 'Peltodoris nobilis',
    kingdom: 'Animalia',
    description:
      'A large dorid nudibranch common along the Pacific coast, known for its dimpled yellow mantle and sponge-based diet.',
    contributors: ['kelpkeeper', 'tideline_tess', 'reef_riley'],
    sources: [
      'Monterey Bay Aquarium field guide',
      'National Geographic Society species notes',
      'California Academy of Sciences biodiversity records',
    ],
    organizations: ['Monterey Bay Aquarium', 'The Nature Conservancy'],
  },
  {
    slug: 'ochre-sea-star',
    commonName: 'Ochre Sea Star',
    scientificName: 'Pisaster ochraceus',
    kingdom: 'Animalia',
    description:
      'A keystone intertidal predator famous for its role in rocky shore ecosystems and its wide color variation.',
    contributors: ['tideline_tess', 'kelpkeeper'],
    sources: [
      'University of Washington marine biology notes',
      'Smithsonian Ocean Portal',
    ],
    organizations: ['SeaDoc Society', 'NOAA'],
  },
  {
    slug: 'eelgrass',
    commonName: 'Eelgrass',
    scientificName: 'Zostera marina',
    kingdom: 'Plantae',
    description:
      'A marine flowering plant that forms dense underwater meadows and supports nursery habitat for many coastal species.',
    contributors: ['reef_riley', 'kelpkeeper'],
    sources: [
      'NOAA coastal habitat resources',
      'Washington Department of Natural Resources',
    ],
    organizations: ['NOAA', 'The Nature Conservancy'],
  },
  {
    slug: 'giant-green-anemone',
    commonName: 'Giant Green Anemone',
    scientificName: 'Anthopleura xanthogrammica',
    kingdom: 'Animalia',
    description:
      'A striking intertidal anemone with green tentacles, often found attached to rocks in tidepools exposed during low tide.',
    contributors: ['reef_riley'],
    sources: [
      'Marine Life Information Network',
      'Oregon Coast education resources',
    ],
    organizations: ['Oregon Shores Conservation Coalition'],
  },
]

export const demoTaxaBySlug = Object.fromEntries(
  demoTaxa.map((taxon) => [taxon.slug, taxon])
)

export const demoProfiles = [
  {
    id: 1,
    username: 'kelpkeeper',
    displayName: 'Mara Chen',
    location: 'Monterey Bay, California',
    joinedAt: '2026-01-09T10:00:00.000Z',
    favoriteFind: 'Electric-blue nudibranchs hiding in eelgrass',
    bio: 'Weekend tidepool explorer collecting species notes, light conditions, and habitat clues for every unusual find.',
    observations: 48,
    species: 19,
    identifications: 112,
  },
  {
    id: 2,
    username: 'tideline_tess',
    displayName: 'Tess Alvarez',
    location: 'Half Moon Bay, California',
    joinedAt: '2026-02-18T11:30:00.000Z',
    favoriteFind: 'Juvenile sea stars in protected coves',
    bio: 'Photographer and intertidal volunteer focused on documenting shoreline changes and helping newer explorers identify species.',
    observations: 61,
    species: 27,
    identifications: 154,
  },
  {
    id: 3,
    username: 'reef_riley',
    displayName: 'Riley Morgan',
    location: 'Bandon, Oregon',
    joinedAt: '2026-03-01T08:15:00.000Z',
    favoriteFind: 'Well-camouflaged anemones and shell patterns',
    bio: 'I mostly ask too many fieldwork questions, then turn the answers into cleaner observation checklists for the next trip.',
    observations: 34,
    species: 16,
    identifications: 87,
  },
]

export const demoProfilesByUsername = Object.fromEntries(
  demoProfiles.map((profile) => [profile.username, profile])
)

export const demoPosts = [
  {
    id: 101,
    posted_by: 1,
    username: 'kelpkeeper',
    created_at: '2026-04-14T15:35:00.000Z',
    title: 'Found a neon nudibranch tucked under eelgrass',
    description:
      'The colors were unreal in person. I would love help narrowing down the species, and I am especially curious whether this pattern changes by age.',
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    pearls: 18,
    tags: ['sea-lemon', 'eelgrass'],
  },
  {
    id: 102,
    posted_by: 2,
    username: 'tideline_tess',
    created_at: '2026-04-12T09:20:00.000Z',
    title: 'Starfish nursery near the north cove',
    description:
      'Tiny sea stars all across the rocks at low tide this morning. Sharing the spot here mostly to compare notes on timing and conditions.',
    image:
      'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?auto=format&fit=crop&w=1200&q=80',
    pearls: 27,
    tags: ['ochre-sea-star'],
  },
  {
    id: 103,
    posted_by: 3,
    username: 'reef_riley',
    created_at: '2026-04-10T19:05:00.000Z',
    title: 'Question: best way to photograph tidepool finds without stress?',
    description:
      'I am trying to improve my field photos while keeping every creature and habitat undisturbed. Curious what camera angles or lens setup work best.',
    image: '',
    pearls: 9,
    tags: ['giant-green-anemone'],
  },
  {
    id: 104,
    posted_by: 1,
    username: 'kelpkeeper',
    created_at: '2026-04-08T08:55:00.000Z',
    title: 'Eelgrass patch full of tiny sheltering life',
    description:
      'Sharing this because the meadow was packed with juvenile fish and invertebrates. It felt like a reminder that the plant itself is the habitat story.',
    image:
      'https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&w=1200&q=80',
    pearls: 14,
    tags: ['eelgrass'],
  },
]

export const demoComments = {
  101: [
    {
      id: 1001,
      posted_by: 3,
      username: 'reef_riley',
      text: 'The color banding makes me think this could be a juvenile pattern. Gorgeous find.',
      created_at: '2026-04-14T17:02:00.000Z',
    },
    {
      id: 1002,
      posted_by: 2,
      username: 'tideline_tess',
      text: 'Love the framing on this shot. The eelgrass gives it so much scale.',
      created_at: '2026-04-14T16:22:00.000Z',
    },
  ],
  102: [
    {
      id: 1003,
      posted_by: 1,
      username: 'kelpkeeper',
      text: 'This timing note is so helpful. I always miss this window by a day.',
      created_at: '2026-04-12T12:10:00.000Z',
    },
  ],
  103: [
    {
      id: 1004,
      posted_by: 2,
      username: 'tideline_tess',
      text: 'I shoot low and wide first so I do not have to reposition anything in the pool.',
      created_at: '2026-04-11T07:45:00.000Z',
    },
  ],
  104: [
    {
      id: 1005,
      posted_by: 3,
      username: 'reef_riley',
      text: 'This is exactly the kind of habitat post I want more of in the wiki.',
      created_at: '2026-04-08T09:44:00.000Z',
    },
  ],
}

export const getDemoPostById = (postId) =>
  demoPosts.find((post) => Number(post.id) === Number(postId)) ?? null

export const getDemoPostsForTaxon = (slug) =>
  demoPosts.filter((post) => (post.tags ?? []).includes(slug))

export const getDemoCommentsForPost = (postId) => demoComments[postId] ?? []

export const getTopDemoTaxa = () =>
  [...demoTaxa].sort(
    (a, b) => getDemoPostsForTaxon(b.slug).length - getDemoPostsForTaxon(a.slug).length
  )
