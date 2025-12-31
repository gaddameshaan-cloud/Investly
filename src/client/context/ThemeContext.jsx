import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = {
    light: {
      bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      cardBg: 'rgba(255, 255, 255, 0.95)',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: 'rgba(59, 130, 246, 0.1)',
      inputBg: 'white',
      inputBorder: '#e2e8f0',
      buttonBg: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
      buttonHover: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
      success: '#16a34a',
      error: '#dc2626',
      warning: '#d97706'
    },
    dark: {
      bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      cardBg: 'rgba(30, 41, 59, 0.95)',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: 'rgba(148, 163, 184, 0.2)',
      inputBg: '#334155',
      inputBorder: '#475569',
      buttonBg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      buttonHover: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      success: '#22c55e',
      error: '#ef4444',
      warning: '#f59e0b'
    }
  };

  const currentTheme = darkMode ? theme.dark : theme.light;

  return (
    <ThemeContext.Provider value={{
      darkMode,
      setDarkMode,
      theme: currentTheme,
      themes: theme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;