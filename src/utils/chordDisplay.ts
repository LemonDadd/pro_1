import { ROOT_NOTES, FLAT_NOTES, ENHARMONIC_MAP } from '@/types';

export type NoteDisplayMode = 'sharp' | 'flat';

export function getDisplayNote(note: string, noteDisplay: NoteDisplayMode = 'sharp'): string {
  if (noteDisplay === 'flat' && ENHARMONIC_MAP[note]) {
    return ENHARMONIC_MAP[note];
  }
  if (noteDisplay === 'sharp' && ENHARMONIC_MAP[note] && note.includes('b')) {
    return ENHARMONIC_MAP[note];
  }
  return note;
}

export function getDisplayChordSymbol(symbol: string, noteDisplay: NoteDisplayMode = 'sharp'): string {
  let root = '';
  let rest = '';

  if (symbol.length >= 2 && (symbol[1] === '#' || symbol[1] === 'b')) {
    root = symbol.substring(0, 2);
    rest = symbol.substring(2);
  } else {
    root = symbol.substring(0, 1);
    rest = symbol.substring(1);
  }

  return getDisplayNote(root, noteDisplay) + rest;
}

export function getDisplayRootNotes(noteDisplay: NoteDisplayMode = 'sharp'): string[] {
  return noteDisplay === 'flat' ? FLAT_NOTES : ROOT_NOTES;
}
