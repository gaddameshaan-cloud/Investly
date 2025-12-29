import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, TrendingUp, Award, Brain, LogOut, BarChart } from 'lucide-react';
import { fetchLessons, fetchUserProgress, fetchDashboardStats } from '../../lib/supabase';

function FastDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Direct Supabase calls - no backend proxy!
      const [lessonsData, progressData, statsData] = await Promise.all([
        fetchLessons(selectedLevel),
        fetchUserProgress(),
        fetchDashboardStats()
      ]);

      const groupedModules = groupLessonsByModule(lessonsData);
      setModules(groupedModules);
      setProgress(progressData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedLevel]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <nav style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '20px 0', borderBottom: '1px solid rgba(102, 126, 234, 0.1)' }}>
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
            <button className="btn btn-secondary" onClick={() => navigate('/analytics')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart size={20} />
              Analytics
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/ai-tutor')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Brain size={20} />
              AI Tutor
            </button>
            <span style={{ color: '#667eea', fontWeight: '600', padding: '8px 16px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '10px' }}>
              👋 {user?.user_metadata?.name || user?.email?.split('@')[0]}
            </span>
            <button className="btn btn-secondary" onClick={onLogout} style={{ padding: '12px' }}>
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '40px' }}>
        {stats && (
          <div className="grid grid-3" style={{ marginBottom: '40px', gap: '24px' }}>
            <div className="card glass-card" style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)', border: '1px solid rgba(102, 126, 234, 0.2)', animation: 'fadeIn 0.6s ease-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: '#6b7280', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Lessons Completed</p>
                  <h3 className="gradient-text" style={{ fontSize: '36px', fontWeight: '800', marginBottom: '4px' }}>{stats.completedLessons}/{stats.totalLessons}</h3>
                  <p style={{ color: '#667eea', fontSize: '13px', fontWeight: '600' }}>{stats.completionRate}% Complete</p>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '16px', borderRadius: '16px', animation: 'float 3s ease-in-out infinite' }}>
                  <BookOpen size={32} style={{ color: 'white' }} />
                </div>
              </div>
              <div className="progress-bar" style={{ marginTop: '20px', height: '8px', background: 'rgba(102, 126, 234, 0.2)' }}>
                <div className="progress-fill" style={{ width: `${stats.completionRate}%`, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}></div>
              </div>
            </div>

            <div className="card glass-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)', border: '1px solid rgba(245, 158, 11, 0.2)', animation: 'fadeIn 0.6s ease-out 0.1s backwards' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: '#6b7280', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Average Score</p>
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

            <div className="card glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)', border: '1px solid rgba(16, 185, 129, 0.2)', animation: 'fadeIn 0.6s ease-out 0.2s backwards' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: '#6b7280', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Time Spent</p>
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

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700' }}>Learning Modules</h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className={`btn ${selectedLevel === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLevel('all')}
              >
                All Levels
              </button>
              <button 
                className={`btn ${selectedLevel === 'beginner' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLevel('beginner')}
              >
                Beginner
              </button>
              <button 
                className={`btn ${selectedLevel === 'intermediate' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLevel('intermediate')}
              >
                Intermediate
              </button>
              <button 
                className={`btn ${selectedLevel === 'advanced' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLevel('advanced')}
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
                  className="glass-card"
                  style={{
                    padding: '24px',
                    background: moduleProgress.percentage === 100
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%)' 
                      : 'rgba(255, 255, 255, 0.9)',
                    border: `2px solid ${moduleProgress.percentage === 100 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(102, 126, 234, 0.1)'}`,
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    animation: `slideIn 0.5s ease-out ${idx * 0.05}s backwards`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.2)';
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
                        <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>
                          Module {module.number} • {module.lessons.length} lessons
                        </span>
                      </div>
                      <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px', color: '#1f2937' }}>{module.title}</h3>
                      <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6', marginBottom: '12px' }}>
                        {moduleProgress.completed}/{moduleProgress.total} lessons completed • {moduleProgress.percentage}% progress
                      </p>
                      
                      {/* Progress bar */}
                      <div className="progress-bar" style={{ height: '6px', background: 'rgba(102, 126, 234, 0.2)' }}>
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${moduleProgress.percentage}%`, 
                            background: `linear-gradient(90deg, ${getLevelColor(module.level)} 0%, ${getLevelColor(module.level)}dd 100%)`
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

      {/* Footer */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(14, 165, 233, 0.03) 100%)',
        backdropFilter: 'blur(10px)',
        padding: '50px 0',
        textAlign: 'center',
        marginTop: '80px',
        borderTop: '1px solid rgba(59, 130, 246, 0.1)'
      }}>
        <div className="container">
          {/* Disclaimer */}
          <div style={{
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '32px',
            textAlign: 'left',
            maxWidth: '800px',
            margin: '0 auto 32px'
          }}>
            <p style={{
              color: '#475569',
              fontSize: '14px',
              fontWeight: '500',
              margin: 0,
              lineHeight: '1.6',
              fontFamily: 'Poppins, sans-serif'
            }}>
              <strong style={{ color: '#1e293b' }}>Disclaimer:</strong> Investly provides educational content and tools for learning about finance and investing. This information is for general purposes only and should not be considered financial advice. Always consult a licensed professional before making financial decisions.
            </p>
          </div>
          
          <p style={{
            color: '#64748b',
            fontSize: '16px',
            fontWeight: '500',
            margin: 0,
            fontFamily: 'Poppins, sans-serif'
          }}>
            © 2025 Investly Education. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FastDashboard;