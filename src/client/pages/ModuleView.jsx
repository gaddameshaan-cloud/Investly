import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Clock, CheckCircle, Play, ArrowLeft, Award, Target, Users, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function ModuleView({ user }) {
  const navigate = useNavigate();
  const { moduleNumber } = useParams();
  const { theme } = useTheme();
  const [lessons, setLessons] = useState([]);
  const [moduleInfo, setModuleInfo] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModuleData();
  }, [moduleNumber]);

  const fetchModuleData = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const [lessonsRes, progressRes] = await Promise.all([
        axios.get(`/api/lessons/module/${moduleNumber}`, config),
        axios.get('/api/progress', config)
      ]);

      setLessons(lessonsRes.data);
      setProgress(progressRes.data);
      
      // Set module info based on first lesson
      if (lessonsRes.data.length > 0) {
        const firstLesson = lessonsRes.data[0];
        setModuleInfo({
          number: firstLesson.module_number,
          title: getModuleTitle(firstLesson.module_number),
          level: firstLesson.level,
          totalLessons: lessonsRes.data.length
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching module data:', error);
      setLoading(false);
    }
  };

  const getModuleTitle = (moduleNum) => {
    const moduleTitles = {
      1: "How Money & Markets Work",
      2: "Personal Finance Basics", 
      3: "Stock Market Basics",
      4: "Trading Fundamentals",
      5: "Investing Deeper",
      6: "Technical Analysis",
      7: "Other Asset Classes",
      8: "Trading Strategy & Risk",
      9: "Market Behavior & Psychology",
      10: "Personal Wealth & Life Finance"
    };
    return moduleTitles[moduleNum] || "Unknown Module";
  };

  const isLessonCompleted = (lessonId) => {
    return progress.some(p => p.lesson_id === lessonId && p.completed);
  };

  const getCompletedCount = () => {
    return lessons.filter(lesson => isLessonCompleted(lesson.id)).length;
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'beginner': return '#3b82f6';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ec4899';
      default: return '#6b7280';
    }
  };

  const getLevelIcon = (level) => {
    switch(level) {
      case 'beginner': return Target;
      case 'intermediate': return TrendingUp;
      case 'advanced': return Award;
      default: return BookOpen;
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
          <p style={{ color: theme.textSecondary, fontSize: '18px' }}>Loading module...</p>
        </div>
      </div>
    );
  }

  if (!moduleInfo) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: theme.bg
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: theme.text, marginBottom: '16px' }}>Module not found</h2>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const LevelIcon = getLevelIcon(moduleInfo.level);
  const completedCount = getCompletedCount();
  const progressPercentage = Math.round((completedCount / moduleInfo.totalLessons) * 100);

  return (
    <div style={{ minHeight: '100vh', background: theme.bg }}>
      {/* Navigation Header */}
      <nav style={{ 
        background: theme.cardBg, 
        backdropFilter: 'blur(20px)', 
        boxShadow: '0 8px 32px rgba(0,0,0,0.06)', 
        padding: '16px 0', 
        borderBottom: `1px solid ${theme.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={() => navigate('/dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: theme.textSecondary,
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(59, 130, 246, 0.1)';
              e.target.style.color = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = theme.textSecondary;
            }}
          >
            <ArrowLeft size={20} />
            Dashboard
          </button>
          
          <div style={{ height: '24px', width: '1px', background: theme.border }}></div>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ color: theme.textSecondary, fontSize: '14px', fontWeight: '500' }}>Dashboard</span>
              <span style={{ color: theme.border }}>›</span>
              <span style={{ color: '#3b82f6', fontSize: '14px', fontWeight: '600' }}>Module {moduleInfo.number}</span>
            </div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              color: theme.text,
              margin: 0,
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              {moduleInfo.title}
            </h1>
            <p style={{ 
              fontSize: '14px', 
              color: theme.textSecondary,
              margin: 0,
              fontWeight: '500'
            }}>
              {completedCount} of {moduleInfo.totalLessons} lessons completed • {progressPercentage}% progress
            </p>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '40px' }}>
        {/* Module Header */}
        <div className="card" style={{ 
          marginBottom: '40px',
          background: theme.cardBg,
          border: `2px solid ${getLevelColor(moduleInfo.level)}15`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, ${getLevelColor(moduleInfo.level)}10 0%, transparent 70%)`,
            pointerEvents: 'none'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', marginBottom: '24px' }}>
              <div style={{
                background: `linear-gradient(135deg, ${getLevelColor(moduleInfo.level)} 0%, ${getLevelColor(moduleInfo.level)}dd 100%)`,
                padding: '20px',
                borderRadius: '20px',
                boxShadow: `0 12px 30px ${getLevelColor(moduleInfo.level)}30`
              }}>
                <LevelIcon size={32} style={{ color: 'white' }} />
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{
                    background: getLevelColor(moduleInfo.level),
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {moduleInfo.level}
                  </span>
                  <span style={{ color: theme.textSecondary, fontSize: '14px', fontWeight: '600' }}>
                    Module {moduleInfo.number}
                  </span>
                </div>
                
                <h2 style={{ 
                  fontSize: '36px', 
                  fontWeight: '900', 
                  color: theme.text,
                  marginBottom: '12px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  lineHeight: '1.2'
                }}>
                  {moduleInfo.title}
                </h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={16} style={{ color: theme.textSecondary }} />
                    <span style={{ color: theme.textSecondary, fontSize: '14px', fontWeight: '600' }}>
                      {moduleInfo.totalLessons} Lessons
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={16} style={{ color: theme.textSecondary }} />
                    <span style={{ color: theme.textSecondary, fontSize: '14px', fontWeight: '600' }}>
                      Interactive Content
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} style={{ color: '#22c55e' }} />
                    <span style={{ color: '#22c55e', fontSize: '14px', fontWeight: '600' }}>
                      {completedCount} Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: theme.text }}>
                  Module Progress
                </span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: getLevelColor(moduleInfo.level) }}>
                  {progressPercentage}%
                </span>
              </div>
              <div className="progress-bar" style={{ height: '8px', background: theme.border, borderRadius: '4px' }}>
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${progressPercentage}%`, 
                    background: `linear-gradient(90deg, ${getLevelColor(moduleInfo.level)} 0%, ${getLevelColor(moduleInfo.level)}dd 100%)`,
                    borderRadius: '4px'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="card" style={{ background: theme.cardBg, border: `1px solid ${theme.border}` }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ 
              fontSize: '28px', 
              fontWeight: '800', 
              color: theme.text,
              marginBottom: '8px',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              Lessons
            </h3>
            <p style={{ 
              color: theme.textSecondary, 
              fontSize: '16px',
              margin: 0
            }}>
              Complete lessons in order to build your knowledge progressively
            </p>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {lessons.map((lesson, idx) => {
              const isCompleted = isLessonCompleted(lesson.id);
              const lessonNumber = idx + 1;
              
              return (
                <div 
                  key={lesson.id}
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                  className="glass-card"
                  style={{
                    padding: '24px',
                    background: isCompleted 
                      ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0.03) 100%)' 
                      : theme.cardBg,
                    border: `2px solid ${isCompleted ? 'rgba(34, 197, 94, 0.2)' : theme.border}`,
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    animation: `slideIn 0.5s ease-out ${idx * 0.05}s backwards`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 12px 40px ${getLevelColor(moduleInfo.level)}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Lesson number indicator */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    width: '32px',
                    height: '32px',
                    background: isCompleted ? '#22c55e' : getLevelColor(moduleInfo.level),
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '700',
                    boxShadow: `0 4px 12px ${isCompleted ? '#22c55e' : getLevelColor(moduleInfo.level)}30`
                  }}>
                    {isCompleted ? <CheckCircle size={16} /> : lessonNumber}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '50px' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        fontSize: '20px', 
                        fontWeight: '700', 
                        marginBottom: '8px', 
                        color: theme.text,
                        fontFamily: 'Space Grotesk, sans-serif'
                      }}>
                        {lesson.title}
                      </h4>
                      
                      <p style={{ 
                        color: theme.textSecondary, 
                        fontSize: '14px', 
                        lineHeight: '1.6',
                        marginBottom: '12px'
                      }}>
                        {lesson.content.substring(0, 120)}...
                      </p>
                      
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '16px',
                        fontSize: '13px',
                        color: theme.textSecondary
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={14} />
                          <span>{lesson.estimated_time} min</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <BookOpen size={14} />
                          <span>Interactive</span>
                        </div>
                        {isCompleted && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#22c55e' }}>
                            <CheckCircle size={14} />
                            <span>Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ 
                      background: isCompleted 
                        ? 'rgba(34, 197, 94, 0.1)' 
                        : `${getLevelColor(moduleInfo.level)}15`, 
                      padding: '12px', 
                      borderRadius: '12px',
                      marginLeft: '20px'
                    }}>
                      {isCompleted ? (
                        <Award size={24} style={{ color: '#22c55e' }} />
                      ) : (
                        <Play size={24} style={{ color: getLevelColor(moduleInfo.level) }} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleView;