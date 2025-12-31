import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, TrendingUp, Award, Brain, LogOut, BarChart, Settings } from 'lucide-react';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const { theme, darkMode } = useTheme();
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [selectedLevel]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const config = { 
      headers: { Authorization: `Bearer ${token}` },
      timeout: 8000 // 8 second timeout
    };

    try {
      setLoading(true);
      console.log('Fetching dashboard data...');
      
      // Parallel API calls with axios
      const [lessonsRes, progressRes, statsRes] = await Promise.all([
        axios.get(`/api/lessons${selectedLevel !== 'all' ? `?level=${selectedLevel}` : ''}`, config),
        axios.get('/api/progress', config),
        axios.get('/api/analytics/dashboard', config)
      ]);

      console.log('Data fetched successfully');

      // Group lessons by module
      const groupedModules = groupLessonsByModule(lessonsRes.data);
      setModules(groupedModules);
      setProgress(progressRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        // Token expired, logout
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const groupLessonsByModule = (lessons) => {
    const moduleMap = {};
    
    lessons.forEach(lesson => {
      if (!moduleMap[lesson.module_number]) {
        moduleMap[lesson.module_number] = {
          number: lesson.module_number,
          title: getModuleTitle(lesson.module_number),
          level: lesson.level,
          lessons: []
        };
      }
      moduleMap[lesson.module_number].lessons.push(lesson);
    });

    return Object.values(moduleMap).sort((a, b) => a.number - b.number);
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

  const getModuleProgress = (module) => {
    const completedLessons = module.lessons.filter(lesson => isLessonCompleted(lesson.id)).length;
    return {
      completed: completedLessons,
      total: module.lessons.length,
      percentage: Math.round((completedLessons / module.lessons.length) * 100)
    };
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'beginner': return '#3b82f6';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ec4899';
      default: return '#6b7280';
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
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg }}>
      <nav style={{ background: theme.cardBg, backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '20px 0', borderBottom: `1px solid ${theme.border}` }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/assets/investly-logo.png" 
              alt="Investly Logo" 
              style={{ 
                width: '65px', 
                height: '65px'
              }} 
            />
            <h1 style={{ fontSize: '32px', fontWeight: '800', background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px', fontFamily: 'Space Grotesk, sans-serif' }}>
              Investly
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              onClick={() => navigate('/analytics')} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                background: theme.cardBg,
                border: `2px solid ${theme.border}`,
                color: theme.text,
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <BarChart size={20} />
              Analytics
            </button>
            <button 
              onClick={() => navigate('/ai-tutor')} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                background: theme.cardBg,
                border: `2px solid ${theme.border}`,
                color: theme.text,
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Brain size={20} />
              AI Tutor
            </button>
            <button 
              onClick={() => navigate('/settings')} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                background: theme.cardBg,
                border: `2px solid ${theme.border}`,
                color: theme.text,
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Settings size={20} />
              Settings
            </button>
            <span style={{ color: '#667eea', fontWeight: '600', padding: '8px 16px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '10px' }}>
              👋 {user.name}
            </span>
            <button 
              onClick={onLogout} 
              style={{ 
                padding: '12px',
                background: theme.cardBg,
                border: `2px solid ${theme.border}`,
                color: theme.text,
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '40px' }}>
        {stats && (
          <div className="grid grid-3" style={{ marginBottom: '40px', gap: '24px' }}>
            <div style={{ 
              background: theme.cardBg, 
              border: `1px solid ${theme.border}`, 
              borderRadius: '16px',
              padding: '24px',
              backdropFilter: 'blur(10px)',
              animation: 'fadeIn 0.6s ease-out',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: theme.textSecondary, marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Lessons Completed</p>
                  <h3 style={{ 
                    fontSize: '36px', 
                    fontWeight: '800', 
                    marginBottom: '4px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {stats.completedLessons}/{stats.totalLessons}
                  </h3>
                  <p style={{ color: '#667eea', fontSize: '13px', fontWeight: '600' }}>{stats.completionRate}% Complete</p>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '16px', borderRadius: '16px', animation: 'float 3s ease-in-out infinite' }}>
                  <BookOpen size={32} style={{ color: 'white' }} />
                </div>
              </div>
              <div style={{ marginTop: '20px', height: '8px', background: theme.border, borderRadius: '4px' }}>
                <div style={{ width: `${stats.completionRate}%`, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', height: '100%', borderRadius: '4px', transition: 'width 0.3s ease' }}></div>
              </div>
            </div>

            <div style={{ 
              background: theme.cardBg, 
              border: `1px solid ${theme.border}`, 
              borderRadius: '16px',
              padding: '24px',
              backdropFilter: 'blur(10px)',
              animation: 'fadeIn 0.6s ease-out 0.1s backwards',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: theme.textSecondary, marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Average Score</p>
                  <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#f59e0b', marginBottom: '4px' }}>{stats.averageScore}%</h3>
                  <p style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '600' }}>
                    {stats.averageScore >= 90 ? '🔥 Excellent!' : stats.averageScore >= 70 ? '✨ Great!' : '💪 Keep Going!'}
                  </p>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', padding: '16px', borderRadius: '16px', animation: 'float 3s ease-in-out infinite 0.5s' }}>
                  <Award size={32} style={{ color: 'white' }} />
                </div>
              </div>
            </div>

            <div style={{ 
              background: theme.cardBg, 
              border: `1px solid ${theme.border}`, 
              borderRadius: '16px',
              padding: '24px',
              backdropFilter: 'blur(10px)',
              animation: 'fadeIn 0.6s ease-out 0.2s backwards',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: theme.textSecondary, marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Time Spent</p>
                  <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#10b981', marginBottom: '4px' }}>{Math.round((stats.totalTimeSpent || 0) / 60)}h</h3>
                  <p style={{ color: '#10b981', fontSize: '13px', fontWeight: '600' }}>Learning Time</p>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', padding: '16px', borderRadius: '16px', animation: 'float 3s ease-in-out infinite 1s' }}>
                  <TrendingUp size={32} style={{ color: 'white' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ 
          background: theme.cardBg, 
          border: `1px solid ${theme.border}`, 
          borderRadius: '16px',
          padding: '24px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: theme.text }}>Learning Modules</h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setSelectedLevel('all')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: selectedLevel === 'all' ? theme.buttonBg : theme.inputBg,
                  color: selectedLevel === 'all' ? 'white' : theme.textSecondary,
                  boxShadow: selectedLevel === 'all' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
                }}
              >
                All Levels
              </button>
              <button 
                onClick={() => setSelectedLevel('beginner')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: selectedLevel === 'beginner' ? theme.buttonBg : theme.inputBg,
                  color: selectedLevel === 'beginner' ? 'white' : theme.textSecondary,
                  boxShadow: selectedLevel === 'beginner' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
                }}
              >
                Beginner
              </button>
              <button 
                onClick={() => setSelectedLevel('intermediate')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: selectedLevel === 'intermediate' ? theme.buttonBg : theme.inputBg,
                  color: selectedLevel === 'intermediate' ? 'white' : theme.textSecondary,
                  boxShadow: selectedLevel === 'intermediate' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
                }}
              >
                Intermediate
              </button>
              <button 
                onClick={() => setSelectedLevel('advanced')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: selectedLevel === 'advanced' ? theme.buttonBg : theme.inputBg,
                  color: selectedLevel === 'advanced' ? 'white' : theme.textSecondary,
                  boxShadow: selectedLevel === 'advanced' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
                }}
              >
                Advanced
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {modules.map((module, idx) => {
              const moduleProgress = getModuleProgress(module);
              
              return (
                <div 
                  key={module.number}
                  onClick={() => navigate(`/module/${module.number}`)}
                  style={{
                    padding: '24px',
                    background: moduleProgress.percentage === 100
                      ? (theme.darkMode 
                          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.1) 100%)' 
                          : 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%)')
                      : theme.cardBg,
                    border: `2px solid ${moduleProgress.percentage === 100 ? 'rgba(16, 185, 129, 0.3)' : theme.border}`,
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    animation: `slideIn 0.5s ease-out ${idx * 0.05}s backwards`,
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = theme.darkMode 
                      ? '0 12px 40px rgba(102, 126, 234, 0.3)' 
                      : '0 12px 40px rgba(102, 126, 234, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span 
                          className={`badge badge-${module.level}`}
                          style={{ 
                            background: `linear-gradient(135deg, ${getLevelColor(module.level)} 0%, ${getLevelColor(module.level)}dd 100%)`,
                            color: 'white',
                            padding: '6px 14px',
                            fontSize: '12px',
                            fontWeight: '700',
                            letterSpacing: '0.5px',
                            boxShadow: `0 2px 8px ${getLevelColor(module.level)}40`
                          }}
                        >
                          {module.level.toUpperCase()}
                        </span>
                        <span style={{ color: theme.textSecondary, fontSize: '14px', fontWeight: '600' }}>
                          Module {module.number} • {module.lessons.length} lessons
                        </span>
                      </div>
                      <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px', color: theme.text }}>{module.title}</h3>
                      <p style={{ color: theme.textSecondary, fontSize: '15px', lineHeight: '1.6', marginBottom: '12px' }}>
                        {moduleProgress.completed}/{moduleProgress.total} lessons completed • {moduleProgress.percentage}% progress
                      </p>
                      
                      {/* Progress bar */}
                      <div style={{ height: '6px', background: theme.border, borderRadius: '3px' }}>
                        <div 
                          style={{ 
                            width: `${moduleProgress.percentage}%`, 
                            background: `linear-gradient(90deg, ${getLevelColor(module.level)} 0%, ${getLevelColor(module.level)}dd 100%)`,
                            height: '100%',
                            borderRadius: '3px',
                            transition: 'width 0.3s ease'
                          }}
                        ></div>
                      </div>
                    </div>
                    {moduleProgress.percentage === 100 ? (
                      <div style={{ 
                        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', 
                        padding: '14px', 
                        borderRadius: '14px',
                        animation: 'pulse 2s ease-in-out infinite'
                      }}>
                        <Award size={32} style={{ color: 'white' }} />
                      </div>
                    ) : (
                      <div style={{ 
                        background: 'rgba(102, 126, 234, 0.1)', 
                        padding: '14px', 
                        borderRadius: '14px'
                      }}>
                        <BookOpen size={32} style={{ color: '#667eea' }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer style={{ marginTop: '80px' }} />
    </div>
  );
}

export default Dashboard;
