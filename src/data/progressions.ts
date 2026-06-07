import { Progression } from '@/types';

export const PRESET_PROGRESSIONS: Progression[] = [
  {
    id: 'prog-1',
    name: '经典流行 I-V-vi-IV (C调)',
    chords: ['C', 'G', 'Am', 'F'],
  },
  {
    id: 'prog-2',
    name: '经典流行 I-V-vi-IV (G调)',
    chords: ['G', 'D', 'Em', 'C'],
  },
  {
    id: 'prog-3',
    name: '经典流行 I-V-vi-IV (D调)',
    chords: ['D', 'A', 'Bm', 'G'],
  },
  {
    id: 'prog-4',
    name: '经典流行 I-V-vi-IV (A调)',
    chords: ['A', 'E', 'F#m', 'D'],
  },
  {
    id: 'prog-5',
    name: '经典流行 I-V-vi-IV (E调)',
    chords: ['E', 'B', 'C#m', 'A'],
  },
  {
    id: 'prog-6',
    name: '经典流行 I-V-vi-IV (F调)',
    chords: ['F', 'C', 'Dm', 'Bb'],
  },
  {
    id: 'prog-7',
    name: '小调流行 vi-IV-I-V (Am)',
    chords: ['Am', 'F', 'C', 'G'],
  },
  {
    id: 'prog-8',
    name: '小调流行 vi-IV-I-V (Em)',
    chords: ['Em', 'C', 'G', 'D'],
  },
  {
    id: 'prog-9',
    name: '小调流行 vi-IV-I-V (Bm)',
    chords: ['Bm', 'G', 'D', 'A'],
  },
  {
    id: 'prog-10',
    name: '50年代进行 I-vi-IV-V',
    chords: ['C', 'Am', 'F', 'G'],
  },
  {
    id: 'prog-11',
    name: '乡村流行 I-vi-IV-V (G调)',
    chords: ['G', 'Em', 'C', 'D'],
  },
  {
    id: 'prog-12',
    name: '民谣进行 I-vi-IV-V (D调)',
    chords: ['D', 'Bm', 'G', 'A'],
  },
];

export const getProgressionById = (id: string): Progression | undefined => {
  return PRESET_PROGRESSIONS.find(p => p.id === id);
};

export const getAllProgressions = (): Progression[] => {
  return [...PRESET_PROGRESSIONS];
};
