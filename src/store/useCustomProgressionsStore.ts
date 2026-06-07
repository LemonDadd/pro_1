import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Progression } from '@/types';

interface CustomProgressionsState {
  customProgressions: Progression[];
  addProgression: (name: string, chords: string[]) => string;
  updateProgression: (id: string, name: string, chords: string[]) => void;
  deleteProgression: (id: string) => void;
  getProgressionById: (id: string) => Progression | undefined;
}

export const useCustomProgressionsStore = create<CustomProgressionsState>()(
  persist(
    (set, get) => ({
      customProgressions: [],
      
      addProgression: (name, chords) => {
        const id = `custom-${Date.now()}`;
        const newProgression: Progression = {
          id,
          name,
          chords,
          isCustom: true,
        };
        set((state) => ({
          customProgressions: [...state.customProgressions, newProgression],
        }));
        return id;
      },
      
      updateProgression: (id, name, chords) => {
        set((state) => ({
          customProgressions: state.customProgressions.map((p) =>
            p.id === id ? { ...p, name, chords } : p
          ),
        }));
      },
      
      deleteProgression: (id) => {
        set((state) => ({
          customProgressions: state.customProgressions.filter((p) => p.id !== id),
        }));
      },
      
      getProgressionById: (id) => {
        return get().customProgressions.find((p) => p.id === id);
      },
    }),
    {
      name: 'guitar-chord-custom-progressions',
    }
  )
);
