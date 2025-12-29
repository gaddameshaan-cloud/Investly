-- Create user_onboarding table to store questionnaire responses
-- Run this in your Supabase SQL editor

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

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_onboarding_user_id ON user_onboarding(user_id);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_completed_at ON user_onboarding(completed_at);

-- Add comments for documentation
COMMENT ON TABLE user_onboarding IS 'Stores user onboarding questionnaire responses';
COMMENT ON COLUMN user_onboarding.user_id IS 'Reference to the user who completed onboarding';
COMMENT ON COLUMN user_onboarding.how_did_you_find_us IS 'Array of selected options for how user found the platform';
COMMENT ON COLUMN user_onboarding.familiarity_with_finance IS 'Array of selected options for finance familiarity';
COMMENT ON COLUMN user_onboarding.current_goal IS 'Single selected option for current goal';
COMMENT ON COLUMN user_onboarding.completed_at IS 'When the user completed the onboarding questionnaire';

-- Enable Row Level Security (RLS)
ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own onboarding responses" ON user_onboarding
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding responses" ON user_onboarding
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding responses" ON user_onboarding
  FOR UPDATE USING (auth.uid() = user_id);