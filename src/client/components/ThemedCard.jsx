import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemedCard = ({ children, style = {}, className = '' }) => {
  const { theme } = useTheme();

  const cardStyle = {
    background: theme.cardBg,
    border: `1px solid ${theme.border}`,
    borderRadius: '16px',
    padding: '24px',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    ...style
  };

  return (
    <div className={className} style={cardStyle}>
      {children}
    </div>
  );
};

export default ThemedCard;