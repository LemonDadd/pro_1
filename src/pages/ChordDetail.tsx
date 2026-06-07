import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, ArrowLeft, Music } from 'lucide-react';
import Fretboard from '@/components/Fretboard';
import AudioControls from '@/components/AudioControls';
import { getChordBySymbol } from '@/utils/chordUtils';
import { playChord, getAudioContext } from '@/utils/audio';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useHistoryStore } from '@/store/useHistoryStore';
import { QUALITY_NAMES, ROOT_NOTES, CHORD_QUALITIES, QUALITY_DISPLAY } from '@/types';

const ChordDetail: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [positionIndex, setPositionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { addToHistory } = useHistoryStore();
  const { tuning, volume, bpm, playMode } = useSettingsStore();
  
  const chord = symbol ? getChordBySymbol(decodeURIComponent(symbol)) : null;
  const position = chord?.positions[positionIndex];
  
  useEffect(() => {
    if (chord) {
      addToHistory(chord.id, 'chord');
    }
  }, [chord?.id, addToHistory]);
  
  useEffect(() => {
    setPositionIndex(0);
  }, [symbol]);
  
  const handlePlay = () => {
    if (!position) return;
    
    getAudioContext();
    
    if (!isPlaying) {
      setIsPlaying(true);
      playChord(position, { tuning, volume, bpm, mode: playMode });
      
      const duration = playMode === 'strum' ? (60 / bpm) * 2 : (60 / bpm) * 1.5;
      setTimeout(() => setIsPlaying(false), duration * 1000);
    }
  };
  
  const handlePrevPosition = () => {
    if (!chord) return;
    setPositionIndex((prev) => (prev - 1 + chord.positions.length) % chord.positions.length);
  };
  
  const handleNextPosition = () => {
    if (!chord) return;
    setPositionIndex((prev) => (prev + 1) % chord.positions.length);
  };
  
  const handleRootChange = (newRoot: string) => {
    if (!chord) return;
    const newSymbol = newRoot + QUALITY_DISPLAY[chord.quality];
    navigate(`/chord/${encodeURIComponent(newSymbol)}`);
  };
  
  const handleQualityChange = (newQuality: string) => {
    if (!chord) return;
    const newSymbol = chord.root + QUALITY_DISPLAY[newQuality];
    navigate(`/chord/${encodeURIComponent(newSymbol)}`);
  };
  
  if (!chord || !position) {
    return (
      <div className="min-h-screen bg-wood-50 dark:bg-wood-900 flex items-center justify-center">
        <div className="text-center">
          <Music className="mx-auto mb-4 text-wood-400" size={48} />
          <h2 className="text-2xl font-display font-bold text-wood-700 dark:text-wood-300 mb-2">
            未找到和弦
          </h2>
          <p className="text-wood-500 dark:text-wood-400 mb-4">
            没有找到名为 "{symbol}" 的和弦
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-wine-700 text-white rounded-full hover:bg-wine-800 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }
  
  const isFav = isFavorite(chord.id, 'chord');
  
  return (
    <div className="min-h-screen bg-wood-50 dark:bg-wood-900">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-wood-600 dark:text-wood-400 hover:text-wine-700 dark:hover:text-wine-500 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>返回</span>
        </button>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-cream-50 dark:bg-wood-800 rounded-3xl shadow-warm p-8 mb-6 animate-fade-up">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h1 className="font-display text-5xl font-bold text-wood-900 dark:text-cream-50 mb-2">
                    {chord.symbol}
                  </h1>
                  <p className="text-wood-500 dark:text-wood-400 text-lg">
                    {QUALITY_NAMES[chord.quality] || chord.quality}
                  </p>
                </div>
                
                <button
                  onClick={() => toggleFavorite(chord.id, 'chord')}
                  className={`
                    p-4 rounded-2xl transition-all
                    ${isFav
                      ? 'text-wine-600 bg-wine-50 dark:bg-wine-900/30'
                      : 'text-wood-400 hover:text-wine-500 hover:bg-wood-100 dark:hover:bg-wood-700'
                    }
                  `}
                  aria-label={isFav ? '取消收藏' : '收藏'}
                >
                  <Heart size={28} fill={isFav ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <div className="relative flex justify-center py-8">
                <button
                  onClick={handlePrevPosition}
                  className="
                    absolute left-4 top-1/2 -translate-y-1/2 z-10
                    w-12 h-12 rounded-full bg-cream-50 dark:bg-wood-700 shadow-soft
                    flex items-center justify-center text-wood-600 dark:text-wood-300
                    hover:bg-wine-700 hover:text-white transition-all
                  "
                  disabled={chord.positions.length <= 1}
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className={`transition-all duration-300 ${isPlaying ? 'scale-105' : ''}`}>
                  <Fretboard position={position} size="large" />
                </div>
                
                <button
                  onClick={handleNextPosition}
                  className="
                    absolute right-4 top-1/2 -translate-y-1/2 z-10
                    w-12 h-12 rounded-full bg-cream-50 dark:bg-wood-700 shadow-soft
                    flex items-center justify-center text-wood-600 dark:text-wood-300
                    hover:bg-wine-700 hover:text-white transition-all
                  "
                  disabled={chord.positions.length <= 1}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              <div className="flex justify-center gap-2 mt-6">
                {chord.positions.map((pos, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPositionIndex(idx)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all
                      ${idx === positionIndex
                        ? 'bg-wine-700 text-white shadow-soft'
                        : 'bg-wood-100 dark:bg-wood-700 text-wood-600 dark:text-wood-400 hover:bg-wood-200 dark:hover:bg-wood-600'
                      }
                    `}
                  >
                    {pos.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-cream-50 dark:bg-wood-800 rounded-2xl p-6 shadow-soft">
                <h3 className="font-display font-bold text-lg text-wood-900 dark:text-cream-50 mb-4">
                  选择根音
                </h3>
                <div className="grid grid-cols-6 gap-2">
                  {ROOT_NOTES.map((root) => (
                    <button
                      key={root}
                      onClick={() => handleRootChange(root)}
                      className={`
                        py-2 rounded-lg text-sm font-medium transition-all
                        ${root === chord.root
                          ? 'bg-wine-700 text-white'
                          : 'bg-wood-100 dark:bg-wood-700 text-wood-700 dark:text-wood-300 hover:bg-wood-200 dark:hover:bg-wood-600'
                        }
                      `}
                    >
                      {root}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-cream-50 dark:bg-wood-800 rounded-2xl p-6 shadow-soft">
                <h3 className="font-display font-bold text-lg text-wood-900 dark:text-cream-50 mb-4">
                  和弦类型
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {CHORD_QUALITIES.map((quality) => (
                    <button
                      key={quality}
                      onClick={() => handleQualityChange(quality)}
                      className={`
                        py-2 px-3 rounded-lg text-sm font-medium transition-all truncate
                        ${quality === chord.quality
                          ? 'bg-wine-700 text-white'
                          : 'bg-wood-100 dark:bg-wood-700 text-wood-700 dark:text-wood-300 hover:bg-wood-200 dark:hover:bg-wood-600'
                        }
                      `}
                    >
                      {QUALITY_DISPLAY[quality] || quality}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <AudioControls
              isPlaying={isPlaying}
              onPlayPause={handlePlay}
              showBpm
              showPlayMode
            />
            
            <div className="mt-6 bg-cream-50 dark:bg-wood-800 rounded-2xl p-6 shadow-soft border border-wood-100 dark:border-wood-700">
              <h3 className="font-display font-bold text-lg text-wood-900 dark:text-cream-50 mb-4">
                指法信息
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-wood-500 dark:text-wood-400">把位</span>
                  <span className="font-medium text-wood-700 dark:text-wood-300">{position.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-wood-500 dark:text-wood-400">难度</span>
                  <span className="font-medium text-wood-700 dark:text-wood-300">
                    {position.barre ? '横按' : '开放'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-wood-500 dark:text-wood-400">基格</span>
                  <span className="font-medium text-wood-700 dark:text-wood-300">
                    {position.baseFret || 1} 品
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChordDetail;
