// Mock data for demo purposes
export const mockPosts = [
  {
    id: 1,
    posted_by: 1,
    username: 'MarinaExplorer',
    title: 'Found a stunning purple sea star!',
    description: 'Discovered this beautiful purple sea star in the tide pools near Cannon Beach. It was about 8 inches across and had the most vibrant coloring. There were also several smaller ones nearby. Absolutely breathtaking!',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    pearls: 12,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [
      { id: 101, posted_by: 2, username: 'CoastalWanderer', text: 'Amazing find! Those are getting rarer lately.', created_at: new Date(Date.now() - 1.9 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 102, posted_by: 3, username: 'TidepoolDiver', text: 'Great photography! Where exactly was this?', created_at: new Date(Date.now() - 1.8 * 24 * 60 * 60 * 1000).toISOString() },
    ]
  },
  {
    id: 2,
    posted_by: 2,
    username: 'CoastalWanderer',
    title: 'Adorable hermit crab colony spotted!',
    description: 'Found what must be at least 20 hermit crabs in a small tidal pool near my beach house. They were all different sizes and had collected shells from everywhere. Watched them for about an hour - so entertaining to see them interact!',
    image: 'https://images.unsplash.com/photo-1567043666747-0607f442b231?w=600&h=400&fit=crop',
    pearls: 18,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [
      { id: 103, posted_by: 1, username: 'MarinaExplorer', text: 'Hermit crabs are so cute! Did you see them switching shells?', created_at: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString() },
    ]
  },
  {
    id: 3,
    posted_by: 3,
    username: 'TidepoolDiver',
    title: 'Rare nudibranch spotted - need identification help!',
    description: 'Encountered this amazing nudibranch today. It has distinctive blue and orange coloring. I\'ve been trying to identify the species but I\'m not certain. It was about 3 inches long. Does anyone know what this might be?',
    image: 'https://images.unsplash.com/photo-1567043666747-0607f442b231?w=600&h=400&fit=crop',
    pearls: 24,
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    comments: [
      { id: 104, posted_by: 2, username: 'CoastalWanderer', text: 'This looks like Chromodoris Nudibranch! Beautiful specimen!', created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString() },
      { id: 105, posted_by: 1, username: 'MarinaExplorer', text: 'I\'ve seen similar ones but never this vibrant. Great find!', created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() },
      { id: 106, posted_by: 4, username: 'OceanLover77', text: 'Definitely a nudibranch! Try the Pacific coast edition guidebook.', created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() },
    ]
  },
  {
    id: 4,
    posted_by: 4,
    username: 'OceanLover77',
    title: 'Sea anemone field discovery',
    description: 'Stumbled upon an entire field of sea anemones in the lower tide pools. There must have been hundreds of them! The colors ranged from pink to deep purple. It was like an underwater garden.',
    image: 'https://images.unsplash.com/photo-1583212707454-cfe4a60b73ce?w=600&h=400&fit=crop',
    pearls: 31,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    comments: [
      { id: 107, posted_by: 1, username: 'MarinaExplorer', text: 'Wow! What beach was this? I need to visit!', created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    ]
  },
  {
    id: 5,
    posted_by: 1,
    username: 'MarinaExplorer',
    title: 'Spotted a young octopus hiding in rocks',
    description: 'Was exploring some rocky crevices and saw what I believe was a young octopus! It was about the size of my hand and had beautiful color-changing abilities. Watched it for a few minutes before I had to return to the surface.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    pearls: 7,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    comments: []
  }
];

export const mockUsers = [
  { id: 1, username: 'MarinaExplorer', current_user: true },
  { id: 2, username: 'CoastalWanderer', current_user: false },
  { id: 3, username: 'TidepoolDiver', current_user: false },
  { id: 4, username: 'OceanLover77', current_user: false },
];

// Get post with comments
export const getPost = (postId) => {
  return mockPosts.find(p => p.id === postId);
};

// Get all posts
export const getAllPosts = () => {
  return mockPosts;
};

// Search posts by title
export const searchPosts = (searchTerm) => {
  if (!searchTerm.trim()) return mockPosts;
  return mockPosts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Sort posts
export const sortPosts = (posts, sortOption) => {
  const sorted = [...posts];
  switch (sortOption) {
    case 'Oldest':
      return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    case 'Most Pearls':
      return sorted.sort((a, b) => b.pearls - a.pearls);
    case 'Most Recent':
    default:
      return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
};
