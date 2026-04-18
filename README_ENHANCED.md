# Kelp Your Neighbor - Enhanced Edition 2026

**Nudi Noted** - A modern, production-ready social platform for tidepool enthusiasts to share and discuss their marine discoveries.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-Apache%202.0-blue)

## 🌊 About This Project

Kelp Your Neighbor is a social media platform designed specifically for marine explorers to:
- 📸 Share photos of their tidepool discoveries
- 💬 Discuss findings with a community of marine enthusiasts
- ⭐ Upvote (earn "Pearls") the best discoveries
- 🏷️ Organize content with descriptive titles and tags
- 👤 Maintain a personal profile with contribution stats

This is an enhanced fork of the original [Nudi Noted](https://github.com/Lyn-Solarn/nudi_noted) project with improved features, better UI/UX, and production-ready code.

## ✨ What's New (Enhanced Edition)

### 🎨 UI/UX Improvements
- ✅ Modern, responsive design with improved color palette
- ✅ Smooth animations and transitions
- ✅ Better mobile experience (fully responsive)
- ✅ Professional error messages and loading states
- ✅ Hover effects and interactive feedback

### 🛡️ Code Quality
- ✅ Better error handling and validation
- ✅ Loading states for async operations
- ✅ Accessibility improvements (aria labels, semantic HTML)
- ✅ Character counter on post descriptions
- ✅ URL validation for image links
- ✅ Disabled button states during submissions

### 📊 Enhanced Features
- ✅ User profile page with stats (post count, total pearls)
- ✅ View your recent posts from profile
- ✅ Better comment loading and empty states
- ✅ Improved form placeholders and guidance
- ✅ Better permission checks (only post author can edit)
- ✅ Error recovery and retry capabilities

### 🔧 Developer Experience
- ✅ Proper Supabase client configuration
- ✅ Environment variable setup with `.env.local`
- ✅ Comprehensive setup documentation
- ✅ SQL database schema included
- ✅ Clear separation of concerns
- ✅ ESLint configured for code quality

## 📋 Quick Start

### Prerequisites
- Node.js v16+ ([Download](https://nodejs.org/))
- Supabase account ([Sign up free](https://supabase.com))
- Git

### 1. Setup Environment (3 minutes)

```bash
# Clone or navigate to your project
cd /path/to/Kelp_Your_Neighbor_2026

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local with your Supabase credentials
# VITE_SUPABASE_URL=your_url
# VITE_SUPABASE_ANON_KEY=your_key
```

### 2. Setup Database (5 minutes)

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Run the SQL commands from [DATABASE_SETUP.md](./DATABASE_SETUP.md)
4. Copy your Project URL and Anon Key
5. Paste them into `.env.local`

### 3. Run Locally

```bash
npm run dev
```

Visit http://localhost:5173/ and start exploring!

### 4. Test Features

1. **Register** - Create a test account (username + secret code)
2. **Create Post** - Click "Post a Slug" to share a discovery
3. **Explore Feed** - Search and sort posts
4. **Engage** - Upvote posts and add comments
5. **Profile** - View your stats and manage posts

## 🗂️ Project Structure

```
src/
├── components/         # Reusable React components
│   ├── Card.jsx       # Post previews in feed
│   ├── FullCard.jsx   # Full post with comments
│   └── Comment.jsx    # Individual comment
├── pages/             # Full page components
│   ├── HomePage.jsx   # Welcome/intro
│   ├── ReadPosts.jsx  # Main feed
│   ├── FullPost.jsx   # Single post detail
│   ├── CreatePost.jsx # Create new post
│   ├── EditPost.jsx   # Edit/delete post
│   ├── LoginPage.jsx  # Register/login
│   └── ProfilePage.jsx # User dashboard
├── client.js          # Supabase configuration
├── LoginContext.jsx   # Auth state management
├── App.jsx           # Main app router
├── App.css           # Component styles
├── index.css         # Global styles
└── main.jsx          # App entry point

public/               # Static assets (images, icons)

Documentation:
├── DATABASE_SETUP.md      # Database schema & setup
├── ENVIRONMENT_SETUP.md   # Environment configuration
└── README.md             # This file
```

## 🗄️ Database Schema

Three main tables power the application:

### `user` - User Accounts
```sql
id, username, secret_code, current_user, created_at, updated_at
```

### `post` - User Posts
```sql
id, posted_by, title, description, image, pearls, created_at, updated_at
```

### `comment` - Post Comments
```sql
id, posted_by, og_post, text, created_at, updated_at
```

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for complete schema with SQL.

## 🚀 Building for Production

```bash
# Create optimized build
npm run build

# Test production build locally
npm run preview

# Output will be in dist/ folder
```

### Deployment Options

- **Vercel** (Recommended) - Seamless Vite integration
- **Netlify** - Easy GitHub integration
- **GitHub Pages** - Free static hosting
- **Any Node.js host** - Traditional server hosting

## 🛠️ Development

### Available Scripts

```bash
npm run dev       # Start development server with HMR
npm run build     # Create production build
npm run preview   # Preview production build
npm run lint      # Check code quality with ESLint
```

### Code Quality

The project includes ESLint configuration. Fix issues with:

```bash
npm run lint -- --fix
```

## 📱 Features

### For Users

- **🔐 Secure Authentication** - Username + secret code (pseudo-auth)
- **📸 Rich Posts** - Title, description, and external image URLs
- **💬 Comments** - Discuss findings with other users ("Start a Ripple")
- **⭐ Upvotes** - Award "Pearls" to excellent discoveries
- **🔍 Search & Filter** - Find posts by title
- **📊 Sorting** - Sort by date or popularity
- **👤 User Profile** - View stats and manage your posts
- **✏️ Edit & Delete** - Modify or remove your posts anytime

### For Developers

- **⚡ Fast Development** - Vite with hot module reloading
- **🧩 Modular Code** - Easy to extend and customize
- **🎨 Tailored Styling** - CSS variables for easy theming
- **♿ Accessible** - ARIA labels and semantic HTML
- **📱 Responsive** - Mobile-first design
- **🔒 Environment Config** - Secure credential handling

## 🔒 Security Considerations

### Current Implementation
- ✅ User-specific post/comment management
- ✅ Secret code authentication
- ✅ Environment variable protection

### Future Enhancements
- 🔄 Implement Supabase Row Level Security (RLS)
- 🔄 Hash passwords with bcrypt
- 🔄 Add rate limiting
- 🔄 Implement proper JWT tokens
- 🔄 Add email verification

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for RLS examples.

## 🐛 Troubleshooting

### Common Issues

**"Cannot find .env.local"**
```bash
cp .env.local.example .env.local
# Then edit with your credentials
```

**"Blank page or Loading screen"**
- Verify `.env.local` exists with correct credentials
- Check browser console (F12) for errors
- Ensure Supabase project is active

**"Failed to create post"**
- Check that you're logged in
- Verify database tables exist
- Check browser console for detailed error

**"Posts not showing up"**
- Refresh the page
- Check Supabase database directly
- Verify user ID matches in database

See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for more troubleshooting.

## 🤝 Contributing

To contribute improvements:

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request with description

## 📚 Documentation

- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Complete database setup and schema
- **[ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)** - Detailed environment configuration
- **[Supabase Docs](https://supabase.com/docs)** - Official Supabase documentation
- **[React Docs](https://react.dev)** - React framework documentation
- **[Vite Docs](https://vitejs.dev)** - Vite build tool documentation

## 📦 Dependencies

### Runtime
- **react** ^19.1.0 - UI framework
- **react-dom** ^19.1.0 - React DOM rendering
- **react-router-dom** ^7.7.1 - Client-side routing
- **@supabase/supabase-js** ^2.53.0 - Supabase client

### Development
- **vite** ^7.0.4 - Build tool and dev server
- **eslint** ^9.30.1 - Code quality
- **@vitejs/plugin-react** ^4.6.0 - React support for Vite

## 📄 License

Licensed under the Apache License 2.0. See LICENSE file for details.

Original project by [Lyn Larson](https://github.com/Lyn-Solarn)
Enhanced edition maintained for Kelp Your Neighbor 2026

## 🌟 Credits

- **Original Creator**: Lyn Larson
- **Framework**: React + Vite
- **Backend**: Supabase + PostgreSQL
- **UI/UX Improvements**: Enhanced Edition 2026

## 📞 Support

For issues and questions:

1. Check the troubleshooting section above
2. Review the comprehensive documentation files
3. Check Supabase dashboard for database issues
4. Review browser console (F12) for error details

---

**Version**: 2.0 Enhanced Edition  
**Last Updated**: April 18, 2026  
**Status**: Production Ready ✅

Enjoy sharing your tidepool discoveries! 🦑🌊
