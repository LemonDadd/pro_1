import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Music, List, Heart, Settings, HelpCircle, Search } from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useSettingsStore();
  
  const navItems = [
    { path: '/', label: '首页', icon: Search },
    { path: '/progressions', label: '和弦进行', icon: List },
    { path: '/favorites', label: '收藏', icon: Heart },
    { path: '/settings', label: '设置', icon: Settings },
    { path: '/help', label: '帮助', icon: HelpCircle },
  ];
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  
  return (
    <nav className="bg-cream-50 dark:bg-wood-900 border-b border-wood-200 dark:border-wood-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-wine-700 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <Music size={20} />
            </div>
            <span className="font-display text-xl font-bold text-wood-900 dark:text-cream-50 hidden sm:block">
              吉他和弦图谱
            </span>
          </Link>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`
                  flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${isActive(path)
                    ? 'bg-wine-700 text-white shadow-soft'
                    : 'text-wood-700 dark:text-wood-300 hover:bg-wood-100 dark:hover:bg-wood-800'
                  }
                `}
              >
                <Icon size={18} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-wood-700 dark:text-wood-300 hover:bg-wood-100 dark:hover:bg-wood-800 transition-colors ml-1"
              aria-label="切换主题"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
