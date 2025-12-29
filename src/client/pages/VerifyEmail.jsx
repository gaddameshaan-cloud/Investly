import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    verifyEmail(token);
  }, [searchParams]);

  const verifyEmail = async (token) => {
    try {
      const response = await axios.post('/api/auth/verify-email', { token });
      setStatus('success');
      setMessage(response.data.message);
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.error || 'Verification failed');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="card" style={{ 
        maxWidth: '500px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.95)'
      }}>
        {status === 'verifying' && (
          <>
            <Loader size={64} style={{ color: '#3b82f6', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }} />
            <h2 style={{ fontSize: '28px', marginBottom: '12px', color: '#1f2937' }}>Verifying Email...</h2>
            <p style={{ color: '#6b7280' }}>Please wait while we verify your email address.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: '28px', marginBottom: '12px', color: '#1f2937' }}>Email Verified!</h2>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>{message}</p>
            <p style={{ color: '#3b82f6', fontSize: '14px' }}>Redirecting to dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle size={64} style={{ color: '#ef4444', margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: '28px', marginBottom: '12px', color: '#1f2937' }}>Verification Failed</h2>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>{message}</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/auth')}
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
