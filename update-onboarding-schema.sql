-- Update onboarding table schema for mixed question types
-- Run this in your Supabase SQL editor

-- Change current_goal from TEXT to TEXT[] to support multiple selections
ALTER TABLE user_onboarding 
ALTER COLUMN current_goal TYPE TEXT[] USING ARRAY[current_goal]::TEXT[];

-- Set default value for current_goal to empty array
ALTER TABLE user_onboarding 
ALTER COLUMN current_goal SET DEFAULT '{}';

-- Keep familiarity_with_finance as TEXT for single selection
-- If it was changed to TEXT[] before, change it back to TEXT
ALTER TABLE user_onboarding 
ALTER COLUMN familiarity_with_finance TYPE TEXT USING 
  CASE 
    WHEN familiarity_with_finance IS NULL THEN NULL
    WHEN array_length(familiarity_with_finance, 1) > 0 THEN familiarity_with_finance[1]
    ELSE NULL
  END;

-- Update comments to reflect the correct data types
COMMENT ON COLUMN user_onboarding.familiarity_with_finance IS 'Single selected option for finance familiarity level';
COMMENT ON COLUMN user_onboarding.current_goal IS 'Array of selected options for current goals (up to 3)';

-- If you have existing data, you might want to convert arrays to single values for familiarity
-- This is optional and only needed if you have existing onboarding responses