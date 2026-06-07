import React, { useState, useMemo } from 'react';
import { Music, ArrowRight, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import ChordCard from '@/components/ChordCard';
import { getPopularChords, getChordBySymbol } from '@/utils/chordRepository';
import { generateChord } from '@/utils/chordGenerator';
import { getDisplayRootNotes, getDisplayChordSymbol } from '@/utils/chordDisplay';
import { toInternalRoot } from '@/utils/chordParser';
import { useHistoryStore } from '@/store/useHistoryStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { CHORD_QUALITIES, QUALITY_DISPLAY, QUALITY_NAMES } from '@/types';

const Home: React.FC = () => {
  const popularChords = getPopularChords();
  const { getRecentChords } = useHistoryStore();
  const { noteDisplay } = useSettingsStore();
  const recentChordIds = getRecentChords();
  const recentChords = recentChordIds
    .slice(0, 6)
    .map(id => getChordBySymbol(id))
    .filter(c => c !== null);
  
  const quickChords = ['C', 'G', 'Am', 'F', 'Dm', 'Em', 'D', 'A'];
  
  const [selectedRoot, setSelectedRoot] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const displayRootNotes = getDisplayRootNotes(noteDisplay);
  
  const filteredChords = useMemo(() => {
    if (!selectedRoot && !selectedQuality) {
      return popularChords.slice(0, 10);
    }
    
    const chords = [];
    const roots = selectedRoot ? [selectedRoot] : displayRootNotes;
    const qualities = selectedQuality ? [selectedQuality] : CHORD_QUALITIES;
    
    for (const displayRoot of roots) {
      const internalRoot = toInternalRoot(displayRoot, noteDisplay);
      
      for (const quality of qualities) {
        const chord = generateChord(internalRoot, quality);
        if (chord) {
          chords.push(chord);
        }
      }
    }
    
    return chords;
  }, [selectedRoot, selectedQuality, noteDisplay, displayRootNotes, popularChords]);
  
  const handleRootFilter = (root: string) => {
    setSelectedRoot(selectedRoot === root ? null : root);
  };
  
  const handleQualityFilter = (quality: string) => {
    setSelectedQuality(selectedQuality === quality ? null : quality);
  };
  
  const clearFilters = () => {
    setSelectedRoot(null);
    setSelectedQuality(null);
  };
  
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
            <div className="flex items-center gap-3">
              <Filter size={24} className="text-wine-600 dark:text-wine-400" />
              <h2 className="font-display text-2xl font-bold text-wood-900 dark:text-cream-50">
                和弦浏览器
              </h2>
            </div>
            {(selectedRoot || selectedQuality) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-wine-700 dark:text-wine-500 font-medium hover:gap-2 transition-all text-sm"
              >
                清除筛选
                <X size={16} />
              </button>
            )}
          </div>
          
          <div className="bg-cream-50 dark:bg-wood-800 rounded-2xl p-6 mb-8 border border-wood-100 dark:border-wood-700 shadow-soft">
            <div className="mb-4">
              <span className="text-sm font-medium text-wood-600 dark:text-wood-400 mb-2 block">
                根音
              </span>
              <div className="flex flex-wrap gap-2">
                {displayRootNotes.map((root) => (
                  <button
                    key={root}
                    onClick={() => handleRootFilter(root)}
                    className={`
                      w-10 h-10 rounded-lg font-bold text-sm transition-all
                      ${selectedRoot === root
                        ? 'bg-wine-700 text-white shadow-soft scale-105'
                        : 'bg-wood-100 dark:bg-wood-700 text-wood-700 dark:text-wood-300 hover:bg-wood-200 dark:hover:bg-wood-600'
                      }
                    `}
                  >
                    {root}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <span className="text-sm font-medium text-wood-600 dark:text-wood-400 mb-2 block">
                和弦类型
              </span>
              <div className="flex flex-wrap gap-2">
                {CHORD_QUALITIES.map((quality) => (
                  <button
                    key={quality}
                    onClick={() => handleQualityFilter(quality)}
                    className={`
                      px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                      ${selectedQuality === quality
                        ? 'bg-wine-700 text-white shadow-soft scale-105'
                        : 'bg-wood-100 dark:bg-wood-700 text-wood-700 dark:text-wood-300 hover:bg-wood-200 dark:hover:bg-wood-600'
                      }
                    `}
                  >
                    {QUALITY_DISPLAY[quality] || quality}
                    <span className="ml-1 text-xs opacity-70">
                      {QUALITY_NAMES[quality]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filteredChords.map((chord, idx) => (
              <div key={chord.id} style={{ animationDelay: `${idx * 0.03}s` }} className="animate-fade-up">
                <ChordCard chord={chord} />
              </div>
            ))}
          </div>
          
          {filteredChords.length === 0 && (
            <div className="text-center py-12">
              <p className="text-wood-500 dark:text-wood-400">
                未找到匹配的和弦
              </p>
            </div>
          )}
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
