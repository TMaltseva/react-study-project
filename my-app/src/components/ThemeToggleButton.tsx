import React from 'react';
import { useTheme } from '../services/themeContext';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>{theme === 'light' ? 'Switch to dark' : 'Switch to light'}</button>;
};

export default ThemeToggleButton;
