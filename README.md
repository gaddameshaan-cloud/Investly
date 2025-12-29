# Investly - Finance Education Platform

A comprehensive, scalable web and mobile finance education platform designed for middle school students and beyond. Learn personal finance, investing, and economics through structured curriculum, AI-powered tutoring, and interactive assessments.

## 🎯 Features

### Comprehensive Curriculum
- **170+ Lessons** across three difficulty levels
- **Beginner Level (40 lessons)**: Money basics, saving, budgeting, banking, credit, interest rates
- **Intermediate Level (70 lessons)**: Stock market, bonds, ETFs, retirement accounts, compound interest, economic cycles
- **Advanced Level (60 lessons)**: Technical analysis, options, futures, real estate, algorithmic trading, behavioral finance

### AI-Powered Learning
- **Personal AI Tutor**: Get instant answers to finance questions
- **Performance Analysis**: AI analyzes quiz results and identifies weaknesses
- **Personalized Study Plans**: Custom learning paths based on goals and time availability
- **Adaptive Difficulty**: Content adjusts based on user progress

### Progress Tracking & Analytics
- **Detailed Dashboard**: Track lessons completed, quiz scores, and time spent
- **Visual Analytics**: Charts and graphs showing progress by level
- **Achievement System**: Earn badges and milestones
- **Performance Insights**: Identify strengths and areas for improvement

### Interactive Assessments
- **Quizzes**: Test knowledge after each lesson
- **Scenario-Based Tasks**: Apply concepts to real-world situations
- **Instant Feedback**: Get immediate results and explanations
- **Progress Requirements**: 70% passing score to advance

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd investly
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```
PORT=3001
JWT_SECRET=your_secure_jwt_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

4. **Initialize the database**
```bash
npm run migrate
```

5. **Seed the curriculum**
After starting the server, make a POST request to:
```
POST http://localhost:3001/api/lessons/seed
```

6. **Start the development servers**
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3001`
- Frontend development server on `http://localhost:3000`

## 📁 Project Structure

```
investly/
├── src/
│   ├── client/              # React frontend
│   │   ├── pages/           # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LessonView.jsx
│   │   │   ├── QuizView.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── AITutor.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── server/              # Express backend
│       ├── routes/          # API routes
│       │   ├── auth.js
│       │   ├── lessons.js
│       │   ├── progress.js
│       │   ├── quizzes.js
│       │   ├── ai.js
│       │   └── analytics.js
│       ├── database/        # Database setup
│       │   ├── db.js
│       │   └── migrate.js
│       ├── data/            # Curriculum data
│       │   ├── curriculum.js
│       │   ├── beginner-curriculum.js
│       │   ├── intermediate-curriculum.js
│       │   └── advanced-curriculum.js
│       ├── middleware/      # Auth middleware
│       │   └── auth.js
│       └── index.js
│
├── package.json
├── vite.config.js
└── README.md
```

## 🎓 Curriculum Overview

### Beginner Level (40 Lessons)
Topics include:
- What is money and currency history
- Earning money and income types
- Needs vs wants
- Saving strategies and compound interest
- Budgeting and expense tracking
- Bank accounts (checking and savings)
- Credit cards and debit cards
- Understanding interest rates
- Good debt vs bad debt
- Introduction to investing
- Risk vs reward
- Inflation and cost of living
- Taxes basics
- Financial institutions
- Building good financial habits

### Intermediate Level (70 Lessons)
Topics include:
- Stock market fundamentals
- How stocks work and stock indices
- Bonds and bond types
- ETFs and mutual funds
- Diversification and asset allocation
- Understanding risk and return
- Retirement accounts (401k, IRA, Roth)
- Economic cycles and market phases
- Reading financial statements
- Key financial ratios
- Dividend investing
- Growth vs value investing
- Index fund investing
- Dollar-cost averaging
- Rebalancing portfolios
- Tax-advantaged investing
- Capital gains taxes
- Market volatility management
- Portfolio construction strategies
- Expense ratios and fees
- Active vs passive investing
- Sector and international investing
- Market orders and trading
- Beta and volatility
- Correlation and diversification
- Risk-adjusted returns
- Sequence of returns risk
- The 4% rule
- HSA, 529, and brokerage accounts
- Bond investing strategies
- Yield curves and interest rate risk
- Lifecycle investing
- Financial independence milestones
- Side hustles and income growth
- Salary negotiation
- Stock options and RSUs
- Career planning
- Market efficiency
- Behavioral biases
- Investment policy statements
- Cryptocurrency basics
- Alternative investments
- Estate planning basics
- Insurance and risk management
- Fraud protection
- Building wealth through consistency

### Advanced Level (60 Lessons)
Topics include:
- Technical analysis fundamentals
- Fundamental analysis deep dive
- Options trading basics and strategies
- Options Greeks and implied volatility
- Futures and derivatives
- Commodities and forex trading
- Quantitative analysis
- Statistical arbitrage
- High-frequency trading concepts
- Machine learning in finance
- Portfolio optimization theory
- Risk parity strategies
- Real estate valuation and financing
- Commercial real estate
- Real estate syndication
- Tax strategies for real estate
- Merger and convertible arbitrage
- Fixed income arbitrage
- Distressed debt investing
- Private equity fundamentals
- Venture capital investing
- Hedge fund strategies
- Global macro investing
- Market neutral strategies
- Behavioral finance applications
- Sentiment analysis
- Market microstructure
- International portfolio management
- Emerging and frontier markets
- Currency risk management
- Interest rate derivatives
- Credit default swaps
- Structured products
- Asset-backed securities
- CDOs
- Tax-loss harvesting strategies
- Asset location optimization
- Roth conversion strategies
- Mega backdoor Roth
- Donor-advised funds
- Qualified charitable distributions
- Trust structures
- Family office strategies
- Concentrated stock positions
- Alternative minimum tax planning
- Retirement income planning
- Social Security optimization
- Annuities in retirement

## 🤖 AI Integration

The platform uses OpenAI's GPT-4 for:
- **Natural Language Q&A**: Ask any finance question in plain English
- **Performance Analysis**: AI reviews quiz history and provides insights
- **Study Plan Generation**: Creates personalized learning schedules
- **Concept Explanations**: Breaks down complex topics for students

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to existing account

### Lessons
- `GET /api/lessons` - Get all lessons (optional: ?level=beginner)
- `GET /api/lessons/:id` - Get specific lesson
- `POST /api/lessons/seed` - Seed curriculum data

### Progress
- `GET /api/progress` - Get user progress
- `POST /api/progress` - Save lesson completion
- `GET /api/progress/achievements` - Get user achievements

### Quizzes
- `GET /api/quizzes/lesson/:lessonId` - Get quiz for lesson
- `POST /api/quizzes/submit` - Submit quiz answers
- `GET /api/quizzes/attempts` - Get quiz history

### AI Tutor
- `POST /api/ai/chat` - Chat with AI tutor
- `POST /api/ai/analyze-performance` - Get performance analysis
- `POST /api/ai/study-plan` - Generate study plan

### Analytics
- `GET /api/analytics/dashboard` - Get comprehensive analytics

## 🎨 Design Philosophy

- **Clean & Minimalist**: Distraction-free learning environment
- **Mobile-First**: Responsive design works on all devices
- **Accessible**: Designed for younger users (ages 12+)
- **Engaging**: Gamification elements keep students motivated
- **Data-Driven**: Visual analytics show progress clearly

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Input validation

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
```
PORT=3001
JWT_SECRET=<strong-secret-key>
OPENAI_API_KEY=<your-api-key>
NODE_ENV=production
```

## 📈 Future Enhancements

- Mobile apps (iOS/Android)
- Social features (study groups, leaderboards)
- More quiz types (multiple choice, fill-in-blank, scenarios)
- Video lessons
- Interactive simulations (stock market simulator)
- Parent/teacher dashboard
- Certification system
- Multi-language support
- Offline mode
- Push notifications for study reminders

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for financial education**
