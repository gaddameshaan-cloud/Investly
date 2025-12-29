import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Lock } from 'lucide-react';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const token = searchParams.get('token');
    if (!token) {
      setError('Invalid reset link');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/auth/reset-password', { 
        token, 
        newPassword 
      });
      setMessage(response.data.message);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/auth');
      }, 3000);
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
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '16px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            borderRadius: '16px',
            marginBottom: '20px'
          }}>
            <Lock size={32} style={{ color: 'white' }} />
          </div>
          <h2 style={{ fontSize: '32px', marginBottom: '8px', fontWeight: '800', color: 'white' }}>
            Reset Password
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px' }}>
            Enter your new password below
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
            <p style={{ marginTop: '8px', fontSize: '14px' }}>Redirecting to login...</p>
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
          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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

          <div style={{ marginBottom: '24px' }}>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
