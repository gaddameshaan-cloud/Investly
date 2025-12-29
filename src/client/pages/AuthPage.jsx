import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, Award, ArrowLeft, Sparkles } from 'lucide-react';

function AuthPage({ onLogin }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(endpoint, formData);
      onLogin(response.data.user, response.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #f1f5f9 50%, #e0f2fe 75%, #f0f9ff 100%)', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      <div style={{ 
        paddingTop: '60px', 
        paddingBottom: '60px', 
        position: 'relative', 
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 24px'
      }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(226, 232, 240, 0.6)',
            color: '#64748b',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s',
            marginBottom: '40px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
          }}
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', minHeight: '70vh' }}>
          
          <div>
            <div style={{ marginBottom: '30px' }}>
              <img 
                src="/assets/investly-logo.png" 
                alt="Investly Logo" 
                style={{ 
                  width: '100px', 
                  height: '100px'
                }} 
              />
            </div>
            
            <h1 style={{ 
              fontSize: '72px', 
              fontWeight: '950', 
              marginBottom: '20px', 
              fontFamily: 'Space Grotesk, sans-serif', 
              letterSpacing: '-3px',
              lineHeight: '0.9',
              color: '#1e293b'
            }}>
              Investly
            </h1>
            
            <p style={{ 
              fontSize: '24px', 
              marginBottom: '40px', 
              fontWeight: '600', 
              color: '#64748b',
              lineHeight: '1.4'
            }}>
              Master Personal Finance, Investing, and Economics
            </p>

            <div style={{ marginTop: '40px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'start', 
                marginBottom: '32px', 
                gap: '20px'
              }}>
                <div style={{ 
                  padding: '16px', 
                  background: 'white', 
                  borderRadius: '16px', 
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0'
                }}>
                  <BookOpen size={32} style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: '800', 
                    marginBottom: '8px', 
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: '#1e293b'
                  }}>
                    500+ Lessons
                  </h3>
                  <p style={{ 
                    color: '#64748b', 
                    fontSize: '16px', 
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Comprehensive curriculum from beginner to expert
                  </p>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'start', 
                marginBottom: '32px', 
                gap: '20px'
              }}>
                <div style={{ 
                  padding: '16px', 
                  background: 'white', 
                  borderRadius: '16px', 
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0'
                }}>
                  <Brain size={32} style={{ color: '#8b5cf6' }} />
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: '800', 
                    marginBottom: '8px', 
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: '#1e293b'
                  }}>
                    AI-Powered Tutor
                  </h3>
                  <p style={{ 
                    color: '#64748b', 
                    fontSize: '16px', 
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Get personalized help 24/7 with intelligent AI
                  </p>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'start', 
                gap: '20px'
              }}>
                <div style={{ 
                  padding: '16px', 
                  background: 'white', 
                  borderRadius: '16px', 
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0'
                }}>
                  <Award size={32} style={{ color: '#22c55e' }} />
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: '800', 
                    marginBottom: '8px', 
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: '#1e293b'
                  }}>
                    Smart Analytics
                  </h3>
                  <p style={{ 
                    color: '#64748b', 
                    fontSize: '16px', 
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Track progress with detailed insights
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'white',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            borderRadius: '20px',
            padding: '48px 40px'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{
                display: 'inline-block',
                padding: '16px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
                borderRadius: '16px',
                marginBottom: '24px',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
              }}>
                <Sparkles size={32} style={{ color: 'white' }} />
              </div>
              <h2 style={{ 
                fontSize: '40px', 
                marginBottom: '12px', 
                fontWeight: '950', 
                color: '#1e293b', 
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-2px',
                lineHeight: '1.0'
              }}>
                {isLogin ? 'Welcome Back!' : 'Join Investly'}
              </h2>
              <p style={{ 
                color: '#64748b', 
                fontSize: '18px',
                fontWeight: '500',
                margin: 0
              }}>
                {isLogin ? 'Continue your financial education journey' : 'Start your path to financial literacy'}
              </p>
            </div>
            
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
              {!isLogin && (
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={!isLogin}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      fontSize: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      transition: 'all 0.3s',
                      background: 'white',
                      color: '#1e293b',
                      fontWeight: '500'
                    }}
                  />
                </div>
              )}
              
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: '16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    transition: 'all 0.3s',
                    background: 'white',
                    color: '#1e293b',
                    fontWeight: '500'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: '16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    transition: 'all 0.3s',
                    background: 'white',
                    color: '#1e293b',
                    fontWeight: '500'
                  }}
                />
              </div>

              <button 
                type="submit" 
                style={{ 
                  width: '100%', 
                  marginBottom: '16px',
                  padding: '18px',
                  fontSize: '18px',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.3s',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {isLogin ? '🚀 Sign In' : '✨ Create Account'}
              </button>
            </form>

            <div style={{ 
              textAlign: 'center', 
              padding: '24px 0 0',
              borderTop: '1px solid #e2e8f0'
            }}>
              <p style={{ 
                color: '#64748b', 
                fontSize: '16px',
                fontWeight: '500',
                margin: 0
              }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#3b82f6', 
                    cursor: 'pointer', 
                    fontWeight: '700',
                    fontSize: '16px',
                    textDecoration: 'underline',
                    transition: 'all 0.3s'
                  }}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;