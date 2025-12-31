import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function debugUserData() {
  try {
    console.log('🔍 Debugging user data...\n');
    
    // Get all users and their date_of_birth
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, date_of_birth, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('❌ Error fetching users:', error);
      return;
    }

    console.log('📊 Recent users in database:');
    console.log('=====================================');
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. User ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Date of Birth: ${user.date_of_birth || 'NULL'}`);
      console.log(`   Created: ${user.created_at}`);
      console.log('---');
    });

    // Check if date_of_birth column exists
    const { data: columns, error: columnError } = await supabaseAdmin
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', 'users')
      .eq('table_schema', 'public');

    if (!columnError && columns) {
      console.log('\n📋 Users table structure:');
      console.log('=====================================');
      columns.forEach(col => {
        console.log(`${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
      });
    }

  } catch (error) {
    console.error('❌ Debug error:', error);
  }
}

debugUserData();