import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Music } from 'lucide-react';
import Fretboard from '@/components/Fretboard';
import { getProgressionById } from '@/data/progressions';
import { getChordBySymbol } from '@/utils/chordRepository';
import { playChord, playMetronomeClick, getAudioContext } from '@/utils/audio';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useCustomProgressionsStore } from '@/store/useCustomProgressionsStore';
import { getDisplayChordSymbol } from '@/utils/chordDisplay';

const Practice: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { customProgressions } = useCustomProgressionsStore();
  const progression = id ? getProgressionById(id, customProgressions) : undefined;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [beatsPerChord] = useState(4);
  
  const { tuning, volume, bpm, playMode, noteDisplay } = useSettingsStore();
  
  const intervalRef = useRef<number | null>(null);
  const beat = useRef(0);
  const chordIndexRef = useRef(0);
  
  const currentChordSymbol = progression?.chords[currentChordIndex];
  const currentChord = currentChordSymbol ? getChordBySymbol(currentChordSymbol) : null;
  const currentPosition = currentChord?.positions[0];
  
  const nextChordIndex = progression
    ? (currentChordIndex + 1) % progression.chords.length
    : 0;
  const nextChordSymbol = progression?.chords[nextChordIndex];
  const nextChord = nextChordSymbol ? getChordBySymbol(nextChordSymbol) : null;
  const nextPosition = nextChord?.positions[0];
  
  const tick = useCallback(() => {
    if (!progression) return;
    
    beat.current++;
    const beatInChord = beat.current % beatsPerChord;
    setCurrentBeat(beatInChord);
    
    const isAccent = beatInChord === 0;
    playMetronomeClick(isAccent, volume * 0.3);
    
    if (beatInChord === 0 && beat.current > 0) {
      chordIndexRef.current = (chordIndexRef.current + 1) % progression.chords.length;
      setCurrentChordIndex(chordIndexRef.current);
      
      const chordSym = progression.chords[chordIndexRef.current];
      const chord = getChordBySymbol(chordSym);
      if (chord) {
        playChord(chord.positions[0], { tuning, volume, bpm, mode: playMode });
      }
    }
  }, [progression, beatsPerChord, volume, bpm, playMode, tuning]);
  
  useEffect(() => {
    if (isPlaying) {
      getAudioContext();
      
      const msPerBeat = 60000 / bpm;
      
      if (currentChord && currentPosition) {
        playChord(currentPosition, { tuning, volume, bpm, mode: playMode });
      }
      playMetronomeClick(true, volume * 0.3);
      
      intervalRef.current = window.setInterval(tick, msPerBeat);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, bpm, tick, currentChord, currentPosition, tuning, volume, playMode]);
  
  const handlePlayPause = () => {
    if (!isPlaying) {
      beat.current = 0;
      chordIndexRef.current = currentChordIndex;
      setCurrentBeat(0);
    }
    setIsPlaying(!isPlaying);
  };
  
  const handlePrevChord = () => {
    if (!progression) return;
    const newIndex = (currentChordIndex - 1 + progression.chords.length) % progression.chords.length;
    setCurrentChordIndex(newIndex);
    chordIndexRef.current = newIndex;
    beat.current = 0;
    setCurrentBeat(0);
  };
  
  const handleNextChord = () => {
    if (!progression) return;
    const newIndex = (currentChordIndex + 1) % progression.chords.length;
    setCurrentChordIndex(newIndex);
    chordIndexRef.current = newIndex;
    beat.current = 0;
    setCurrentBeat(0);
  };
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  if (!progression) {
    return (
      <div className="min-h-screen bg-wood-50 dark:bg-wood-900 flex items-center justify-center">
        <div className="text-center">
          <Music className="mx-auto mb-4 text-wood-400" size={48} />
          <h2 className="text-2xl font-display font-bold text-wood-700 dark:text-wood-300 mb-2">
            未找到进行
          </h2>
          <button
            onClick={() => navigate('/progressions')}
            className="px-6 py-2 bg-wine-700 text-white rounded-full hover:bg-wine-800 transition-colors"
          >
            返回列表
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-wood-50 dark:bg-wood-900">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/progressions')}
          className="flex items-center gap-2 text-wood-600 dark:text-wood-400 hover:text-wine-700 dark:hover:text-wine-500 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>返回进行列表</span>
        </button>
        
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-wood-900 dark:text-cream-50 mb-2">
            {progression.name}
          </h1>
          <div className="flex justify-center gap-2">
            {progression.chords.map((chord, idx) => (
              <div
                key={idx}
                className={`
                  px-4 py-2 rounded-xl font-bold text-lg transition-all
                  ${idx === currentChordIndex
                    ? 'bg-wine-700 text-white scale-110 shadow-soft'
                    : 'bg-wood-100 dark:bg-wood-800 text-wood-600 dark:text-wood-400'
                  }
                `}
              >
                {getDisplayChordSymbol(chord, noteDisplay)}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-cream-50 dark:bg-wood-800 rounded-3xl shadow-warm p-8 md:p-12 animate-fade-up">
              <div className="flex justify-center mb-8">
                <div className={`transition-all duration-300 ${isPlaying ? 'animate-pulse-soft' : ''}`}>
                  {currentPosition && (
                    <Fretboard position={currentPosition} size="large" />
                  )}
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h2 className="font-display text-5xl font-bold text-wood-900 dark:text-cream-50 mb-2">
                  {currentChord ? getDisplayChordSymbol(currentChord.symbol, noteDisplay) : ''}
                </h2>
              </div>
              
              <div className="flex justify-center gap-3 mb-8">
                {Array.from({ length: beatsPerChord }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`
                      w-4 h-4 rounded-full transition-all duration-150
                      ${idx <= currentBeat && isPlaying
                        ? 'bg-wine-700 scale-125'
                        : 'bg-wood-300 dark:bg-wood-600'
                      }
                    `}
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePrevChord}
                  className="
                    w-14 h-14 rounded-full bg-wood-100 dark:bg-wood-700
                    flex items-center justify-center text-wood-700 dark:text-wood-300
                    hover:bg-wood-200 dark:hover:bg-wood-600 transition-all
                  "
                >
                  <SkipBack size={24} />
                </button>
                
                <button
                  onClick={handlePlayPause}
                  className={`
                    w-20 h-20 rounded-full flex items-center justify-center
                    transition-all shadow-warm
                    ${isPlaying
                      ? 'bg-wood-200 dark:bg-wood-700 text-wood-700 dark:text-wood-200'
                      : 'bg-wine-700 text-white hover:bg-wine-800 hover:scale-105'
                    }
                  `}
                >
                  {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>
                
                <button
                  onClick={handleNextChord}
                  className="
                    w-14 h-14 rounded-full bg-wood-100 dark:bg-wood-700
                    flex items-center justify-center text-wood-700 dark:text-wood-300
                    hover:bg-wood-200 dark:hover:bg-wood-600 transition-all
                  "
                >
                  <SkipForward size={24} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-cream-50 dark:bg-wood-800 rounded-2xl p-5 shadow-soft border border-wood-100 dark:border-wood-700">
              <h3 className="font-display font-bold text-lg text-wood-900 dark:text-cream-50 mb-4">
                下一个和弦
              </h3>
              <div className="flex justify-center py-2 opacity-70">
                {nextPosition && (
                <Fretboard position={nextPosition} size="small" />
                )}
              </div>
              <p className="text-center text-wood-600 dark:text-wood-400 font-bold text-xl mt-3">
                {nextChord ? getDisplayChordSymbol(nextChord.symbol, noteDisplay) : ''}
              </p>
            </div>
            
            <div className="bg-cream-50 dark:bg-wood-800 rounded-2xl p-5 shadow-soft border border-wood-100 dark:border-wood-700">
              <h3 className="font-display font-bold text-lg text-wood-900 dark:text-cream-50 mb-4">
                进度
              </h3>
              <div className="w-full h-2 bg-wood-200 dark:bg-wood-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-wine-700 transition-all duration-300"
                  style={{
                    width: `${((currentChordIndex + (currentBeat + 1) / beatsPerChord) / progression.chords.length) * 100}%`
                  }}
                />
              </div>
              <p className="text-sm text-wood-500 dark:text-wood-400 mt-3">
                {currentChordIndex + 1} / {progression.chords.length} 和弦
              </p>
            </div>
            
            <div className="bg-cream-50 dark:bg-wood-800 rounded-2xl p-5 shadow-soft border border-wood-100 dark:border-wood-700">
              <h3 className="font-display font-bold text-lg text-wood-900 dark:text-cream-50 mb-3">
                速度
              </h3>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="40"
                  max="240"
                  value={bpm}
                  onChange={(e) => useSettingsStore.getState().setBpm(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-wood-200 dark:bg-wood-700 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:bg-wine-700
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:cursor-pointer
                  "
                />
                <span className="font-bold text-wood-700 dark:text-wood-300 w-12 text-right">
                  {bpm}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
