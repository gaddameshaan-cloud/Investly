import { supabaseAdmin } from './src/server/database/supabase.js';

async function debugOnboardingSave() {
  try {
    console.log('Testing onboarding data save...');
    
    // First, check if we have any users to test with
    const { data: users, error: usersError } = await supabaseAdmin
      .from('users')
      .select('id, email, name')
      .limit(1);

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return;
    }

    if (!users || users.length === 0) {
      console.log('❌ No users found in database. Create a user account first.');
      return;
    }

    const testUser = users[0];
    console.log('✅ Found test user:', testUser.email);

    // Test saving onboarding data
    const testData = {
      user_id: testUser.id,
      how_did_you_find_us: ['Google Search', 'Social Media'],
      familiarity_with_finance: 'Familiar',
      current_goal: ['Learn basic money management', 'Start investing'],
      completed_at: new Date().toISOString()
    };

    console.log('Attempting to save test data:', testData);

    const { data, error } = await supabaseAdmin
      .from('user_onboarding')
      .insert(testData)
      .select();

    if (error) {
      console.error('❌ Error saving onboarding data:', error);
      
      if (error.message.includes('column') && error.message.includes('does not exist')) {
        console.log('💡 The table structure might be wrong. Run the schema update SQL.');
      }
      
      if (error.message.includes('violates foreign key constraint')) {
        console.log('💡 User ID issue - this should not happen with existing user.');
      }
    } else {
      console.log('✅ Test data saved successfully:', data);
      
      // Clean up test data
      await supabaseAdmin
        .from('user_onboarding')
        .delete()
        .eq('id', data[0].id);
      
      console.log('✅ Test data cleaned up');
    }

    // Check current table structure
    const { data: tableData, error: tableError } = await supabaseAdmin
      .from('user_onboarding')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('❌ Error checking table structure:', tableError);
    } else {
      console.log('✅ Table is accessible');
    }

  } catch (error) {
    console.error('❌ Debug test failed:', error);
  }
}

debugOnboardingSave();