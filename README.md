# Get Me A Chai

A modern crowdfunding platform for creators, artists, developers, and content makers. Get Me A Chai enables fans and followers to support creators directly through secure payment processing.

## Features

- **Custom User Profiles**: Create unique profiles with custom usernames, profile pictures, and cover images
- **Secure Payment Processing**: Integrated with Razorpay for seamless and secure payment transactions
- **Supporter Leaderboard**: Display top supporters with a leaderboard showing all contributions
- **Personal Messages**: Supporters can leave personal messages with their contributions
- **OAuth Authentication**: Sign in with Google or GitHub
- **Responsive Design**: Fully responsive design optimized for mobile, tablet, and desktop devices
- **Real-time Payment Verification**: Secure payment verification and status updates

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Toastify** - Toast notifications

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **MongoDB** - Database (via Mongoose)
- **NextAuth.js** - Authentication (GitHub OAuth)
- **Razorpay** - Payment gateway integration


## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd get-me-a-chai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Application URLs
NEXT_PUBLIC_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Setting Up Razorpay

1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your API keys from the Razorpay Dashboard
3. Users need to add their Razorpay credentials in the dashboard to receive payments

## Setting Up OAuth

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

### GitHub OAuth
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env`

## Usage

### For Creators

1. **Sign Up**: Sign in with Google or GitHub
2. **Configure Profile**: Go to Dashboard and add:
   - Your name and profile details
   - Profile picture URL
   - Cover picture URL
   - Razorpay Key ID and Secret (to receive payments)
3. **Share Your Link**: Share your profile link (`/your-username`) with your audience
4. **Receive Support**: Your supporters can now contribute to your work

### For Supporters

1. Visit a creator's profile page
2. Enter your name and a message
3. Choose an amount or enter a custom amount
4. Complete the payment via Razorpay
5. Your contribution will appear on the creator's supporter leaderboard


## Contributing

Contributions are welcomed....