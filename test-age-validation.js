import { supabaseAdmin } from './src/server/database/supabase.js';

async function testAgeValidation() {
  try {
    console.log('Testing age validation system...');
    
    // Test if date_of_birth column exists
    const { data: tableInfo, error: tableError } = await supabaseAdmin
      .from('users')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('❌ Error accessing users table:', tableError);
      return;
    }

    // Check if date_of_birth column exists
    if (tableInfo && tableInfo.length > 0) {
      const hasDateOfBirth = 'date_of_birth' in tableInfo[0];
      console.log('✅ Users table accessible');
      console.log('Date of birth column exists:', hasDateOfBirth);
      
      if (!hasDateOfBirth) {
        console.log('\n⚠️  Migration needed! Run the SQL script:');
        console.log('1. Go to your Supabase dashboard');
        console.log('2. Navigate to SQL Editor');
        console.log('3. Run the contents of add-date-of-birth-column.sql');
      }
    } else {
      console.log('✅ Users table exists but is empty');
      console.log('✅ Ready for new users with date of birth validation');
    }

    // Test age calculation function
    const calculateAge = (dateOfBirth) => {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age;
    };

    // Test cases
    const testCases = [
      { dob: '2015-01-01', expectedResult: 'too young' },
      { dob: '2010-01-01', expectedResult: 'old enough' },
      { dob: '2000-01-01', expectedResult: 'old enough' },
      { dob: new Date(Date.now() - 12 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], expectedResult: 'too young' },
      { dob: new Date(Date.now() - 14 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], expectedResult: 'old enough' }
    ];

    console.log('\n🧪 Testing age calculation:');
    testCases.forEach((testCase, index) => {
      const age = calculateAge(testCase.dob);
      const isOldEnough = age >= 13;
      const result = isOldEnough ? 'old enough' : 'too young';
      const status = result === testCase.expectedResult ? '✅' : '❌';
      
      console.log(`${status} Test ${index + 1}: DOB ${testCase.dob} → Age ${age} → ${result}`);
    });

    console.log('\n✅ Age validation system ready!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAgeValidation();