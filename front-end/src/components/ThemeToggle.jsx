import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      <div className="toggle-track">
        <div className="toggle-thumb">
          {theme === 'light' ? '☀️' : '🌙'}
        </div>
      </div>
      <span className="theme-label">
        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}

export default ThemeToggle;