import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchChords, getDisplayChordSymbol } from '@/utils/chordUtils';
import { Chord } from '@/types';
import Fretboard from './Fretboard';
import { useSettingsStore } from '@/store/useSettingsStore';

interface SearchBarProps {
  placeholder?: string;
  size?: 'normal' | 'large';
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '搜索和弦，如 Cmaj7、F#m...',
  size = 'normal',
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Chord[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { noteDisplay } = useSettingsStore();
  
  useEffect(() => {
    if (query.trim()) {
      const chords = searchChords(query);
      setResults(chords);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      navigate(`/chord/${encodeURIComponent(results[0].symbol)}`);
      setIsOpen(false);
    }
  };
  
  const handleChordClick = (symbol: string, positionIndex = 0) => {
    navigate(`/chord/${encodeURIComponent(symbol)}?position=${positionIndex}`);
    setIsOpen(false);
    setQuery('');
  };
  
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };
  
  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className={`
          relative flex items-center bg-cream-50 dark:bg-wood-800
          border-2 border-wood-200 dark:border-wood-700
          rounded-2xl shadow-soft focus-within:border-wine-500
          focus-within:shadow-warm transition-all
          ${size === 'large' ? 'py-3 px-5' : 'py-2.5 px-4'}
        `}>
          <Search className="text-wood-400 flex-shrink-0" size={size === 'large' ? 24 : 20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setIsOpen(true)}
            placeholder={placeholder}
            className={`
              flex-1 bg-transparent border-none outline-none
              text-wood-900 dark:text-cream-50 placeholder:text-wood-400
              ${size === 'large' ? 'text-lg ml-3' : 'ml-2.5'}
            `}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 rounded-full text-wood-400 hover:text-wood-600 hover:bg-wood-100 dark:hover:bg-wood-700 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>
      
      {isOpen && results.length > 0 && (
        <div className="
          absolute top-full left-0 right-0 mt-2
          bg-cream-50 dark:bg-wood-800
          rounded-2xl shadow-warm border border-wood-100 dark:border-wood-700
          overflow-hidden z-50 animate-fade-in
        ">
          <div className="p-2 max-h-[500px] overflow-y-auto">
            {results.map((chord) => (
              <div
                key={chord.id}
                className="
                  p-3 rounded-xl mb-1 last:mb-0
                  hover:bg-wood-100 dark:hover:bg-wood-700
                  transition-colors
                "
              >
                <div 
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => handleChordClick(chord.symbol, 0)}
                >
                  <div className="flex-shrink-0 scale-75 origin-left">
                    <Fretboard position={chord.positions[0]} size="small" showFingers={false} />
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-bold text-lg text-wood-900 dark:text-cream-50">
                      {getDisplayChordSymbol(chord.symbol, noteDisplay)}
                    </div>
                    <div className="text-sm text-wood-500 dark:text-wood-400">
                      {chord.positions.length} 个把位
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-3 ml-2">
                  {chord.positions.map((pos, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChordClick(chord.symbol, idx);
                      }}
                      className="
                        px-2.5 py-1 rounded-lg text-xs font-medium transition-all
                        bg-wood-100 dark:bg-wood-700 text-wood-600 dark:text-wood-300
                        hover:bg-wine-100 hover:text-wine-700 dark:hover:bg-wine-900/30 dark:hover:text-wine-300
                      "
                    >
                      {pos.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {isOpen && query && results.length === 0 && (
        <div className="
          absolute top-full left-0 right-0 mt-2
          bg-cream-50 dark:bg-wood-800
          rounded-2xl shadow-warm border border-wood-100 dark:border-wood-700
          p-6 text-center z-50
        ">
          <p className="text-wood-500 dark:text-wood-400">
            未找到匹配的和弦
          </p>
          <p className="text-sm text-wood-400 dark:text-wood-500 mt-1">
            试试输入根音，如 C、G、Am
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
