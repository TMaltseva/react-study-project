import React from 'react';
import { useTheme } from './ThemeProvider';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>To {theme === 'light' ? 'dark' : 'light'} theme</button>;
};

export default ThemeToggleButton;
