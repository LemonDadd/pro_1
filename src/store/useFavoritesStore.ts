import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FavoriteItem } from '@/types';

interface FavoritesState {
  favorites: FavoriteItem[];
  addFavorite: (id: string, type: 'chord' | 'progression') => void;
  removeFavorite: (id: string, type: 'chord' | 'progression') => void;
  toggleFavorite: (id: string, type: 'chord' | 'progression') => void;
  isFavorite: (id: string, type: 'chord' | 'progression') => boolean;
  getFavoritesByType: (type: 'chord' | 'progression') => FavoriteItem[];
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (id, type) => {
        const exists = get().favorites.some(f => f.id === id && f.type === type);
        if (!exists) {
          set({
            favorites: [...get().favorites, { id, type, addedAt: Date.now() }]
          });
        }
      },
      
      removeFavorite: (id, type) => {
        set({
          favorites: get().favorites.filter(f => !(f.id === id && f.type === type))
        });
      },
      
      toggleFavorite: (id, type) => {
        if (get().isFavorite(id, type)) {
          get().removeFavorite(id, type);
        } else {
          get().addFavorite(id, type);
        }
      },
      
      isFavorite: (id, type) => {
        return get().favorites.some(f => f.id === id && f.type === type);
      },
      
      getFavoritesByType: (type) => {
        return get().favorites.filter(f => f.type === type).sort((a, b) => b.addedAt - a.addedAt);
      },
    }),
    {
      name: 'guitar-chord-favorites',
    }
  )
);
