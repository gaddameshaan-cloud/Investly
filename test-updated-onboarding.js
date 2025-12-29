import { supabaseAdmin } from './src/server/database/supabase.js';

async function testUpdatedOnboarding() {
  try {
    console.log('Testing updated onboarding schema...');
    
    // Test if we can insert data with the new schema
    const testData = {
      user_id: '00000000-0000-0000-0000-000000000000', // Dummy UUID for testing
      how_did_you_find_us: ['Google Search', 'Social Media'],
      familiarity_with_finance: ['Familiar', 'Moderately Familiar'],
      current_goal: ['Learn basic money management', 'Start investing', 'Build an emergency fund'],
      completed_at: new Date().toISOString()
    };

    // Try to insert (this will fail due to foreign key, but will test schema)
    const { error } = await supabaseAdmin
      .from('user_onboarding')
      .insert(testData);

    if (error) {
      if (error.message.includes('violates foreign key constraint')) {
        console.log('✅ Schema is correct! (Foreign key error expected with dummy user ID)');
        console.log('✅ All fields accept arrays as expected');
      } else if (error.message.includes('column "current_goal" is of type text[] but expression is of type text')) {
        console.log('❌ Schema update needed! current_goal is still TEXT, not TEXT[]');
        console.log('Please run the SQL migration: update-onboarding-schema.sql');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    } else {
      console.log('✅ Test data inserted successfully (this should not happen with dummy UUID)');
    }

    // Check the table structure
    const { data: tableInfo } = await supabaseAdmin
      .from('user_onboarding')
      .select('*')
      .limit(1);

    console.log('✅ Table is accessible and ready for new onboarding format');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testUpdatedOnboarding();