import { supabaseAdmin } from './src/server/database/supabase.js';

async function addTermsAcceptanceColumns() {
  try {
    console.log('Adding terms acceptance columns to users table...');
    
    // Add the new columns
    const { error: alterError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ,
        ADD COLUMN IF NOT EXISTS privacy_policy_accepted_at TIMESTAMPTZ;
      `
    });

    if (alterError) {
      console.error('Error adding columns:', alterError);
      return;
    }

    console.log('Columns added successfully!');

    // Update existing users to have accepted terms
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        terms_accepted_at: new Date().toISOString(),
        privacy_policy_accepted_at: new Date().toISOString()
      })
      .is('terms_accepted_at', null);

    if (updateError) {
      console.error('Error updating existing users:', updateError);
      return;
    }

    console.log('Migration completed successfully!');
    console.log('Existing users have been updated with terms acceptance timestamps.');
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run the migration
addTermsAcceptanceColumns();