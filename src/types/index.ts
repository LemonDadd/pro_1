export interface ChordPosition {
  name: string;
  frets: number[];
  fingers: (number | null)[];
  barre?: {
    fromString: number;
    toString: number;
    fret: number;
  };
  baseFret?: number;
}

export interface Chord {
  id: string;
  root: string;
  quality: string;
  symbol: string;
  displayName: string;
  positions: ChordPosition[];
}

export interface Progression {
  id: string;
  name: string;
  chords: string[];
  isCustom?: boolean;
}

export interface UserSettings {
  leftHanded: boolean;
  theme: 'light' | 'dark';
  tuning: string;
  volume: number;
  bpm: number;
  playMode: 'strum' | 'arpeggio';
}

export interface FavoriteItem {
  id: string;
  type: 'chord' | 'progression';
  addedAt: number;
}

export interface HistoryItem {
  id: string;
  type: 'chord';
  viewedAt: number;
}

export type ChordQuality = 'maj' | 'min' | '7' | 'm7' | 'maj7' | 'sus2' | 'sus4' | 'dim' | 'aug';

export const CHORD_QUALITIES: ChordQuality[] = ['maj', 'min', '7', 'm7', 'maj7', 'sus2', 'sus4', 'dim', 'aug'];

export const ROOT_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const TUNINGS: Record<string, number[]> = {
  standard: [64, 59, 55, 50, 45, 40],
  'half-step-down': [63, 58, 54, 49, 44, 39],
  'drop-d': [62, 59, 55, 50, 45, 40],
};

export const TUNING_NAMES: Record<string, string> = {
  standard: '标准调音 EADGBE',
  'half-step-down': '降半音',
  'drop-d': 'Drop D',
};

export const QUALITY_DISPLAY: Record<string, string> = {
  maj: '',
  min: 'm',
  '7': '7',
  m7: 'm7',
  maj7: 'maj7',
  sus2: 'sus2',
  sus4: 'sus4',
  dim: 'dim',
  aug: 'aug',
};

export const QUALITY_NAMES: Record<string, string> = {
  maj: '大三和弦',
  min: '小三和弦',
  '7': '属七和弦',
  m7: '小七和弦',
  maj7: '大七和弦',
  sus2: '挂二和弦',
  sus4: '挂四和弦',
  dim: '减三和弦',
  aug: '增三和弦',
};
