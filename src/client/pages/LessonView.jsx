import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function LessonView({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    fetchLesson();
  }, [id]);

  const fetchLesson = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Fetching lesson:', id);
      
      const response = await axios.get(`/api/lessons/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000 // 10 second timeout
      });
      
      console.log('Lesson data received:', response.data);
      setLesson(response.data);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      console.error('Error details:', error.response?.data);
      
      setError(error.response?.data?.error || error.message || 'Failed to load lesson');
      
      if (error.response?.status === 401) {
        // Token expired, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/auth');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const token = localStorage.getItem('token');

    try {
      await axios.post('/api/progress', {
        lesson_id: id,
        completed: true,
        time_spent: timeSpent
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate(`/quiz/${id}`);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: theme.bg
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            border: '4px solid #e2e8f0', 
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: theme.textSecondary, fontSize: '18px', fontWeight: '600' }}>Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: theme.bg
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '40px' }}>
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: '#dc2626', 
            padding: '20px', 
            borderRadius: '12px', 
            marginBottom: '20px',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <p style={{ margin: 0, fontWeight: '600' }}>Error loading lesson:</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>{error}</p>
          </div>
          <button 
            onClick={() => fetchLesson()}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              marginRight: '12px'
            }}
          >
            Try Again
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: theme.bg
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: theme.textSecondary, fontSize: '18px', fontWeight: '600' }}>Lesson not found</p>
          <button 
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              marginTop: '16px'
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  let examples = [];
  let practiceProblems = [];
  
  try {
    examples = JSON.parse(lesson.examples || '[]');
  } catch (e) {
    console.error('Error parsing examples:', e);
    examples = [];
  }
  
  try {
    practiceProblems = JSON.parse(lesson.practice_problems || '[]');
  } catch (e) {
    console.error('Error parsing practice problems:', e);
    practiceProblems = [];
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg }}>
      <div className="container" style={{ paddingTop: '40px', maxWidth: '900px' }}>
        {/* Breadcrumb Navigation */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          marginBottom: '16px',
          fontSize: '14px',
          color: theme.textSecondary
        }}>
          <button 
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'none',
              border: 'none',
              color: theme.textSecondary,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#3b82f6';
              e.target.style.background = 'rgba(59, 130, 246, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = theme.textSecondary;
              e.target.style.background = 'none';
            }}
          >
            Dashboard
          </button>
          <span style={{ color: theme.border }}>›</span>
          <button 
            onClick={() => navigate(`/module/${lesson.module_number}`)}
            style={{
              background: 'none',
              border: 'none',
              color: theme.textSecondary,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#3b82f6';
              e.target.style.background = 'rgba(59, 130, 246, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = theme.textSecondary;
              e.target.style.background = 'none';
            }}
          >
            Module {lesson.module_number}
          </button>
          <span style={{ color: theme.border }}>›</span>
          <span style={{ color: '#3b82f6', fontWeight: '600' }}>{lesson.title}</span>
        </div>

        <button className="btn btn-secondary glass-card" onClick={() => navigate(`/module/${lesson.module_number}`)} style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={20} />
          Back to Module {lesson.module_number}
        </button>

        <div className="card glass-card" style={{ animation: 'fadeIn 0.6s ease-out', background: theme.cardBg, backdropFilter: 'blur(20px)', border: `1px solid ${theme.border}` }}>
          <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span className={`badge badge-${lesson.level}`} style={{
              background: `linear-gradient(135deg, ${lesson.level === 'beginner' ? '#3b82f6' : lesson.level === 'intermediate' ? '#f59e0b' : '#ec4899'} 0%, ${lesson.level === 'beginner' ? '#2563eb' : lesson.level === 'intermediate' ? '#d97706' : '#db2777'} 100%)`,
              color: 'white',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              boxShadow: `0 4px 12px ${lesson.level === 'beginner' ? '#3b82f6' : lesson.level === 'intermediate' ? '#f59e0b' : '#ec4899'}40`
            }}>
              {lesson.level.toUpperCase()}
            </span>
            <span style={{ color: theme.textSecondary, fontSize: '15px', fontWeight: '500' }}>
              📚 Module {lesson.module_number} • Lesson {lesson.lesson_number}
            </span>
          </div>

          <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{lesson.title}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '12px', marginBottom: '36px', width: 'fit-content' }}>
            <Clock size={22} style={{ color: '#667eea' }} />
            <span style={{ color: '#667eea', fontWeight: '600', fontSize: '16px' }}>{lesson.estimated_time} minutes</span>
          </div>

          <div style={{ fontSize: '18px', lineHeight: '1.9', marginBottom: '40px', color: theme.textSecondary }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '20px', color: theme.text, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '32px' }}>📖</span> Lesson Content
            </h2>
            <p style={{ background: 'rgba(102, 126, 234, 0.05)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid #667eea' }}>{lesson.content}</p>
          </div>

          {examples.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '20px', color: theme.text, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '32px' }}>💡</span> Real-World Examples
              </h2>
              <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <ul style={{ paddingLeft: '24px', lineHeight: '2.2', margin: 0 }}>
                  {examples.map((example, idx) => (
                    <li key={idx} style={{ fontSize: '17px', color: theme.textSecondary, marginBottom: '12px' }}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {practiceProblems.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '20px', color: theme.text, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '32px' }}>✏️</span> Practice Problems
              </h2>
              <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                {practiceProblems.map((problem, idx) => (
                  <div key={idx} style={{ 
                    marginBottom: idx < practiceProblems.length - 1 ? '20px' : '0',
                    padding: '16px',
                    background: theme.cardBg,
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    border: `1px solid ${theme.border}`
                  }}>
                    <p style={{ fontSize: '17px', fontWeight: '600', color: theme.textSecondary, margin: 0 }}>
                      <span style={{ 
                        display: 'inline-block',
                        width: '28px',
                        height: '28px',
                        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                        color: 'white',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '28px',
                        marginRight: '12px',
                        fontSize: '14px',
                        fontWeight: '700'
                      }}>
                        {idx + 1}
                      </span>
                      {problem}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className="btn btn-primary" onClick={handleComplete} style={{ 
            width: '100%', 
            fontSize: '20px',
            padding: '18px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'all 0.3s'
          }}>
            <CheckCircle size={28} />
            Complete Lesson & Take Quiz
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '40px 20px 20px',
        background: 'transparent'
      }}>
        {/* Disclaimer */}
        <div style={{
          background: 'rgba(102, 126, 234, 0.08)',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          textAlign: 'left',
          maxWidth: '700px',
          margin: '0 auto 24px'
        }}>
          <p style={{
            color: '#475569',
            fontSize: '13px',
            fontWeight: '500',
            margin: 0,
            lineHeight: '1.6',
            fontFamily: 'Poppins, sans-serif'
          }}>
            <strong style={{ color: '#1f2937' }}>Disclaimer:</strong> Investly provides educational content and tools for learning about finance and investing. This information is for general purposes only and should not be considered financial advice. Always consult a licensed professional before making financial decisions.
          </p>
        </div>
        
        <p style={{
          color: '#6b7280',
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

export default LessonView;
