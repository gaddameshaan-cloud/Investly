import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import axios from 'axios';

function QuizView({ user }) {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuizData();
  }, [lessonId]);

  const fetchQuizData = async () => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      setError(null);
      
      // Fetch lesson and quiz data in parallel
      const [lessonResponse, quizResponse] = await Promise.all([
        axios.get(`/api/lessons/${lessonId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`/api/quizzes/lesson/${lessonId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setLesson(lessonResponse.data);
      setQuiz(quizResponse.data);
      
      // Parse quiz questions
      let quizQuestions = [];
      try {
        quizQuestions = JSON.parse(quizResponse.data.questions || '[]');
      } catch (e) {
        console.error('Error parsing quiz questions:', e);
        // Fallback to sample questions
        quizQuestions = [
          {
            question: "What is the primary function of money?",
            options: ["Store of value", "Medium of exchange", "Unit of account", "All of the above"],
            correct: 3
          },
          {
            question: "What does compound interest mean?",
            options: ["Interest on principal only", "Interest on interest", "Fixed interest rate", "Variable interest rate"],
            correct: 1
          },
          {
            question: "What is diversification?",
            options: ["Putting all money in one stock", "Spreading investments across different assets", "Only investing in bonds", "Avoiding the stock market"],
            correct: 1
          }
        ];
      }
      
      setQuestions(quizQuestions);
      
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      setError(error.response?.data?.error || 'Failed to load quiz');
      
      // Set fallback questions if API fails
      setQuestions([
        {
          question: "What is the primary function of money?",
          options: ["Store of value", "Medium of exchange", "Unit of account", "All of the above"],
          correct: 3
        },
        {
          question: "What does compound interest mean?",
          options: ["Interest on principal only", "Interest on interest", "Fixed interest rate", "Variable interest rate"],
          correct: 1
        },
        {
          question: "What is diversification?",
          options: ["Putting all money in one stock", "Spreading investments across different assets", "Only investing in bonds", "Avoiding the stock market"],
          correct: 1
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionIdx, answerIdx) => {
    setAnswers({ ...answers, [questionIdx]: answerIdx });
  };

  const handleSubmit = async () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
    
    // Save quiz attempt to database
    if (quiz) {
      const token = localStorage.getItem('token');
      try {
        await axios.post('/api/quizzes/attempt', {
          quizId: quiz.id,
          lessonId: lessonId,
          answers: answers,
          score: finalScore,
          timeSpent: Math.round((Date.now() - Date.now()) / 1000) // Simple time tracking
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.error('Error saving quiz attempt:', error);
      }
    }
    
    setShowResults(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
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
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600' }}>Loading quiz...</p>
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
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
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
            <p style={{ margin: 0, fontWeight: '600' }}>Error loading quiz:</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>{error}</p>
          </div>
          <button 
            onClick={() => fetchQuizData()}
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

  if (questions.length === 0) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600' }}>No quiz available for this lesson</p>
          <button 
            onClick={() => navigate(`/lesson/${lessonId}`)}
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
            Back to Lesson
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: score >= 70 
          ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' 
          : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div className="card glass-card" style={{ 
          maxWidth: '600px', 
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          animation: 'fadeIn 0.6s ease-out, float 3s ease-in-out infinite'
        }}>
          <div style={{
            background: score >= 70 
              ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
              : 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
            padding: '24px',
            borderRadius: '50%',
            width: '120px',
            height: '120px',
            margin: '0 auto 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 2s ease-in-out infinite',
            boxShadow: score >= 70 
              ? '0 12px 40px rgba(16, 185, 129, 0.4)'
              : '0 12px 40px rgba(239, 68, 68, 0.4)'
          }}>
            {score >= 70 ? (
              <CheckCircle size={64} style={{ color: 'white' }} />
            ) : (
              <XCircle size={64} style={{ color: 'white' }} />
            )}
          </div>
          
          <h2 style={{ 
            fontSize: '42px', 
            marginBottom: '20px',
            fontWeight: '800',
            background: score >= 70 
              ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
              : 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {score >= 70 ? '🎉 Congratulations!' : '💪 Keep Learning!'}
          </h2>
          
          <div style={{ 
            padding: '24px',
            background: score >= 70 
              ? 'rgba(16, 185, 129, 0.1)'
              : 'rgba(239, 68, 68, 0.1)',
            borderRadius: '16px',
            marginBottom: '28px'
          }}>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '12px', fontWeight: '500' }}>
              Your Score
            </p>
            <p style={{ 
              fontSize: '56px', 
              fontWeight: '800',
              color: score >= 70 ? '#10b981' : '#ef4444',
              margin: 0
            }}>
              {score}%
            </p>
          </div>
          
          <p style={{ 
            marginBottom: '36px', 
            color: '#374151',
            fontSize: '18px',
            lineHeight: '1.6',
            padding: '0 20px'
          }}>
            {score >= 70 
              ? '✨ Excellent work! You\'ve mastered this lesson and can move forward with confidence.' 
              : '📚 You need 70% to pass. Take some time to review the lesson material and try again when you\'re ready.'}
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {score < 70 && (
              <button className="btn btn-secondary" onClick={() => navigate(`/lesson/${lessonId}`)} style={{
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                📖 Review Lesson
              </button>
            )}
            <button className="btn btn-primary" onClick={() => navigate(lesson ? `/module/${lesson.module_number}` : '/dashboard')} style={{
              padding: '14px 28px',
              fontSize: '16px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
            }}>
              {lesson ? `🏠 Back to Module ${lesson.module_number}` : '🏠 Back to Dashboard'}
            </button>
          </div>
        </div>
        

      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', paddingTop: '60px', paddingBottom: '40px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="card glass-card" style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          animation: 'fadeIn 0.6s ease-out'
        }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
              <span style={{ 
                color: '#667eea', 
                fontWeight: '700',
                fontSize: '16px',
                padding: '8px 16px',
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: '10px'
              }}>
                📝 Question {currentQuestion + 1} of {questions.length}
              </span>
              <span style={{ 
                color: '#10b981', 
                fontWeight: '700',
                fontSize: '16px',
                padding: '8px 16px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '10px'
              }}>
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
              </span>
            </div>
            <div className="progress-bar" style={{ height: '10px', background: 'rgba(102, 126, 234, 0.2)' }}>
              <div className="progress-fill" style={{ 
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                transition: 'width 0.5s ease'
              }}></div>
            </div>
          </div>

          <h2 style={{ 
            fontSize: '32px', 
            marginBottom: '36px',
            fontWeight: '700',
            color: '#1f2937',
            lineHeight: '1.4'
          }}>
            {question.question}
          </h2>

          <div style={{ display: 'grid', gap: '16px', marginBottom: '36px' }}>
            {question.options.map((option, idx) => {
              const isSelected = answers[currentQuestion] === idx;
              const optionLabels = ['A', 'B', 'C', 'D'];
              
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(currentQuestion, idx)}
                  style={{
                    padding: '20px 24px',
                    textAlign: 'left',
                    background: isSelected 
                      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%)'
                      : 'white',
                    border: `2px solid ${isSelected ? '#667eea' : '#e5e7eb'}`,
                    borderRadius: '14px',
                    cursor: 'pointer',
                    fontSize: '17px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    fontWeight: isSelected ? '600' : '500',
                    color: '#374151',
                    boxShadow: isSelected ? '0 8px 24px rgba(102, 126, 234, 0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    width: '36px',
                    height: '36px',
                    background: isSelected 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : '#f3f4f6',
                    color: isSelected ? 'white' : '#6b7280',
                    borderRadius: '10px',
                    textAlign: 'center',
                    lineHeight: '36px',
                    fontWeight: '700',
                    fontSize: '16px',
                    flexShrink: 0
                  }}>
                    {optionLabels[idx]}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          <button 
            className="btn btn-primary" 
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            style={{ 
              width: '100%',
              padding: '18px',
              fontSize: '18px',
              fontWeight: '700',
              background: answers[currentQuestion] === undefined 
                ? '#d1d5db'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              boxShadow: answers[currentQuestion] === undefined 
                ? 'none'
                : '0 8px 24px rgba(102, 126, 234, 0.4)',
              cursor: answers[currentQuestion] === undefined ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'all 0.3s'
            }}
          >
            {currentQuestion < questions.length - 1 ? '➡️ Next Question' : '✅ Submit Quiz'}
            <ArrowRight size={22} />
          </button>
        </div>
      </div>
      

    </div>
  );
}

export default QuizView;
