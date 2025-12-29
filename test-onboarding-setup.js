import { supabaseAdmin } from './src/server/database/supabase.js';

async function testOnboardingSetup() {
  try {
    console.log('Testing onboarding table setup...');
    
    // Test if user_onboarding table exists
    const { data, error } = await supabaseAdmin
      .from('user_onboarding')
      .select('*')
      .limit(1);

    if (error) {
      if (error.message.includes('relation "user_onboarding" does not exist')) {
        console.log('\n⚠️  Onboarding table does not exist!');
        console.log('Please run the SQL script in Supabase:');
        console.log('1. Go to your Supabase dashboard');
        console.log('2. Navigate to SQL Editor');
        console.log('3. Run the contents of create-onboarding-table.sql');
        return;
      } else {
        console.error('Database error:', error);
        return;
      }
    }

    console.log('✅ Onboarding table exists and is accessible!');
    console.log('✅ Ready to accept onboarding questionnaire responses');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testOnboardingSetup();