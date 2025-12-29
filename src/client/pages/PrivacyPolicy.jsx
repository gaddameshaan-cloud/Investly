import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';

const PrivacyPolicy = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
    }}>
      <Navigation />

      {/* Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1e293b',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          Privacy Policy
        </h1>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.1)'
        }}>
          <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
            Last updated: December 29, 2025
          </div>

          <div style={{ lineHeight: '1.7', color: '#475569' }}>
            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>1. Information We Collect</h2>
            
            <h3 style={{ color: '#374151', marginTop: '20px', marginBottom: '10px' }}>Personal Information</h3>
            <p>
              When you create an account, we collect information such as your name, email address, and educational background. 
              This information is necessary to provide you with personalized learning experiences.
            </p>

            <h3 style={{ color: '#374151', marginTop: '20px', marginBottom: '10px' }}>Usage Data</h3>
            <p>
              We automatically collect information about how you use our Service, including your learning progress, 
              quiz scores, time spent on lessons, and interaction patterns with our AI tutor.
            </p>

            <h3 style={{ color: '#374151', marginTop: '20px', marginBottom: '10px' }}>Technical Information</h3>
            <p>
              We collect technical information such as your IP address, browser type, device information, and operating system 
              to ensure the Service functions properly and to improve user experience.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>2. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li>Provide and maintain the educational Service</li>
              <li>Personalize your learning experience and track progress</li>
              <li>Communicate with you about your account and Service updates</li>
              <li>Improve our Service and develop new features</li>
              <li>Ensure the security and integrity of our platform</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              <li>With your explicit consent</li>
              <li>To comply with legal requirements or court orders</li>
              <li>To protect our rights, property, or safety, or that of our users</li>
              <li>With service providers who assist us in operating the Service (under strict confidentiality agreements)</li>
            </ul>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, 
              and regular security assessments.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide the Service and fulfill the purposes 
              outlined in this Privacy Policy. You may request deletion of your account and associated data at any time.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>6. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience, remember your preferences, 
              and analyze usage patterns. You can control cookie settings through your browser preferences.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>7. Third-Party Services</h2>
            <p>
              Our Service may integrate with third-party services (such as Supabase for database management and OpenAI for AI features). 
              These services have their own privacy policies, and we encourage you to review them.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>8. Your Rights</h2>
            <p>You have the right to:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li>Access and review your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Object to certain processing of your information</li>
              <li>Export your data in a portable format</li>
            </ul>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>9. Children's Privacy</h2>
            <p>
              Our Service is designed for educational purposes and may be used by students of various ages. 
              We comply with applicable laws regarding children's privacy, including COPPA and GDPR requirements for minors.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your information during such transfers.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes via email 
              or through the Service. Your continued use of the Service after changes constitutes acceptance of the updated policy.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to exercise your rights regarding your personal information, 
              please contact us through our contact page or email us at investly.official@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;