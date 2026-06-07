import { Chord, ChordQuality } from '@/types';
import { generateChord, generateAllChords } from './chordGenerator';
import { parseChordSymbol } from './chordParser';
import { getDisplayChordSymbol, getDisplayNote } from './chordDisplay';

let allChordsCache: Chord[] | null = null;
let chordMapCache: Map<string, Chord> | null = null;
let searchIndexCache: Map<string, Chord[]> | null = null;

function getAllChordsInternal(): Chord[] {
  if (!allChordsCache) {
    allChordsCache = generateAllChords();
  }
  return allChordsCache;
}

function getChordMap(): Map<string, Chord> {
  if (!chordMapCache) {
    chordMapCache = new Map();
    const chords = getAllChordsInternal();
    for (const chord of chords) {
      chordMapCache.set(chord.symbol.toLowerCase(), chord);
      chordMapCache.set(chord.id.toLowerCase(), chord);
    }
  }
  return chordMapCache;
}

function buildSearchIndex(): Map<string, Chord[]> {
  if (searchIndexCache) {
    return searchIndexCache;
  }

  const index = new Map<string, Chord[]>();
  const chords = getAllChordsInternal();

  for (const chord of chords) {
    const terms = new Set<string>();

    terms.add(chord.symbol.toLowerCase());
    terms.add(chord.root.toLowerCase());
    terms.add(chord.displayName.toLowerCase());
    terms.add(chord.quality.toLowerCase());

    const flatSymbol = getDisplayChordSymbol(chord.symbol, 'flat').toLowerCase();
    terms.add(flatSymbol);

    const flatRoot = getDisplayNote(chord.root, 'flat').toLowerCase();
    terms.add(flatRoot);

    for (let i = 1; i <= chord.symbol.length; i++) {
      terms.add(chord.symbol.toLowerCase().substring(0, i));
    }
    for (let i = 1; i <= flatSymbol.length; i++) {
      terms.add(flatSymbol.substring(0, i));
    }

    for (const term of terms) {
      if (!index.has(term)) {
        index.set(term, []);
      }
      const list = index.get(term)!;
      if (!list.includes(chord)) {
        list.push(chord);
      }
    }
  }

  searchIndexCache = index;
  return index;
}

export function getChordBySymbol(symbol: string): Chord | null {
  if (!symbol || symbol.trim() === '') return null;

  const parsed = parseChordSymbol(symbol);
  if (!parsed) return null;

  const cacheKey = parsed.symbol.toLowerCase();
  const chordMap = getChordMap();

  let chord = chordMap.get(cacheKey);
  if (chord) return chord;

  chord = generateChord(parsed.root, parsed.quality);
  chordMap.set(cacheKey, chord);

  return chord;
}

export function getAllChords(): Chord[] {
  return [...getAllChordsInternal()];
}

export function getChordsByRoot(root: string): Chord[] {
  const parsed = parseChordSymbol(root);
  if (!parsed) return [];

  const allChords = getAllChordsInternal();
  return allChords.filter(c => c.root === parsed.root);
}

export function getChordsByQuality(quality: ChordQuality | string): Chord[] {
  const allChords = getAllChordsInternal();
  return allChords.filter(c => c.quality === quality);
}

export function searchChords(query: string): Chord[] {
  if (!query || query.trim() === '') return [];

  const normalized = query.trim().toLowerCase();
  const index = buildSearchIndex();

  const results = index.get(normalized);
  if (results) {
    return results.slice(0, 30);
  }

  const allChords = getAllChordsInternal();
  const filtered = allChords.filter(chord => {
    if (chord.symbol.toLowerCase().includes(normalized)) return true;
    if (chord.root.toLowerCase().includes(normalized)) return true;
    if (chord.displayName.toLowerCase().includes(normalized)) return true;

    const flatSymbol = getDisplayChordSymbol(chord.symbol, 'flat').toLowerCase();
    if (flatSymbol.includes(normalized)) return true;

    const flatRoot = getDisplayNote(chord.root, 'flat').toLowerCase();
    if (flatRoot.includes(normalized)) return true;

    return false;
  });

  return filtered.slice(0, 30);
}

const POPULAR_CHORD_SYMBOLS = [
  'C', 'G', 'Am', 'F', 'Dm', 'Em', 'D', 'A', 'E',
  'Am7', 'Dm7', 'Em7', 'Cmaj7', 'G7', 'Fmaj7'
];

let popularChordsCache: Chord[] | null = null;

export function getPopularChords(): Chord[] {
  if (!popularChordsCache) {
    popularChordsCache = POPULAR_CHORD_SYMBOLS
      .map(s => getChordBySymbol(s))
      .filter((c): c is Chord => c !== null);
  }
  return [...popularChordsCache];
}

export function invalidateChordCache(): void {
  allChordsCache = null;
  chordMapCache = null;
  searchIndexCache = null;
  popularChordsCache = null;
}
