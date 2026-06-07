import React from 'react';
import { Play, Pause, Volume2, VolumeX, Zap, List } from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';

interface AudioControlsProps {
  isPlaying?: boolean;
  onPlayPause?: () => void;
  showBpm?: boolean;
  showPlayMode?: boolean;
  compact?: boolean;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying = false,
  onPlayPause,
  showBpm = true,
  showPlayMode = true,
  compact = false,
}) => {
  const { volume, bpm, playMode, setVolume, setBpm, setPlayMode } = useSettingsStore();
  
  const isMuted = volume === 0;
  
  const toggleMute = () => {
    setVolume(volume === 0 ? 0.4 : 0);
  };
  
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {onPlayPause && (
          <button
            onClick={onPlayPause}
            className="
              w-12 h-12 rounded-full bg-wine-700 text-white
              flex items-center justify-center
              hover:bg-wine-800 transition-colors shadow-soft
            "
          >
            {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-0.5" />}
          </button>
        )}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-4 p-5 bg-cream-50 dark:bg-wood-800 rounded-2xl border border-wood-100 dark:border-wood-700 shadow-soft">
      {onPlayPause && (
        <div className="flex justify-center">
          <button
            onClick={onPlayPause}
            className={`
              w-16 h-16 rounded-full flex items-center justify-center
              transition-all shadow-soft
              ${isPlaying
                ? 'bg-wood-200 dark:bg-wood-700 text-wood-700 dark:text-wood-200'
                : 'bg-wine-700 text-white hover:bg-wine-800 hover:scale-105'
              }
            `}
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="p-2 rounded-lg text-wood-600 dark:text-wood-400 hover:bg-wood-100 dark:hover:bg-wood-700 transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="flex-1 h-2 bg-wood-200 dark:bg-wood-700 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:bg-wine-700
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-md
          "
        />
        <span className="text-sm text-wood-500 dark:text-wood-400 w-10 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>
      
      {showBpm && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-wood-600 dark:text-wood-400 w-12">
            BPM
          </span>
          <input
            type="range"
            min="40"
            max="240"
            step="1"
            value={bpm}
            onChange={(e) => setBpm(parseInt(e.target.value))}
            className="flex-1 h-2 bg-wood-200 dark:bg-wood-700 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:bg-wine-700
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-md
            "
          />
          <span className="text-sm font-bold text-wood-700 dark:text-wood-300 w-10 text-right">
            {bpm}
          </span>
        </div>
      )}
      
      {showPlayMode && (
        <div className="flex gap-2">
          <button
            onClick={() => setPlayMode('strum')}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-medium
              transition-all
              ${playMode === 'strum'
                ? 'bg-wine-700 text-white shadow-soft'
                : 'bg-wood-100 dark:bg-wood-700 text-wood-600 dark:text-wood-400 hover:bg-wood-200 dark:hover:bg-wood-600'
              }
            `}
          >
            <Zap size={16} />
            扫弦
          </button>
          <button
            onClick={() => setPlayMode('arpeggio')}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-medium
              transition-all
              ${playMode === 'arpeggio'
                ? 'bg-wine-700 text-white shadow-soft'
                : 'bg-wood-100 dark:bg-wood-700 text-wood-600 dark:text-wood-400 hover:bg-wood-200 dark:hover:bg-wood-600'
              }
            `}
          >
            <List size={16} />
            分解
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioControls;
