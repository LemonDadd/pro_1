import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Play } from 'lucide-react';
import { Chord } from '@/types';
import Fretboard from './Fretboard';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { playChord } from '@/utils/audio';
import { useSettingsStore } from '@/store/useSettingsStore';
import { QUALITY_NAMES } from '@/types';

interface ChordCardProps {
  chord: Chord;
  positionIndex?: number;
  showPlay?: boolean;
  size?: 'small' | 'medium';
}

const ChordCard: React.FC<ChordCardProps> = ({
  chord,
  positionIndex = 0,
  showPlay = true,
  size = 'medium',
}) => {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { volume, tuning, bpm, playMode } = useSettingsStore();
  const position = chord.positions[positionIndex] || chord.positions[0];
  
  const isFav = isFavorite(chord.id, 'chord');
  
  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playChord(position, { tuning, volume, bpm, mode: playMode });
  };
  
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(chord.id, 'chord');
  };
  
  return (
    <Link
      to={`/chord/${encodeURIComponent(chord.symbol)}`}
      className={`
        group block bg-cream-50 dark:bg-wood-800 rounded-2xl shadow-soft hover:shadow-warm
        transition-all duration-300 hover:-translate-y-1 overflow-hidden
        border border-wood-100 dark:border-wood-700
        ${size === 'small' ? 'p-3' : 'p-5'}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className={`font-display font-bold text-wood-900 dark:text-cream-50 ${
            size === 'small' ? 'text-lg' : 'text-2xl'
          }`}>
            {chord.symbol}
          </h3>
          <p className="text-xs text-wood-500 dark:text-wood-400 mt-0.5">
            {QUALITY_NAMES[chord.quality] || chord.quality}
          </p>
        </div>
        
        <button
          onClick={handleFavorite}
          className={`
            p-2 rounded-full transition-all
            ${isFav
              ? 'text-wine-600 bg-wine-50 dark:bg-wine-900/30'
              : 'text-wood-400 hover:text-wine-500 hover:bg-wood-100 dark:hover:bg-wood-700'
            }
          `}
          aria-label={isFav ? '取消收藏' : '收藏'}
        >
          <Heart size={size === 'small' ? 16 : 20} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="flex justify-center py-2">
        <Fretboard position={position} size={size} />
      </div>
      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-wood-100 dark:border-wood-700">
        <span className="text-xs text-wood-500 dark:text-wood-400">
          {position.name} 把位
        </span>
        
        {showPlay && (
          <button
            onClick={handlePlay}
            className="
              flex items-center gap-1.5 px-3 py-1.5 rounded-full
              bg-wine-700 text-white text-sm font-medium
              hover:bg-wine-800 transition-colors
              opacity-0 group-hover:opacity-100
            "
          >
            <Play size={14} fill="white" />
            试听
          </button>
        )}
      </div>
    </Link>
  );
};

export default ChordCard;
