# Investly

A finance education platform for students. Learn personal finance, investing, and economics through structured lessons, AI-powered tutoring, quizzes, and an analytics dashboard.

**Live Demo:** [https://investly-cyan.vercel.app](https://investly-cyan.vercel.app)

---

## Features

- **80+ lessons** across 10 modules covering budgeting, investing, stock markets, retirement accounts, and more
- **5-question quizzes** at the end of every lesson to reinforce learning
- **AI Tutor** powered by OpenAI GPT-3.5-turbo — ask any finance question in plain English
- **Analytics dashboard** with visual progress tracking (charts via Recharts)
- **JWT authentication** — register, login, forgot/reset password, email verification
- **Onboarding questionnaire** to personalise the learning experience
- **Progress tracking** — lessons completed, quiz scores, streaks
- **Dark / light theme** toggle
- **Contact page** with a backend-handled contact form
- **Terms of Service and Privacy Policy** pages
- Deployed as a **Vercel serverless function** (zero-config, no separate server)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, React Router 6 |
| UI / Charts | Lucide React, Recharts |
| Backend | Express.js (served via Vercel serverless) |
| Database | Supabase (PostgreSQL) |
| Auth | JWT (`jsonwebtoken`), bcryptjs |
| AI | OpenAI API (GPT-3.5-turbo) |
| Deployment | Vercel |

---

## Local Development Setup

### Prerequisites

- Node.js v18+
- npm
- A [Supabase](https://supabase.com) project
- An [OpenAI](https://platform.openai.com) API key

### Steps

1. **Clone the repo**

   ```bash
   git clone https://github.com/gaddameshaan-cloud/Investly.git
   cd "investly development"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in the values (see the table below).

   ```bash
   cp .env.example .env
   ```

4. **Set up the Supabase schema**

   Run the SQL files in the `migrations/` folder against your Supabase project (via the Supabase SQL editor or the CLI).

5. **Seed the curriculum**

   ```bash
   npm run seed-supabase
   ```

6. **Start the dev servers**

   ```bash
   npm run dev
   ```

   This starts:
   - Frontend at `http://localhost:3000` (Vite)
   - Backend at `http://localhost:3003` (Express via nodemon)

---

## Environment Variables

Copy `.env.example` to `.env` and set the following:

| Variable | Description |
|----------|-------------|
| `PORT` | Port for the local Express server |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `OPENAI_API_KEY` | OpenAI API key for the AI Tutor |
| `NODE_ENV` | Runtime environment (`development` or `production`) |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (used server-side only) |
| `VITE_SUPABASE_URL` | Supabase URL exposed to the Vite client build |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key exposed to the Vite client build |

> **Never commit `.env` to version control.** Add your production values in the Vercel project dashboard under Settings → Environment Variables.

---

## Project Structure

```
investly development/
├── api/
│   └── index.js              # Vercel serverless entry point (re-exports Express app)
├── src/
│   ├── client/               # React frontend
│   │   ├── components/       # Shared UI components (Navigation, Footer, ThemeWrapper…)
│   │   ├── context/          # ThemeContext
│   │   ├── hooks/            # useSupabaseAuth, useOptimizedAuth
│   │   ├── pages/            # Route-level page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LessonView.jsx
│   │   │   ├── ModuleView.jsx
│   │   │   ├── QuizView.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── AITutor.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── OnboardingQuestionnaire.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── VerifyEmail.jsx
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   └── TermsOfService.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── lib/
│   │   └── supabase.js       # Supabase client initialisation
│   └── server/               # Express backend
│       ├── routes/           # API route handlers (auth, lessons, quizzes, progress, ai, analytics, contact…)
│       ├── middleware/       # JWT auth middleware
│       ├── data/             # Curriculum data files
│       ├── database/         # DB helpers / migration scripts
│       ├── services/         # Business logic services
│       ├── utils/            # Shared utilities
│       └── index.js          # Express app setup
├── migrations/               # SQL migration files for Supabase
├── public/                   # Static assets
├── vercel.json               # Vercel routing config
├── vite.config.js            # Vite config with API proxy for local dev
├── package.json
└── .env.example
```

---

## API Endpoints

### Authentication — `/api/auth`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/register` | Create a new account |
| POST | `/login` | Login and receive a JWT |
| POST | `/forgot-password` | Request a password reset email |
| POST | `/reset-password` | Set a new password via reset token |
| GET | `/verify-email` | Verify email address |
| GET | `/me` | Get the authenticated user's profile |

### Lessons — `/api/lessons`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | List all lessons (filter by module via query param) |
| GET | `/:id` | Get a single lesson |

### Quizzes — `/api/quizzes`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/lesson/:lessonId` | Get the quiz for a lesson |
| POST | `/submit` | Submit quiz answers and receive a score |
| GET | `/attempts` | Get the authenticated user's quiz history |

### Progress — `/api/progress`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Get the authenticated user's overall progress |
| POST | `/` | Mark a lesson as complete |

### AI Tutor — `/api/ai`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/chat` | Send a message to the AI tutor |

### Analytics — `/api/analytics`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/dashboard` | Get aggregated analytics for the dashboard |

### Other

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/contact` | Submit the contact form |
| GET | `/api/user/profile` | Get / update user profile settings |
| GET | `/health` | Health check |

---

## Vercel Deployment

The project is configured for zero-config Vercel deployment:

- **Build command:** `npm run build` (Vite produces `dist/`)
- **Output directory:** `dist`
- **Framework:** Vite (detected automatically)
- **API routing:** `vercel.json` rewrites all `/api/*` and `/health` requests to `api/index.js`, which runs as a serverless function
- All environment variables must be added in the **Vercel project dashboard** (Settings → Environment Variables) — do not commit `.env`

To deploy manually:

```bash
npm run build
vercel --prod
```

---

## License

MIT

---

*Built for financial education.*
