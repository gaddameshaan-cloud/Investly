# Onboarding Questionnaire Setup Guide

This guide explains how to set up the onboarding questionnaire feature that appears after users sign up for the first time.

## What Was Added

### Frontend Components

1. **OnboardingQuestionnaire.jsx** - Multi-step questionnaire component
   - 3 questions with multiple choice options
   - Progress bar and navigation
   - Responsive design matching app theme
   - Form validation and submission

2. **Updated App.jsx** - Onboarding flow integration
   - Detects new users after signup
   - Shows onboarding before dashboard
   - Checks existing users' onboarding status

### Backend API

1. **user.js routes** - New API endpoints
   - `POST /api/user/onboarding` - Save questionnaire responses
   - `GET /api/user/onboarding-status` - Check if user completed onboarding
   - JWT authentication middleware

2. **Database Table** - `user_onboarding`
   - Stores questionnaire responses
   - Links to users table
   - Includes timestamps and metadata

## Database Setup

### Step 1: Create the onboarding table
Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS user_onboarding (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  how_did_you_find_us TEXT[] DEFAULT '{}',
  familiarity_with_finance TEXT[] DEFAULT '{}',
  current_goal TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_onboarding_user_id ON user_onboarding(user_id);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_completed_at ON user_onboarding(completed_at);

ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own onboarding responses" ON user_onboarding
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding responses" ON user_onboarding
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding responses" ON user_onboarding
  FOR UPDATE USING (auth.uid() = user_id);
```

### Step 2: Test the setup
```bash
node test-onboarding-setup.js
```

## Questionnaire Details

### Question 1: "How did you find us?"
- **Type**: Multiple choice (up to 3 selections)
- **Options**: Google Search, Social Media, YouTube, Friend Recommendation, School, Online Ad, Blog, Podcast, Reddit, App Store, Other

### Question 2: "How familiar are you with finance?"
- **Type**: Single choice
- **Options**: Unfamiliar, Familiar, Moderately Familiar, Very Familiar

### Question 3: "What best describes your current goal?"
- **Type**: Multiple choice (up to 3 selections)
- **Options**: Learn money management, Start investing, Build emergency fund, Pay off debt, Save for purchase, Plan retirement, Increase income, Start business, Improve credit, Learn crypto, General education

## User Flow

### New User Signup
1. User completes signup form with Terms agreement
2. Account is created successfully
3. User is immediately shown onboarding questionnaire
4. User completes all 3 questions
5. Responses are saved to database
6. User is redirected to dashboard

### Existing User Login
1. User logs in normally
2. System checks if they've completed onboarding
3. If not completed, shows questionnaire
4. If completed, goes directly to dashboard

### Onboarding Experience
- **Progress bar** shows current step (1 of 3, 2 of 3, 3 of 3)
- **Visual feedback** for selections with checkmarks
- **Validation** prevents proceeding without answers
- **Navigation** allows going back to previous questions
- **Responsive design** works on all devices

## Technical Implementation

### Frontend State Management
- `needsOnboarding` state controls when to show questionnaire
- `currentStep` tracks progress through questions
- `answers` object stores all responses
- Form validation ensures required answers

### Backend Data Storage
- Responses stored as JSON arrays for multi-select questions
- Single goal stored as text string
- Timestamps track completion
- User ID links responses to account

### Security Features
- JWT authentication required
- Row Level Security (RLS) policies
- Users can only access their own responses
- Server validates user ID matches token

## Customization Options

### Adding Questions
1. Add new question object to `questions` array in OnboardingQuestionnaire.jsx
2. Add corresponding field to database table
3. Update backend API to handle new field

### Modifying Options
- Edit the `options` array for any question
- No backend changes needed for option text changes
- Consider data migration if removing options

### Styling Changes
- All styles are inline for easy customization
- Colors use consistent theme variables
- Responsive breakpoints included

## Analytics Potential

The onboarding data can be used for:
- **User acquisition insights** - Track most effective channels
- **Content personalization** - Tailor lessons to experience level
- **Goal-based recommendations** - Suggest relevant modules
- **Cohort analysis** - Compare user groups over time

## Files Created/Modified

### New Files
- `src/client/pages/OnboardingQuestionnaire.jsx`
- `src/server/routes/user.js`
- `create-onboarding-table.sql`
- `test-onboarding-setup.js`

### Modified Files
- `src/client/App.jsx` - Added onboarding flow logic
- `src/client/pages/AuthPage.jsx` - Pass new user flag
- `src/server/index.js` - Added user routes

## Testing Checklist

- [ ] Database table created successfully
- [ ] New user signup shows onboarding
- [ ] All 3 questions display correctly
- [ ] Multi-select validation works (max 3 for Q1 & Q2)
- [ ] Single-select validation works (Q3)
- [ ] Progress bar updates correctly
- [ ] Back/Next navigation works
- [ ] Responses save to database
- [ ] User redirected to dashboard after completion
- [ ] Existing users don't see onboarding again
- [ ] Mobile responsive design works

## Troubleshooting

### "Failed to create user" error
- Run the terms acceptance database migration first
- Check Supabase connection

### Onboarding doesn't appear
- Verify onboarding table exists
- Check browser console for API errors
- Ensure JWT token is valid

### Responses not saving
- Check user.js route is properly imported
- Verify database permissions
- Check network tab for API call status