import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HistoryItem } from '@/types';

const MAX_HISTORY = 20;

interface HistoryState {
  history: HistoryItem[];
  addToHistory: (id: string, type: 'chord') => void;
  clearHistory: () => void;
  getRecentChords: () => string[];
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      
      addToHistory: (id, type) => {
        const filtered = get().history.filter(h => !(h.id === id && h.type === type));
        const newItem: HistoryItem = { id, type, viewedAt: Date.now() };
        const newHistory = [newItem, ...filtered].slice(0, MAX_HISTORY);
        set({ history: newHistory });
      },
      
      clearHistory: () => set({ history: [] }),
      
      getRecentChords: () => {
        return get().history
          .filter(h => h.type === 'chord')
          .sort((a, b) => b.viewedAt - a.viewedAt)
          .map(h => h.id);
      },
    }),
    {
      name: 'guitar-chord-history',
    }
  )
);
