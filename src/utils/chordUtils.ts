import { Chord, ChordPosition, ROOT_NOTES, QUALITY_DISPLAY, ChordQuality } from '@/types';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function getNoteIndex(note: string): number {
  return NOTE_NAMES.indexOf(note);
}

export function transposeNote(note: string, semitones: number): string {
  const idx = getNoteIndex(note);
  const newIdx = ((idx + semitones) % 12 + 12) % 12;
  return NOTE_NAMES[newIdx];
}

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function transposePosition(position: ChordPosition, semitones: number): ChordPosition {
  const newFrets = position.frets.map(f => f === -1 ? -1 : f === 0 ? 0 : f + semitones);
  const newFingers = [...position.fingers];
  let newBarre = position.barre ? { ...position.barre } : undefined;
  
  if (newBarre) {
    newBarre.fret = newBarre.fret + semitones;
  }
  
  const pressedFrets = newFrets.filter(f => f > 0);
  const baseFret = pressedFrets.length > 0 ? Math.min(...pressedFrets) : 1;
  
  return {
    ...position,
    frets: newFrets,
    fingers: newFingers,
    barre: newBarre,
    baseFret,
  };
}

const C_MAJOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [-1, 3, 2, 0, 1, 0],
  fingers: [null, 3, 2, null, 1, null],
  baseFret: 1,
};

const C_MAJOR_1ST: ChordPosition = {
  name: '3rd',
  frets: [-1, 3, 5, 5, 5, 3],
  fingers: [null, 1, 3, 4, 2, 1],
  barre: { fromString: 6, toString: 2, fret: 3 },
  baseFret: 3,
};

const A_MINOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [-1, 0, 2, 2, 1, 0],
  fingers: [null, null, 2, 3, 1, null],
  baseFret: 1,
};

const A_MINOR_5TH: ChordPosition = {
  name: '5th',
  frets: [-1, 5, 7, 7, 5, 5],
  fingers: [null, 1, 3, 4, 2, 1],
  barre: { fromString: 6, toString: 2, fret: 5 },
  baseFret: 5,
};

const G_MAJOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [3, 2, 0, 0, 0, 3],
  fingers: [2, 1, null, null, null, 3],
  baseFret: 1,
};

const G_MAJOR_3RD: ChordPosition = {
  name: '3rd',
  frets: [3, 5, 5, 4, 3, 3],
  fingers: [1, 3, 4, 2, 1, 1],
  barre: { fromString: 6, toString: 1, fret: 3 },
  baseFret: 3,
};

const E_MINOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [0, 2, 2, 0, 0, 0],
  fingers: [null, 2, 1, null, null, null],
  baseFret: 1,
};

const E_MINOR_7TH: ChordPosition = {
  name: '7th',
  frets: [7, 9, 9, 7, 7, 7],
  fingers: [1, 3, 4, 2, 1, 1],
  barre: { fromString: 6, toString: 1, fret: 7 },
  baseFret: 7,
};

const D_MAJOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [-1, -1, 0, 2, 3, 2],
  fingers: [null, null, null, 1, 3, 2],
  baseFret: 1,
};

const A_MAJOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [-1, 0, 2, 2, 2, 0],
  fingers: [null, null, 1, 2, 3, null],
  baseFret: 1,
};

const E_MAJOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [0, 2, 2, 1, 0, 0],
  fingers: [null, 2, 3, 1, null, null],
  baseFret: 1,
};

const D_MAJOR_5TH: ChordPosition = {
  name: '5th',
  frets: [-1, 5, 7, 7, 7, 5],
  fingers: [null, 1, 3, 4, 2, 1],
  barre: { fromString: 6, toString: 2, fret: 5 },
  baseFret: 5,
};

const A_MAJOR_5TH: ChordPosition = {
  name: '5th',
  frets: [5, 7, 7, 6, 5, 5],
  fingers: [1, 3, 4, 2, 1, 1],
  barre: { fromString: 6, toString: 1, fret: 5 },
  baseFret: 5,
};

const E_MAJOR_7TH: ChordPosition = {
  name: '7th',
  frets: [-1, 7, 9, 9, 9, 7],
  fingers: [null, 1, 3, 4, 2, 1],
  barre: { fromString: 5, toString: 1, fret: 7 },
  baseFret: 7,
};

const F_MAJOR_1ST: ChordPosition = {
  name: '1st',
  frets: [1, 3, 3, 2, 1, 1],
  fingers: [1, 3, 4, 2, 1, 1],
  barre: { fromString: 6, toString: 1, fret: 1 },
  baseFret: 1,
};

const F_MAJOR_8TH: ChordPosition = {
  name: '8th',
  frets: [8, 10, 10, 9, 8, 8],
  fingers: [1, 3, 4, 2, 1, 1],
  barre: { fromString: 6, toString: 1, fret: 8 },
  baseFret: 8,
};

function generateMajorChords(root: string, rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];
  
  if (root === 'C') {
    positions.push({ ...C_MAJOR_OPEN, name: 'open' });
    positions.push({ ...C_MAJOR_1ST, name: '3rd' });
  } else if (root === 'G') {
    positions.push({ ...G_MAJOR_OPEN, name: 'open' });
    positions.push({ ...G_MAJOR_3RD, name: '3rd' });
  } else if (root === 'D') {
    positions.push({ ...D_MAJOR_OPEN, name: 'open' });
    positions.push({ ...D_MAJOR_5TH, name: '5th' });
  } else if (root === 'A') {
    positions.push({ ...A_MAJOR_OPEN, name: 'open' });
    positions.push({ ...A_MAJOR_5TH, name: '5th' });
  } else if (root === 'E') {
    positions.push({ ...E_MAJOR_OPEN, name: 'open' });
    positions.push({ ...E_MAJOR_7TH, name: '7th' });
  } else if (root === 'F') {
    positions.push({ ...F_MAJOR_1ST, name: '1st' });
    positions.push({ ...F_MAJOR_8TH, name: '8th' });
  } else {
    const offset = rootIndex;
    
    const eShape = transposePosition({
      name: '',
      frets: [0, 2, 2, 1, 0, 0],
      fingers: [null, 2, 3, 1, null, null],
      baseFret: 0,
    }, offset);
    eShape.name = getOrdinal(offset);
    eShape.barre = offset > 0 ? { fromString: 6, toString: 1, fret: offset } : undefined;
    if (offset > 0) {
      eShape.fingers = [1, 3, 4, 2, 1, 1];
    }
    positions.push(eShape);
    
    const aShape = transposePosition({
      name: '',
      frets: [-1, 0, 2, 2, 2, 0],
      fingers: [null, null, 1, 2, 3, null],
      baseFret: 0,
    }, offset);
    aShape.name = getOrdinal(offset + 2);
    positions.push(aShape);
  }
  
  return positions;
}

function generateMinorChords(root: string, rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];
  
  if (root === 'Am' || root === 'A') {
    positions.push({ ...A_MINOR_OPEN, name: 'open' });
    positions.push({ ...A_MINOR_5TH, name: '5th' });
  } else if (root === 'Em' || root === 'E') {
    positions.push({ ...E_MINOR_OPEN, name: 'open' });
    positions.push({ ...E_MINOR_7TH, name: '7th' });
  } else {
    const offset = rootIndex;
    
    const emShape = transposePosition({
      name: '',
      frets: [0, 2, 2, 0, 0, 0],
      fingers: [null, 2, 1, null, null, null],
      baseFret: 0,
    }, offset);
    emShape.name = getOrdinal(offset);
    if (offset > 0) {
      emShape.fingers = [1, 3, 2, 1, 1, 1];
      emShape.barre = { fromString: 6, toString: 1, fret: offset };
    }
    positions.push(emShape);
    
    const amShape = transposePosition({
      name: '',
      frets: [-1, 0, 2, 2, 1, 0],
      fingers: [null, null, 2, 3, 1, null],
      baseFret: 0,
    }, offset);
    amShape.name = getOrdinal(offset + 2);
    positions.push(amShape);
  }
  
  return positions;
}

function generate7Chords(rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];
  
  const e7Shape = transposePosition({
    name: '',
    frets: [0, 2, 0, 1, 0, 0],
    fingers: [null, 2, null, 1, null, null],
    baseFret: 0,
  }, rootIndex);
  e7Shape.name = getOrdinal(rootIndex);
  if (rootIndex > 0) {
    e7Shape.fingers = [1, 3, null, 2, 1, 1];
    e7Shape.barre = { fromString: 6, toString: 1, fret: rootIndex };
  }
  positions.push(e7Shape);
  
  const a7Shape = transposePosition({
    name: '',
    frets: [-1, 0, 2, 0, 2, 0],
    fingers: [null, null, 1, null, 2, null],
    baseFret: 0,
  }, rootIndex);
  a7Shape.name = getOrdinal(rootIndex + 2);
  positions.push(a7Shape);
  
  return positions;
}

function generateM7Chords(rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];
  
  const em7Shape = transposePosition({
    name: '',
    frets: [0, 2, 0, 0, 0, 0],
    fingers: [null, 1, null, null, null, null],
    baseFret: 0,
  }, rootIndex);
  em7Shape.name = getOrdinal(rootIndex);
  if (rootIndex > 0) {
    em7Shape.fingers = [1, 2, 1, 1, 1, 1];
    em7Shape.barre = { fromString: 6, toString: 1, fret: rootIndex };
  }
  positions.push(em7Shape);
  
  const am7Shape = transposePosition({
    name: '',
    frets: [-1, 0, 2, 0, 1, 0],
    fingers: [null, null, 2, null, 1, null],
    baseFret: 0,
  }, rootIndex);
  am7Shape.name = getOrdinal(rootIndex + 2);
  positions.push(am7Shape);
  
  return positions;
}

function generateMaj7Chords(rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];
  
  const emaj7Shape = transposePosition({
    name: '',
    frets: [0, 2, 1, 1, 0, 0],
    fingers: [null, 3, 1, 2, null, null],
    baseFret: 0,
  }, rootIndex);
  emaj7Shape.name = getOrdinal(rootIndex);
  if (rootIndex > 0) {
    emaj7Shape.fingers = [1, 4, 2, 3, 1, 1];
    emaj7Shape.barre = { fromString: 6, toString: 1, fret: rootIndex };
  }
  positions.push(emaj7Shape);
  
  const amaj7Shape = transposePosition({
    name: '',
    frets: [-1, 0, 2, 1, 2, 0],
    fingers: [null, null, 2, 1, 3, null],
    baseFret: 0,
  }, rootIndex);
  amaj7Shape.name = getOrdinal(rootIndex + 2);
  positions.push(amaj7Shape);
  
  return positions;
}

function generateSus2Chords(rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];
  
  const sus2Shape = transposePosition({
    name: '',
    frets: [0, 2, 4, 4, 0, 0],
    fingers: [null, 1, 3, 4, null, null],
    baseFret: 0,
  }, rootIndex);
  sus2Shape.name = getOrdinal(rootIndex);
  if (rootIndex > 0) {
    sus2Shape.fingers = [1, 2, 4, 3, 1, 1];
    sus2Shape.barre = { fromString: 6, toString: 1, fret: rootIndex };
  }
  positions.push(sus2Shape);
  
  return positions;
}

function generateSus4Chords(rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];
  
  const sus4Shape = transposePosition({
    name: '',
    frets: [0, 2, 2, 2, 0, 0],
    fingers: [null, 1, 2, 3, null, null],
    baseFret: 0,
  }, rootIndex);
  sus4Shape.name = getOrdinal(rootIndex);
  if (rootIndex > 0) {
    sus4Shape.fingers = [1, 2, 3, 4, 1, 1];
    sus4Shape.barre = { fromString: 6, toString: 1, fret: rootIndex };
  }
  positions.push(sus4Shape);
  
  return positions;
}

function generateDimChords(rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];
  
  const dimShape = transposePosition({
    name: '',
    frets: [-1, -1, 2, 3, 2, 3],
    fingers: [null, null, 1, 3, 2, 4],
    baseFret: 2,
  }, rootIndex);
  dimShape.name = getOrdinal(rootIndex + 2);
  positions.push(dimShape);
  
  return positions;
}

function generateAugChords(rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];
  
  const augShape = transposePosition({
    name: '',
    frets: [-1, -1, 2, 3, 1, 3],
    fingers: [null, null, 2, 3, 1, 4],
    baseFret: 1,
  }, rootIndex);
  augShape.name = getOrdinal(rootIndex + 1);
  positions.push(augShape);
  
  return positions;
}

export function generateChord(root: string, quality: string): Chord {
  const rootIndex = getNoteIndex(root);
  const qualityDisplay = QUALITY_DISPLAY[quality] || quality;
  const symbol = root + qualityDisplay;
  const id = symbol;
  
  let positions: ChordPosition[] = [];
  
  switch (quality) {
    case 'maj':
      positions = generateMajorChords(root, rootIndex);
      break;
    case 'min':
      positions = generateMinorChords(root, rootIndex);
      break;
    case '7':
      positions = generate7Chords(rootIndex);
      break;
    case 'm7':
      positions = generateM7Chords(rootIndex);
      break;
    case 'maj7':
      positions = generateMaj7Chords(rootIndex);
      break;
    case 'sus2':
      positions = generateSus2Chords(rootIndex);
      break;
    case 'sus4':
      positions = generateSus4Chords(rootIndex);
      break;
    case 'dim':
      positions = generateDimChords(rootIndex);
      break;
    case 'aug':
      positions = generateAugChords(rootIndex);
      break;
    default:
      positions = generateMajorChords(root, rootIndex);
  }
  
  return {
    id,
    root,
    quality,
    symbol,
    displayName: symbol,
    positions,
  };
}

export function getAllChords(): Chord[] {
  const chords: Chord[] = [];
  const qualities = ['maj', 'min', '7', 'm7', 'maj7', 'sus2', 'sus4', 'dim', 'aug'];
  
  for (const root of ROOT_NOTES) {
    for (const quality of qualities) {
      chords.push(generateChord(root, quality));
    }
  }
  
  return chords;
}

export function getChordBySymbol(symbol: string): Chord | null {
  let root = '';
  let quality = '';
  
  if (symbol.length >= 2 && (symbol[1] === '#' || symbol[1] === 'b')) {
    root = symbol.substring(0, 2);
    quality = symbol.substring(2);
  } else {
    root = symbol.substring(0, 1);
    quality = symbol.substring(1);
  }
  
  if (root === 'Db') root = 'C#';
  if (root === 'Eb') root = 'D#';
  if (root === 'Gb') root = 'F#';
  if (root === 'Ab') root = 'G#';
  if (root === 'Bb') root = 'A#';
  
  if (!ROOT_NOTES.includes(root)) return null;
  
  const qualityMap: Record<string, string> = {
    '': 'maj',
    'm': 'min',
    'min': 'min',
    '7': '7',
    'm7': 'm7',
    'maj7': 'maj7',
    'sus2': 'sus2',
    'sus4': 'sus4',
    'dim': 'dim',
    'aug': 'aug',
    '+': 'aug',
    '°': 'dim',
  };
  
  const normalizedQuality = qualityMap[quality] || 'maj';
  
  return generateChord(root, normalizedQuality);
}

export function searchChords(query: string): Chord[] {
  if (!query || query.trim() === '') return [];
  
  const normalized = query.trim().toLowerCase();
  const allChords = getAllChords();
  
  return allChords.filter(chord => {
    if (chord.symbol.toLowerCase().includes(normalized)) return true;
    if (chord.root.toLowerCase().includes(normalized)) return true;
    if (chord.displayName.toLowerCase().includes(normalized)) return true;
    return false;
  }).slice(0, 30);
}

export function getPopularChords(): Chord[] {
  const popular = ['C', 'G', 'Am', 'F', 'Dm', 'Em', 'D', 'A', 'E', 'Am7', 'Dm7', 'Em7', 'Cmaj7', 'G7', 'Fmaj7'];
  return popular.map(s => getChordBySymbol(s)).filter((c): c is Chord => c !== null);
}
