import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="theme-icon">
        {theme === 'light' ? '🌙' : '☀️'}
      </div>
    </button>
  );
}

export default ThemeToggle;