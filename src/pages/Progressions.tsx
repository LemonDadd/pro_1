import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronRight, Music, Heart } from 'lucide-react';
import { getAllProgressions } from '@/data/progressions';
import { useFavoritesStore } from '@/store/useFavoritesStore';

const Progressions: React.FC = () => {
  const progressions = getAllProgressions();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  
  return (
    <div className="min-h-screen bg-wood-50 dark:bg-wood-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-wine-100 dark:bg-wine-900/30 text-wine-700 dark:text-wine-300 rounded-full text-sm font-medium mb-6">
            <Music size={16} />
            练习模式
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-wood-900 dark:text-cream-50 mb-4">
            和弦进行练习
          </h1>
          <p className="text-lg text-wood-600 dark:text-wood-400 max-w-xl mx-auto">
            选择一套经典和弦进行，配合节拍器自动切换练习
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {progressions.map((progression, idx) => {
            const isFav = isFavorite(progression.id, 'progression');
            
            return (
              <div
                key={progression.id}
                className="
                  bg-cream-50 dark:bg-wood-800 rounded-2xl shadow-soft
                  overflow-hidden transition-all duration-300 hover:shadow-warm hover:-translate-y-1
                  animate-fade-up border border-wood-100 dark:border-wood-700
                "
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display text-xl font-bold text-wood-900 dark:text-cream-50">
                      {progression.name}
                    </h3>
                    <button
                      onClick={() => toggleFavorite(progression.id, 'progression')}
                      className={`
                        p-2 rounded-full transition-all
                        ${isFav
                          ? 'text-wine-600 bg-wine-50 dark:bg-wine-900/30'
                          : 'text-wood-400 hover:text-wine-500'
                        }
                      `}
                    >
                      <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {progression.chords.map((chord, chordIdx) => (
                      <div
                        key={chordIdx}
                        className="
                          px-4 py-2 rounded-xl bg-wood-100 dark:bg-wood-700
                          text-wood-700 dark:text-wood-200 font-bold text-lg
                        "
                      >
                        {chord}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-wood-100 dark:border-wood-700">
                    <span className="text-sm text-wood-500 dark:text-wood-400">
                      {progression.chords.length} 个和弦
                    </span>
                    
                    <Link
                      to={`/progressions/${progression.id}`}
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
      </div>
    </div>
  );
};

export default Progressions;
