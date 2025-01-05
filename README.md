# SocialCraft - AI-Powered Social Media Content Generator

SocialCraft is a modern web application that helps content creators generate optimized social media content using AI technology.

## Features

- 🤖 AI-powered content generation for multiple platforms
- 📱 Platform-specific content formatting
- 🔐 Secure user authentication
- 💰 Points-based generation system
- 📊 Content history tracking
- 🎨 Modern, responsive design

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Animations:** Framer Motion
- **Database:** PostgreSQL with Drizzle ORM
- **Authentication:** Clerk.js
- **AI Integration:** Google Gemini API

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/socialcraft.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
DATABASE_URL=your_database_url
GEMINI_KEY=your_gemini_api_key
SIGNING_SECRET=your_clerk_signing_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.



## Scripts

### DATABASE

npm run db:push

 - Push database changes


npm run db:studio

 - Open Drizzle Studio