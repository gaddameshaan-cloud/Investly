import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeWrapper = ({ children, style = {} }) => {
  const { theme } = useTheme();

  const wrapperStyle = {
    minHeight: '100vh',
    background: theme.bg,
    color: theme.text,
    transition: 'all 0.3s ease',
    ...style
  };

  return (
    <div style={wrapperStyle}>
      {children}
    </div>
  );
};

export default ThemeWrapper;