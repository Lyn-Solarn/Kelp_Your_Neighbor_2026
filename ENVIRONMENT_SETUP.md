# Environment Setup Guide - Kelp Your Neighbor

This guide will help you set up your local development environment and configure the application to connect to your Supabase database.

## Prerequisites

Before you begin, make sure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- A **Supabase account and project** - [See DATABASE_SETUP.md](./DATABASE_SETUP.md)
- Supabase API credentials:
  - Project URL
  - Anon Public Key

## Step 1: Clone or Navigate to the Repository

If you haven't already, navigate to your project directory:

```bash
cd /path/to/Kelp_Your_Neighbor_2026
```

## Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- `react` - UI framework
- `react-dom` - React DOM rendering
- `react-router-dom` - Routing and navigation
- `@supabase/supabase-js` - Supabase client library
- `vite` - Build tool and dev server
- `eslint` - Code linting

## Step 3: Create Environment Configuration

### Important: NEVER commit `.env.local` to Git!

The `.env.local` file contains sensitive information and should ALWAYS be in your `.gitignore` (which it already is).

### Create `.env.local` File

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` in your editor:
   ```bash
   nano .env.local
   # or
   code .env.local
   ```

3. Fill in your Supabase credentials:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### How to Find Your Credentials

1. Log in to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

Example filled `.env.local`:
```env
VITE_SUPABASE_URL=https://abcdefg12345xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Verify Database Setup

Before running the app, ensure your Supabase database is set up:

1. Check DATABASE_SETUP.md for complete instructions
2. Verify all three tables exist in your database:
   - `user`
   - `post`
   - `comment`

If tables don't exist, run the SQL setup commands found in DATABASE_SETUP.md.

## Step 5: Start Development Server

Start the Vite development server:

```bash
npm run dev
```

You should see output like:
```
  VITE v7.0.4  ready in 245 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Open http://localhost:5173/ in your browser. The app should load!

## Step 6: Test the Application

### Test User Registration

1. Navigate to the login page (or click profile icon)
2. Click "Don't have an account? Register here"
3. Create a test account:
   - **Username**: `testuser`
   - **Secret Code**: `testpass123`
4. Click "Register"

### Test Post Creation

1. You should be logged in now
2. Click "Post a Slug" button
3. Create a test post:
   - **Title**: "Found a beautiful sea slug!"
   - **Description**: "This is a test post"
   - **Image URL**: (optional - https://example.com/image.jpg)
4. Click "Submit"
5. The post should appear on the feed

### Test Other Features

- ✅ Search posts by title
- ✅ Sort posts by date or pearls
- ✅ Upvote posts (click the pearl icon)
- ✅ Add comments to posts
- ✅ View your profile with stats
- ✅ Edit your own posts (click the three-dot menu)
- ✅ Delete your own posts
- ✅ Login/logout

## Building for Production

### Create Optimized Build

```bash
npm run build
```

This creates a `dist/` folder with optimized, minified code ready for deployment.

### Preview Production Build Locally

```bash
npm run preview
```

## Linting and Code Quality

Check for code issues:

```bash
npm run lint
```

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"

**Solution:**
```bash
npm install
```

### Blank Screen or "Loading..." Forever

**Possible causes:**
- Missing `.env.local` file
- Incorrect Supabase credentials
- Supabase project is paused or deleted

**Solutions:**
1. Double-check `.env.local` exists with correct values
2. Verify Supabase project is active in dashboard
3. Check browser console (F12) for error messages

### Connection Error to Supabase

**Error message:** `Failed to connect to Supabase`

**Solutions:**
1. Verify `VITE_SUPABASE_URL` starts with `https://`
2. Verify `VITE_SUPABASE_ANON_KEY` is complete (long string)
3. Check your internet connection
4. Restart the dev server: `npm run dev`

### Posts Not Saving

**Error message:** `Failed to create post`

**Solutions:**
1. Ensure you're logged in
2. Verify database tables exist (see DATABASE_SETUP.md)
3. Check that all required fields are filled
4. Check browser console (F12) → Network tab for errors

### CORS Errors

**Error message:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Supabase should handle CORS automatically
- If persisting, verify your project URL in `.env.local`
- Check Supabase dashboard for any security settings

## File Structure

```
Kelp_Your_Neighbor_2026/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Card.jsx      # Post card for feed
│   │   ├── FullCard.jsx  # Full post page
│   │   └── Comment.jsx   # Comment component
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx
│   │   ├── ReadPosts.jsx
│   │   ├── FullPost.jsx
│   │   ├── CreatePost.jsx
│   │   ├── EditPost.jsx
│   │   ├── LoginPage.jsx
│   │   └── ProfilePage.jsx
│   ├── client.js         # Supabase configuration
│   ├── LoginContext.jsx  # Authentication context
│   ├── App.jsx          # Main app component
│   ├── App.css          # Main styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── .env.local          # ⚠️ Git-ignored, contains secrets
├── .env.local.example  # Template for .env.local
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── DATABASE_SETUP.md   # Database setup instructions
└── ENVIRONMENT_SETUP.md # This file
```

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://abc123.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Public API key for Supabase | `eyJhbGc...` (very long) |

**VITE prefix:** Vite uses the `VITE_` prefix to expose variables to the browser. Variables without this prefix are server-side only.

## Tips for Development

### Hot Module Reloading (HMR)

Changes to your code will automatically reload in the browser. No need to refresh!

### React DevTools

Install [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) browser extension for better debugging.

### VS Code Recommendations

I recommend these VS Code extensions:
- **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
- **ESLint** - dbaeumer.vscode-eslint
- **Prettier** - esbenp.prettier-vscode
- **Thunder Client** - rangav.vscode-thunder-client (for API testing)

### Disabling Hot Reload (if needed)

In rare cases where HMR causes issues:
```bash
npm run dev -- --no-hmr
```

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Getting Help

If you encounter issues:

1. **Check error messages** in browser console (F12)
2. **Review the code** in the file mentioned in the error
3. **Check DATABASE_SETUP.md** if it's database-related
4. **Verify environment variables** in `.env.local`
5. **Consult Supabase docs**: https://supabase.com/docs

## Next Steps

1. ✅ Complete this setup
2. Create a test account and post
3. Explore all features
4. Customize colors and branding (edit App.css)
5. Deploy to production when ready

## Deployment

When ready to go live, see deployment options:
- **Vercel**: https://vercel.com (recommended for Vite apps)
- **Netlify**: https://netlify.com
- **GitHub Pages**: https://pages.github.com
- **Traditional hosting**: Any Node.js or static host

All of these support environment variables for secure credential storage.

---

**Last Updated:** April 18, 2026
**Project:** Kelp Your Neighbor 2026 - Nudi Noted
