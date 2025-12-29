-- Add terms and privacy policy acceptance tracking columns to users table
-- Run this in your Supabase SQL editor

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS privacy_policy_accepted_at TIMESTAMPTZ;

-- Add comments for documentation
COMMENT ON COLUMN users.terms_accepted_at IS 'Timestamp when user accepted Terms of Service';
COMMENT ON COLUMN users.privacy_policy_accepted_at IS 'Timestamp when user accepted Privacy Policy';

-- Update existing users to have accepted terms (since they signed up before this requirement)
-- You may want to customize this based on your needs
UPDATE users 
SET 
  terms_accepted_at = created_at,
  privacy_policy_accepted_at = created_at
WHERE 
  terms_accepted_at IS NULL 
  AND privacy_policy_accepted_at IS NULL;