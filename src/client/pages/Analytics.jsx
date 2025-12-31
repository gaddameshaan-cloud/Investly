import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, TrendingUp, Award, Clock, Target } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

function Analytics({ user }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/api/analytics/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  if (!stats) {
    return <div className="container" style={{ paddingTop: '40px' }}>Loading analytics...</div>;
  }

  const levelData = [
    { name: 'Beginner', completed: stats.levelProgress.find(l => l.level === 'beginner')?.completed || 0, color: '#3b82f6' },
    { name: 'Intermediate', completed: stats.levelProgress.find(l => l.level === 'intermediate')?.completed || 0, color: '#f59e0b' },
    { name: 'Advanced', completed: stats.levelProgress.find(l => l.level === 'advanced')?.completed || 0, color: '#ec4899' }
  ];

  const COLORS = ['#3b82f6', '#f59e0b', '#ec4899'];

  return (
    <div style={{ minHeight: '100vh', background: theme.bg }}>
      <div className="container" style={{ paddingTop: '40px' }}>
        <button className="btn btn-secondary glass-card" onClick={() => navigate('/dashboard')} style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <h1 className="gradient-text" style={{ fontSize: '48px', fontWeight: '800', marginBottom: '40px', animation: 'fadeIn 0.6s ease-out', color: theme.text }}>
          📊 Your Learning Analytics
        </h1>

        <div className="grid grid-2" style={{ marginBottom: '40px', gap: '24px' }}>
          <div className="card glass-card" style={{ 
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            animation: 'fadeIn 0.6s ease-out 0.1s backwards'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '12px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '12px',
                borderRadius: '14px',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                <Target size={28} style={{ color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: theme.text }}>Overall Progress</h3>
            </div>
            <div style={{ textAlign: 'center', padding: '24px 20px' }}>
              <div className="gradient-text" style={{ fontSize: '72px', fontWeight: '800', marginBottom: '12px', lineHeight: '1' }}>
                {stats.completionRate}%
              </div>
              <p style={{ color: theme.textSecondary, fontSize: '18px', fontWeight: '500' }}>
                🎯 {stats.completedLessons} of {stats.totalLessons} lessons completed
              </p>
            </div>
          </div>

          <div className="card glass-card" style={{ 
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            animation: 'fadeIn 0.6s ease-out 0.2s backwards'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '12px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                padding: '12px',
                borderRadius: '14px',
                animation: 'pulse 2s ease-in-out infinite 0.5s'
              }}>
                <Award size={28} style={{ color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: theme.text }}>Performance</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                  <span style={{ color: theme.textSecondary, fontSize: '16px', fontWeight: '500' }}>Average Quiz Score</span>
                  <span style={{ fontWeight: '800', fontSize: '28px', color: '#f59e0b' }}>{stats.averageScore}%</span>
                </div>
                <div className="progress-bar" style={{ height: '10px', background: 'rgba(245, 158, 11, 0.2)' }}>
                  <div className="progress-fill" style={{ 
                    width: `${stats.averageScore}%`,
                    background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
                  }}></div>
                </div>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                padding: '14px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '12px'
              }}>
                <Clock size={24} style={{ color: '#10b981' }} />
                <span style={{ color: '#10b981', fontWeight: '600', fontSize: '16px' }}>
                  Total Time: {Math.round((stats.totalTimeSpent || 0) / 60)} hours
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card glass-card" style={{ 
          marginBottom: '40px',
          animation: 'fadeIn 0.6s ease-out 0.3s backwards',
          background: theme.cardBg,
          border: `1px solid ${theme.border}`
        }}>
          <h3 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '28px', color: theme.text, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '32px' }}>📊</span> Progress by Level
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={levelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" style={{ fontSize: '14px', fontWeight: '600' }} />
              <YAxis style={{ fontSize: '14px' }} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px', fontWeight: '600' }} />
              <Bar dataKey="completed" fill="url(#colorGradient)" name="Lessons Completed" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-2">
          <div className="card" style={{ background: theme.cardBg, border: `1px solid ${theme.border}` }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: theme.text }}>Level Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={levelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, completed }) => `${name}: ${completed}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="completed"
                >
                  {levelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ background: theme.cardBg, border: `1px solid ${theme.border}` }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: theme.text }}>Recent Activity</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {stats.recentActivity.map((activity, idx) => (
                <div key={idx} style={{ 
                  padding: '12px', 
                  borderBottom: `1px solid ${theme.border}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <p style={{ fontWeight: '600', marginBottom: '4px', color: theme.text }}>{activity.title}</p>
                    <p style={{ fontSize: '14px', color: theme.textSecondary }}>
                      {activity.level} • Score: {activity.score}%
                    </p>
                  </div>
                  <span style={{ fontSize: '12px', color: theme.textSecondary }}>
                    {new Date(activity.completed_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card glass-card" style={{ 
          marginTop: '40px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white',
          border: 'none',
          boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
          animation: 'fadeIn 0.6s ease-out 0.5s backwards, float 3s ease-in-out infinite'
        }}>
          <h3 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            🚀 Keep Going!
          </h3>
          <p style={{ fontSize: '19px', opacity: 0.95, lineHeight: '1.7' }}>
            You're making great progress on your financial education journey. 
            {stats.completionRate < 30 && " Keep learning consistently to build strong financial foundations. Every lesson brings you closer to financial mastery!"}
            {stats.completionRate >= 30 && stats.completionRate < 70 && " You're well on your way to financial literacy mastery! Your dedication is paying off."}
            {stats.completionRate >= 70 && " You're becoming a financial expert! Keep up the excellent work and inspire others with your knowledge."}
          </p>
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

export default Analytics;
