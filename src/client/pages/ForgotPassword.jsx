import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Mail, Sparkles } from 'lucide-react';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setMessage(response.data.message);
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #f1f5f9 50%, #e0f2fe 75%, #f0f9ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite reverse'
      }}></div>

      <div style={{ 
        maxWidth: '480px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(226, 232, 240, 0.6)',
        borderRadius: '24px',
        padding: '48px 40px',
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)'
      }}>
        <button 
          onClick={() => navigate('/auth')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            color: '#3b82f6',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '32px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(59, 130, 246, 0.15)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(59, 130, 246, 0.1)';
            e.target.style.transform = 'translateY(0px)';
          }}
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '20px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
            borderRadius: '20px',
            marginBottom: '24px',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
          }}>
            <Mail size={32} style={{ color: 'white' }} />
          </div>
          <h2 style={{ 
            fontSize: '36px', 
            marginBottom: '12px', 
            fontWeight: '950', 
            color: '#1e293b',
            fontFamily: 'Space Grotesk, sans-serif',
            letterSpacing: '-1px'
          }}>
            Forgot Password?
          </h2>
          <p style={{ 
            color: '#64748b', 
            fontSize: '16px',
            fontWeight: '500',
            lineHeight: '1.6',
            margin: 0
          }}>
            No worries! Enter your email and we'll send you a reset link
          </p>
        </div>

        {message && (
          <div style={{ 
            background: 'rgba(34, 197, 94, 0.1)', 
            color: '#16a34a', 
            padding: '16px 20px', 
            borderRadius: '12px', 
            marginBottom: '24px',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            fontWeight: '600',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={18} />
            {message}
          </div>
        )}

        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: '#dc2626', 
            padding: '16px 20px', 
            borderRadius: '12px', 
            marginBottom: '24px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            fontWeight: '600',
            fontSize: '15px'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '32px' }}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '16px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                background: 'white',
                color: '#1e293b',
                fontWeight: '500',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%',
              padding: '18px',
              fontSize: '18px',
              fontWeight: '800',
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: loading ? '0 4px 15px rgba(148, 163, 184, 0.2)' : '0 8px 25px rgba(59, 130, 246, 0.3)',
              color: 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0px)';
                e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
              }
            }}
          >
            {loading ? '✨ Sending...' : '🚀 Send Reset Link'}
          </button>
        </form>
      </div>
      
      {/* Footer */}
      <footer style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 1,
        width: '90%',
        maxWidth: '600px'
      }}>
        <p style={{
          color: '#64748b',
          fontSize: '14px',
          fontWeight: '500',
          margin: 0,
          fontFamily: 'Space Grotesk, sans-serif'
        }}>
          © 2025 Investly Education. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default ForgotPassword;
