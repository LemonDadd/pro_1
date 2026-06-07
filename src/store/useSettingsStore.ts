import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSettings } from '@/types';

interface SettingsState extends UserSettings {
  setLeftHanded: (value: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setTuning: (tuning: string) => void;
  setVolume: (volume: number) => void;
  setBpm: (bpm: number) => void;
  setPlayMode: (mode: 'strum' | 'arpeggio') => void;
  toggleTheme: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      leftHanded: false,
      theme: 'light',
      tuning: 'standard',
      volume: 0.4,
      bpm: 90,
      playMode: 'strum',
      
      setLeftHanded: (value) => set({ leftHanded: value }),
      setTheme: (theme) => set({ theme }),
      setTuning: (tuning) => set({ tuning }),
      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
      setBpm: (bpm) => set({ bpm: Math.max(40, Math.min(240, bpm)) }),
      setPlayMode: (mode) => set({ playMode: mode }),
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
    }),
    {
      name: 'guitar-chord-settings',
    }
  )
);
