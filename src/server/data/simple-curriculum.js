// Complete curriculum with all 90 lessons across 10 modules
export const curriculumData = [
  // Module 1: How Money & Markets Work (Beginner)
  {
    title: "What Is Money?",
    level: "beginner",
    module_number: 1,
    lesson_number: 1,
    content: "Money is any item or verifiable record that is generally accepted as payment for goods and services and repayment of debts. The main functions of money are distinguished as: a medium of exchange, a unit of account, a store of value, and sometimes a standard of deferred payment. Throughout history, money has taken many forms including commodity money, representative money, and fiat money.",
    examples: JSON.stringify([
      "US Dollar bills serve as a medium of exchange",
      "Prices listed in dollars show money as unit of account",
      "Savings accounts store value over time",
      "Credit allows deferred payment"
    ]),
    practice_problems: JSON.stringify([
      "Identify the three main functions of money in daily transactions",
      "Explain why barter systems were replaced by money",
      "Give examples of commodity money from history"
    ]),
    estimated_time: 15,
    quiz: [
      {
        question: "What are the main functions of money?",
        options: ["Buy and sell", "Medium of exchange, unit of account, store of value", "Save and spend", "Earn and invest"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Why Inflation Exists",
    level: "beginner", 
    module_number: 1,
    lesson_number: 2,
    content: "Inflation is a general increase in prices and fall in the purchasing value of money. It occurs when the supply of money increases faster than the supply of goods and services. Central banks attempt to limit inflation and avoid deflation to keep the economy running smoothly. Moderate inflation is considered healthy for economic growth.",
    examples: JSON.stringify([
      "Coffee that cost $1 in 2000 costs $2 today",
      "Federal Reserve targets 2% annual inflation",
      "Wages typically rise with inflation over time",
      "Fixed-rate loans become cheaper with inflation"
    ]),
    practice_problems: JSON.stringify([
      "Calculate how $100 loses purchasing power with 3% annual inflation",
      "Explain why moderate inflation encourages spending",
      "Identify who benefits and who loses from inflation"
    ]),
    estimated_time: 18,
    quiz: [
      {
        question: "What causes inflation?",
        options: ["Falling prices", "Money supply growing faster than goods/services", "Decreased demand", "Lower wages"],
        correct_answer: 1
      }
    ]
  }
,
  {
    title: "How Interest Works",
    level: "beginner",
    module_number: 1,
    lesson_number: 3,
    content: "Interest is payment from a borrower or deposit-taking financial institution to a lender or depositor of an amount above repayment of the principal sum. Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus previously earned interest. Understanding interest is crucial for both borrowing and investing decisions.",
    examples: JSON.stringify([
      "Savings account earning 2% annual interest",
      "Credit card charging 18% APR on balances",
      "Mortgage loan at 4% fixed rate for 30 years",
      "Compound interest doubling money over time"
    ]),
    practice_problems: JSON.stringify([
      "Calculate simple interest on $1000 at 5% for 3 years",
      "Compare simple vs compound interest over 10 years",
      "Determine monthly payment on a $200,000 mortgage"
    ]),
    estimated_time: 20,
    quiz: [
      {
        question: "What is compound interest?",
        options: ["Interest on principal only", "Interest on principal plus previous interest", "Fixed interest rate", "Government interest"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "What Is the Financial System?",
    level: "beginner",
    module_number: 1,
    lesson_number: 4,
    content: "The financial system consists of institutions, markets, and instruments that facilitate the flow of funds in an economy. It includes banks, insurance companies, pension funds, mutual funds, and stock exchanges. The system helps channel savings into productive investments, manages risk, and provides payment mechanisms for economic transactions.",
    examples: JSON.stringify([
      "Banks accepting deposits and making loans",
      "Stock exchanges facilitating company fundraising",
      "Insurance companies pooling and managing risk",
      "Payment systems processing transactions"
    ]),
    practice_problems: JSON.stringify([
      "Trace how your bank deposit becomes a business loan",
      "Explain the role of financial intermediaries",
      "Identify different types of financial institutions"
    ]),
    estimated_time: 22,
    quiz: [
      {
        question: "What is the main purpose of the financial system?",
        options: ["Make profits", "Facilitate flow of funds in economy", "Control government", "Set prices"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Banks vs Markets",
    level: "beginner",
    module_number: 1,
    lesson_number: 5,
    content: "Banks and financial markets serve different but complementary roles in the economy. Banks act as intermediaries, taking deposits and making loans, while markets allow direct trading between buyers and sellers. Banks provide stability and relationship banking, while markets offer price discovery and liquidity. Both are essential for a healthy financial system.",
    examples: JSON.stringify([
      "Bank loan vs corporate bond issuance",
      "Savings account vs money market fund",
      "Bank credit line vs stock market IPO",
      "FDIC insurance vs market risk"
    ]),
    practice_problems: JSON.stringify([
      "Compare getting a loan from a bank vs issuing bonds",
      "Explain advantages and disadvantages of each system",
      "Identify when companies use banks vs markets"
    ]),
    estimated_time: 18,
    quiz: [
      {
        question: "How do banks differ from financial markets?",
        options: ["Banks are government-owned", "Banks act as intermediaries, markets enable direct trading", "Banks are riskier", "Banks only serve individuals"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Why People Invest",
    level: "beginner",
    module_number: 1,
    lesson_number: 6,
    content: "People invest to grow their wealth over time, beat inflation, and achieve financial goals like retirement, education, or major purchases. Investment allows money to work for you through compound returns. Without investing, money loses purchasing power due to inflation. Different investments offer different risk-return profiles to match various goals and time horizons.",
    examples: JSON.stringify([
      "Retirement savings growing from $100,000 to $500,000",
      "College fund invested for 18 years",
      "Emergency fund in high-yield savings",
      "Stock investments outpacing inflation long-term"
    ]),
    practice_problems: JSON.stringify([
      "Calculate retirement needs and required investment returns",
      "Compare keeping money in cash vs investing",
      "Match investment types to different goals"
    ]),
    estimated_time: 16,
    quiz: [
      {
        question: "Why is investing important?",
        options: ["To get rich quick", "To beat inflation and grow wealth over time", "To avoid taxes", "To impress others"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Risk vs Safety",
    level: "beginner",
    module_number: 1,
    lesson_number: 7,
    content: "All investments involve some level of risk - the possibility of losing money or not achieving expected returns. Generally, higher potential returns come with higher risk. Safe investments like government bonds offer lower returns but greater certainty. Understanding your risk tolerance and time horizon helps determine appropriate investment choices. Diversification can help manage risk.",
    examples: JSON.stringify([
      "Government bonds: low risk, low return",
      "Stocks: higher risk, higher potential return",
      "Savings accounts: very safe, very low return",
      "Diversified portfolio: moderate risk, moderate return"
    ]),
    practice_problems: JSON.stringify([
      "Assess your personal risk tolerance",
      "Match investments to different risk levels",
      "Explain the risk-return tradeoff"
    ]),
    estimated_time: 17,
    quiz: [
      {
        question: "What is the relationship between risk and return?",
        options: ["No relationship", "Higher risk generally means higher potential return", "Lower risk means higher return", "Risk doesn't matter"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Time Value of Money",
    level: "beginner",
    module_number: 1,
    lesson_number: 8,
    content: "The time value of money is the concept that money available today is worth more than the same amount in the future due to its potential earning capacity. This core principle underlies all of finance. A dollar today can be invested to earn returns, making it worth more than a dollar received later. This concept is used in present value calculations and investment decisions.",
    examples: JSON.stringify([
      "$100 today vs $100 in 10 years",
      "Present value of future cash flows",
      "Why lottery winners choose lump sum vs annuity",
      "Mortgage payments: mostly interest early on"
    ]),
    practice_problems: JSON.stringify([
      "Calculate present value of $1000 received in 5 years",
      "Compare investment options using time value",
      "Explain why early investing is so powerful"
    ]),
    estimated_time: 19,
    quiz: [
      {
        question: "Why is money today worth more than money in the future?",
        options: ["Inflation only", "It can be invested to earn returns", "Government policy", "It's not - they're equal"],
        correct_answer: 1
      }
    ]
  }
,
  // Module 2: Personal Finance Basics (Beginner)
  {
    title: "Income vs Expenses",
    level: "beginner",
    module_number: 2,
    lesson_number: 1,
    content: "Personal finance starts with understanding the difference between income (money coming in) and expenses (money going out). Income includes salary, wages, bonuses, and investment returns. Expenses include housing, food, transportation, and entertainment. The goal is to spend less than you earn, creating a surplus for saving and investing. Tracking both is essential for financial health.",
    examples: JSON.stringify([
      "Monthly salary of $4000 vs expenses of $3500",
      "Fixed expenses: rent, insurance, loan payments",
      "Variable expenses: groceries, entertainment, gas",
      "Income sources: job, side hustle, investments"
    ]),
    practice_problems: JSON.stringify([
      "Calculate your monthly income and expenses",
      "Identify areas to reduce expenses",
      "Find ways to increase income"
    ]),
    estimated_time: 16,
    quiz: [
      {
        question: "What's the fundamental rule of personal finance?",
        options: ["Spend everything you earn", "Spend less than you earn", "Only buy expensive things", "Avoid all debt"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Budgeting Without Overthinking",
    level: "beginner",
    module_number: 2,
    lesson_number: 2,
    content: "A budget is simply a plan for your money. The 50/30/20 rule provides a simple framework: 50% for needs (housing, food, utilities), 30% for wants (entertainment, dining out), and 20% for savings and debt repayment. Start simple and adjust as needed. The key is awareness of where your money goes and making intentional choices.",
    examples: JSON.stringify([
      "$3000 income: $1500 needs, $900 wants, $600 savings",
      "Needs: rent, groceries, utilities, minimum debt payments",
      "Wants: restaurants, movies, hobbies, subscriptions",
      "Savings: emergency fund, retirement, investments"
    ]),
    practice_problems: JSON.stringify([
      "Create a 50/30/20 budget with your income",
      "Categorize your expenses as needs vs wants",
      "Identify budget adjustments needed"
    ]),
    estimated_time: 18,
    quiz: [
      {
        question: "In the 50/30/20 rule, what percentage goes to savings?",
        options: ["50%", "30%", "20%", "10%"],
        correct_answer: 2
      }
    ]
  },
  {
    title: "Emergency Funds Explained",
    level: "beginner",
    module_number: 2,
    lesson_number: 3,
    content: "An emergency fund is money set aside for unexpected expenses or financial emergencies. It should cover 3-6 months of living expenses and be kept in a easily accessible account like a high-yield savings account. This fund prevents you from going into debt when unexpected costs arise and provides peace of mind and financial stability.",
    examples: JSON.stringify([
      "$2000 monthly expenses = $6000-12000 emergency fund",
      "Car repair, medical bill, job loss coverage",
      "High-yield savings account earning 4-5%",
      "Separate from other savings goals"
    ]),
    practice_problems: JSON.stringify([
      "Calculate your emergency fund target",
      "Determine monthly savings needed to build it",
      "Choose appropriate account for emergency fund"
    ]),
    estimated_time: 15,
    quiz: [
      {
        question: "How much should an emergency fund cover?",
        options: ["1 month expenses", "3-6 months expenses", "1 year expenses", "$1000 fixed amount"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Good Debt vs Bad Debt",
    level: "beginner",
    module_number: 2,
    lesson_number: 4,
    content: "Not all debt is created equal. Good debt helps you build wealth or increase income over time, like mortgages, student loans, or business loans. Bad debt is used for consumption and doesn't improve your financial position, like credit card debt for vacations or luxury items. Good debt typically has lower interest rates and tax benefits.",
    examples: JSON.stringify([
      "Good: Mortgage at 4% to buy appreciating home",
      "Good: Student loan for degree that increases earning potential",
      "Bad: Credit card debt at 18% for vacation",
      "Bad: Car loan for expensive car beyond needs"
    ]),
    practice_problems: JSON.stringify([
      "Categorize your current debts as good or bad",
      "Calculate the true cost of credit card debt",
      "Prioritize debt payoff strategy"
    ]),
    estimated_time: 17,
    quiz: [
      {
        question: "What makes debt 'good debt'?",
        options: ["Low payments", "Helps build wealth or increase income", "From a bank", "Tax deductible"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Credit Scores Explained",
    level: "beginner",
    module_number: 2,
    lesson_number: 5,
    content: "A credit score is a number (300-850) that represents your creditworthiness based on your credit history. It affects your ability to get loans and the interest rates you'll pay. Factors include payment history (35%), credit utilization (30%), length of credit history (15%), credit mix (10%), and new credit (10%). Higher scores mean better loan terms.",
    examples: JSON.stringify([
      "750+ score: excellent, best rates available",
      "Payment history: never miss payments",
      "Credit utilization: keep below 30% of limits",
      "Length of history: keep old accounts open"
    ]),
    practice_problems: JSON.stringify([
      "Check your credit score and report",
      "Identify factors affecting your score",
      "Create plan to improve credit score"
    ]),
    estimated_time: 19,
    quiz: [
      {
        question: "What's the most important factor in your credit score?",
        options: ["Credit utilization", "Payment history", "Length of history", "Types of credit"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Why Saving Alone Isn't Enough",
    level: "beginner",
    module_number: 2,
    lesson_number: 6,
    content: "While saving money is important, keeping all your money in savings accounts won't build wealth due to inflation. With inflation averaging 2-3% annually and savings accounts paying 1-2%, your purchasing power actually decreases over time. Investing is necessary to grow wealth and maintain purchasing power. Savings are for short-term goals and emergencies; investing is for long-term wealth building.",
    examples: JSON.stringify([
      "$10,000 in savings losing purchasing power to inflation",
      "Savings account: 1% return vs 3% inflation = -2% real return",
      "Stock market historical average: 10% annual returns",
      "Compound growth over decades through investing"
    ]),
    practice_problems: JSON.stringify([
      "Calculate inflation's impact on savings over 20 years",
      "Compare savings vs investment growth scenarios",
      "Determine appropriate savings vs investment allocation"
    ]),
    estimated_time: 16,
    quiz: [
      {
        question: "Why isn't saving alone sufficient for building wealth?",
        options: ["Banks are unsafe", "Inflation erodes purchasing power", "Savings accounts have fees", "It's too complicated"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Compound Interest (Simple Example)",
    level: "beginner",
    module_number: 2,
    lesson_number: 7,
    content: "Compound interest is earning interest on your interest. It's the most powerful force in building wealth over time. The earlier you start, the more time compound interest has to work. Even small amounts invested early can grow to large sums due to compounding. This is why starting to invest in your 20s is so much more powerful than waiting until your 40s.",
    examples: JSON.stringify([
      "$100/month from age 25-65 = $632,000 at 7% return",
      "$200/month from age 35-65 = $525,000 at 7% return",
      "Doubling rule: money doubles every 10 years at 7%",
      "Einstein allegedly called it the 8th wonder of the world"
    ]),
    practice_problems: JSON.stringify([
      "Calculate compound growth of $1000 over 30 years",
      "Compare starting at age 25 vs 35 vs 45",
      "Determine monthly investment needed for retirement goal"
    ]),
    estimated_time: 18,
    quiz: [
      {
        question: "What is compound interest?",
        options: ["Interest paid by banks", "Earning interest on your interest", "Government interest", "Credit card interest"],
        correct_answer: 1
      }
    ]
  }
,
  // Module 3: Stock Market Basics (Beginner) - 8 lessons
  {
    title: "What Is the Stock Market?",
    level: "beginner",
    module_number: 3,
    lesson_number: 1,
    content: "The stock market is a collection of exchanges where shares of publicly traded companies are bought and sold. It provides companies with access to capital and gives investors ownership stakes in businesses. Major exchanges include NYSE and NASDAQ. The market operates through supply and demand, with prices reflecting investor sentiment about companies' future prospects.",
    examples: JSON.stringify([
      "Apple stock trading on NASDAQ",
      "IPO: company going public for first time",
      "Market hours: 9:30 AM - 4:00 PM ET",
      "After-hours trading extending market access"
    ]),
    practice_problems: JSON.stringify([
      "Research a company's stock listing and exchange",
      "Understand market maker vs limit order book",
      "Explain how stock prices are determined"
    ]),
    estimated_time: 20,
    quiz: [
      {
        question: "What is the primary purpose of the stock market?",
        options: ["Gambling", "Provide companies capital and investors ownership", "Government revenue", "Employment"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "What a Share Represents",
    level: "beginner",
    module_number: 3,
    lesson_number: 2,
    content: "A share of stock represents partial ownership in a company. When you buy shares, you become a shareholder with certain rights including voting on company matters and receiving dividends if paid. Your ownership percentage equals your shares divided by total shares outstanding. Shareholders benefit when the company grows and prospers.",
    examples: JSON.stringify([
      "Owning 100 shares of 1 million outstanding = 0.01% ownership",
      "Voting rights in annual shareholder meetings",
      "Dividend payments as profit sharing",
      "Stock appreciation as company value grows"
    ]),
    practice_problems: JSON.stringify([
      "Calculate ownership percentage for given shares",
      "Research shareholder rights for a public company",
      "Understand difference between common and preferred stock"
    ]),
    estimated_time: 16,
    quiz: [
      {
        question: "What does owning stock represent?",
        options: ["Lending money to company", "Partial ownership in company", "Employment contract", "Government bond"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Why Stock Prices Move",
    level: "beginner",
    module_number: 3,
    lesson_number: 3,
    content: "Stock prices move based on supply and demand, which are influenced by company performance, economic conditions, investor sentiment, and market news. Positive news or strong earnings typically drive prices up, while negative developments drive them down. Market psychology, fear, and greed also play significant roles in short-term price movements.",
    examples: JSON.stringify([
      "Earnings beat expectations → stock price rises",
      "Economic recession fears → market decline",
      "New product launch → investor optimism",
      "Interest rate changes affecting all stocks"
    ]),
    practice_problems: JSON.stringify([
      "Track a stock's price movement and identify causes",
      "Analyze how news affects stock prices",
      "Understand market sentiment indicators"
    ]),
    estimated_time: 18,
    quiz: [
      {
        question: "What primarily drives stock price movements?",
        options: ["Government decisions", "Supply and demand", "Company employees", "Stock exchanges"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Market Hours Explained",
    level: "beginner",
    module_number: 3,
    lesson_number: 4,
    content: "US stock markets operate Monday through Friday, 9:30 AM to 4:00 PM Eastern Time. Pre-market trading occurs 4:00-9:30 AM and after-hours trading runs 4:00-8:00 PM. Extended hours have lower volume and wider spreads. Markets are closed on federal holidays. Global markets operate in different time zones, creating 24-hour trading opportunities.",
    examples: JSON.stringify([
      "Regular hours: 9:30 AM - 4:00 PM ET",
      "Pre-market: earnings announcements impact",
      "After-hours: lower liquidity, wider spreads",
      "Holiday closures: Christmas, Thanksgiving, etc."
    ]),
    practice_problems: JSON.stringify([
      "Calculate trading hours in your time zone",
      "Understand risks of extended hours trading",
      "Research global market trading times"
    ]),
    estimated_time: 14,
    quiz: [
      {
        question: "What are regular US stock market hours?",
        options: ["24/7", "9:30 AM - 4:00 PM ET", "8:00 AM - 5:00 PM ET", "10:00 AM - 3:00 PM ET"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Long-Term Investing vs Trading",
    level: "beginner",
    module_number: 3,
    lesson_number: 5,
    content: "Long-term investing involves buying and holding stocks for years or decades, focusing on company fundamentals and growth. Trading involves frequent buying and selling to profit from short-term price movements. Long-term investing typically has lower costs, better tax treatment, and historically better returns. Trading requires more time, skill, and often results in higher costs and taxes.",
    examples: JSON.stringify([
      "Buy and hold: Warren Buffett's approach",
      "Day trading: buying and selling same day",
      "Long-term: compound growth over decades",
      "Trading: frequent transactions and fees"
    ]),
    practice_problems: JSON.stringify([
      "Compare costs of trading vs long-term investing",
      "Analyze tax implications of each approach",
      "Research successful long-term investors"
    ]),
    estimated_time: 19,
    quiz: [
      {
        question: "What's a key advantage of long-term investing over trading?",
        options: ["More exciting", "Lower costs and better tax treatment", "Guaranteed profits", "No risk"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Index Funds Explained",
    level: "beginner",
    module_number: 3,
    lesson_number: 6,
    content: "Index funds are mutual funds or ETFs that track a market index like the S&P 500. They provide instant diversification across hundreds or thousands of stocks with low fees. Instead of trying to beat the market, they match market performance. This passive approach has outperformed most active fund managers over long periods while keeping costs minimal.",
    examples: JSON.stringify([
      "S&P 500 index fund owns all 500 companies",
      "Total stock market fund owns entire US market",
      "Low expense ratios: 0.03% vs 1%+ for active funds",
      "Automatic diversification and rebalancing"
    ]),
    practice_problems: JSON.stringify([
      "Compare index fund expense ratios",
      "Understand different types of index funds",
      "Calculate impact of fees over 30 years"
    ]),
    estimated_time: 17,
    quiz: [
      {
        question: "What is an index fund's main goal?",
        options: ["Beat the market", "Match market performance", "Minimize risk", "Maximize dividends"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "ETFs vs Individual Stocks",
    level: "beginner",
    module_number: 3,
    lesson_number: 7,
    content: "ETFs (Exchange-Traded Funds) are baskets of stocks that trade like individual stocks but provide diversification. Individual stocks offer potential for higher returns but come with higher risk and require more research. ETFs are better for beginners and passive investors, while individual stocks suit those who want to research companies and accept higher risk for potential higher returns.",
    examples: JSON.stringify([
      "SPY ETF contains 500 stocks in one purchase",
      "Individual Apple stock: all eggs in one basket",
      "Sector ETFs: technology, healthcare, energy",
      "International ETFs: global diversification"
    ]),
    practice_problems: JSON.stringify([
      "Compare risk of ETF vs individual stock",
      "Research different types of ETFs available",
      "Understand when to choose each approach"
    ]),
    estimated_time: 16,
    quiz: [
      {
        question: "What's the main advantage of ETFs over individual stocks?",
        options: ["Higher returns", "Instant diversification", "Lower price", "More voting rights"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Dividends Explained",
    level: "beginner",
    module_number: 3,
    lesson_number: 8,
    content: "Dividends are payments companies make to shareholders from their profits. They're typically paid quarterly and can provide steady income. Dividend yield is the annual dividend divided by stock price. Some companies pay high dividends, others pay none and reinvest profits for growth. Dividend-paying stocks can provide income and potentially lower volatility.",
    examples: JSON.stringify([
      "Microsoft pays $0.68 quarterly = $2.72 annually",
      "3% dividend yield on $100 stock = $3 annual income",
      "Dividend aristocrats: 25+ years of increases",
      "DRIP: reinvesting dividends to buy more shares"
    ]),
    practice_problems: JSON.stringify([
      "Calculate dividend yield for a stock",
      "Research dividend payment history",
      "Understand dividend reinvestment plans"
    ]),
    estimated_time: 15,
    quiz: [
      {
        question: "What are dividends?",
        options: ["Stock price increases", "Payments to shareholders from profits", "Trading fees", "Government taxes"],
        correct_answer: 1
      }
    ]
  }
,
  // Module 4: Trading Fundamentals (Beginner) - 7 lessons
  {
    title: "Market Orders vs Limit Orders",
    level: "beginner",
    module_number: 4,
    lesson_number: 1,
    content: "Market orders execute immediately at the current market price, while limit orders only execute at your specified price or better. Market orders guarantee execution but not price. Limit orders guarantee price but not execution. Understanding order types is crucial for controlling your entry and exit points in trades.",
    examples: JSON.stringify([
      "Market order: 'Buy 100 shares now at whatever price'",
      "Limit order: 'Buy 100 shares only if price is $50 or less'",
      "Market order fills instantly during market hours",
      "Limit order may not fill if price doesn't reach limit"
    ]),
    practice_problems: JSON.stringify([
      "Decide when to use market vs limit orders",
      "Understand bid-ask spread impact on orders",
      "Practice placing different order types"
    ]),
    estimated_time: 18,
    quiz: [
      {
        question: "What does a market order guarantee?",
        options: ["Best price", "Execution", "Profit", "Low fees"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Stop-Loss Orders",
    level: "beginner",
    module_number: 4,
    lesson_number: 2,
    content: "Stop-loss orders automatically sell your stock when it drops to a specified price, limiting your losses. They help remove emotion from selling decisions and protect against major losses. However, they can be triggered by temporary price dips and don't guarantee the exact stop price in volatile markets. They're essential for risk management.",
    examples: JSON.stringify([
      "Buy stock at $100, set stop-loss at $90",
      "Stock drops to $90, automatically sells",
      "Limits loss to 10% instead of potentially more",
      "Trailing stop-loss moves up with stock price"
    ]),
    practice_problems: JSON.stringify([
      "Calculate appropriate stop-loss levels",
      "Understand different types of stop orders",
      "Practice setting stop-losses for risk management"
    ]),
    estimated_time: 16,
    quiz: [
      {
        question: "What is the purpose of a stop-loss order?",
        options: ["Guarantee profits", "Limit potential losses", "Speed up trades", "Reduce fees"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Risk vs Reward",
    level: "beginner",
    module_number: 4,
    lesson_number: 3,
    content: "Every investment involves a tradeoff between risk and potential reward. Higher potential returns typically come with higher risk of loss. Successful investors understand this relationship and only take risks that offer adequate potential rewards. The risk-reward ratio compares potential profit to potential loss before making investment decisions.",
    examples: JSON.stringify([
      "Government bonds: low risk, low return (2-3%)",
      "Blue chip stocks: moderate risk, moderate return (6-8%)",
      "Growth stocks: high risk, high potential return (10%+)",
      "Risk-reward ratio: target $300 profit, risk $100 loss = 3:1"
    ]),
    practice_problems: JSON.stringify([
      "Calculate risk-reward ratios for different investments",
      "Assess your personal risk tolerance",
      "Match investments to risk preferences"
    ]),
    estimated_time: 17,
    quiz: [
      {
        question: "What's the general relationship between risk and return?",
        options: ["No relationship", "Higher risk, higher potential return", "Lower risk, higher return", "Risk doesn't affect return"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Position Sizing Basics",
    level: "beginner",
    module_number: 4,
    lesson_number: 4,
    content: "Position sizing determines how much money to invest in each stock or trade. A common rule is never risk more than 1-2% of your total portfolio on a single position. This prevents any one investment from devastating your portfolio. Position size should be based on your risk tolerance, the investment's risk level, and your overall portfolio size.",
    examples: JSON.stringify([
      "$10,000 portfolio: risk max $100-200 per position",
      "High-risk stock: smaller position size",
      "Diversified ETF: can be larger position",
      "Stop-loss determines position size calculation"
    ]),
    practice_problems: JSON.stringify([
      "Calculate position sizes for your portfolio",
      "Understand the 1-2% risk rule",
      "Adjust position size based on investment risk"
    ]),
    estimated_time: 15,
    quiz: [
      {
        question: "What's a common rule for position sizing?",
        options: ["Invest everything in one stock", "Risk 1-2% of portfolio per position", "Always invest $1000", "Buy as many shares as possible"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Why Most Beginners Lose",
    level: "beginner",
    module_number: 4,
    lesson_number: 5,
    content: "Most beginning traders lose money due to emotional decisions, lack of strategy, poor risk management, and unrealistic expectations. Common mistakes include chasing hot stocks, panic selling, overtrading, and not having a plan. Successful investing requires discipline, patience, education, and a systematic approach rather than gambling mentality.",
    examples: JSON.stringify([
      "FOMO: buying stocks after big gains",
      "Panic selling during market downturns",
      "Overtrading and high transaction costs",
      "No stop-losses or risk management plan"
    ]),
    practice_problems: JSON.stringify([
      "Identify common beginner mistakes",
      "Develop rules to avoid emotional decisions",
      "Create a systematic investment approach"
    ]),
    estimated_time: 19,
    quiz: [
      {
        question: "What's a major reason beginners lose money?",
        options: ["Bad luck", "Emotional decisions and lack of strategy", "Market manipulation", "High fees only"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Emotions & Trading",
    level: "beginner",
    module_number: 4,
    lesson_number: 6,
    content: "Emotions are the biggest enemy of successful investing. Fear causes panic selling at the worst times, while greed leads to buying at peaks and taking excessive risks. Successful investors develop systems and rules to remove emotion from decisions. Having a written plan and sticking to it helps overcome emotional impulses that destroy returns.",
    examples: JSON.stringify([
      "Fear: selling everything during 2020 market crash",
      "Greed: buying tech stocks at 2000 peak",
      "FOMO: chasing meme stocks without research",
      "Discipline: sticking to investment plan during volatility"
    ]),
    practice_problems: JSON.stringify([
      "Identify your emotional triggers in investing",
      "Develop rules to counteract emotional decisions",
      "Practice staying disciplined during market volatility"
    ]),
    estimated_time: 18,
    quiz: [
      {
        question: "What are the two main emotions that hurt investors?",
        options: ["Love and hate", "Fear and greed", "Joy and sadness", "Hope and despair"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Your First Trade Walkthrough",
    level: "beginner",
    module_number: 4,
    lesson_number: 7,
    content: "Before making your first trade, open a brokerage account, fund it, and research your investment. Start small with money you can afford to lose. Choose a simple, diversified investment like an index fund rather than individual stocks. Place a limit order during market hours, monitor the execution, and keep records for taxes. Learn from the experience.",
    examples: JSON.stringify([
      "Open account with reputable broker (Fidelity, Schwab, Vanguard)",
      "Start with $500-1000 to learn",
      "First purchase: broad market index fund",
      "Keep detailed records of all transactions"
    ]),
    practice_problems: JSON.stringify([
      "Research and compare brokerage accounts",
      "Plan your first investment purchase",
      "Understand tax implications of trading"
    ]),
    estimated_time: 22,
    quiz: [
      {
        question: "What's recommended for a first investment?",
        options: ["Individual penny stock", "Diversified index fund", "Options trading", "Cryptocurrency"],
        correct_answer: 1
      }
    ]
  }
,
  // Module 5: Investing Deeper (Intermediate) - 10 lessons
  {
    title: "What Is Fundamental Analysis?",
    level: "intermediate",
    module_number: 5,
    lesson_number: 1,
    content: "Fundamental analysis evaluates a company's intrinsic value by examining financial statements, business model, competitive position, and economic factors. It focuses on revenue, earnings, debt, cash flow, and growth prospects to determine if a stock is undervalued or overvalued. This approach is used by long-term investors like Warren Buffett.",
    examples: JSON.stringify([
      "Analyzing Apple's iPhone sales growth",
      "Comparing P/E ratios across tech companies",
      "Evaluating Amazon's cash flow generation",
      "Assessing Tesla's competitive moat in EVs"
    ]),
    practice_problems: JSON.stringify([
      "Read and analyze a company's 10-K filing",
      "Calculate key financial ratios",
      "Compare companies within same industry"
    ]),
    estimated_time: 25,
    quiz: [
      {
        question: "What does fundamental analysis focus on?",
        options: ["Stock price charts", "Company's intrinsic value and financials", "Trading volume", "Market sentiment"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Reading a Company's Business",
    level: "intermediate",
    module_number: 5,
    lesson_number: 2,
    content: "Understanding a company's business model is crucial for investment decisions. Analyze how the company makes money, its competitive advantages, market position, and growth strategy. Look at revenue sources, customer base, profit margins, and scalability. A simple, understandable business model is often better than a complex one.",
    examples: JSON.stringify([
      "Microsoft: software subscriptions and cloud services",
      "Coca-Cola: global beverage brand with pricing power",
      "Amazon: e-commerce platform with AWS cloud business",
      "Berkshire Hathaway: insurance and diversified holdings"
    ]),
    practice_problems: JSON.stringify([
      "Explain a company's business model in simple terms",
      "Identify revenue streams and profit drivers",
      "Assess competitive advantages and threats"
    ]),
    estimated_time: 22,
    quiz: [
      {
        question: "Why is understanding business model important?",
        options: ["It's not important", "Helps assess investment quality and risks", "Required by law", "Impresses others"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Revenue vs Profit",
    level: "intermediate",
    module_number: 5,
    lesson_number: 3,
    content: "Revenue is the total money a company receives from sales, while profit is what remains after all expenses. Companies can have high revenue but low or negative profit. Profit margins show efficiency - how much profit per dollar of revenue. Both growth and profitability matter, but profitability is ultimately what drives long-term stock value.",
    examples: JSON.stringify([
      "Amazon: high revenue, historically low profit margins",
      "Apple: high revenue and high profit margins",
      "Startup: growing revenue, negative profit while investing",
      "Mature company: stable revenue and consistent profit"
    ]),
    practice_problems: JSON.stringify([
      "Calculate profit margins for different companies",
      "Analyze revenue growth vs profit growth trends",
      "Understand when losses might be acceptable"
    ]),
    estimated_time: 18,
    quiz: [
      {
        question: "What's the difference between revenue and profit?",
        options: ["They're the same", "Revenue is total sales, profit is after expenses", "Profit is always higher", "Revenue includes expenses"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Growth vs Value Stocks",
    level: "intermediate",
    module_number: 5,
    lesson_number: 4,
    content: "Growth stocks are companies expected to grow faster than average, often trading at high valuations. Value stocks appear undervalued based on fundamentals, trading at low multiples. Growth stocks offer higher potential returns but more volatility. Value stocks provide stability and dividends but slower growth. Both have periods of outperformance.",
    examples: JSON.stringify([
      "Growth: Tesla, Netflix, Amazon in early years",
      "Value: Berkshire Hathaway, Johnson & Johnson, Coca-Cola",
      "Growth metrics: high P/E, revenue growth, no dividends",
      "Value metrics: low P/E, steady dividends, stable earnings"
    ]),
    practice_problems: JSON.stringify([
      "Classify stocks as growth or value",
      "Compare performance in different market conditions",
      "Build portfolio with both growth and value stocks"
    ]),
    estimated_time: 20,
    quiz: [
      {
        question: "What characterizes a growth stock?",
        options: ["Low price", "High expected growth rate", "High dividends", "Old company"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Market Capitalization",
    level: "intermediate",
    module_number: 5,
    lesson_number: 5,
    content: "Market capitalization is a company's total value calculated by multiplying share price by shares outstanding. Large-cap stocks (>$10B) are established companies with stability. Mid-cap ($2-10B) offer growth with some stability. Small-cap (<$2B) have high growth potential but more risk. Portfolio diversification should include different market caps.",
    examples: JSON.stringify([
      "Apple: $3 trillion market cap (mega-cap)",
      "Large-cap: Microsoft, Google, Amazon",
      "Mid-cap: regional banks, specialty retailers",
      "Small-cap: emerging growth companies"
    ]),
    practice_problems: JSON.stringify([
      "Calculate market cap for given companies",
      "Understand risk-return profiles by market cap",
      "Build diversified portfolio across market caps"
    ]),
    estimated_time: 17,
    quiz: [
      {
        question: "How is market capitalization calculated?",
        options: ["Share price only", "Share price × shares outstanding", "Annual revenue", "Total assets"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Economic Moats",
    level: "intermediate",
    module_number: 5,
    lesson_number: 6,
    content: "Economic moats are competitive advantages that protect a company's profits from competitors. Types include brand power, network effects, cost advantages, switching costs, and regulatory protection. Companies with wide moats can maintain high returns on capital and pricing power. Warren Buffett focuses heavily on moats when investing.",
    examples: JSON.stringify([
      "Brand moat: Coca-Cola's global brand recognition",
      "Network effect: Facebook's user base value",
      "Cost advantage: Walmart's scale and efficiency",
      "Switching costs: Microsoft Office suite stickiness"
    ]),
    practice_problems: JSON.stringify([
      "Identify moats for different companies",
      "Assess moat strength and sustainability",
      "Understand how moats affect pricing power"
    ]),
    estimated_time: 21,
    quiz: [
      {
        question: "What is an economic moat?",
        options: ["Company location", "Competitive advantage protecting profits", "Financial statement", "Stock price pattern"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Long-Term Risk Management",
    level: "intermediate",
    module_number: 5,
    lesson_number: 7,
    content: "Long-term risk management focuses on preserving capital while achieving growth over decades. Key strategies include diversification across assets, geographies, and time periods. Regular rebalancing maintains target allocations. Dollar-cost averaging reduces timing risk. Having appropriate emergency funds and insurance protects against life events that could force early liquidation.",
    examples: JSON.stringify([
      "Diversification: stocks, bonds, real estate, international",
      "Time diversification: regular investing over decades",
      "Rebalancing: selling high performers, buying underperformers",
      "Emergency fund prevents forced selling during downturns"
    ]),
    practice_problems: JSON.stringify([
      "Design long-term risk management strategy",
      "Calculate appropriate emergency fund size",
      "Plan rebalancing schedule and triggers"
    ]),
    estimated_time: 23,
    quiz: [
      {
        question: "What's a key component of long-term risk management?",
        options: ["Frequent trading", "Diversification", "Market timing", "Leverage"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Portfolio Diversification",
    level: "intermediate",
    module_number: 5,
    lesson_number: 8,
    content: "Diversification spreads risk across different investments to reduce portfolio volatility without necessarily reducing returns. Effective diversification includes different asset classes, sectors, geographies, and company sizes. The goal is to own investments that don't all move in the same direction. Over-diversification can dilute returns, so balance is key.",
    examples: JSON.stringify([
      "Asset classes: 60% stocks, 30% bonds, 10% REITs",
      "Geographic: 70% US, 20% developed international, 10% emerging",
      "Sectors: technology, healthcare, financials, consumer goods",
      "Company sizes: large-cap, mid-cap, small-cap mix"
    ]),
    practice_problems: JSON.stringify([
      "Build diversified portfolio allocation",
      "Understand correlation between different assets",
      "Calculate portfolio risk vs individual stock risk"
    ]),
    estimated_time: 19,
    quiz: [
      {
        question: "What's the main benefit of diversification?",
        options: ["Higher returns", "Reduced risk without necessarily reducing returns", "Lower fees", "Simpler management"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Rebalancing Explained",
    level: "intermediate",
    module_number: 5,
    lesson_number: 9,
    content: "Rebalancing involves periodically adjusting your portfolio back to target allocations by selling overweight positions and buying underweight ones. This forces you to sell high and buy low, maintaining desired risk levels. Rebalance annually, when allocations drift 5-10% from targets, or after major market moves. Consider tax implications in taxable accounts.",
    examples: JSON.stringify([
      "Target: 60% stocks, 40% bonds",
      "After growth: 70% stocks, 30% bonds → rebalance",
      "Sell some stocks, buy bonds to restore 60/40",
      "Tax-loss harvesting during rebalancing"
    ]),
    practice_problems: JSON.stringify([
      "Calculate when rebalancing is needed",
      "Understand tax-efficient rebalancing strategies",
      "Set up systematic rebalancing schedule"
    ]),
    estimated_time: 18,
    quiz: [
      {
        question: "What does rebalancing accomplish?",
        options: ["Increases returns", "Forces selling high and buying low", "Reduces taxes", "Eliminates risk"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "When to Hold vs Sell",
    level: "intermediate",
    module_number: 5,
    lesson_number: 10,
    content: "Knowing when to sell is as important as knowing what to buy. Sell when fundamentals deteriorate, better opportunities arise, or positions become too large. Don't sell due to short-term volatility or market fear. Tax implications matter - hold over one year for long-term capital gains rates. Have clear criteria for selling before you buy to avoid emotional decisions.",
    examples: JSON.stringify([
      "Sell: company loses competitive advantage",
      "Hold: temporary earnings disappointment in strong company",
      "Sell: position grows to 10%+ of portfolio",
      "Hold: market volatility without fundamental change"
    ]),
    practice_problems: JSON.stringify([
      "Develop sell criteria for your investments",
      "Understand tax implications of selling",
      "Practice distinguishing temporary vs permanent problems"
    ]),
    estimated_time: 20,
    quiz: [
      {
        question: "When should you consider selling a stock?",
        options: ["After any price decline", "When fundamentals deteriorate", "Every year", "Never"],
        correct_answer: 1
      }
    ]
  }
,
  // Module 6: Technical Analysis (Intermediate) - 10 lessons
  {
    title: "Candlesticks Explained",
    level: "intermediate",
    module_number: 6,
    lesson_number: 1,
    content: "Candlestick charts display open, high, low, and close prices for each time period. The body shows open-to-close range, while wicks show high-low range. Green/white candles indicate closing higher than opening, red/black indicate closing lower. Patterns like doji, hammer, and engulfing can signal potential reversals or continuations.",
    examples: JSON.stringify([
      "Doji: open equals close, indicates indecision",
      "Hammer: small body, long lower wick, potential reversal",
      "Engulfing: large candle engulfs previous, strong signal",
      "Spinning top: small body, long wicks, uncertainty"
    ]),
    practice_problems: JSON.stringify([
      "Identify basic candlestick patterns on charts",
      "Understand what different patterns suggest",
      "Practice reading candlestick formations"
    ]),
    estimated_time: 22,
    quiz: [
      {
        question: "What does a candlestick's body represent?",
        options: ["High to low range", "Open to close range", "Trading volume", "Time period"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Support Levels",
    level: "intermediate",
    module_number: 6,
    lesson_number: 2,
    content: "Support is a price level where buying interest is strong enough to prevent further decline. It acts like a floor under the stock price. Support can be horizontal (same price level) or diagonal (trendline). The more times a level holds, the stronger the support. When support breaks, it often becomes resistance.",
    examples: JSON.stringify([
      "Stock bounces off $50 three times = strong support",
      "Previous high becomes support after breakout",
      "Moving averages acting as dynamic support",
      "Psychological levels like $100 often provide support"
    ]),
    practice_problems: JSON.stringify([
      "Identify support levels on stock charts",
      "Understand different types of support",
      "Practice drawing support lines"
    ]),
    estimated_time: 20,
    quiz: [
      {
        question: "What is a support level?",
        options: ["Price ceiling", "Price floor where buying emerges", "Average price", "Highest price"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Resistance Levels",
    level: "intermediate",
    module_number: 6,
    lesson_number: 3,
    content: "Resistance is a price level where selling pressure prevents further advance. It acts like a ceiling above the stock price. Resistance can be previous highs, round numbers, or moving averages. When resistance is broken with volume, it often becomes support. Multiple tests of resistance without breaking can lead to stronger eventual breakouts.",
    examples: JSON.stringify([
      "Stock fails to break above $75 multiple times",
      "Previous low becomes resistance after breakdown",
      "200-day moving average acting as resistance",
      "Round numbers like $50, $100 often create resistance"
    ]),
    practice_problems: JSON.stringify([
      "Identify resistance levels on charts",
      "Understand resistance-to-support conversion",
      "Practice recognizing breakout patterns"
    ]),
    estimated_time: 19,
    quiz: [
      {
        question: "What happens when resistance is broken?",
        options: ["Stock always falls", "Often becomes support", "Nothing changes", "Resistance gets stronger"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Trendlines",
    level: "intermediate",
    module_number: 6,
    lesson_number: 4,
    content: "Trendlines connect two or more price points to show the direction of price movement. Uptrend lines connect successive lows, downtrend lines connect successive highs. The more points a trendline connects, the more significant it becomes. Trendline breaks can signal trend changes, especially with increased volume.",
    examples: JSON.stringify([
      "Uptrend: connecting higher lows over months",
      "Downtrend: connecting lower highs during decline",
      "Channel: parallel trendlines containing price action",
      "Trendline break with volume confirms trend change"
    ]),
    practice_problems: JSON.stringify([
      "Draw trendlines on various stock charts",
      "Identify trend direction and strength",
      "Recognize valid trendline breaks"
    ]),
    estimated_time: 21,
    quiz: [
      {
        question: "How do you draw an uptrend line?",
        options: ["Connect highs", "Connect successive lows", "Connect closes", "Connect opens"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Breakouts vs Fakeouts",
    level: "intermediate",
    module_number: 6,
    lesson_number: 5,
    content: "Breakouts occur when price moves decisively beyond support or resistance with increased volume. Fakeouts are false breakouts that quickly reverse. True breakouts often have high volume, follow-through, and retest the broken level as new support/resistance. Fakeouts typically have low volume and immediate reversal. Patience and confirmation help distinguish between them.",
    examples: JSON.stringify([
      "True breakout: high volume, sustained move, retest holds",
      "Fakeout: low volume, immediate reversal below resistance",
      "Earnings breakout with fundamental catalyst",
      "End-of-day breakout more reliable than intraday"
    ]),
    practice_problems: JSON.stringify([
      "Identify characteristics of true vs false breakouts",
      "Understand volume's role in confirming breakouts",
      "Practice waiting for confirmation before acting"
    ]),
    estimated_time: 23,
    quiz: [
      {
        question: "What helps confirm a true breakout?",
        options: ["Low volume", "High volume and follow-through", "Immediate reversal", "Round numbers"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Volume Explained",
    level: "intermediate",
    module_number: 6,
    lesson_number: 6,
    content: "Volume measures the number of shares traded during a given period. High volume confirms price movements, while low volume suggests weak conviction. Volume often increases during breakouts, breakdowns, and trend changes. Volume patterns can precede price movements. Analyzing volume alongside price provides better insight than price alone.",
    examples: JSON.stringify([
      "Breakout with 3x average volume = strong signal",
      "Price rise on declining volume = potential weakness",
      "Volume spike before earnings announcement",
      "Accumulation: rising price on increasing volume"
    ]),
    practice_problems: JSON.stringify([
      "Analyze volume patterns with price movements",
      "Identify volume confirmation signals",
      "Understand volume's predictive value"
    ]),
    estimated_time: 18,
    quiz: [
      {
        question: "What does high volume during a price move indicate?",
        options: ["Weak signal", "Strong conviction behind the move", "Random noise", "Market manipulation"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Moving Averages",
    level: "intermediate",
    module_number: 6,
    lesson_number: 7,
    content: "Moving averages smooth price data to identify trends by calculating the average price over a specific number of periods. Simple moving averages (SMA) weight all periods equally, while exponential moving averages (EMA) give more weight to recent prices. Common periods are 20, 50, and 200 days. Moving averages can act as support/resistance and generate trading signals.",
    examples: JSON.stringify([
      "50-day MA crossing above 200-day MA = golden cross",
      "Price above 200-day MA indicates long-term uptrend",
      "Moving average acting as dynamic support",
      "Death cross: 50-day MA crossing below 200-day MA"
    ]),
    practice_problems: JSON.stringify([
      "Calculate simple moving averages manually",
      "Identify moving average crossover signals",
      "Understand different timeframe implications"
    ]),
    estimated_time: 20,
    quiz: [
      {
        question: "What is a golden cross?",
        options: ["Price hitting new high", "50-day MA crossing above 200-day MA", "High volume day", "Dividend payment"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "RSI Explained",
    level: "intermediate",
    module_number: 6,
    lesson_number: 8,
    content: "Relative Strength Index (RSI) is a momentum oscillator that measures the speed and magnitude of price changes on a scale of 0-100. RSI above 70 suggests overbought conditions, below 30 suggests oversold. However, in strong trends, RSI can remain overbought or oversold for extended periods. RSI divergences can signal potential reversals.",
    examples: JSON.stringify([
      "RSI above 70: stock may be due for pullback",
      "RSI below 30: stock may be oversold, potential bounce",
      "Bullish divergence: price makes lower low, RSI makes higher low",
      "RSI staying above 40 in uptrend shows strength"
    ]),
    practice_problems: JSON.stringify([
      "Interpret RSI readings in different market conditions",
      "Identify RSI divergences on charts",
      "Understand RSI limitations in trending markets"
    ]),
    estimated_time: 19,
    quiz: [
      {
        question: "What does RSI above 70 typically indicate?",
        options: ["Oversold", "Overbought", "Neutral", "Strong trend"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "MACD Explained",
    level: "intermediate",
    module_number: 6,
    lesson_number: 9,
    content: "MACD (Moving Average Convergence Divergence) shows the relationship between two moving averages of a security's price. It consists of the MACD line (12-day EMA minus 26-day EMA), signal line (9-day EMA of MACD), and histogram (difference between MACD and signal lines). MACD crossovers and divergences can signal trend changes.",
    examples: JSON.stringify([
      "MACD line crossing above signal line = bullish signal",
      "MACD histogram above zero = upward momentum",
      "Bullish divergence: price falls, MACD rises",
      "MACD crossing zero line confirms trend change"
    ]),
    practice_problems: JSON.stringify([
      "Interpret MACD crossover signals",
      "Identify MACD divergences",
      "Understand histogram significance"
    ]),
    estimated_time: 21,
    quiz: [
      {
        question: "What does MACD measure?",
        options: ["Volume", "Relationship between two moving averages", "Price volatility", "Market sentiment"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Indicator Confluence",
    level: "intermediate",
    module_number: 6,
    lesson_number: 10,
    content: "Indicator confluence occurs when multiple technical indicators give the same signal, increasing the probability of a successful trade. Combining trend-following indicators (moving averages) with momentum indicators (RSI, MACD) and volume analysis provides more reliable signals than any single indicator. However, avoid over-analyzing with too many indicators.",
    examples: JSON.stringify([
      "Breakout + high volume + RSI oversold = strong buy signal",
      "Support level + 200-day MA + MACD bullish cross",
      "Multiple timeframe confirmation strengthens signals",
      "Price, volume, and momentum all aligning"
    ]),
    practice_problems: JSON.stringify([
      "Identify confluence of multiple indicators",
      "Build systematic approach using indicator combinations",
      "Understand when indicators conflict"
    ]),
    estimated_time: 22,
    quiz: [
      {
        question: "What is indicator confluence?",
        options: ["Using one indicator", "Multiple indicators giving same signal", "Conflicting signals", "Random indicators"],
        correct_answer: 1
      }
    ]
  }
,
  // Module 7: Other Asset Classes (Intermediate) - 10 lessons
  {
    title: "Bonds Explained",
    level: "intermediate",
    module_number: 7,
    lesson_number: 1,
    content: "Bonds are debt securities where investors lend money to entities (government, corporations) for a defined period at a fixed interest rate. They provide regular income through coupon payments and return principal at maturity. Bond prices move inversely to interest rates. They're generally less risky than stocks and provide portfolio diversification.",
    examples: JSON.stringify([
      "10-year Treasury bond paying 4% annually",
      "Corporate bond with higher yield but more risk",
      "Municipal bonds with tax advantages",
      "Bond prices fall when interest rates rise"
    ]),
    practice_problems: JSON.stringify([
      "Calculate bond yield and price relationship",
      "Compare different types of bonds",
      "Understand duration and interest rate risk"
    ]),
    estimated_time: 24,
    quiz: [
      {
        question: "What happens to bond prices when interest rates rise?",
        options: ["Prices rise", "Prices fall", "No change", "Prices double"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "How Interest Rates Affect Markets",
    level: "intermediate",
    module_number: 7,
    lesson_number: 2,
    content: "Interest rates are the cost of borrowing money and affect all financial markets. Rising rates make bonds more attractive relative to stocks, increase borrowing costs for companies, and can slow economic growth. Falling rates stimulate borrowing and spending, often boosting stock prices. The Federal Reserve uses interest rates as a primary monetary policy tool.",
    examples: JSON.stringify([
      "Fed raises rates → bond yields up, stock prices often down",
      "Low rates encourage business investment and expansion",
      "High rates slow inflation but may cause recession",
      "Rate changes affect mortgage rates and consumer spending"
    ]),
    practice_problems: JSON.stringify([
      "Analyze how rate changes affect different sectors",
      "Understand Fed policy and market reactions",
      "Track relationship between rates and asset prices"
    ]),
    estimated_time: 22,
    quiz: [
      {
        question: "How do rising interest rates typically affect stock prices?",
        options: ["Always positive", "Often negative due to higher borrowing costs", "No effect", "Only affects bonds"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Commodities Explained",
    level: "intermediate",
    module_number: 7,
    lesson_number: 3,
    content: "Commodities are raw materials or primary agricultural products that can be bought and sold, such as gold, oil, wheat, and copper. They're often used as inflation hedges since their prices tend to rise with general price levels. Commodity investing can be done through futures, ETFs, or commodity-focused stocks. They add diversification but can be volatile.",
    examples: JSON.stringify([
      "Gold as inflation hedge and safe haven",
      "Oil prices affecting energy stocks and economy",
      "Agricultural commodities affected by weather",
      "Copper as economic indicator (industrial demand)"
    ]),
    practice_problems: JSON.stringify([
      "Understand different ways to invest in commodities",
      "Analyze commodity price drivers",
      "Assess commodities' role in portfolio diversification"
    ]),
    estimated_time: 20,
    quiz: [
      {
        question: "Why are commodities often used as inflation hedges?",
        options: ["They're always profitable", "Prices tend to rise with inflation", "Government guarantees", "No volatility"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Gold vs Stocks",
    level: "intermediate",
    module_number: 7,
    lesson_number: 4,
    content: "Gold has been a store of value for thousands of years and often performs well during economic uncertainty, inflation, and currency debasement. Stocks represent ownership in productive businesses that can grow earnings over time. Historically, stocks have outperformed gold over long periods, but gold provides portfolio insurance during crises. Both have roles in diversified portfolios.",
    examples: JSON.stringify([
      "Gold surge during 2008 financial crisis",
      "Stocks outperforming gold over 30+ year periods",
      "Gold holding value during currency crises",
      "Stocks providing dividends and growth, gold providing stability"
    ]),
    practice_problems: JSON.stringify([
      "Compare long-term returns of gold vs stocks",
      "Understand when each asset class performs better",
      "Determine appropriate allocation between gold and stocks"
    ]),
    estimated_time: 19,
    quiz: [
      {
        question: "What's gold's primary advantage over stocks?",
        options: ["Higher returns", "Store of value during uncertainty", "Pays dividends", "More liquid"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Real Estate Basics",
    level: "intermediate",
    module_number: 7,
    lesson_number: 5,
    content: "Real estate investing involves purchasing property to generate rental income or capital appreciation. Benefits include steady cash flow, tax advantages, inflation hedge, and leverage opportunities. Challenges include illiquidity, high transaction costs, property management, and concentration risk. Real estate can be accessed through direct ownership, REITs, or real estate crowdfunding platforms.",
    examples: JSON.stringify([
      "Rental property generating $1000/month cash flow",
      "House appreciation from $200k to $300k over 10 years",
      "Tax benefits: depreciation, mortgage interest deduction",
      "Leverage: $50k down payment controlling $250k property"
    ]),
    practice_problems: JSON.stringify([
      "Calculate rental property cash flow and returns",
      "Understand real estate tax advantages",
      "Compare direct ownership vs REIT investing"
    ]),
    estimated_time: 25,
    quiz: [
      {
        question: "What's a key advantage of real estate investing?",
        options: ["No risk", "Steady cash flow and inflation hedge", "Always appreciates", "No taxes"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "REITs Explained",
    level: "intermediate",
    module_number: 7,
    lesson_number: 6,
    content: "Real Estate Investment Trusts (REITs) are companies that own, operate, or finance income-producing real estate. They must distribute at least 90% of taxable income as dividends, making them attractive for income investors. REITs provide real estate exposure without direct property ownership, offering liquidity, diversification, and professional management.",
    examples: JSON.stringify([
      "Residential REIT owning apartment complexes",
      "Commercial REIT owning office buildings and malls",
      "Healthcare REIT owning hospitals and senior housing",
      "REIT ETFs providing diversified real estate exposure"
    ]),
    practice_problems: JSON.stringify([
      "Compare different types of REITs",
      "Analyze REIT dividend yields and sustainability",
      "Understand REIT valuation metrics"
    ]),
    estimated_time: 21,
    quiz: [
      {
        question: "What must REITs distribute as dividends?",
        options: ["50% of income", "90% of taxable income", "All profits", "Nothing required"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Currency Markets (Forex)",
    level: "intermediate",
    module_number: 7,
    lesson_number: 7,
    content: "The foreign exchange (forex) market is where currencies are traded. It's the world's largest financial market, operating 24/5. Currency values are affected by interest rates, economic growth, political stability, and trade balances. Forex trading involves high leverage and risk. For most investors, currency exposure comes through international stock and bond investments.",
    examples: JSON.stringify([
      "EUR/USD exchange rate fluctuations",
      "Strong dollar making US exports more expensive",
      "Emerging market currencies during crises",
      "Currency hedging in international investments"
    ]),
    practice_problems: JSON.stringify([
      "Understand factors affecting currency values",
      "Analyze impact of currency changes on investments",
      "Learn about currency hedging strategies"
    ]),
    estimated_time: 23,
    quiz: [
      {
        question: "What's the world's largest financial market?",
        options: ["Stock market", "Bond market", "Foreign exchange (forex)", "Commodity market"],
        correct_answer: 2
      }
    ]
  },
  {
    title: "Crypto at a High Level",
    level: "intermediate",
    module_number: 7,
    lesson_number: 8,
    content: "Cryptocurrency is digital money secured by cryptography and typically decentralized through blockchain technology. Bitcoin was the first cryptocurrency, followed by thousands of others. Crypto is highly volatile, speculative, and regulatory uncertainty exists. Some view it as digital gold or future money, others as speculative bubble. Small allocations (1-5%) may be appropriate for risk-tolerant investors.",
    examples: JSON.stringify([
      "Bitcoin as 'digital gold' store of value",
      "Ethereum enabling smart contracts and DeFi",
      "Extreme volatility: 50%+ price swings common",
      "Regulatory uncertainty affecting prices"
    ]),
    practice_problems: JSON.stringify([
      "Understand blockchain technology basics",
      "Analyze crypto's role in investment portfolios",
      "Research major cryptocurrencies and their purposes"
    ]),
    estimated_time: 22,
    quiz: [
      {
        question: "What's a key characteristic of cryptocurrency?",
        options: ["Government controlled", "High volatility and speculation", "Guaranteed returns", "No technology risk"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Risk Across Asset Classes",
    level: "intermediate",
    module_number: 7,
    lesson_number: 9,
    content: "Different asset classes have different risk profiles. Stocks have market risk and volatility but growth potential. Bonds have interest rate and credit risk but provide stability. Real estate has illiquidity and concentration risk but inflation protection. Commodities have volatility but diversification benefits. Understanding each asset's risks helps build appropriate portfolios.",
    examples: JSON.stringify([
      "Stocks: market crashes but long-term growth",
      "Bonds: interest rate risk but steady income",
      "Real estate: illiquid but tangible asset",
      "Commodities: volatile but inflation hedge"
    ]),
    practice_problems: JSON.stringify([
      "Assess risk levels of different asset classes",
      "Understand how risks change over time",
      "Build portfolio considering various risks"
    ]),
    estimated_time: 20,
    quiz: [
      {
        question: "What's the main risk of bonds?",
        options: ["No risk", "Interest rate and credit risk", "Too much growth", "Currency only"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Asset Correlation",
    level: "intermediate",
    module_number: 7,
    lesson_number: 10,
    content: "Correlation measures how different assets move in relation to each other. Perfect positive correlation (1.0) means assets move together, perfect negative correlation (-1.0) means they move opposite, zero correlation means no relationship. Effective diversification requires assets with low or negative correlations. Correlations can change during market stress when many assets move together.",
    examples: JSON.stringify([
      "Stocks and bonds often negatively correlated",
      "Gold and dollar typically negatively correlated",
      "During 2008 crisis, most assets fell together",
      "International diversification reduces correlation"
    ]),
    practice_problems: JSON.stringify([
      "Calculate correlation between different assets",
      "Understand how correlations change over time",
      "Build portfolio using correlation analysis"
    ]),
    estimated_time: 18,
    quiz: [
      {
        question: "What does zero correlation between assets mean?",
        options: ["They move together", "They move opposite", "No relationship in movement", "One is riskier"],
        correct_answer: 2
      }
    ]
  }
,
  // Module 8: Trading Strategy & Risk (Advanced) - 10 lessons
  {
    title: "What Is a Trading Edge?",
    level: "advanced",
    module_number: 8,
    lesson_number: 1,
    content: "A trading edge is a systematic advantage that gives you a higher probability of success over many trades. It could be superior information, better analysis, emotional discipline, or systematic approach. Without an edge, trading becomes gambling. Edges can be fundamental (better company analysis), technical (pattern recognition), or behavioral (discipline when others panic). Developing and maintaining an edge requires continuous learning and adaptation.",
    examples: JSON.stringify([
      "Value investing edge: buying undervalued companies",
      "Technical edge: recognizing reliable chart patterns",
      "Information edge: understanding industry trends",
      "Behavioral edge: staying calm during market panics"
    ]),
    practice_problems: JSON.stringify([
      "Identify potential sources of trading edge",
      "Develop systematic approach to capture edge",
      "Test and measure your edge over time"
    ]),
    estimated_time: 26,
    quiz: [
      {
        question: "What is a trading edge?",
        options: ["Guaranteed profits", "Systematic advantage over many trades", "Inside information", "Lucky guesses"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Probability in Trading",
    level: "advanced",
    module_number: 8,
    lesson_number: 2,
    content: "Trading is a probability game where no single trade is guaranteed, but over many trades, probabilities play out. Understanding win rates, average wins vs losses, and expected value helps evaluate strategies. A strategy with 40% win rate can be profitable if average wins are much larger than average losses. Focus on process and probabilities, not individual trade outcomes.",
    examples: JSON.stringify([
      "40% win rate, $300 avg win, $100 avg loss = profitable",
      "70% win rate, $50 avg win, $200 avg loss = unprofitable",
      "Coin flip: 50% probability but known over many flips",
      "Casino edge: small but consistent over many bets"
    ]),
    practice_problems: JSON.stringify([
      "Calculate expected value of trading strategies",
      "Understand how win rate relates to profitability",
      "Develop probabilistic thinking about markets"
    ]),
    estimated_time: 24,
    quiz: [
      {
        question: "Can a strategy with 40% win rate be profitable?",
        options: ["Never", "Yes, if average wins exceed average losses sufficiently", "Only with luck", "Only in bull markets"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Win Rate vs Risk-Reward",
    level: "advanced",
    module_number: 8,
    lesson_number: 3,
    content: "Win rate and risk-reward ratio work together to determine profitability. High win rate strategies often have lower risk-reward ratios, while low win rate strategies need higher risk-reward ratios. The key is finding the right balance. Many successful traders prefer lower win rates with higher risk-reward ratios because it's easier to let winners run than to be right frequently.",
    examples: JSON.stringify([
      "Scalping: 80% win rate, 1:1 risk-reward",
      "Swing trading: 50% win rate, 2:1 risk-reward",
      "Trend following: 30% win rate, 3:1 risk-reward",
      "Breakeven: 50% win rate needs 1:1 risk-reward minimum"
    ]),
    practice_problems: JSON.stringify([
      "Calculate breakeven win rates for different risk-reward ratios",
      "Analyze your natural trading style preferences",
      "Optimize win rate and risk-reward balance"
    ]),
    estimated_time: 22,
    quiz: [
      {
        question: "What win rate is needed to break even with 2:1 risk-reward?",
        options: ["50%", "33%", "67%", "25%"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Expectancy Explained",
    level: "advanced",
    module_number: 8,
    lesson_number: 4,
    content: "Expectancy is the average amount you can expect to win or lose per trade over many trades. It's calculated as (Win Rate × Average Win) - (Loss Rate × Average Loss). Positive expectancy means profitable strategy over time. Expectancy helps compare different strategies and position sizing decisions. It's more important than win rate alone.",
    examples: JSON.stringify([
      "Expectancy = (0.6 × $200) - (0.4 × $100) = $80 per trade",
      "Strategy A: $50 expectancy, Strategy B: $30 expectancy",
      "Higher expectancy allows larger position sizes",
      "Negative expectancy means losing strategy long-term"
    ]),
    practice_problems: JSON.stringify([
      "Calculate expectancy for different trading strategies",
      "Compare strategies using expectancy analysis",
      "Understand how expectancy affects position sizing"
    ]),
    estimated_time: 21,
    quiz: [
      {
        question: "What does positive expectancy indicate?",
        options: ["Guaranteed profits", "Profitable strategy over many trades", "High win rate", "Low risk"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Drawdowns",
    level: "advanced",
    module_number: 8,
    lesson_number: 5,
    content: "Drawdown is the decline from peak to trough in account value, expressed as a percentage. Maximum drawdown is the largest peak-to-trough decline. All trading strategies experience drawdowns - it's normal and expected. Understanding and preparing for drawdowns psychologically and financially is crucial. Position sizing should account for expected maximum drawdowns.",
    examples: JSON.stringify([
      "Account drops from $100k to $80k = 20% drawdown",
      "Strategy historically has 30% maximum drawdown",
      "Drawdown recovery: 25% loss needs 33% gain to recover",
      "Psychological impact: drawdowns feel worse than equivalent gains feel good"
    ]),
    practice_problems: JSON.stringify([
      "Calculate drawdown and recovery requirements",
      "Analyze historical drawdowns of strategies",
      "Prepare psychologically for inevitable drawdowns"
    ]),
    estimated_time: 23,
    quiz: [
      {
        question: "If an account drops from $100k to $75k, what's the drawdown?",
        options: ["25%", "$25k", "75%", "33%"],
        correct_answer: 0
      }
    ]
  },
  {
    title: "Strategy Backtesting (Conceptual)",
    level: "advanced",
    module_number: 8,
    lesson_number: 6,
    content: "Backtesting involves testing trading strategies on historical data to evaluate performance. It helps identify strategy strengths, weaknesses, and expected returns. However, backtesting has limitations: past performance doesn't guarantee future results, data can be biased, and market conditions change. Use backtesting as one tool among many for strategy evaluation.",
    examples: JSON.stringify([
      "Testing moving average crossover on 10 years of data",
      "Analyzing strategy performance in different market conditions",
      "Identifying periods where strategy underperformed",
      "Curve fitting: over-optimizing to historical data"
    ]),
    practice_problems: JSON.stringify([
      "Understand backtesting methodology and limitations",
      "Analyze backtest results critically",
      "Avoid curve fitting and over-optimization"
    ]),
    estimated_time: 25,
    quiz: [
      {
        question: "What's a major limitation of backtesting?",
        options: ["Too accurate", "Past performance doesn't guarantee future results", "Too expensive", "Not detailed enough"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Overtrading",
    level: "advanced",
    module_number: 8,
    lesson_number: 7,
    content: "Overtrading is excessive buying and selling that reduces returns through increased costs and poor decision-making. It's often driven by boredom, FOMO, or need for action. Overtrading leads to higher transaction costs, more tax implications, and emotional exhaustion. Quality over quantity - fewer, better trades often produce superior results than frequent trading.",
    examples: JSON.stringify([
      "Day trader making 50+ trades per day vs 2-3 quality setups",
      "Chasing every market move instead of waiting for best opportunities",
      "Transaction costs eating into profits from frequent trading",
      "Emotional burnout from constant market monitoring"
    ]),
    practice_problems: JSON.stringify([
      "Identify signs of overtrading in your behavior",
      "Calculate impact of transaction costs on returns",
      "Develop patience and selectivity in trading"
    ]),
    estimated_time: 20,
    quiz: [
      {
        question: "What's a main cause of overtrading?",
        options: ["Too much money", "Boredom and need for action", "Market volatility", "Good opportunities"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Trade Journaling",
    level: "advanced",
    module_number: 8,
    lesson_number: 8,
    content: "A trading journal records all trades with entry/exit points, reasoning, emotions, and outcomes. It's essential for identifying patterns, improving decision-making, and learning from mistakes. Journal should include both quantitative data (prices, sizes) and qualitative observations (emotions, market conditions). Regular review helps refine strategy and psychology.",
    examples: JSON.stringify([
      "Recording: date, symbol, entry/exit, size, reason, emotion, outcome",
      "Weekly review identifying recurring mistakes",
      "Tracking emotional state and its impact on performance",
      "Analyzing which setups work best for your style"
    ]),
    practice_problems: JSON.stringify([
      "Design comprehensive trading journal format",
      "Develop habit of consistent journal entries",
      "Analyze journal data for improvement opportunities"
    ]),
    estimated_time: 19,
    quiz: [
      {
        question: "What's the main purpose of a trading journal?",
        options: ["Tax records", "Learning and improvement", "Bragging rights", "Regulatory compliance"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Consistency Over Big Wins",
    level: "advanced",
    module_number: 8,
    lesson_number: 9,
    content: "Consistent small gains compound better than sporadic large wins followed by large losses. Consistency comes from disciplined execution of proven strategies, proper risk management, and emotional control. Avoid the temptation to 'swing for the fences' - steady, consistent returns with controlled risk build wealth more reliably than boom-bust cycles.",
    examples: JSON.stringify([
      "1% monthly return = 12.7% annually compounded",
      "Boom-bust: +50%, -30%, +20%, -40% = poor long-term results",
      "Consistent trader: steady 15% annual returns for decades",
      "Tortoise vs hare: steady wins the race"
    ]),
    practice_problems: JSON.stringify([
      "Calculate compound returns of consistent vs volatile strategies",
      "Develop systems for consistent execution",
      "Focus on process over individual trade outcomes"
    ]),
    estimated_time: 21,
    quiz: [
      {
        question: "Why is consistency important in trading?",
        options: ["It's boring", "Small consistent gains compound better than volatile results", "Regulators require it", "It's easier"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "When Not to Trade",
    level: "advanced",
    module_number: 8,
    lesson_number: 10,
    content: "Knowing when not to trade is as important as knowing when to trade. Avoid trading when emotional, during low-probability setups, in choppy markets, or when distracted. Sometimes the best trade is no trade. Patience and selectivity improve results. Having cash available for great opportunities is better than being fully invested in mediocre ones.",
    examples: JSON.stringify([
      "Avoiding revenge trading after losses",
      "Staying out during unclear market conditions",
      "Not trading when personally stressed or distracted",
      "Waiting for high-probability setups instead of forcing trades"
    ]),
    practice_problems: JSON.stringify([
      "Identify personal situations when you shouldn't trade",
      "Develop criteria for market conditions to avoid",
      "Practice patience and selectivity"
    ]),
    estimated_time: 18,
    quiz: [
      {
        question: "When should you avoid trading?",
        options: ["Never", "When emotional or during low-probability setups", "Only on weekends", "When winning"],
        correct_answer: 1
      }
    ]
  }
,
  // Module 9: Market Behavior & Psychology (Advanced) - 10 lessons
  {
    title: "Institutional vs Retail Traders",
    level: "advanced",
    module_number: 9,
    lesson_number: 1,
    content: "Institutional traders (banks, hedge funds, pension funds) have advantages including better information, advanced technology, lower costs, and professional research teams. Retail traders are individual investors with smaller accounts and fewer resources. Understanding institutional behavior helps retail traders avoid being on the wrong side of major moves. Institutions often move markets, while retail traders react to moves.",
    examples: JSON.stringify([
      "Hedge fund with $1B+ assets vs individual with $10k account",
      "Institutional access to company management and research",
      "High-frequency trading algorithms vs manual retail orders",
      "Institutional block trades moving stock prices"
    ]),
    practice_problems: JSON.stringify([
      "Identify signs of institutional activity in stocks",
      "Understand how to position alongside institutional flows",
      "Recognize retail trader disadvantages and advantages"
    ]),
    estimated_time: 24,
    quiz: [
      {
        question: "What's a key advantage institutions have over retail traders?",
        options: ["Luck", "Better information and resources", "Government support", "Guaranteed profits"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Liquidity Explained",
    level: "advanced",
    module_number: 9,
    lesson_number: 2,
    content: "Liquidity is the ease of buying or selling an asset without significantly affecting its price. High liquidity means tight bid-ask spreads and ability to trade large quantities quickly. Low liquidity leads to wider spreads and price impact from trades. Liquidity varies by asset, time of day, and market conditions. Understanding liquidity helps with trade execution and risk management.",
    examples: JSON.stringify([
      "Apple stock: highly liquid, tight spreads",
      "Small-cap stock: less liquid, wider spreads",
      "After-hours trading: reduced liquidity",
      "Market crisis: liquidity dries up across assets"
    ]),
    practice_problems: JSON.stringify([
      "Assess liquidity of different assets",
      "Understand bid-ask spreads and market impact",
      "Plan trade execution considering liquidity"
    ]),
    estimated_time: 22,
    quiz: [
      {
        question: "What indicates high liquidity?",
        options: ["Wide bid-ask spreads", "Tight bid-ask spreads and easy trading", "High volatility", "Low volume"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Stop Hunts (Reality vs Myth)",
    level: "advanced",
    module_number: 9,
    lesson_number: 3,
    content: "Stop hunting refers to price movements designed to trigger stop-loss orders before reversing direction. While deliberate manipulation is rare in large, liquid markets, natural price action often tests obvious support/resistance levels where stops cluster. Understanding this helps with better stop placement and avoiding obvious levels where many traders place stops.",
    examples: JSON.stringify([
      "Price briefly breaking below support to trigger stops",
      "Round number levels where stops cluster",
      "Previous highs/lows attracting stop orders",
      "Market makers providing liquidity, not hunting stops"
    ]),
    practice_problems: JSON.stringify([
      "Identify where stops likely cluster",
      "Develop better stop-loss placement strategies",
      "Distinguish between manipulation and natural price action"
    ]),
    estimated_time: 21,
    quiz: [
      {
        question: "Why do prices often test obvious support/resistance levels?",
        options: ["Pure manipulation", "Natural clustering of stop orders", "Government intervention", "Random chance"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "News vs Price Action",
    level: "advanced",
    module_number: 9,
    lesson_number: 4,
    content: "Price action often anticipates news, and markets frequently move opposite to what news suggests they should. 'Buy the rumor, sell the news' reflects how markets discount future events. Price action provides more reliable signals than trying to interpret news impact. Focus on how markets react to news rather than the news itself - the reaction reveals market sentiment and positioning.",
    examples: JSON.stringify([
      "Stock rises on bad earnings (expectations were worse)",
      "Market falls on good economic news (already priced in)",
      "Price action leading earnings announcements",
      "Unexpected market reaction revealing hidden sentiment"
    ]),
    practice_problems: JSON.stringify([
      "Analyze how markets react to different types of news",
      "Practice reading price action over news interpretation",
      "Understand market expectations vs reality"
    ]),
    estimated_time: 23,
    quiz: [
      {
        question: "What does 'buy the rumor, sell the news' mean?",
        options: ["Always buy on rumors", "Markets often anticipate and discount future events", "News is always wrong", "Rumors are more reliable"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Market Regimes",
    level: "advanced",
    module_number: 9,
    lesson_number: 5,
    content: "Market regimes are distinct periods characterized by different behaviors, volatility patterns, and correlations. Bull markets, bear markets, high volatility, low volatility, trending, and range-bound are different regimes. Strategies that work in one regime may fail in another. Successful traders adapt their approach based on current market regime rather than using the same strategy always.",
    examples: JSON.stringify([
      "2010-2020: low volatility, trending bull market",
      "2008-2009: high volatility, bear market",
      "2000-2002: bear market in tech, sideways overall",
      "1970s: high inflation, volatile markets"
    ]),
    practice_problems: JSON.stringify([
      "Identify current market regime characteristics",
      "Adapt strategies to different market regimes",
      "Understand how regimes affect asset correlations"
    ]),
    estimated_time: 25,
    quiz: [
      {
        question: "Why is understanding market regimes important?",
        options: ["It's not important", "Strategies need to adapt to different market conditions", "All regimes are the same", "Only for day traders"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "CPI & Economic Events",
    level: "advanced",
    module_number: 9,
    lesson_number: 6,
    content: "Consumer Price Index (CPI) measures inflation and significantly impacts markets. Other key economic indicators include GDP, employment data, Fed meetings, and earnings seasons. These events create volatility and trend changes. Understanding economic calendar and market expectations helps anticipate volatility and position appropriately. Markets often move more on surprises than absolute numbers.",
    examples: JSON.stringify([
      "Higher than expected CPI causing bond yields to spike",
      "Fed meeting outcomes affecting entire market direction",
      "Employment data influencing Fed policy expectations",
      "Earnings season creating sector rotations"
    ]),
    practice_problems: JSON.stringify([
      "Track economic calendar and market reactions",
      "Understand how different data affects various assets",
      "Position for volatility around major events"
    ]),
    estimated_time: 22,
    quiz: [
      {
        question: "What does CPI measure?",
        options: ["Stock prices", "Inflation", "Employment", "GDP growth"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Emotional Trading Cycles",
    level: "advanced",
    module_number: 9,
    lesson_number: 7,
    content: "Traders go through predictable emotional cycles: optimism, excitement, euphoria, anxiety, denial, fear, desperation, panic, capitulation, despondency, depression, hope, relief, and back to optimism. Understanding these cycles helps recognize when emotions are driving decisions rather than logic. The best trades often feel uncomfortable and go against prevailing emotions.",
    examples: JSON.stringify([
      "Euphoria at market tops leading to poor decisions",
      "Panic at market bottoms creating selling opportunities",
      "FOMO during bull runs causing overextension",
      "Despair during bear markets preventing good purchases"
    ]),
    practice_problems: JSON.stringify([
      "Identify your current position in emotional cycle",
      "Develop strategies to counteract emotional extremes",
      "Use emotional extremes as contrarian indicators"
    ]),
    estimated_time: 20,
    quiz: [
      {
        question: "When do the best trading opportunities often occur?",
        options: ["During euphoria", "When everyone is optimistic", "During emotional extremes like panic", "Never"],
        correct_answer: 2
      }
    ]
  },
  {
    title: "Overconfidence Bias",
    level: "advanced",
    module_number: 9,
    lesson_number: 8,
    content: "Overconfidence bias causes traders to overestimate their abilities, knowledge, and chances of success. It leads to excessive trading, inadequate risk management, and ignoring contrary evidence. Successful periods often increase overconfidence, leading to larger positions and more risk-taking. Maintaining humility and systematic approach helps combat overconfidence.",
    examples: JSON.stringify([
      "Winning streak leading to larger, riskier positions",
      "Ignoring stop-losses due to overconfidence in analysis",
      "Trading outside areas of expertise",
      "Dismissing risk management as unnecessary"
    ]),
    practice_problems: JSON.stringify([
      "Identify signs of overconfidence in your trading",
      "Develop systems to maintain discipline during winning streaks",
      "Practice intellectual humility about market predictions"
    ]),
    estimated_time: 19,
    quiz: [
      {
        question: "What's a common result of overconfidence bias?",
        options: ["Better performance", "Excessive risk-taking and poor decisions", "More careful analysis", "Lower returns"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Discipline Systems",
    level: "advanced",
    module_number: 9,
    lesson_number: 9,
    content: "Discipline systems are rules and processes that help maintain consistent behavior regardless of emotions or market conditions. They include position sizing rules, entry/exit criteria, risk management protocols, and review processes. Written rules remove emotion from decisions. Systematic approaches outperform discretionary trading for most people because they eliminate behavioral biases.",
    examples: JSON.stringify([
      "Written trading plan with specific entry/exit rules",
      "Position sizing formula based on account size and risk",
      "Daily/weekly review process for continuous improvement",
      "Checklist approach to ensure all criteria are met"
    ]),
    practice_problems: JSON.stringify([
      "Develop comprehensive trading discipline system",
      "Create written rules for all trading decisions",
      "Implement systematic review and improvement process"
    ]),
    estimated_time: 21,
    quiz: [
      {
        question: "Why are discipline systems important in trading?",
        options: ["They guarantee profits", "They remove emotion from decisions", "They're required by law", "They impress others"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Long-Term Mindset",
    level: "advanced",
    module_number: 9,
    lesson_number: 10,
    content: "Long-term mindset focuses on process over outcomes, understanding that short-term results are largely random while long-term results reflect skill and strategy. It involves patience, continuous learning, and adaptation. Long-term thinking reduces emotional stress, improves decision-making, and allows compound returns to work. Success in markets requires thinking in decades, not days.",
    examples: JSON.stringify([
      "Warren Buffett's decades-long investment approach",
      "Focusing on 5-year returns rather than daily fluctuations",
      "Building skills and knowledge over years",
      "Allowing compound returns to build wealth over time"
    ]),
    practice_problems: JSON.stringify([
      "Develop long-term perspective on market participation",
      "Focus on process improvement over short-term results",
      "Create systems for continuous learning and adaptation"
    ]),
    estimated_time: 18,
    quiz: [
      {
        question: "What's a key benefit of long-term mindset in trading?",
        options: ["Guaranteed quick profits", "Reduced emotional stress and better decisions", "No need for analysis", "Avoiding all losses"],
        correct_answer: 1
      }
    ]
  }
,
  // Module 10: Personal Wealth & Life Finance (Advanced / Premium) - 10 lessons
  {
    title: "Taxes Basics (High-Level)",
    level: "advanced",
    module_number: 10,
    lesson_number: 1,
    content: "Understanding taxes is crucial for wealth building as it's not what you earn but what you keep after taxes that matters. Key concepts include ordinary income vs capital gains, tax-deferred vs tax-free accounts, and tax-loss harvesting. Long-term capital gains (held >1 year) are taxed more favorably than short-term gains. Tax planning should be integrated with investment strategy.",
    examples: JSON.stringify([
      "Long-term capital gains: 0%, 15%, or 20% vs ordinary income rates",
      "401(k) contributions reducing current taxable income",
      "Roth IRA: pay taxes now, withdraw tax-free later",
      "Tax-loss harvesting: selling losses to offset gains"
    ]),
    practice_problems: JSON.stringify([
      "Calculate tax impact of different investment strategies",
      "Understand your marginal vs effective tax rate",
      "Plan investment timing for tax efficiency"
    ]),
    estimated_time: 26,
    quiz: [
      {
        question: "How are long-term capital gains taxed compared to ordinary income?",
        options: ["Same rate", "Higher rate", "Lower rate", "Not taxed"],
        correct_answer: 2
      }
    ]
  },
  {
    title: "Tax-Advantaged Accounts (401k, Roth IRA)",
    level: "advanced",
    module_number: 10,
    lesson_number: 2,
    content: "Tax-advantaged accounts like 401(k), traditional IRA, and Roth IRA provide significant benefits for long-term wealth building. Traditional accounts offer current tax deductions but taxable withdrawals. Roth accounts use after-tax dollars but provide tax-free growth and withdrawals. 401(k) plans often include employer matching - free money that should always be captured.",
    examples: JSON.stringify([
      "401(k): $22,500 contribution limit (2023), plus $7,500 catch-up if 50+",
      "Employer match: 50% of first 6% = 3% free money",
      "Roth IRA: $6,500 limit, income restrictions apply",
      "Traditional vs Roth: current deduction vs future tax-free"
    ]),
    practice_problems: JSON.stringify([
      "Calculate optimal contribution strategy across accounts",
      "Understand income limits and eligibility rules",
      "Compare traditional vs Roth for your situation"
    ]),
    estimated_time: 24,
    quiz: [
      {
        question: "What's the main advantage of a Roth IRA?",
        options: ["Current tax deduction", "Tax-free growth and withdrawals", "Higher contribution limits", "No income limits"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Inflation-Proofing Wealth",
    level: "advanced",
    module_number: 10,
    lesson_number: 3,
    content: "Inflation erodes purchasing power over time, making inflation protection essential for long-term wealth preservation. Strategies include owning assets that appreciate with inflation (stocks, real estate), Treasury Inflation-Protected Securities (TIPS), commodities, and avoiding long-term fixed-rate debt. Diversification across asset classes provides natural inflation hedging.",
    examples: JSON.stringify([
      "Stocks historically outpacing inflation over long periods",
      "Real estate values and rents rising with inflation",
      "TIPS adjusting principal based on CPI changes",
      "Fixed-rate mortgage becoming cheaper with inflation"
    ]),
    practice_problems: JSON.stringify([
      "Build portfolio with inflation protection in mind",
      "Understand which assets benefit from inflation",
      "Calculate inflation's impact on fixed income over time"
    ]),
    estimated_time: 22,
    quiz: [
      {
        question: "Which assets typically provide inflation protection?",
        options: ["Cash and bonds", "Stocks and real estate", "CDs only", "Government bonds only"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Passive vs Active Income",
    level: "advanced",
    module_number: 10,
    lesson_number: 4,
    content: "Active income requires ongoing work (salary, wages, business income), while passive income generates money with minimal ongoing effort (dividends, rental income, royalties). Building passive income streams creates financial freedom and reduces dependence on active work. The goal is to eventually have passive income cover living expenses, achieving financial independence.",
    examples: JSON.stringify([
      "Active: $100k salary requiring 40 hours/week",
      "Passive: $50k annual dividends from $1.25M portfolio",
      "Rental property generating $500/month after expenses",
      "Royalties from book, patent, or creative work"
    ]),
    practice_problems: JSON.stringify([
      "Calculate passive income needed for financial independence",
      "Identify potential passive income streams",
      "Plan transition from active to passive income"
    ]),
    estimated_time: 21,
    quiz: [
      {
        question: "What characterizes passive income?",
        options: ["Requires full-time work", "Generates money with minimal ongoing effort", "Only from employment", "Always guaranteed"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Salary vs Equity",
    level: "advanced",
    module_number: 10,
    lesson_number: 5,
    content: "Salary provides immediate, predictable income, while equity compensation (stock options, restricted stock) offers potential for significant wealth creation but with risk. Equity aligns your interests with company success and can create life-changing wealth in successful companies. Understanding vesting schedules, tax implications, and diversification needs is crucial when receiving equity compensation.",
    examples: JSON.stringify([
      "Tech employee receiving stock options worth millions",
      "Startup equity becoming valuable after IPO",
      "Vesting schedule: 25% per year over 4 years",
      "Tax implications: ISO vs NSO stock options"
    ]),
    practice_problems: JSON.stringify([
      "Evaluate equity compensation offers",
      "Understand vesting and tax implications",
      "Plan diversification strategy for concentrated equity"
    ]),
    estimated_time: 23,
    quiz: [
      {
        question: "What's the main advantage of equity compensation?",
        options: ["Guaranteed income", "Potential for significant wealth creation", "No risk", "Immediate cash"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Insurance Basics",
    level: "advanced",
    module_number: 10,
    lesson_number: 6,
    content: "Insurance protects against catastrophic financial losses that could derail wealth building. Essential coverage includes health, disability, liability, and life insurance. Term life insurance is usually better than whole life for most people. Disability insurance protects your ability to earn income. Adequate liability coverage protects assets from lawsuits. Insurance is risk management, not investment.",
    examples: JSON.stringify([
      "Term life insurance: $1M coverage for $50/month",
      "Disability insurance: 60% of income if unable to work",
      "Umbrella policy: $1M liability coverage for $200/year",
      "Health insurance: protecting against medical bankruptcy"
    ]),
    practice_problems: JSON.stringify([
      "Assess your insurance needs and coverage gaps",
      "Compare term vs whole life insurance",
      "Calculate appropriate coverage amounts"
    ]),
    estimated_time: 20,
    quiz: [
      {
        question: "What's the primary purpose of insurance?",
        options: ["Investment returns", "Protect against catastrophic financial losses", "Tax benefits", "Guaranteed profits"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Financial Independence (FIRE)",
    level: "advanced",
    module_number: 10,
    lesson_number: 7,
    content: "Financial Independence, Retire Early (FIRE) involves saving and investing aggressively to achieve financial independence much earlier than traditional retirement age. The basic formula is saving 25x annual expenses and withdrawing 4% annually. Variations include Lean FIRE (minimal expenses), Fat FIRE (higher lifestyle), and Coast FIRE (enough saved to grow to retirement needs).",
    examples: JSON.stringify([
      "$40k annual expenses × 25 = $1M needed for FIRE",
      "50% savings rate can achieve FIRE in 15-17 years",
      "Geographic arbitrage: earning in high-cost, living in low-cost area",
      "Side hustles and optimization accelerating FIRE timeline"
    ]),
    practice_problems: JSON.stringify([
      "Calculate your FIRE number and timeline",
      "Identify strategies to increase savings rate",
      "Plan for healthcare and other considerations in early retirement"
    ]),
    estimated_time: 25,
    quiz: [
      {
        question: "What's the basic FIRE formula?",
        options: ["Save 10x expenses", "Save 25x annual expenses", "Save 50x expenses", "Save $1 million"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Risk Management for Life",
    level: "advanced",
    module_number: 10,
    lesson_number: 8,
    content: "Life risk management goes beyond investment risk to include career, health, family, and economic risks. Strategies include diversifying income sources, maintaining emergency funds, having appropriate insurance, continuous skill development, and building strong relationships. The goal is protecting and enhancing your ability to generate income and build wealth over decades.",
    examples: JSON.stringify([
      "Multiple income streams reducing career risk",
      "Emergency fund covering 6-12 months expenses",
      "Continuous learning maintaining career relevance",
      "Strong professional network providing opportunities"
    ]),
    practice_problems: JSON.stringify([
      "Assess various life risks and mitigation strategies",
      "Build comprehensive risk management plan",
      "Regularly review and update risk management approach"
    ]),
    estimated_time: 22,
    quiz: [
      {
        question: "What's included in comprehensive life risk management?",
        options: ["Only investment risk", "Career, health, family, and economic risks", "Only insurance", "Only emergency funds"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Net Worth Tracking",
    level: "advanced",
    module_number: 10,
    lesson_number: 9,
    content: "Net worth is total assets minus total liabilities - the true measure of financial progress. Regular tracking helps identify trends, motivate continued progress, and guide financial decisions. Assets include investments, real estate, and valuable possessions. Liabilities include mortgages, loans, and credit card debt. Focus on increasing assets and reducing liabilities over time.",
    examples: JSON.stringify([
      "Assets: $500k investments + $300k home = $800k",
      "Liabilities: $200k mortgage + $10k car loan = $210k",
      "Net worth: $800k - $210k = $590k",
      "Monthly tracking showing steady progress over time"
    ]),
    practice_problems: JSON.stringify([
      "Calculate your current net worth",
      "Set up system for regular net worth tracking",
      "Identify strategies to increase net worth faster"
    ]),
    estimated_time: 19,
    quiz: [
      {
        question: "How is net worth calculated?",
        options: ["Assets only", "Assets minus liabilities", "Income minus expenses", "Investments only"],
        correct_answer: 1
      }
    ]
  },
  {
    title: "Building Wealth Over Decades",
    level: "advanced",
    module_number: 10,
    lesson_number: 10,
    content: "Building significant wealth requires decades of consistent saving, investing, and compound growth. Key principles include starting early, living below your means, investing in appreciating assets, avoiding lifestyle inflation, and staying disciplined through market cycles. The combination of time, compound returns, and consistent contributions creates extraordinary wealth over 30-40 year periods.",
    examples: JSON.stringify([
      "$500/month from age 25-65 = $1.37M at 8% return",
      "Starting at 35 instead of 25 cuts final amount nearly in half",
      "Lifestyle inflation preventing wealth accumulation",
      "Staying invested through multiple market cycles"
    ]),
    practice_problems: JSON.stringify([
      "Model wealth building scenarios over different timeframes",
      "Identify and avoid wealth-destroying behaviors",
      "Create long-term wealth building plan and stick to it"
    ]),
    estimated_time: 24,
    quiz: [
      {
        question: "What's the most important factor in building wealth over decades?",
        options: ["Perfect market timing", "Starting early and staying consistent", "High-risk investments", "Avoiding all investments"],
        correct_answer: 1
      }
    ]
  }
];