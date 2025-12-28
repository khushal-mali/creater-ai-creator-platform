# Creatr AI - Creator Platform Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Database Schema](#database-schema)
5. [Features](#features)
6. [Project Structure](#project-structure)
7. [API Routes](#api-routes)
8. [Convex Functions](#convex-functions)
9. [Components](#components)
10. [Hooks](#hooks)
11. [Configuration](#configuration)
12. [Environment Variables](#environment-variables)
13. [Getting Started](#getting-started)
14. [Deployment](#deployment)

---

## Project Overview

**Creatr AI** is a modern, AI-powered content creation platform that enables creators to write, publish, and grow their audience. The platform combines AI-assisted content generation with social features like following, likes, comments, and analytics.

### Key Capabilities

- **AI-Powered Content Generation**: Uses Google Gemini AI to generate and improve blog content
- **Rich Text Editor**: Full-featured editor with react-quill-new for content creation
- **Social Features**: Follow system, likes, comments, and engagement tracking
- **Analytics Dashboard**: Comprehensive analytics with daily views charts
- **Public Profiles**: Username-based public profiles for creators
- **Image Management**: ImageKit integration for image uploads and transformations
- **Content Feed**: Discover and explore content from creators

---

## Tech Stack

### Frontend

- **Next.js 16.1.0** - React framework with App Router
- **React 19.2.3** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **react-quill-new** - Rich text editor (React Quill fork)
- **React Chart.js 2** - Chart library for analytics
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend & Database

- **Convex** - Backend-as-a-Service with real-time database
- **Clerk** - Authentication and user management
- **Google Generative AI (Gemini)** - AI content generation
- **ImageKit** - Image hosting and transformations

### Development Tools

- **TypeScript** (via JSDoc) - Type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **React Compiler** - React optimization

---

## Architecture

### Application Flow

```
┌─────────────────┐
│   Next.js App   │
│  (App Router)   │
└────────┬────────┘
         │
         ├───► Clerk Auth ────► User Authentication
         │
         ├───► Convex ────────► Real-time Database & Functions
         │
         ├───► Gemini AI ─────► Content Generation
         │
         └───► ImageKit ──────► Image Storage & CDN
```

### Authentication Flow

1. User signs in via Clerk
2. Clerk JWT token passed to Convex
3. Convex validates token and stores/updates user in database
4. User session maintained across app

### Data Flow

1. Client components use `useConvexQuery` hook for data fetching
2. Mutations use `useConvexMutation` hook
3. Convex functions handle business logic and database operations
4. Real-time updates via Convex subscriptions

---

## Database Schema

The database uses Convex with the following tables:

### `users`

- `_id`: User ID (Convex ID)
- `name`: User's display name
- `email`: User's email address
- `tokenIdentifier`: Clerk user ID (for auth)
- `imageUrl`: Profile picture URL (optional)
- `username`: Unique username for public profiles (optional)
- `createdAt`: Timestamp
- `lastActiveAt`: Timestamp

**Indexes:**

- `by_token`: Token identifier lookup
- `by_email`: Email lookup
- `by_username`: Username lookup
- `search_name`: Full-text search on name
- `search_email`: Full-text search on email

### `posts`

- `_id`: Post ID
- `title`: Post title
- `content`: Rich text content (HTML/JSON string)
- `status`: "draft" | "published"
- `authorId`: Reference to users table
- `tags`: Array of tag strings
- `category`: Category string (optional)
- `featuredImage`: ImageKit URL (optional)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp
- `publishedAt`: Publication timestamp (optional)
- `scheduledFor`: Scheduled publication time (optional)
- `viewCount`: Number of views
- `likeCount`: Number of likes

**Indexes:**

- `by_author`: Posts by author
- `by_status`: Posts by status
- `by_published`: Published posts sorted by date
- `by_author_status`: Combined author and status
- `search_content`: Full-text search on title

### `comments`

- `_id`: Comment ID
- `postId`: Reference to posts table
- `authorId`: Reference to users table (optional)
- `authorName`: Display name
- `authorEmail`: Email (optional)
- `content`: Comment text
- `status`: "approved" | "pending" | "rejected"
- `createdAt`: Timestamp

**Indexes:**

- `by_post`: Comments for a post
- `by_post_status`: Comments by post and status
- `by_author`: Comments by author

### `likes`

- `_id`: Like ID
- `postId`: Reference to posts table
- `userId`: Reference to users table (optional)
- `createdAt`: Timestamp

**Indexes:**

- `by_post`: Likes for a post
- `by_user`: Likes by user
- `by_post_user`: Unique constraint (prevents duplicate likes)

### `follows`

- `_id`: Follow relationship ID
- `followerId`: User doing the following
- `followingId`: User being followed
- `createdAt`: Timestamp

**Indexes:**

- `by_follower`: Users followed by a user
- `by_following`: Followers of a user
- `by_relationship`: Unique constraint (prevents duplicate follows)

### `dailyStats`

- `_id`: Stats entry ID
- `postId`: Reference to posts table
- `date`: Date string (YYYY-MM-DD)
- `views`: View count for that day
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

**Indexes:**

- `by_post`: Stats for a post
- `by_date`: Stats by date
- `by_post_date`: Unique constraint per post per day

---

## Features

### 1. Content Creation

- **Rich Text Editor**: Full-featured editor with formatting options
- **AI Content Generation**: Generate blog content from title using Gemini AI
- **Content Improvement**: Enhance, expand, or simplify existing content
- **Draft System**: Auto-save drafts every 30 seconds
- **Scheduled Publishing**: Schedule posts for future publication
- **Image Upload**: Upload featured images and inline images via ImageKit
- **Tags & Categories**: Organize content with tags and categories

### 2. Social Features

- **Follow System**: Follow/unfollow creators
- **Likes**: Like/unlike posts
- **Comments**: Comment on published posts
- **Public Profiles**: Username-based public profile pages
- **Feed**: Discover content from all creators
- **Trending Posts**: View trending content based on engagement

### 3. Analytics

- **Dashboard Overview**: Total views, likes, comments, followers
- **Daily Views Chart**: 30-day view analytics
- **Post Analytics**: Individual post performance metrics
- **Recent Activity**: Track likes, comments, and follows
- **Growth Metrics**: Month-over-month growth percentages

### 4. User Management

- **Clerk Authentication**: Secure sign-in/sign-up
- **Profile Management**: Update username and profile
- **User Search**: Search users by name or email
- **Suggested Users**: AI-powered user recommendations

### 5. Public Pages

- **User Profiles**: Public profile pages at `/[username]`
- **Post Pages**: Individual post pages at `/[username]/[postId]`
- **Feed Page**: Public content discovery feed

---

## Project Structure

```
creater-ai-creator-platform/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── layout.jsx           # Auth layout
│   │   ├── sign-in/             # Sign-in page
│   │   └── sign-up/             # Sign-up page
│   ├── (public)/                 # Public route group
│   │   ├── [username]/          # User profile pages
│   │   │   ├── page.jsx         # User profile
│   │   │   ├── [postId]/        # Individual post
│   │   │   └── _components/     # Profile components
│   │   └── feed/                # Public feed
│   ├── actions/                  # Server actions
│   │   └── gemini.js            # AI content generation
│   ├── api/                      # API routes
│   │   └── imagekit/            # ImageKit upload endpoint
│   ├── dashboard/                # Dashboard routes
│   │   ├── layout.jsx           # Dashboard layout
│   │   ├── page.jsx             # Dashboard home
│   │   ├── create/              # Post creation
│   │   ├── posts/               # Post management
│   │   ├── followers/           # Followers page
│   │   └── settings/            # User settings
│   ├── ConvexClientProvider.jsx # Convex provider
│   ├── layout.js                 # Root layout
│   ├── page.jsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                    # React components
│   ├── Dashboard/                # Dashboard components
│   │   ├── post-editor.jsx      # Main editor component
│   │   ├── post-editor-content.jsx
│   │   ├── post-editor-header.jsx
│   │   ├── post-editor-settings.jsx
│   │   ├── post-card.jsx
│   │   ├── daily-views-chart.jsx
│   │   └── image-upload-modal.jsx
│   ├── Home/                     # Landing page components
│   ├── ui/                       # Reusable UI components
│   ├── header.jsx                # Main header
│   ├── custom-mouse.jsx          # Custom cursor
│   └── theme-provider.jsx        # Theme provider
├── convex/                       # Convex backend
│   ├── schema.js                 # Database schema
│   ├── auth.config.js        # Auth config
│   ├── users.js                  # User functions
│   ├── posts.js                  # Post functions
│   ├── feed.js                   # Feed functions
│   ├── likes.js                  # Like functions
│   ├── comments.js               # Comment functions
│   ├── follows.js                # Follow functions
│   ├── dashboard.js              # Analytics functions
│   └── public.js                 # Public page functions
├── hooks/                        # Custom React hooks
│   ├── use-convex-query.js       # Convex query hook
│   └── use-store-user.js         # User storage hook
├── lib/                          # Utility libraries
│   ├── utils.js                  # Utility functions
│   ├── data.js                   # Static data
│   └── imagekit.js               # ImageKit helpers
├── middleware.js                 # Next.js middleware
├── next.config.mjs               # Next.js config
├── package.json                  # Dependencies
└── README.md                     # Project readme
```

---

## API Routes

### `/api/imagekit/upload`

**Method:** POST  
**Auth:** Required (Clerk)

Uploads images to ImageKit.

**Request:**

- FormData with `file` and `fileName`

**Response:**

```json
{
  "success": true,
  "url": "https://ik.imagekit.io/...",
  "fileId": "...",
  "width": 1920,
  "height": 1080,
  "size": 123456,
  "name": "filename.jpg"
}
```

---

## Convex Functions

### Users (`convex/users.js`)

#### `store` (mutation)

Stores or updates user in database from Clerk identity.

#### `getCurrentuser` (query)

Gets the currently authenticated user.

#### `updateUsername` (mutation)

Updates user's username with validation.

**Args:**

- `username`: string (3-20 chars, alphanumeric + underscore/hyphen)

#### `getByUsername` (query)

Gets public user profile by username.

**Args:**

- `username`: string

### Posts (`convex/posts.js`)

#### `getUserDraft` (query)

Gets the current user's draft post (if exists).

#### `create` (mutation)

Creates a new post or updates existing draft.

**Args:**

- `title`: string
- `content`: string
- `status`: "draft" | "published"
- `tags`: string[] (optional)
- `category`: string (optional)
- `featuredImage`: string (optional)
- `scheduledFor`: number (optional)

#### `update` (mutation)

Updates an existing post.

**Args:**

- `id`: Post ID
- All fields from `create` (optional)

#### `getUserPosts` (query)

Gets posts by current user, optionally filtered by status.

**Args:**

- `status`: "draft" | "published" (optional)

#### `getById` (query)

Gets a single post by ID.

**Args:**

- `id`: Post ID

#### `deletePost` (mutation)

Deletes a post (author only).

**Args:**

- `id`: Post ID

### Feed (`convex/feed.js`)

#### `getFeed` (query)

Gets published posts for feed with pagination.

**Args:**

- `limit`: number (optional, default: 10)

**Returns:**

```json
{
  "posts": [...],
  "hasMore": boolean
}
```

#### `getSuggestedUsers` (query)

Gets suggested users to follow based on engagement.

**Args:**

- `limit`: number (optional, default: 10)

#### `getTrendingPosts` (query)

Gets trending posts from last 7 days.

**Args:**

- `limit`: number (optional, default: 10)

### Likes (`convex/likes.js`)

#### `toggleLike` (mutation)

Toggles like on a post.

**Args:**

- `postId`: Post ID

**Returns:**

```json
{
  "liked": boolean,
  "likeCount": number
}
```

#### `hasUserLiked` (query)

Checks if current user has liked a post.

**Args:**

- `postId`: Post ID

### Comments (`convex/comments.js`)

#### `addComment` (mutation)

Adds a comment to a post.

**Args:**

- `postId`: Post ID
- `content`: string (1-1000 chars)

#### `getPostComments` (query)

Gets approved comments for a post.

**Args:**

- `postId`: Post ID

#### `deleteComment` (mutation)

Deletes a comment (author or post owner only).

**Args:**

- `commentId`: Comment ID

### Follows (`convex/follows.js`)

#### `toggleFollow` (mutation)

Follows/unfollows a user.

**Args:**

- `followingId`: User ID

**Returns:**

```json
{
  "following": boolean
}
```

#### `isFollowing` (query)

Checks if current user is following a user.

**Args:**

- `followingId`: User ID (optional)

#### `getFollowerCount` (query)

Gets follower count for a user.

**Args:**

- `userId`: User ID

#### `getMyFollowers` (query)

Gets current user's followers with details.

**Args:**

- `limit`: number (optional, default: 20)

#### `getMyFollowing` (query)

Gets users current user is following.

**Args:**

- `limit`: number (optional, default: 20)

### Dashboard (`convex/dashboard.js`)

#### `getAnalytics` (query)

Gets analytics for current user.

**Returns:**

```json
{
  "totalViews": number,
  "totalLikes": number,
  "totalComments": number,
  "totalFollowers": number,
  "viewsGrowth": number,
  "likesGrowth": number,
  "commentsGrowth": number,
  "followersGrowth": number
}
```

#### `getRecentActivity` (query)

Gets recent activity (likes, comments, follows).

**Args:**

- `limit`: number (optional, default: 10)

#### `getPostsWithAnalytics` (query)

Gets posts with comment counts.

**Args:**

- `limit`: number (optional, default: 5)

#### `getDailyViews` (query)

Gets daily view data for last 30 days for charts.

### Public (`convex/public.js`)

#### `getPublishedPostsByUsername` (query)

Gets published posts by username.

**Args:**

- `username`: string
- `limit`: number (optional, default: 10)

#### `getPublishedPost` (query)

Gets a single published post by username and post ID.

**Args:**

- `username`: string
- `postId`: Post ID

#### `incrementViewCount` (mutation)

Increments view count and updates daily stats.

**Args:**

- `postId`: Post ID

---

## Components

### Dashboard Components

#### `PostEditor`

Main post editor component with auto-save, AI generation, and publishing.

**Props:**

- `initialData`: Post data (optional)
- `mode`: "create" | "edit"

**Features:**

- Auto-save drafts every 30 seconds
- AI content generation
- Image upload (featured and inline)
- Rich text editing
- Scheduled publishing

#### `PostCard`

Reusable post card component.

**Props:**

- `post`: Post object
- `showActions`: boolean
- `showAuthor`: boolean
- `className`: string (optional)
- `onEdit`: function (optional) - Callback when edit is clicked
- `onDelete`: function (optional) - Callback when delete is clicked
- `onDuplicate`: function (optional) - Callback when duplicate is clicked

#### `DailyViewsChart`

Chart component for displaying daily views analytics.

**Props:**

- `data`: Array of daily view data
- `isLoading`: boolean

### UI Components

Located in `components/ui/`:

- `button.jsx` - Button component
- `card.jsx` - Card component
- `dialog.jsx` - Modal dialog
- `input.jsx` - Input field
- `textarea.jsx` - Textarea
- `select.jsx` - Select dropdown
- `badge.jsx` - Badge component
- `tabs.jsx` - Tabs component
- `slider.jsx` - Slider component
- `skeleton.jsx` - Loading skeleton
- `sonner.jsx` - Toast notifications
- `dropdown-menu.jsx` - Dropdown menu
- `label.jsx` - Form label

---

## Hooks

### `useConvexQuery`

Custom hook for Convex queries with loading and error states.

**Usage:**

```javascript
const { data, isLoading, error } = useConvexQuery(api.posts.getUserPosts, {
  status: "published",
});
```

### `useConvexMutation`

Custom hook for Convex mutations with loading states.

**Usage:**

```javascript
const { mutate, isLoading, error } = useConvexMutation(api.posts.create);

await mutate({
  title: "My Post",
  content: "...",
  status: "published",
});
```

### `useStoreUser`

Hook to store user in Convex database from Clerk.

**Returns:**

- `isLoading`: boolean
- `isAuthenticated`: boolean

---

## Configuration

### Next.js Config (`next.config.mjs`)

- React Compiler enabled
- Image domains configured (Unsplash, ImageKit, Clerk)
- Dev indicators disabled

### Middleware (`middleware.js`)

- Protects `/dashboard/*` routes
- Redirects unauthenticated users to sign-in
- Uses Clerk middleware

### Convex Auth (`convex/auth.config.js`)

- Configures Clerk JWT authentication
- Uses `CLERK_JWT_ISSUER_DOMAIN` environment variable

---

## Environment Variables

### Required Variables

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=your-clerk-domain.clerk.accounts.dev

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your-public-key
IMAGEKIT_PRIVATE_KEY=your-private-key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id
```

### Setting Up Environment Variables

1. **Clerk:**
   - Sign up at https://clerk.com
   - Create a new application
   - Copy publishable key and secret key
   - Configure JWT template named "convex"
   - Get issuer domain from JWT template

2. **Convex:**
   - Sign up at https://convex.dev
   - Create a new project
   - Copy the deployment URL

3. **Google Gemini:**
   - Go to https://makersuite.google.com/app/apikey
   - Create an API key

4. **ImageKit:**
   - Sign up at https://imagekit.io
   - Get public key, private key, and URL endpoint from dashboard

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd creater-ai-creator-platform
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
CLERK_JWT_ISSUER_DOMAIN=...
NEXT_PUBLIC_CONVEX_URL=...
GEMINI_API_KEY=...
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=...
```

4. **Set up Convex:**

```bash
npx convex dev
```

This will:

- Create a Convex project (if needed)
- Push the schema
- Start the development server

5. **Run the development server:**

```bash
npm run dev
```

6. **Open the app:**
   Navigate to http://localhost:3000

### Development Workflow

1. **Database Changes:**
   - Update `convex/schema.js`
   - Run `npx convex dev` to push changes

2. **Adding New Convex Functions:**
   - Create file in `convex/` directory
   - Export query/mutation functions
   - Use in components via `api` import

3. **Adding New Pages:**
   - Create route in `app/` directory
   - Use Next.js App Router conventions

---

## Deployment

### Vercel (Recommended)

1. **Push code to GitHub**

2. **Import project in Vercel:**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Configure Convex:**
   - Set production deployment URL in Convex dashboard
   - Update `NEXT_PUBLIC_CONVEX_URL` in Vercel

4. **Configure Clerk:**
   - Add Vercel deployment URL to Clerk allowed origins
   - Update redirect URLs

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:

- Vercel: Project Settings → Environment Variables
- Other platforms: Follow their documentation

### Build Command

```bash
npm run build
```

### Start Command

```bash
npm start
```

---

## Key Features Implementation Details

### AI Content Generation

- Uses Google Gemini 2.5 Flash model
- Server action in `app/actions/gemini.js`
- Generates HTML-formatted content
- Supports content improvement (enhance, expand, simplify)

### Real-time Updates

- Convex automatically provides real-time subscriptions
- Components using `useConvexQuery` receive live updates
- No additional WebSocket setup required

### Image Management

- Images uploaded via `/api/imagekit/upload`
- Server-side upload for security
- Images stored in ImageKit CDN
- Supports transformations via URL parameters

### Auto-save Drafts

- Drafts auto-saved every 30 seconds
- Only one draft per user
- Draft automatically converted to published post on publish

### Analytics Tracking

- View counts tracked per post
- Daily stats stored in `dailyStats` table
- Analytics aggregated in dashboard queries
- Growth metrics calculated from recent activity

---

## Security Considerations

1. **Authentication:**
   - All protected routes require Clerk authentication
   - Middleware enforces authentication
   - Convex functions validate user identity

2. **Authorization:**
   - Users can only edit/delete their own posts
   - Comment deletion restricted to author or post owner
   - Follow relationships validated

3. **Image Upload:**
   - Server-side upload prevents direct client access to ImageKit keys
   - File validation on server
   - User-specific folders for organization

4. **Input Validation:**
   - Zod schemas for form validation
   - Convex value validators for function arguments
   - Content length limits enforced

---

## Troubleshooting

### Common Issues

1. **Convex connection errors:**
   - Verify `NEXT_PUBLIC_CONVEX_URL` is set correctly
   - Check Convex dashboard for deployment status

2. **Clerk authentication issues:**
   - Verify JWT template is configured correctly
   - Check `CLERK_JWT_ISSUER_DOMAIN` matches template
   - Ensure redirect URLs are configured

3. **Image upload failures:**
   - Verify ImageKit credentials
   - Check file size limits
   - Ensure API route is accessible

4. **AI generation errors:**
   - Verify Gemini API key is valid
   - Check API quota limits
   - Review error messages in console

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## License

[Add your license information here]

---

## Support

For issues and questions:

- Check the documentation
- Review existing issues
- Create an issue with detailed information

---

**Last Updated:** [Current Date]  
**Version:** 0.1.0
