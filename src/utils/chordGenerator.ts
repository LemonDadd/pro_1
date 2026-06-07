import { Chord, ChordPosition, ROOT_NOTES, QUALITY_DISPLAY, ChordQuality } from '@/types';
import {
  C_MAJOR_OPEN, C_MAJOR_1ST,
  G_MAJOR_OPEN, G_MAJOR_3RD,
  D_MAJOR_OPEN, D_MAJOR_5TH,
  A_MAJOR_OPEN, A_MAJOR_5TH,
  E_MAJOR_OPEN, E_MAJOR_7TH,
  F_MAJOR_1ST, F_MAJOR_8TH,
  A_MINOR_OPEN, A_MINOR_5TH,
  E_MINOR_OPEN, E_MINOR_7TH,
  E_MAJOR_SHAPE, A_MAJOR_SHAPE,
  E_MINOR_SHAPE, A_MINOR_SHAPE,
  E7_SHAPE, A7_SHAPE,
  EM7_SHAPE, AM7_SHAPE,
  EMAJ7_SHAPE, AMAJ7_SHAPE,
  SUS2_SHAPE, SUS4_SHAPE,
  DIM_SHAPE, AUG_SHAPE,
} from '@/data/chordTemplates';

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

    const eShape = transposePosition({ ...E_MAJOR_SHAPE }, offset);
    eShape.name = getOrdinal(offset);
    eShape.barre = offset > 0 ? { fromString: 6, toString: 1, fret: offset } : undefined;
    if (offset > 0) {
      eShape.fingers = [1, 3, 4, 2, 1, 1];
    }
    positions.push(eShape);

    const aShape = transposePosition({ ...A_MAJOR_SHAPE }, offset);
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

    const emShape = transposePosition({ ...E_MINOR_SHAPE }, offset);
    emShape.name = getOrdinal(offset);
    if (offset > 0) {
      emShape.fingers = [1, 3, 2, 1, 1, 1];
      emShape.barre = { fromString: 6, toString: 1, fret: offset };
    }
    positions.push(emShape);

    const amShape = transposePosition({ ...A_MINOR_SHAPE }, offset);
    amShape.name = getOrdinal(offset + 2);
    positions.push(amShape);
  }

  return positions;
}

function generate7Chords(rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];

  const e7Shape = transposePosition({ ...E7_SHAPE }, rootIndex);
  e7Shape.name = getOrdinal(rootIndex);
  if (rootIndex > 0) {
    e7Shape.fingers = [1, 3, null, 2, 1, 1];
    e7Shape.barre = { fromString: 6, toString: 1, fret: rootIndex };
  }
  positions.push(e7Shape);

  const a7Shape = transposePosition({ ...A7_SHAPE }, rootIndex);
  a7Shape.name = getOrdinal(rootIndex + 2);
  positions.push(a7Shape);

  return positions;
}

function generateM7Chords(rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];

  const em7Shape = transposePosition({ ...EM7_SHAPE }, rootIndex);
  em7Shape.name = getOrdinal(rootIndex);
  if (rootIndex > 0) {
    em7Shape.fingers = [1, 2, 1, 1, 1, 1];
    em7Shape.barre = { fromString: 6, toString: 1, fret: rootIndex };
  }
  positions.push(em7Shape);

  const am7Shape = transposePosition({ ...AM7_SHAPE }, rootIndex);
  am7Shape.name = getOrdinal(rootIndex + 2);
  positions.push(am7Shape);

  return positions;
}

function generateMaj7Chords(rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];

  const emaj7Shape = transposePosition({ ...EMAJ7_SHAPE }, rootIndex);
  emaj7Shape.name = getOrdinal(rootIndex);
  if (rootIndex > 0) {
    emaj7Shape.fingers = [1, 4, 2, 3, 1, 1];
    emaj7Shape.barre = { fromString: 6, toString: 1, fret: rootIndex };
  }
  positions.push(emaj7Shape);

  const amaj7Shape = transposePosition({ ...AMAJ7_SHAPE }, rootIndex);
  amaj7Shape.name = getOrdinal(rootIndex + 2);
  positions.push(amaj7Shape);

  return positions;
}

function generateSus2Chords(rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];

  const sus2Shape = transposePosition({ ...SUS2_SHAPE }, rootIndex);
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

  const sus4Shape = transposePosition({ ...SUS4_SHAPE }, rootIndex);
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

  const dimShape = transposePosition({ ...DIM_SHAPE }, rootIndex);
  dimShape.name = getOrdinal(rootIndex + 2);
  positions.push(dimShape);

  return positions;
}

function generateAugChords(rootIndex: number): ChordPosition[] {
  const positions: ChordPosition[] = [];

  const augShape = transposePosition({ ...AUG_SHAPE }, rootIndex);
  augShape.name = getOrdinal(rootIndex + 1);
  positions.push(augShape);

  return positions;
}

export function generateChord(root: string, quality: ChordQuality | string): Chord {
  const rootIndex = getNoteIndex(root);
  const qualityDisplay = QUALITY_DISPLAY[quality as ChordQuality] || quality;
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
    quality: quality as ChordQuality,
    symbol,
    displayName: symbol,
    positions,
  };
}

export function generateAllChords(): Chord[] {
  const chords: Chord[] = [];
  const qualities: ChordQuality[] = ['maj', 'min', '7', 'm7', 'maj7', 'sus2', 'sus4', 'dim', 'aug'];

  for (const root of ROOT_NOTES) {
    for (const quality of qualities) {
      chords.push(generateChord(root, quality));
    }
  }

  return chords;
}
