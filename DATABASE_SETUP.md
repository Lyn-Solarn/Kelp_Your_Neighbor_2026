# Database Setup Guide - Kelp Your Neighbor

This application uses **Supabase** as its backend database solution. Supabase is an excellent choice for this project because it provides:

- **PostgreSQL Database**: Reliable, scalable relational database
- **Real-time Subscriptions**: Optional for real-time updates
- **Authentication**: Built-in user management (though we use custom auth)
- **RESTful API**: Easy-to-use HTTP API
- **Free Tier**: Generous free tier for development and small projects

## Why Supabase?

Supabase remains an optimal resource for this project because it:
- ✅ Provides simple REST API without complex setup
- ✅ Offers free tier with 500MB storage and 2GB bandwidth
- ✅ Has excellent JavaScript client library (`@supabase/supabase-js`)
- ✅ Supports PostgreSQL, giving you powerful query capabilities
- ✅ Allows Row Level Security (RLS) for future security enhancements
- ✅ Provides easy database backups and management

## Database Schema

Your application requires the following database tables:

### 1. `user` Table
Stores user account information and authentication data.

```sql
CREATE TABLE user (
  id BIGINT PRIMARY KEY DEFAULT gen_random_bigint(),
  username VARCHAR(255) NOT NULL UNIQUE,
  secret_code VARCHAR(255) NOT NULL,
  current_user BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Columns:**
- `id`: Unique user identifier
- `username`: User's login username (must be unique)
- `secret_code`: Password/secret code for authentication
- `current_user`: Tracks which user is currently logged in
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

### 2. `post` Table
Stores all user-created posts/notes about tidepool findings.

```sql
CREATE TABLE post (
  id BIGINT PRIMARY KEY DEFAULT gen_random_bigint(),
  posted_by BIGINT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  image VARCHAR(2000),
  pearls INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_post_posted_by ON post(posted_by);
CREATE INDEX idx_post_created_at ON post(created_at DESC);
```

**Columns:**
- `id`: Unique post identifier
- `posted_by`: Foreign key to user who created the post
- `title`: Post title (required)
- `description`: Detailed description of the finding
- `image`: URL to an external image
- `pearls`: Upvote count (starts at 0)
- `created_at`: When the post was created
- `updated_at`: When the post was last modified

### 3. `comment` Table
Stores comments/ripples on posts for community discussion.

```sql
CREATE TABLE comment (
  id BIGINT PRIMARY KEY DEFAULT gen_random_bigint(),
  posted_by BIGINT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  og_post BIGINT NOT NULL REFERENCES post(id) ON DELETE CASCADE,
  text VARCHAR(1000) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_comment_og_post ON comment(og_post);
CREATE INDEX idx_comment_posted_by ON comment(posted_by);
```

**Columns:**
- `id`: Unique comment identifier
- `posted_by`: Foreign key to user who posted the comment
- `og_post`: Foreign key to the post being commented on
- `text`: Comment content
- `created_at`: When the comment was created
- `updated_at`: When the comment was last modified

## Setup Instructions

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in with your account
3. Click "New Project"
4. Fill in project details:
   - **Name**: `kelp-your-neighbor` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to you
5. Click "Create new project"
6. Wait for the project to be created (5-10 minutes)

### Step 2: Create Database Tables

Once your project is ready:

1. In the Supabase dashboard, navigate to **SQL Editor**
2. Click "New Query"
3. Copy and paste the SQL code from the schema section above
4. Execute each CREATE TABLE statement separately (or all at once)
5. Verify tables are created in the **Table Editor**

**Alternative Method using SQL Editor:**
- Supabase provides a query editor where you can copy-paste the SQL commands above
- Execute them one by one or all together

### Step 3: Get Your API Keys

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
3. Keep these keys safe (especially the anon key in a `.env.local` file)

### Step 4: Configure Your Local Environment

See the "Environment Setup Guide" (ENVIRONMENT_SETUP.md) for detailed instructions on setting up your `.env.local` file.

## Database Relationships

```
user (1) ──< (many) post
  ├ Each user can create multiple posts
  ├ Posts are deleted when user is deleted (CASCADE)
  └
user (1) ──< (many) comment
  └ Each user can create multiple comments

post (1) ──< (many) comment
  └ Each post can have multiple comments
  └ Comments are deleted when post is deleted (CASCADE)
```

## Security Considerations

### Current Setup (Production Ready with Caveats)
- ✅ Uses secret_code for basic authentication
- ✅ Only the post creator can edit/delete their posts
- ❌ Secret codes are stored as plain text (consider hashing in production)
- ❌ No Row Level Security (RLS) policies yet

### Future Enhancements

For a production-ready application with enhanced security:

```sql
-- Enable Row Level Security
ALTER TABLE user ENABLE ROW LEVEL SECURITY;
ALTER TABLE post ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view their own data"
ON user FOR SELECT
USING (id = auth.uid());

-- Users can only edit their own posts
CREATE POLICY "Users can edit their own posts"
ON post FOR UPDATE
USING (posted_by = auth.uid());

-- Users can only delete their own posts
CREATE POLICY "Users can delete their own posts"
ON post FOR DELETE
USING (posted_by = auth.uid());
```

## Backup Strategy

Supabase automatically backs up your data, but for important applications:

1. Go to **Settings** → **Backups**
2. Enable automated backups (Daily recommended)
3. Periodically export your data as CSV/JSON

## Monitoring Usage

In **Settings** → **Usage**, you can monitor:
- Database storage
- API calls
- Realtime connections
- File storage (if enabled)

The free tier includes:
- 500 MB database space
- 2 GB bandwidth
- Unlimited API calls (with fair usage policy)

## Troubleshooting

### Tables Not Showing Up
- Refresh the Supabase dashboard
- Check the SQL Editor for error messages
- Verify you executed all CREATE TABLE statements

### Connection Errors
- Double-check your environment variables in `.env.local`
- Ensure the Supabase project is not paused
- Verify your internet connection

### Permission Errors
- Check that the `posted_by` user ID exists in the `user` table
- Verify foreign key references are correct

## Next Steps

1. Complete the environment setup (see ENVIRONMENT_SETUP.md)
2. Run `npm install` to install dependencies
3. Start the development server: `npm run dev`
4. Test user registration and post creation

For more information, visit the [Supabase Documentation](https://supabase.com/docs)
