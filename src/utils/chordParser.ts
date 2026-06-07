import { ROOT_NOTES, QUALITY_DISPLAY, ChordQuality } from '@/types';

export const SHARP_TO_FLAT: Record<string, string> = {
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb',
};

export const FLAT_TO_SHARP: Record<string, string> = {
  'Db': 'C#',
  'Eb': 'D#',
  'Gb': 'F#',
  'Ab': 'G#',
  'Bb': 'A#',
};

export function flatToSharp(note: string): string {
  return FLAT_TO_SHARP[note] || note;
}

export function sharpToFlat(note: string): string {
  return SHARP_TO_FLAT[note] || note;
}

export function normalizeRoot(root: string): string {
  const normalized = root.charAt(0).toUpperCase() + root.slice(1);
  return flatToSharp(normalized);
}

export const QUALITY_MAP: Record<string, ChordQuality> = {
  '': 'maj',
  'maj': 'maj',
  'M': 'maj',
  'm': 'min',
  'min': 'min',
  '-': 'min',
  '7': '7',
  'dom7': '7',
  'm7': 'm7',
  'min7': 'm7',
  '-7': 'm7',
  'maj7': 'maj7',
  'M7': 'maj7',
  '△7': 'maj7',
  'sus2': 'sus2',
  'sus4': 'sus4',
  'dim': 'dim',
  '°': 'dim',
  'aug': 'aug',
  '+': 'aug',
};

export function normalizeQuality(quality: string): ChordQuality {
  const lower = quality.toLowerCase();
  const mapped = QUALITY_MAP[lower] || QUALITY_MAP[quality];
  return mapped || 'maj';
}

export interface ParsedChordSymbol {
  root: string;
  quality: ChordQuality;
  qualityDisplay: string;
  symbol: string;
}

export function parseChordSymbol(symbol: string): ParsedChordSymbol | null {
  if (!symbol || symbol.length === 0) return null;

  let root = '';
  let qualityStr = '';

  if (symbol.length >= 2 && (symbol[1] === '#' || symbol[1] === 'b')) {
    root = symbol.charAt(0).toUpperCase() + symbol[1];
    qualityStr = symbol.substring(2);
  } else {
    root = symbol.charAt(0).toUpperCase();
    qualityStr = symbol.substring(1);
  }

  const normalizedRoot = normalizeRoot(root);

  if (!ROOT_NOTES.includes(normalizedRoot)) return null;

  const quality = normalizeQuality(qualityStr);
  const qualityDisplay = QUALITY_DISPLAY[quality] || '';

  return {
    root: normalizedRoot,
    quality,
    qualityDisplay,
    symbol: normalizedRoot + qualityDisplay,
  };
}
