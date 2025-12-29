import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';

const TermsOfService = () => {
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
          Terms of Service
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
            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Investly Education ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>2. Description of Service</h2>
            <p>
              Investly Education is a finance education platform designed to provide students with comprehensive learning materials, 
              interactive lessons, quizzes, and AI-powered tutoring to enhance financial literacy and investment knowledge.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>3. User Accounts</h2>
            <p>
              To access certain features of the Service, you must register for an account. You are responsible for maintaining the 
              confidentiality of your account credentials and for all activities that occur under your account.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>4. Educational Content</h2>
            <p>
              The educational content provided on Investly Education is for informational and educational purposes only. 
              It should not be considered as financial advice, investment recommendations, or professional guidance. 
              Always consult with qualified financial professionals before making investment decisions.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>5. User Conduct</h2>
            <p>You agree not to:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
              <li>Share your account credentials with others</li>
              <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
              <li>Upload or transmit malicious code or content</li>
              <li>Interfere with the proper functioning of the Service</li>
            </ul>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>6. Intellectual Property</h2>
            <p>
              All content, features, and functionality of the Service are owned by Investly Education and are protected by 
              copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create 
              derivative works without explicit permission.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>7. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
              to understand our practices regarding the collection and use of your information.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>8. Disclaimers</h2>
            <p>
              The Service is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, 
              or reliability of any content. Your use of the Service is at your own risk.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>9. Limitation of Liability</h2>
            <p>
              Investly Education shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
              resulting from your use of the Service.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>10. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, 
              without notice, for conduct that we believe violates these Terms of Service.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of significant changes via email 
              or through the Service. Continued use of the Service after changes constitutes acceptance of the new terms.
            </p>

            <h2 style={{ color: '#1e293b', marginTop: '30px', marginBottom: '15px' }}>12. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us through our contact page or email us 
              at support@investly-education.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;