import React, { useContext } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center max-w-4xl">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Sigma Word Counter
          </h1>
          <a 
            href="https://discord.gg/EeZb6V7YFE" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-gray-500 dark:text-gray-400 mt-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          >
            By Brainrot Community
          </a>
        </div>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;