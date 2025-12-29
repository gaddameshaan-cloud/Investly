import express from 'express';
import OpenAI from 'openai';
import db from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Initialize OpenAI - hardcode temporarily to test
let openai = null;

// Try to get from environment first
let apiKey = process.env.OPENAI_API_KEY;

// If not in environment, use hardcoded (temporary for testing)
if (!apiKey || apiKey === 'your_openai_api_key_here') {
  apiKey = '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';
  console.log('⚠️ Using hardcoded API key (env not loaded)');
}

console.log('🔑 Checking OpenAI API Key...');
console.log('API Key exists:', !!apiKey);
console.log('API Key length:', apiKey?.length || 0);
console.log('API Key starts with sk-:', apiKey?.startsWith('sk-'));

if (apiKey && apiKey.startsWith('sk-')) {
  try {
    openai = new OpenAI({ apiKey });
    console.log('✅ OpenAI initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize OpenAI:', error.message);
  }
} else {
  console.log('⚠️ OpenAI API key not configured properly');
}

// Intelligent fallback responses
const getIntelligentResponse = (question) => {
  const q = question.toLowerCase();
  
  if (q.includes('compound interest')) {
    return `**Compound Interest Explained** 🚀\n\nCompound interest is when you earn interest on both your initial investment AND the interest you've already earned. It's like a snowball rolling downhill - it gets bigger and bigger!\n\n**Simple Example:**\n- You invest $1,000 at 10% annual interest\n- Year 1: You earn $100 → Total: $1,100\n- Year 2: You earn $110 (10% of $1,100) → Total: $1,210\n- Year 3: You earn $121 (10% of $1,210) → Total: $1,331\n\nNotice how your earnings grow each year? That's the power of compound interest!\n\n**The Formula:** A = P(1 + r/n)^(nt)\n- A = Final amount\n- P = Principal (starting amount)\n- r = Interest rate\n- n = Times compounded per year\n- t = Number of years\n\n**Pro Tip:** Start investing early! Even small amounts can grow significantly over time thanks to compound interest.`;
  }
  
  if (q.includes('stock') && q.includes('bond')) {
    return `**Stocks vs Bonds: Key Differences** 📊\n\n**STOCKS (Equities)**\n✅ Ownership: You own a piece of the company\n✅ Returns: Potentially higher (10% average historically)\n✅ Risk: Higher - value can fluctuate significantly\n✅ Income: Dividends (not guaranteed)\n✅ Best for: Long-term growth, younger investors\n\n**BONDS (Fixed Income)**\n✅ Ownership: You're lending money to a company/government\n✅ Returns: Lower but more predictable (3-5% typically)\n✅ Risk: Lower - more stable\n✅ Income: Regular interest payments\n✅ Best for: Stability, income, older investors\n\n**Think of it this way:**\n- Stocks = Buying a slice of pizza shop (you profit when it succeeds)\n- Bonds = Lending money to pizza shop (they pay you back with interest)\n\n**Diversification Tip:** Most investors hold BOTH stocks and bonds to balance risk and reward!`;
  }
  
  if (q.includes('start investing') || q.includes('beginner invest')) {
    return `**How to Start Investing as a Beginner** 🌱\n\n**Step 1: Build Your Foundation**\n- Save 3-6 months of expenses (emergency fund)\n- Pay off high-interest debt (credit cards)\n- Understand your risk tolerance\n\n**Step 2: Choose Your Account**\n- **401(k)**: Through your employer (get the match!)\n- **IRA**: Individual Retirement Account (tax advantages)\n- **Brokerage Account**: For general investing\n\n**Step 3: Start Simple**\n- **Index Funds**: Own a piece of the entire market (S&P 500)\n- **ETFs**: Like index funds but trade like stocks\n- **Target-Date Funds**: Automatically adjust as you age\n\n**Step 4: Key Principles**\n✅ Start small - even $50/month adds up!\n✅ Invest regularly (dollar-cost averaging)\n✅ Think long-term (10+ years)\n✅ Don't try to time the market\n✅ Diversify your investments\n\n**Beginner-Friendly Apps:**\n- Vanguard, Fidelity, Charles Schwab (traditional)\n- Robinhood, Webull (mobile-first)\n- Acorns (automatic investing)\n\n**Remember:** Time in the market beats timing the market!`;
  }
  
  if (q.includes('saving money') || q.includes('save money')) {
    return `**Best Strategies for Saving Money** 💰\n\n**The 50/30/20 Rule**\n- 50% Needs (rent, food, utilities)\n- 30% Wants (entertainment, dining out)\n- 20% Savings & Debt\n\n**Top Saving Strategies:**\n\n**1. Pay Yourself First** 🏆\nSet up automatic transfers to savings on payday\n\n**2. Track Your Spending** 📱\nUse apps like Mint, YNAB, or simple spreadsheets\n\n**3. Cut the Big Three** 🏠🚗🍔\n- Housing: Consider roommates or cheaper area\n- Transportation: Public transit, bike, carpool\n- Food: Cook at home, meal prep\n\n**4. Use the 24-Hour Rule** ⏰\nWait 24 hours before non-essential purchases\n\n**5. Automate Everything** 🤖\n- Bills (avoid late fees)\n- Savings (you won't miss it)\n- Investments (consistent growth)\n\n**Quick Wins:**\n- Cancel unused subscriptions\n- Use cashback apps\n- Buy generic brands\n- Negotiate bills (internet, phone)\n\n**Remember:** Small savings add up! Saving $5/day = $1,825/year!`;
  }
  
  return `Great question about finance! 💡\n\nI'd love to help you understand this topic better. Here's what I can explain in detail:\n\n**Popular Topics I Cover:**\n📊 Compound Interest & Investment Growth\n💰 Stocks, Bonds, and ETFs\n🏦 Saving Strategies & Budgeting\n💳 Credit Cards & Building Credit\n🎯 Retirement Planning (401k, IRA, 4% Rule)\n📈 Investment Strategies for Beginners\n\n**Try asking me:**\n- "Explain compound interest in simple terms"\n- "What's the difference between stocks and bonds?"\n- "How should I start investing as a beginner?"\n- "What are the best strategies for saving money?"\n\nI'm here to make finance easy to understand! What specific topic would you like to explore?`;
};

// Dynamic chat with conversation history
router.post('/chat', authenticateToken, async (req, res) => {
  const { message, history } = req.body;

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    if (!openai) {
      console.log('⚠️ OpenAI not configured');
      return res.json({ 
        response: `⚠️ **AI Tutor in Demo Mode**\n\nTo enable full AI capabilities, add your OpenAI API key to the .env file.\n\nHere's a helpful response:\n\n${getIntelligentResponse(message)}`
      });
    }

    const systemPrompt = `You are an expert finance tutor helping students learn about personal finance, investing, and economics. 

Your teaching style:
- Explain concepts clearly with real-world examples
- Use analogies and stories to make complex topics simple
- Be encouraging and supportive
- Use emojis sparingly but effectively
- Break down complex topics into digestible parts
- Provide actionable advice when appropriate
- Keep responses conversational and engaging
- Remember context from previous messages in the conversation

Topics you cover:
- Personal finance (budgeting, saving, credit, debt management)
- Investing (stocks, bonds, ETFs, mutual funds, retirement accounts)
- Economics (supply/demand, inflation, interest rates, GDP)
- Financial planning and goal setting
- Risk management and insurance
- Cryptocurrency and modern finance
- Career and income strategies

Always be accurate, helpful, and age-appropriate for students aged 12-18.`;

    // Build messages array with conversation history
    const messages = [
      { role: "system", content: systemPrompt }
    ];

    // Add conversation history (last 10 messages to keep context manageable)
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      recentHistory.forEach(msg => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      });
    }

    // Add current message
    messages.push({ role: "user", content: message });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.8,
      max_tokens: 800,
      presence_penalty: 0.6,
      frequency_penalty: 0.3
    });

    const response = completion.choices[0].message.content;
    console.log('✅ OpenAI API response received');

    // Save interaction to database
    db.run(
      'INSERT INTO ai_interactions (user_id, question, response, context) VALUES (?, ?, ?, ?)',
      [req.user.id, message, response, null],
      (err) => {
        if (err) console.error('Database error:', err);
      }
    );

    res.json({ response });

  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    
    if (error.status === 401) {
      return res.json({ 
        response: `⚠️ **API Key Issue**\n\nThe OpenAI API key is invalid. Please check your .env file.\n\nHere's a helpful response:\n\n${getIntelligentResponse(message)}`
      });
    } else if (error.status === 429) {
      return res.json({ 
        response: `⚠️ **Rate Limit Reached**\n\nToo many requests. Please try again in a moment.\n\nHere's a helpful response:\n\n${getIntelligentResponse(message)}`
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to process message',
      response: getIntelligentResponse(message)
    });
  }
});

router.post('/analyze-performance', authenticateToken, async (req, res) => {
  db.all(
    `SELECT qa.score, qa.completed_at, l.title, l.level 
     FROM quiz_attempts qa 
     JOIN quizzes q ON qa.quiz_id = q.id 
     JOIN lessons l ON q.lesson_id = l.id 
     WHERE qa.user_id = ? 
     ORDER BY qa.completed_at DESC LIMIT 10`,
    [req.user.id],
    async (err, attempts) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      const analysis = generatePerformanceAnalysis(attempts);
      res.json({ analysis });
    }
  );
});

function generatePerformanceAnalysis(attempts) {
  if (!attempts || attempts.length === 0) {
    return `**📊 Performance Analysis**\n\nI don't see any quiz attempts yet! Here's how to get started:\n\n**Next Steps:**\n1. ✅ Complete lessons in the Dashboard\n2. 📝 Take quizzes to test your knowledge\n3. 📈 Track your progress over time\n\n**Tips for Success:**\n- Start with Beginner level lessons\n- Take notes while learning\n- Review material before quizzes\n- Don't rush - understanding is key!\n\nReady to begin your finance journey? Head to the Dashboard and start with your first lesson! 🚀`;
  }

  const avgScore = attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length;
  const recentScores = attempts.slice(0, 3).map(a => a.score);
  const trend = recentScores.length >= 2 && recentScores[0] > recentScores[recentScores.length - 1] ? 'improving' : 
                recentScores.length >= 2 && recentScores[0] < recentScores[recentScores.length - 1] ? 'declining' : 'stable';
  
  const levels = [...new Set(attempts.map(a => a.level))];
  const strongAreas = attempts.filter(a => a.score >= 80).map(a => a.title);
  const needsWork = attempts.filter(a => a.score < 70).map(a => a.title);

  let analysis = `**📊 Your Performance Analysis**\n\n`;
  analysis += `**Overall Performance:** ${avgScore.toFixed(1)}% Average Score\n`;
  analysis += avgScore >= 90 ? '🌟 Outstanding!' : avgScore >= 80 ? '🎯 Great work!' : avgScore >= 70 ? '👍 Good progress!' : '💪 Keep pushing!';
  analysis += `\n\n**Recent Trend:** ${trend === 'improving' ? '📈 Improving - Keep it up!' : trend === 'declining' ? '📉 Needs attention' : '➡️ Consistent'}\n\n`;
  analysis += `**Completed Quizzes:** ${attempts.length}\n`;
  analysis += `**Levels Attempted:** ${levels.join(', ')}\n\n`;

  if (strongAreas.length > 0) {
    analysis += `**💪 Strong Areas:**\n${strongAreas.slice(0, 3).map(t => `- ${t}`).join('\n')}\n\n`;
  }

  if (needsWork.length > 0) {
    analysis += `**📚 Areas to Review:**\n${needsWork.slice(0, 3).map(t => `- ${t}`).join('\n')}\n\n`;
    analysis += `**Recommendations:**\n1. Review the lessons for topics you scored below 70%\n2. Take practice quizzes to reinforce learning\n3. Use the AI Tutor to ask questions about challenging concepts\n\n`;
  } else {
    analysis += `**Recommendations:**\n1. Challenge yourself with higher difficulty levels\n2. Explore advanced topics\n3. Help others by explaining concepts you understand well\n\n`;
  }

  analysis += `**Next Steps:**\n`;
  analysis += avgScore < 70 ? '- Focus on fundamentals before moving to advanced topics\n' : avgScore < 85 ? '- You are ready for intermediate challenges!\n' : '- Excellent! Try advanced level content\n';
  analysis += `- Set a goal to improve by 5-10% on your next quiz\n`;
  analysis += `- Study for 15-20 minutes daily for best results\n\n`;
  analysis += `Keep up the great work! 🚀`;

  return analysis;
}

router.post('/study-plan', authenticateToken, async (req, res) => {
  const { goals, timeAvailable, currentLevel } = req.body;
  const studyPlan = generateStudyPlan(currentLevel, timeAvailable, goals);
  res.json({ studyPlan });
});

function generateStudyPlan(level, hours, goals) {
  const dailyTime = Math.floor((hours * 60) / 7);
  
  let plan = `**📚 Your Personalized Study Plan**\n\n`;
  plan += `**Current Level:** ${level.charAt(0).toUpperCase() + level.slice(1)}\n`;
  plan += `**Weekly Time:** ${hours} hours (${dailyTime} min/day)\n`;
  plan += `**Goal:** ${goals}\n\n`;
  plan += `---\n\n**🗓️ Weekly Schedule**\n\n`;
  plan += `**Monday - Foundation Day** (${dailyTime} min)\n`;
  plan += `- Review core concepts\n- Complete one lesson\n- Take notes\n\n`;
  plan += `**Tuesday - Practice** (${dailyTime} min)\n`;
  plan += `- Work through examples\n- Complete practice problems\n\n`;
  plan += `**Wednesday - Quiz Day** (${dailyTime} min)\n`;
  plan += `- Take quizzes on recent topics\n- Review incorrect answers\n\n`;
  plan += `**Thursday - New Material** (${dailyTime} min)\n`;
  plan += `- Start new lesson\n- Watch supplementary videos\n\n`;
  plan += `**Friday - Application** (${dailyTime} min)\n`;
  plan += `- Apply concepts to real scenarios\n- Use AI Tutor for questions\n\n`;
  plan += `**Weekend - Review** (${dailyTime * 2} min)\n`;
  plan += `- Weekly review session\n- Plan next week\n\n`;
  plan += `---\n\n**💡 Study Tips**\n\n`;
  plan += `✅ Consistency beats intensity\n`;
  plan += `✅ Take breaks every 25 minutes\n`;
  plan += `✅ Teach concepts to others\n`;
  plan += `✅ Track your progress\n\n`;
  plan += `**🚀 Ready to Start?**\n\nHead to the Dashboard and begin your first lesson! You've got this! 💪`;

  return plan;
}

export default router;
