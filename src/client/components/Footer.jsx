import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ style = {} }) => {
  const defaultStyle = {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(14, 165, 233, 0.03) 100%)',
    borderTop: '1px solid rgba(59, 130, 246, 0.1)',
    padding: '40px 20px 20px',
    textAlign: 'center',
    color: '#64748b'
  };

  const mergedStyle = { ...defaultStyle, ...style };

  return (
    <footer style={mergedStyle}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <Link 
            to="/terms-of-service" 
            style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
          >
            Terms of Service
          </Link>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <Link 
            to="/privacy-policy" 
            style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
          >
            Privacy Policy
          </Link>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <Link 
            to="/contact" 
            style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
          >
            Contact Us
          </Link>
        </div>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: '#64748b'
        }}>
          © 2025 Investly Education. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;