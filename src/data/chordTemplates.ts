import { ChordPosition } from '@/types';

export const C_MAJOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [-1, 3, 2, 0, 1, 0],
  fingers: [null, 3, 2, null, 1, null],
  baseFret: 1,
};

export const C_MAJOR_1ST: ChordPosition = {
  name: '3rd',
  frets: [-1, 3, 5, 5, 5, 3],
  fingers: [null, 1, 3, 4, 2, 1],
  barre: { fromString: 6, toString: 2, fret: 3 },
  baseFret: 3,
};

export const A_MINOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [-1, 0, 2, 2, 1, 0],
  fingers: [null, null, 2, 3, 1, null],
  baseFret: 1,
};

export const A_MINOR_5TH: ChordPosition = {
  name: '5th',
  frets: [-1, 5, 7, 7, 5, 5],
  fingers: [null, 1, 3, 4, 2, 1],
  barre: { fromString: 6, toString: 2, fret: 5 },
  baseFret: 5,
};

export const G_MAJOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [3, 2, 0, 0, 0, 3],
  fingers: [2, 1, null, null, null, 3],
  baseFret: 1,
};

export const G_MAJOR_3RD: ChordPosition = {
  name: '3rd',
  frets: [3, 5, 5, 4, 3, 3],
  fingers: [1, 3, 4, 2, 1, 1],
  barre: { fromString: 6, toString: 1, fret: 3 },
  baseFret: 3,
};

export const E_MINOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [0, 2, 2, 0, 0, 0],
  fingers: [null, 2, 1, null, null, null],
  baseFret: 1,
};

export const E_MINOR_7TH: ChordPosition = {
  name: '7th',
  frets: [7, 9, 9, 7, 7, 7],
  fingers: [1, 3, 4, 2, 1, 1],
  barre: { fromString: 6, toString: 1, fret: 7 },
  baseFret: 7,
};

export const D_MAJOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [-1, -1, 0, 2, 3, 2],
  fingers: [null, null, null, 1, 3, 2],
  baseFret: 1,
};

export const A_MAJOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [-1, 0, 2, 2, 2, 0],
  fingers: [null, null, 1, 2, 3, null],
  baseFret: 1,
};

export const E_MAJOR_OPEN: ChordPosition = {
  name: 'open',
  frets: [0, 2, 2, 1, 0, 0],
  fingers: [null, 2, 3, 1, null, null],
  baseFret: 1,
};

export const D_MAJOR_5TH: ChordPosition = {
  name: '5th',
  frets: [-1, 5, 7, 7, 7, 5],
  fingers: [null, 1, 3, 4, 2, 1],
  barre: { fromString: 6, toString: 2, fret: 5 },
  baseFret: 5,
};

export const A_MAJOR_5TH: ChordPosition = {
  name: '5th',
  frets: [5, 7, 7, 6, 5, 5],
  fingers: [1, 3, 4, 2, 1, 1],
  barre: { fromString: 6, toString: 1, fret: 5 },
  baseFret: 5,
};

export const E_MAJOR_7TH: ChordPosition = {
  name: '7th',
  frets: [-1, 7, 9, 9, 9, 7],
  fingers: [null, 1, 3, 4, 2, 1],
  barre: { fromString: 5, toString: 1, fret: 7 },
  baseFret: 7,
};

export const F_MAJOR_1ST: ChordPosition = {
  name: '1st',
  frets: [1, 3, 3, 2, 1, 1],
  fingers: [1, 3, 4, 2, 1, 1],
  barre: { fromString: 6, toString: 1, fret: 1 },
  baseFret: 1,
};

export const F_MAJOR_8TH: ChordPosition = {
  name: '8th',
  frets: [8, 10, 10, 9, 8, 8],
  fingers: [1, 3, 4, 2, 1, 1],
  barre: { fromString: 6, toString: 1, fret: 8 },
  baseFret: 8,
};

export const E_MAJOR_SHAPE: ChordPosition = {
  name: '',
  frets: [0, 2, 2, 1, 0, 0],
  fingers: [null, 2, 3, 1, null, null],
  baseFret: 0,
};

export const A_MAJOR_SHAPE: ChordPosition = {
  name: '',
  frets: [-1, 0, 2, 2, 2, 0],
  fingers: [null, null, 1, 2, 3, null],
  baseFret: 0,
};

export const E_MINOR_SHAPE: ChordPosition = {
  name: '',
  frets: [0, 2, 2, 0, 0, 0],
  fingers: [null, 2, 1, null, null, null],
  baseFret: 0,
};

export const A_MINOR_SHAPE: ChordPosition = {
  name: '',
  frets: [-1, 0, 2, 2, 1, 0],
  fingers: [null, null, 2, 3, 1, null],
  baseFret: 0,
};

export const E7_SHAPE: ChordPosition = {
  name: '',
  frets: [0, 2, 0, 1, 0, 0],
  fingers: [null, 2, null, 1, null, null],
  baseFret: 0,
};

export const A7_SHAPE: ChordPosition = {
  name: '',
  frets: [-1, 0, 2, 0, 2, 0],
  fingers: [null, null, 1, null, 2, null],
  baseFret: 0,
};

export const EM7_SHAPE: ChordPosition = {
  name: '',
  frets: [0, 2, 0, 0, 0, 0],
  fingers: [null, 1, null, null, null, null],
  baseFret: 0,
};

export const AM7_SHAPE: ChordPosition = {
  name: '',
  frets: [-1, 0, 2, 0, 1, 0],
  fingers: [null, null, 2, null, 1, null],
  baseFret: 0,
};

export const EMAJ7_SHAPE: ChordPosition = {
  name: '',
  frets: [0, 2, 1, 1, 0, 0],
  fingers: [null, 3, 1, 2, null, null],
  baseFret: 0,
};

export const AMAJ7_SHAPE: ChordPosition = {
  name: '',
  frets: [-1, 0, 2, 1, 2, 0],
  fingers: [null, null, 2, 1, 3, null],
  baseFret: 0,
};

export const SUS2_SHAPE: ChordPosition = {
  name: '',
  frets: [0, 2, 4, 4, 0, 0],
  fingers: [null, 1, 3, 4, null, null],
  baseFret: 0,
};

export const SUS4_SHAPE: ChordPosition = {
  name: '',
  frets: [0, 2, 2, 2, 0, 0],
  fingers: [null, 1, 2, 3, null, null],
  baseFret: 0,
};

export const DIM_SHAPE: ChordPosition = {
  name: '',
  frets: [-1, -1, 2, 3, 2, 3],
  fingers: [null, null, 1, 3, 2, 4],
  baseFret: 2,
};

export const AUG_SHAPE: ChordPosition = {
  name: '',
  frets: [-1, -1, 2, 3, 1, 3],
  fingers: [null, null, 2, 3, 1, 4],
  baseFret: 1,
};
