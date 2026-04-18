# Kelp Your Neighbor - Demo Mode

See the design and layout instantly **without any database setup!** ✨

## Quick Start (30 seconds)

```bash
npm run demo
```

That's it! The demo will automatically open in your browser at http://localhost:5173/

---

## Available Demo Routes

- **Home Page**: http://localhost:5173/
- **Feed** (All Posts): http://localhost:5173/readposts
- **Sample Posts**: 
  - http://localhost:5173/post/1 - Purple sea star
  - http://localhost:5173/post/2 - Hermit crabs
  - http://localhost:5173/post/3 - Nudibranch (most comments)
  - http://localhost:5173/post/4 - Anemone field
  - http://localhost:5173/post/5 - Young octopus

---

## What You Get

✅ **5 sample posts** with realistic marine discovery content  
✅ **Real comments** on posts showing the comment system  
✅ **Full navigation** - browse posts, search, sort, view individual posts  
✅ **Interactive upvotes** - click pearls to increment counts  
✅ **Add comments** - test the comment input functionality  
✅ **Beautiful layout** - see all the modern styling and responsive design  
✅ **Mobile responsive** - resize your browser to see responsive design  

---

## Features to Explore

### 📱 Check Responsiveness
Resize your browser window to see how the app adapts to different screen sizes:
- **Desktop** (1920px+)
- **Tablet** (768px - 1024px)
- **Mobile** (375px)

Use browser DevTools (F12) → Responsive Design Mode for testing.

### 🏠 Home Page
Visit http://localhost:5173/ to see:
- App branding and description
- Navigation to the feed
- Professional landing page design

### 🔍 Feed (`/readposts`)
Click the logo to browse the feed and see:
- **5 sample posts** displayed beautifully
- **Search functionality** - try searching "nudibranch" or "sea star"
- **Sort options**:
  - Most Recent (default)
  - Oldest
  - Most Pearls
- **Post cards** showing title, author, date, and pearl count
- **Click any post title** to view the full post

### 📌 Individual Post View (`/post/:id`)
Click any post to see:
- **Full post content** with title, description, and image
- **Author info** with username and timestamp
- **Pearl upvote counter** - click the pearl icon to increment
- **All comments** on the post
- **Add comment form** - type a test comment and click "Start a Ripple"
- **Comments section** - shows all comments with author and timestamp

### 💬 Try These Actions
1. **Search**: Go to feed, type "nudibranch" → see filtered results
2. **Sort**: Change sort to "Most Pearls" → posts reorder
3. **Upvote**: Click pearl icon on any post → count increments
4. **Comment**: Add a comment to any post → appears in list

---

## Sample Data Included

### Posts
1. **"Found a stunning purple sea star!"**
   - 12 pearls | 2 comments
   - Beautiful purple sea star discovery

2. **"Adorable hermit crab colony spotted!"**
   - 18 pearls | 1 comment
   - Hermit crabs interacting and switching shells

3. **"Rare nudibranch spotted - need identification help!"** ⭐ (Most commented)
   - 24 pearls | 3 comments
   - Blue and orange nudibranch needing ID help

4. **"Sea anemone field discovery"**
   - 31 pearls | 1 comment
   - Entire field of colorful sea anemones

5. **"Spotted a young octopus hiding in rocks"**
   - 7 pearls | 0 comments
   - Young octopus with color-changing abilities

### Users
- **MarinaExplorer** (current user - author of posts 1 & 5)
- CoastalWanderer (author of post 2)
- TidepoolDiver (author of post 3)
- OceanLover77 (author of post 4)

---

## What's NOT Included

❌ No database connection required  
❌ No environment variables needed  
❌ No Supabase setup  
❌ Login/authentication disabled  
❌ Profile page unavailable  
❌ Create/Edit/Delete posts unavailable (read-only)  
❌ No real-time data updates  

This is a **static HTML/React demo** to showcase the design and layout. Data is hardcoded for quick preview.

---

## Responsive Design Testing

The demo includes full responsive design. Test on different devices:

### In Browser
Press **F12** → Click "Responsive Design Mode" icon

Test these widths:
- **1920px** - Desktop
- **1200px** - Desktop small
- **768px** - Tablet
- **480px** - Mobile
- **375px** - iPhone

### Key Responsive Features
- ✅ Header adapts to screen size
- ✅ Post cards stack on mobile
- ✅ Search bar stays accessible
- ✅ Images scale properly
- ✅ Forms look good on all sizes
- ✅ Typography scales appropriately

---

## File Structure

```
src/demo/
├── main.jsx                    # Demo entry point
├── DemoApp.jsx                 # Demo app with routes
├── mockData.js                 # 5 sample posts + comments
└── pages/
    ├── DemoHomePage.jsx        # Landing page
    ├── DemoReadPosts.jsx       # Feed with search/sort
    └── DemoFullPost.jsx        # Individual post view

Configuration:
├── index-demo.html             # Demo HTML entry point
└── vite-demo.config.js         # Demo Vite configuration
```

---

## Next Steps

### To Transition to Full App

1. **Stop the demo**: Press `Ctrl+C` in terminal
2. **Follow these guides** in order:
   - [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Create Supabase database
   - [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) - Set up local environment
   - Configure `.env.local` with your credentials

3. **Run full app**:
   ```bash
   npm run dev
   ```

### Full App Features
Once setup is complete, you'll get:
- ✅ Real database with persistent data
- ✅ User authentication (register/login)
- ✅ Create posts with images
- ✅ Edit and delete your posts
- ✅ User profile with statistics
- ✅ All interactive features with real data

---

## Troubleshooting

**"Demo won't start"**
```bash
npm install  # Make sure dependencies are installed
npm run demo
```

**"Port 5173 already in use"**
```bash
npm run demo -- --port 5174
```

**"Can't see images"**
- Demo uses external URLs (unsplash.com)
- Check internet connection
- Images may take a moment to load

---

## Commands Reference

```bash
# Run demo (no database needed)
npm run demo

# Run full app (requires Supabase setup)
npm run dev

# Build demo for production
npm run build -- --config vite-demo.config.js

# Build full app for production
npm run build
```

---

**Enjoy exploring the design!** 🌊

For the full app with database, see [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)

