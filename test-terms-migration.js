import { supabaseAdmin } from './src/server/database/supabase.js';

async function testTermsMigration() {
  try {
    console.log('Testing database connection...');
    
    // Test connection by checking users table structure
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Database connection error:', error);
      return;
    }

    console.log('Database connection successful!');
    
    // Check if the new columns exist
    if (data && data.length > 0) {
      const user = data[0];
      const hasTermsColumn = 'terms_accepted_at' in user;
      const hasPrivacyColumn = 'privacy_policy_accepted_at' in user;
      
      console.log('Terms column exists:', hasTermsColumn);
      console.log('Privacy policy column exists:', hasPrivacyColumn);
      
      if (!hasTermsColumn || !hasPrivacyColumn) {
        console.log('\n⚠️  Migration needed! Run the SQL script in Supabase:');
        console.log('1. Go to your Supabase dashboard');
        console.log('2. Navigate to SQL Editor');
        console.log('3. Run the contents of add-terms-acceptance-columns.sql');
      } else {
        console.log('\n✅ Migration already completed!');
      }
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testTermsMigration();