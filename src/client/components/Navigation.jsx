import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
      padding: '15px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link 
          to="/" 
          style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#3b82f6',
            textDecoration: 'none'
          }}
        >
          Investly
        </Link>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px'
        }}>
          <Link 
            to="/terms-of-service" 
            style={{
              color: location.pathname === '/terms-of-service' ? '#3b82f6' : '#64748b',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
          >
            Terms of Service
          </Link>
          <Link 
            to="/privacy-policy" 
            style={{
              color: location.pathname === '/privacy-policy' ? '#3b82f6' : '#64748b',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
          >
            Privacy Policy
          </Link>
          <Link 
            to="/contact" 
            style={{
              color: location.pathname === '/contact' ? '#3b82f6' : '#64748b',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
          >
            Contact
          </Link>
          
          {user ? (
            <Link 
              to="/dashboard" 
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'background 0.2s ease'
              }}
            >
              Dashboard
            </Link>
          ) : (
            <Link 
              to="/auth" 
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'background 0.2s ease'
              }}
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;