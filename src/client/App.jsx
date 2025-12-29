import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/Dashboard';
import ModuleView from './pages/ModuleView';
import LessonView from './pages/LessonView';
import QuizView from './pages/QuizView';
import Analytics from './pages/Analytics';
import AITutor from './pages/AITutor';
import AuthPage from './pages/AuthPage';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import OnboardingQuestionnaire from './pages/OnboardingQuestionnaire';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      const user = JSON.parse(userData);
      setUser(user);
      
      // Check if user needs onboarding (only for existing users)
      checkOnboardingStatus(user.id, token);
    }
    setLoading(false);
  }, []);

  const checkOnboardingStatus = async (userId, token) => {
    try {
      const response = await axios.get('/api/user/onboarding-status', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // If user hasn't completed onboarding, show it
      if (!response.data.hasCompletedOnboarding) {
        setNeedsOnboarding(true);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // If there's an error, don't show onboarding (fail gracefully)
    }
  };

  const handleLogin = (userData, token, isNewUser = false) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    
    // If it's a new user, show onboarding
    if (isNewUser) {
      setNeedsOnboarding(true);
    }
  };

  const handleOnboardingComplete = () => {
    setNeedsOnboarding(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
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
          <h2 style={{ color: '#64748b' }}>Loading...</h2>
        </div>
      </div>
    );
  }

  // Show onboarding if user is logged in but needs onboarding
  if (user && needsOnboarding) {
    return (
      <Router>
        <OnboardingQuestionnaire 
          user={user} 
          onComplete={handleOnboardingComplete} 
        />
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage onLogin={handleLogin} />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/module/:moduleNumber" element={user ? <ModuleView user={user} /> : <Navigate to="/" />} />
        <Route path="/lesson/:id" element={user ? <LessonView user={user} /> : <Navigate to="/" />} />
        <Route path="/quiz/:lessonId" element={user ? <QuizView user={user} /> : <Navigate to="/" />} />
        <Route path="/analytics" element={user ? <Analytics user={user} /> : <Navigate to="/" />} />
        <Route path="/ai-tutor" element={user ? <AITutor user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
