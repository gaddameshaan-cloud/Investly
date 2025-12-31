-- Add date_of_birth column to users table
-- Run this in your Supabase SQL editor

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- Add comment for documentation
COMMENT ON COLUMN users.date_of_birth IS 'User date of birth for age verification (must be 13+ to create account)';

-- Add index for potential age-based queries
CREATE INDEX IF NOT EXISTS idx_users_date_of_birth ON users(date_of_birth);

-- Optional: Add a check constraint to ensure users are at least 13 years old
-- This provides database-level validation in addition to application validation
ALTER TABLE users 
ADD CONSTRAINT check_minimum_age 
CHECK (date_of_birth <= CURRENT_DATE - INTERVAL '13 years');