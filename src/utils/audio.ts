import { ChordPosition, TUNINGS } from '@/types';

let audioContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function getStringMidiNote(stringIndex: number, fret: number, tuning: string = 'standard'): number {
  const openTunings = TUNINGS[tuning] || TUNINGS.standard;
  return openTunings[stringIndex] + fret;
}

export function playNote(frequency: number, startTime: number, duration: number, volume: number = 0.3): void {
  const ctx = getAudioContext();
  
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(frequency, startTime);
  
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(frequency * 2, startTime);
  
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(volume * 0.6, startTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(volume * 0.4, startTime + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  
  const osc2Gain = ctx.createGain();
  osc2Gain.gain.value = 0.3;
  
  osc1.connect(gainNode);
  osc2.connect(osc2Gain);
  osc2Gain.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  osc1.start(startTime);
  osc2.start(startTime);
  osc1.stop(startTime + duration);
  osc2.stop(startTime + duration);
}

export function playChord(position: ChordPosition, options: {
  tuning?: string;
  volume?: number;
  bpm?: number;
  mode?: 'strum' | 'arpeggio';
} = {}): void {
  const ctx = getAudioContext();
  const tuning = options.tuning || 'standard';
  const volume = options.volume ?? 0.3;
  const bpm = options.bpm || 120;
  const mode = options.mode || 'strum';
  
  const beatDuration = 60 / bpm;
  const startTime = ctx.currentTime + 0.05;
  
  const activeStrings: { stringIndex: number; fret: number }[] = [];
  
  for (let i = 0; i < 6; i++) {
    const fret = position.frets[i];
    if (fret !== -1) {
      activeStrings.push({ stringIndex: i, fret: Math.max(0, fret) });
    }
  }
  
  if (mode === 'strum') {
    const strumDelay = 0.025;
    const totalDuration = beatDuration * 2;
    
    activeStrings.forEach(({ stringIndex, fret }, idx) => {
      const midi = getStringMidiNote(stringIndex, fret, tuning);
      const freq = midiToFrequency(midi);
      const noteStart = startTime + idx * strumDelay;
      const noteDuration = totalDuration - idx * strumDelay;
      playNote(freq, noteStart, noteDuration, volume * (1 - idx * 0.05));
    });
  } else {
    const arpDelay = beatDuration / 4;
    const noteDuration = beatDuration * 0.7;
    
    activeStrings.forEach(({ stringIndex, fret }, idx) => {
      const midi = getStringMidiNote(stringIndex, fret, tuning);
      const freq = midiToFrequency(midi);
      const noteStart = startTime + idx * arpDelay;
      playNote(freq, noteStart, noteDuration, volume);
    });
  }
}

export function playMetronomeClick(isAccent: boolean = false, volume: number = 0.2): void {
  const ctx = getAudioContext();
  const startTime = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.value = isAccent ? 1000 : 800;
  
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.001);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05);
  
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  osc.start(startTime);
  osc.stop(startTime + 0.1);
}

export function stopAllAudio(): void {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}
