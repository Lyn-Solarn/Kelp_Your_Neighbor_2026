## Otter Dollmaker Implementation - Setup Guide

### ✅ Completed Implementation
1. **DollmakerPage.jsx** created at `src/pages/DollmakerPage.jsx`
   - Allows users to select from 4 otter colors (blue, brown, green, pink)
   - Toggle accessories on/off (hat, bow tie, glasses)
   - Preview the combined otter image
   - Save as profile picture with one click
   - Uploads to Supabase and updates user profile

2. **Routes & Navigation**
   - Added `/dollmaker` route in App.jsx
   - Added "Customize otter avatar" link in ProfilePage.jsx
   - Dev server running at http://127.0.0.1:5173/

3. **Avatar Display Integration**
   - Updated Card.jsx to display user avatar_url with fallback to placeholder
   - Updated FullCard.jsx for avatar display
   - Updated ProfilePage.jsx to show user avatar and link to dollmaker
   - Updated PublicProfilePage.jsx to fetch and display user avatars
   - Updated FullPost.jsx to fetch and pass avatar_url
   - Updated PostFeed.jsx to fetch avatar_url for all posts
   - Updated PostModal.jsx to pass avatar through to FullCard
   - Updated App.jsx sidebar to show user avatar
   - Updated demo data to include avatar_url fields

4. **Backend Support**
   - Updated supabase-avatar-upload.js to use 'user' table instead of 'profiles'
   - Installed html2canvas for image capture

### 📋 Remaining Setup Tasks

#### 1. Create Accessory Images (if not already added)
The DollmakerPage expects these PNG files in `/public/accessories/`:
- `hat.png` - Small 80x80px hat accessory
- `bowtie.png` - Small 60x60px bow tie
- `glasses.png` - Small 70x70px glasses

These are used as overlay layers on the base otter. Create simple placeholder PNGs or design custom accessories.

**Note:** The 4 otter base colors are already in public/:
- `otterprofile-blue.png`
- `otterprofile-brown.png`
- `otterprofile-green.png`
- `otterprofile-pink.png`

#### 2. Verify Supabase Schema (if using live database)
Ensure your 'user' table in Supabase has:
- `id` (UUID primary key)
- `username` (text)
- `avatar_url` (text, nullable)
- Other existing fields (created_at, secret_code, etc.)

If the column doesn't exist, add it:
```sql
ALTER TABLE "user" ADD COLUMN avatar_url text;
```

#### 3. Verify Supabase Storage
Ensure the "avatars" bucket exists in Supabase Storage with proper permissions:
- Make the bucket public so saved otters are visible
- Or configure RLS policy to allow users to access their own avatars

#### 4. Test the Dollmaker
1. Start dev server: `npm run dev`
2. Navigate to http://127.0.0.1:5173/
3. Go to /profile
4. Click "Customize otter avatar" 
5. Select a color, toggle accessories, click "Save as Profile Picture"
6. Verify the image uploads and displays in your profile
7. Check that it appears on public profiles and post feeds

### 🎨 Customization Options
**To add more colors:**
- Add more `otterprofile-*.png` files to `/public/`
- Update DollmakerPage.jsx `colors` array

**To add more accessories:**
- Add accessory PNG files to `/public/accessories/`
- Update DollmakerPage.jsx `accessories` array
- Add corresponding conditional rendering with proper positioning

**To adjust avatar size/styling:**
- Edit the inline styles in DollmakerPage.jsx
- Modify the preview container dimensions and positioning

### 🔍 Key Files Modified
- src/pages/DollmakerPage.jsx (NEW)
- src/App.jsx
- src/components/Card.jsx
- src/components/FullCard.jsx
- src/components/PostFeed.jsx
- src/components/PostModal.jsx
- src/pages/ProfilePage.jsx
- src/pages/PublicProfilePage.jsx
- src/pages/FullPost.jsx
- src/supabase-avatar-upload.js
- src/data/demoContent.js
- package.json (added html2canvas)

### 📚 How It Works
1. User visits /dollmaker
2. Selects base color (loads corresponding otter PNG)
3. Toggles accessories (overlays additional PNG layers)
4. Clicks "Save as Profile Picture"
5. html2canvas captures the layered image as PNG blob
6. Blob uploaded to Supabase storage ("avatars" bucket)
7. Public URL returned and stored in user.avatar_url
8. User's profile now displays the custom otter avatar everywhere:
   - In post feeds
   - On their profile page
   - On other users' profiles
   - In comments
   - In sidebar

### ✨ Future Enhancements
- Drag & drop positioning for accessories
- Color picker for custom colors
- Save multiple otter designs
- Share otter designs with other users
- Otter animation/character progression system
- More accessory categories (backgrounds, patterns, etc.)
