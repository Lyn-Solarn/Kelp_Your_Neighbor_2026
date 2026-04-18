# Web Development Final Project - *Nudi Noted*

**[📖 READ THE ENHANCED VERSION GUIDE](./README_ENHANCED.md)** ← Click here for the complete enhanced version documentation!

Submitted by: **Lyn Larson**

Enhanced Edition 2026: Production-ready improvements and comprehensive documentation.

This web app: **A social media site that allows users to post about their tidepool findings. Users can then comment on posts to continue the conversation.**

Time spent: **15** hours (original) + Enhanced Edition improvements

---

## 🆕 What's New

This enhanced edition includes:

- ✅ **Better UI/UX** - Modern responsive design
- ✅ **Error Handling** - Comprehensive error messages and validation
- ✅ **Loading States** - Better user feedback during operations
- ✅ **Enhanced Profile** - Stats and personal post management
- ✅ **Production Ready** - Ready for deployment to production
- ✅ **Full Documentation** - Setup guides and database schemas
- ✅ **Accessibility** - ARIA labels and semantic HTML
- ✅ **Code Quality** - ESLint configured
- ⭐ **Supabase Integration** - Proper client configuration

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup Supabase (see DATABASE_SETUP.md)
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Create database (SQL in DATABASE_SETUP.md)

# 4. Run locally
npm run dev
```

See **[ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)** for detailed instructions.

---

## 📚 Documentation

- **[README_ENHANCED.md](./README_ENHANCED.md)** - Complete project overview (START HERE!)
- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Database schema and Supabase setup
- **[ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)** - Local development setup
- **[.env.local.example](./.env.local.example)** - Environment variables template

---

## Required Features

The following **required** functionality is completed:

- [X] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [X] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [X] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [X] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [X] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

## Optional Features

The following **optional** features are implemented:

- [X] Web app implements pseudo-authentication
  - Users can only edit and delete posts or delete comments by entering the secret key, which is set by the user during post creation
  - **or** upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them
  - For both options, only the original user author of a post can update or delete it
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post
  - Users can repost a previous post by referencing its post ID
  - On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface
  - e.g., selecting the color scheme or showing the content and image of each post on the home feed
- [ ] Users can add more characteristics to their posts
  - Users can share and view web videos
  - Users can set flags such as "Question" or "Opinion" while creating a post
  - Users can filter posts by flags on the home feed
- [ ] Users can upload images directly from their local machine as an image file
- [X] Web app displays a loading animation whenever data is being fetched

## Additional Enhancements (Not Required)

- [✨] Enhanced responsive design for mobile and tablet
- [✨] Improved error handling with user-friendly messages
- [✨] Better form validation with feedback
- [✨] User profile with statistics and post management
- [✨] Better visual design with modern colors and spacing
- [✨] Accessibility improvements (ARIA labels, semantic HTML)
- [✨] Production-ready code organization
- [✨] Comprehensive documentation for developers

---

## Video Walkthrough

[Original Walkthrough Video](https://camo.githubusercontent.com/65063e08feec04e1792be424312d948c1f6762291b2411f07e5653d6902170f6/68747470733a2f2f692e696d6775722e636f6d2f49774a6c6267662e676966)

GIF created with [ezgif](https://ezgif.com/)

---

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0 + Vite 7.0.4
- **Routing**: React Router v7.7.1
- **Database**: Supabase (PostgreSQL)
- **Styling**: Modern CSS with responsive design
- **Build Tool**: Vite
- **Code Quality**: ESLint

---

## 🚀 Deployment

Ready to deploy? Build the production bundle:

```bash
npm run build
npm run preview  # Test production build
```

Supports deployment to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any traditional hosting

---

## Notes

- Hardest part of programming this was making sure the pseudo-authentication worked correctly
- Supabase is an excellent choice for this project - simple, scalable, and free tier is generous
- See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for detailed setup instructions

---

## License

```
Copyright [2026] [Lyn Larson + Enhanced Edition Contributors]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
  - Users can upload images directly from their local machine as an image file
- [ ] Web app displays a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

![Walkthrough Video](https://i.imgur.com/IwJlbgf.gif)

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

- Hardest part of programming this was making sure the pseudo-authentication worked correctly

## License

    Copyright [2025] [Lyn Larson]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.