import React from 'react';
import { Music, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import ChordCard from '@/components/ChordCard';
import { getPopularChords } from '@/utils/chordUtils';
import { useHistoryStore } from '@/store/useHistoryStore';
import { getChordBySymbol } from '@/utils/chordUtils';

const Home: React.FC = () => {
  const popularChords = getPopularChords();
  const { getRecentChords } = useHistoryStore();
  const recentChordIds = getRecentChords();
  const recentChords = recentChordIds
    .slice(0, 6)
    .map(id => getChordBySymbol(id))
    .filter(c => c !== null);
  
  const quickChords = ['C', 'G', 'Am', 'F', 'Dm', 'Em', 'D', 'A'];
  
  return (
    <div className="min-h-screen bg-wood-50 dark:bg-wood-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-wood-100/50 to-transparent dark:from-wood-800/30 dark:to-transparent" />
        
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-wine-200/20 dark:bg-wine-900/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-wood-300/20 dark:bg-wood-700/10 rounded-full blur-3xl translate-y-1/2" />
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-wine-100 dark:bg-wine-900/30 text-wine-700 dark:text-wine-300 rounded-full text-sm font-medium mb-6">
              <Music size={16} />
              吉他学习工具
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold text-wood-900 dark:text-cream-50 mb-6 leading-tight">
              吉他和弦
              <span className="text-wine-700 dark:text-wine-500"> 交互图谱</span>
            </h1>
            
            <p className="text-lg text-wood-600 dark:text-wood-400 mb-10 max-w-xl mx-auto">
              搜索和弦名，查看多种指法把位、指板图、按弦手指编号，
              支持发声试听和常用和弦进行串联练习
            </p>
            
            <div className="mb-12">
              <SearchBar size="large" placeholder="输入和弦名，如 Cmaj7、F#m、Am7..." />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="text-sm text-wood-500 dark:text-wood-400 mr-2">快速进入：</span>
              {quickChords.map(chord => (
                <Link
                  key={chord}
                  to={`/chord/${encodeURIComponent(chord)}`}
                  className="
                    px-4 py-2 rounded-full bg-cream-50 dark:bg-wood-800
                    border border-wood-200 dark:border-wood-700
                    text-wood-700 dark:text-wood-300 font-medium text-sm
                    hover:bg-wine-700 hover:text-white hover:border-wine-700
                    transition-all hover:-translate-y-0.5
                  "
                >
                  {chord}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-20">
        {recentChords.length > 0 && (
          <section className="mb-12 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-wood-900 dark:text-cream-50">
                最近浏览
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recentChords.map((chord, idx) => (
                <div key={chord?.id} style={{ animationDelay: `${idx * 0.05}s` }} className="animate-fade-up">
                  {chord && <ChordCard chord={chord} size="small" showPlay={false} />}
                </div>
              ))}
            </div>
          </section>
        )}
        
        <section className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-wood-900 dark:text-cream-50">
              热门和弦
            </h2>
            <Link
              to="/chord/C"
              className="flex items-center gap-1 text-wine-700 dark:text-wine-500 font-medium hover:gap-2 transition-all"
            >
              查看全部
              <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {popularChords.slice(0, 10).map((chord, idx) => (
              <div key={chord.id} style={{ animationDelay: `${idx * 0.05}s` }} className="animate-fade-up">
                <ChordCard chord={chord} />
              </div>
            ))}
          </div>
        </section>
        
        <section className="mt-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-r from-wine-700 to-wine-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                和弦进行练习
              </h2>
              <p className="text-white/80 text-lg mb-6">
                12套经典和弦进行，自动切换和弦图，配合节拍器练习
              </p>
              <Link
                to="/progressions"
                className="
                  inline-flex items-center gap-2 px-6 py-3 bg-white text-wine-700
                  rounded-full font-semibold hover:bg-cream-50 transition-all
                  hover:shadow-lg hover:-translate-y-0.5
                "
              >
                开始练习
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
