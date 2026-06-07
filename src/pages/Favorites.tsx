import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Music, List } from 'lucide-react';
import ChordCard from '@/components/ChordCard';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { getChordBySymbol, getDisplayChordSymbol } from '@/utils/chordUtils';
import { getProgressionById } from '@/data/progressions';
import { Play, ChevronRight } from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';

type TabType = 'chords' | 'progressions';

const Favorites: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chords');
  const { getFavoritesByType } = useFavoritesStore();
  const { noteDisplay } = useSettingsStore();
  
  const favoriteChords = getFavoritesByType('chord');
  const favoriteProgressions = getFavoritesByType('progression');
  
  const chordItems = favoriteChords
    .map(item => ({
      ...item,
      chord: getChordBySymbol(item.id),
    }))
    .filter(item => item.chord !== null);
  
  const progressionItems = favoriteProgressions
    .map(item => ({
      ...item,
      progression: getProgressionById(item.id),
    }))
    .filter(item => item.progression !== undefined);
  
  return (
    <div className="min-h-screen bg-wood-50 dark:bg-wood-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-wine-100 dark:bg-wine-900/30 text-wine-700 dark:text-wine-300 rounded-full text-sm font-medium mb-6">
            <Heart size={16} fill="currentColor" />
            我的收藏
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-wood-900 dark:text-cream-50 mb-4">
            收藏夹
          </h1>
          <p className="text-lg text-wood-600 dark:text-wood-400 max-w-xl mx-auto">
            你收藏的和弦和和弦进行都在这里
          </p>
        </div>
        
        <div className="flex justify-center gap-2 mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <button
            onClick={() => setActiveTab('chords')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
              ${activeTab === 'chords'
                ? 'bg-wine-700 text-white shadow-soft'
                : 'bg-cream-50 dark:bg-wood-800 text-wood-600 dark:text-wood-400 hover:bg-wood-100 dark:hover:bg-wood-700'
              }
            `}
          >
            <Music size={20} />
            和弦 ({chordItems.length})
          </button>
          <button
            onClick={() => setActiveTab('progressions')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
              ${activeTab === 'progressions'
                ? 'bg-wine-700 text-white shadow-soft'
                : 'bg-cream-50 dark:bg-wood-800 text-wood-600 dark:text-wood-400 hover:bg-wood-100 dark:hover:bg-wood-700'
              }
            `}
          >
            <List size={20} />
            和弦进行 ({progressionItems.length})
          </button>
        </div>
        
        {activeTab === 'chords' && (
          <div className="animate-fade-up">
            {chordItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-wood-100 dark:bg-wood-800 flex items-center justify-center">
                  <Heart size={36} className="text-wood-400" />
                </div>
                <h3 className="text-xl font-display font-bold text-wood-700 dark:text-wood-300 mb-2">
                  还没有收藏的和弦
                </h3>
                <p className="text-wood-500 dark:text-wood-400 mb-6">
                  浏览和弦时点击心形图标即可收藏
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-wine-700 text-white rounded-full font-medium hover:bg-wine-800 transition-colors"
                >
                  去发现和弦
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {chordItems.map((item, idx) => (
                  <div key={item.id} style={{ animationDelay: `${idx * 0.05}s` }} className="animate-fade-up">
                    {item.chord && <ChordCard chord={item.chord} />}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'progressions' && (
          <div className="animate-fade-up">
            {progressionItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-wood-100 dark:bg-wood-800 flex items-center justify-center">
                  <List size={36} className="text-wood-400" />
                </div>
                <h3 className="text-xl font-display font-bold text-wood-700 dark:text-wood-300 mb-2">
                  还没有收藏的进行
                </h3>
                <p className="text-wood-500 dark:text-wood-400 mb-6">
                  收藏常用的和弦进行方便练习
                </p>
                <Link
                  to="/progressions"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-wine-700 text-white rounded-full font-medium hover:bg-wine-800 transition-colors"
                >
                  浏览和弦进行
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {progressionItems.map((item, idx) => {
                  const prog = item.progression!;
                  return (
                    <div
                      key={item.id}
                      className="
                        bg-cream-50 dark:bg-wood-800 rounded-2xl shadow-soft
                        overflow-hidden transition-all duration-300 hover:shadow-warm hover:-translate-y-1
                        border border-wood-100 dark:border-wood-700
                        animate-fade-up
                      "
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className="p-6">
                        <h3 className="font-display text-xl font-bold text-wood-900 dark:text-cream-50 mb-4">
                          {prog.name}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {prog.chords.map((chord, chordIdx) => (
                            <div
                              key={chordIdx}
                              className="
                                px-4 py-2 rounded-xl bg-wood-100 dark:bg-wood-700
                                text-wood-700 dark:text-wood-200 font-bold text-lg
                              "
                            >
                              {getDisplayChordSymbol(chord, noteDisplay)}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-wood-100 dark:border-wood-700">
                          <span className="text-sm text-wood-500 dark:text-wood-400">
                            {prog.chords.length} 个和弦
                          </span>
                          
                          <Link
                            to={`/progressions/${prog.id}`}
                            className="
                              inline-flex items-center gap-2 px-5 py-2.5 bg-wine-700 text-white
                              rounded-full font-medium hover:bg-wine-800 transition-all
                              hover:shadow-md
                            "
                          >
                            <Play size={16} fill="white" />
                            开始练习
                            <ChevronRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
