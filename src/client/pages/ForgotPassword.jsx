import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Mail } from 'lucide-react';

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
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Animated background */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float 6s ease-in-out infinite' }}></div>

      <div className="card" style={{ 
        maxWidth: '480px',
        width: '100%',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        position: 'relative',
        zIndex: 1
      }}>
        <button 
          onClick={() => navigate('/auth')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#3b82f6',
            padding: '10px 16px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '24px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.2)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.1)'}
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '16px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            borderRadius: '16px',
            marginBottom: '20px'
          }}>
            <Mail size={32} style={{ color: 'white' }} />
          </div>
          <h2 style={{ fontSize: '32px', marginBottom: '8px', fontWeight: '800', color: 'white' }}>
            Forgot Password?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px' }}>
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {message && (
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.1)', 
            color: '#34d399', 
            padding: '14px 18px', 
            borderRadius: '12px', 
            marginBottom: '20px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            fontWeight: '500'
          }}>
            ✓ {message}
          </div>
        )}

        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: '#fca5a5', 
            padding: '14px 18px', 
            borderRadius: '12px', 
            marginBottom: '20px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            fontWeight: '500'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '16px',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.5)',
                color: 'white',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)'}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ 
              width: '100%',
              padding: '16px',
              fontSize: '18px',
              fontWeight: '700',
              background: loading ? '#6b7280' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              border: 'none',
              color: 'white',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
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
        {/* Disclaimer */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '16px',
          textAlign: 'left'
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '12px',
            fontWeight: '500',
            margin: 0,
            lineHeight: '1.5',
            fontFamily: 'Poppins, sans-serif'
          }}>
            <strong style={{ color: 'white' }}>Disclaimer:</strong> Investly provides educational content only. Not financial advice. Consult a licensed professional before making financial decisions.
          </p>
        </div>
        
        <p style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '14px',
          fontWeight: '500',
          margin: 0,
          fontFamily: 'Poppins, sans-serif'
        }}>
          © 2025 Investly Education. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default ForgotPassword;
