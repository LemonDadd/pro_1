import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import ChordDetail from '@/pages/ChordDetail';
import Progressions from '@/pages/Progressions';
import Practice from '@/pages/Practice';
import Favorites from '@/pages/Favorites';
import Settings from '@/pages/Settings';
import Help from '@/pages/Help';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function App() {
  const { theme } = useSettingsStore();
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <Router>
      <div className="min-h-screen bg-wood-50 dark:bg-wood-900 transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chord/:symbol" element={<ChordDetail />} />
          <Route path="/progressions" element={<Progressions />} />
          <Route path="/progressions/:id" element={<Practice />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
}
