# Terms of Service and Privacy Policy Implementation

This document outlines the implementation of Terms of Service and Privacy Policy agreement functionality in the Investly application.

## What Was Added

### Frontend Changes

1. **New Pages**
   - `/terms-of-service` - Comprehensive Terms of Service page
   - `/privacy-policy` - Detailed Privacy Policy page

2. **Updated AuthPage (`src/client/pages/AuthPage.jsx`)**
   - Added checkbox for Terms of Service and Privacy Policy agreement during signup
   - Users cannot create an account without agreeing to terms
   - Links to ToS and Privacy Policy open in new tabs
   - Form validation prevents submission without agreement
   - Button is disabled until terms are accepted

3. **New Components**
   - `Footer.jsx` - Reusable footer with links to legal pages
   - `Navigation.jsx` - Navigation component for legal pages

4. **Updated Existing Pages**
   - `LandingPage.jsx` - Now uses new Footer component
   - `Dashboard.jsx` - Now uses new Footer component  
   - `ContactPage.jsx` - Now uses new Footer component

### Backend Changes

1. **Updated Registration Endpoint (`src/server/routes/auth-supabase.js`)**
   - Added validation for `agreedToTerms` parameter
   - Stores timestamps for terms and privacy policy acceptance
   - Returns error if user doesn't agree to terms

2. **Database Schema Updates**
   - Added `terms_accepted_at` column to users table
   - Added `privacy_policy_accepted_at` column to users table

## Database Migration

### Option 1: Manual SQL (Recommended)
Run this SQL in your Supabase SQL Editor:

```sql
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS privacy_policy_accepted_at TIMESTAMPTZ;

-- Update existing users
UPDATE users 
SET 
  terms_accepted_at = created_at,
  privacy_policy_accepted_at = created_at
WHERE 
  terms_accepted_at IS NULL 
  AND privacy_policy_accepted_at IS NULL;
```

### Option 2: Test Migration Status
Run this to check if migration is needed:
```bash
node test-terms-migration.js
```

## User Experience

### For New Users (Signup)
1. User fills out signup form (name, email, password)
2. User must check the "I agree to Terms of Service and Privacy Policy" checkbox
3. Links to ToS and Privacy Policy open in new tabs for review
4. Submit button is disabled until checkbox is checked
5. Backend validates agreement and stores acceptance timestamps
6. Account is created successfully

### For Existing Users (Login)
- No changes to login flow
- Existing users are grandfathered in with acceptance timestamps set to their account creation date

### Legal Page Access
- Terms of Service and Privacy Policy are accessible from any page via footer links
- Clean, professional layout with proper legal content
- Navigation allows easy movement between legal pages

## Technical Implementation Details

### Frontend Validation
- Checkbox state is tracked in component state
- Form submission is prevented if terms not agreed
- Visual feedback with disabled button styling
- Error message displayed if user tries to submit without agreement

### Backend Validation
- Server validates `agreedToTerms` parameter
- Returns 400 error if terms not agreed
- Stores ISO timestamp of acceptance
- Separate timestamps for ToS and Privacy Policy for future flexibility

### Security Considerations
- Terms acceptance is required and validated server-side
- Timestamps provide audit trail of when users agreed
- Links open in new tabs to prevent navigation away from signup
- Existing users are handled gracefully

## Files Modified/Created

### New Files
- `src/client/pages/TermsOfService.jsx`
- `src/client/pages/PrivacyPolicy.jsx`
- `src/client/components/Footer.jsx`
- `src/client/components/Navigation.jsx`
- `add-terms-acceptance-columns.sql`
- `test-terms-migration.js`

### Modified Files
- `src/client/App.jsx` - Added new routes
- `src/client/pages/AuthPage.jsx` - Added terms agreement
- `src/client/pages/LandingPage.jsx` - Updated footer
- `src/client/pages/Dashboard.jsx` - Updated footer
- `src/client/pages/ContactPage.jsx` - Updated footer
- `src/server/routes/auth-supabase.js` - Added terms validation

## Next Steps

1. **Run Database Migration**: Execute the SQL script in Supabase
2. **Test Signup Flow**: Verify new users must agree to terms
3. **Test Legal Pages**: Ensure ToS and Privacy Policy are accessible
4. **Review Content**: Update legal content as needed for your jurisdiction
5. **Monitor**: Check that terms acceptance is being properly recorded

## Legal Compliance Notes

- Terms of Service and Privacy Policy content should be reviewed by legal counsel
- Consider adding version tracking for future terms updates
- Ensure compliance with applicable laws (GDPR, CCPA, etc.)
- Regular review and updates of legal content recommended