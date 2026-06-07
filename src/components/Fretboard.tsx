import React from 'react';
import { ChordPosition } from '@/types';
import { useSettingsStore } from '@/store/useSettingsStore';

interface FretboardProps {
  position: ChordPosition;
  size?: 'small' | 'medium' | 'large';
  showFingers?: boolean;
}

const Fretboard: React.FC<FretboardProps> = ({
  position,
  size = 'large',
  showFingers = true,
}) => {
  const { leftHanded } = useSettingsStore();
  
  const config = {
    small: { width: 120, fretHeight: 18, stringSpacing: 18, dotRadius: 7 },
    medium: { width: 200, fretHeight: 30, stringSpacing: 30, dotRadius: 11 },
    large: { width: 320, fretHeight: 48, stringSpacing: 48, dotRadius: 18 },
  };
  
  const { width, fretHeight, stringSpacing, dotRadius } = config[size];
  
  const numFrets = 5;
  const numStrings = 6;
  
  const baseFret = position.baseFret || Math.min(...position.frets.filter(f => f > 0)) || 1;
  const showOpenStrings = baseFret <= 1;
  
  const offsetX = 30;
  const offsetY = 20;
  const boardWidth = width - offsetX * 2;
  const boardHeight = fretHeight * numFrets;
  
  const stringLabels = ['E', 'A', 'D', 'G', 'B', 'e'];
  const stringIndices = leftHanded ? [...Array(6).keys()].reverse() : [...Array(6).keys()];
  
  const getFretX = (stringIdx: number) => {
    const idx = leftHanded ? 5 - stringIdx : stringIdx;
    return offsetX + idx * (boardWidth / (numStrings - 1));
  };
  
  const getFretY = (fretNum: number) => {
    const relativeFret = showOpenStrings ? fretNum : fretNum - baseFret + 1;
    return offsetY + relativeFret * fretHeight - fretHeight / 2;
  };
  
  const fretsToShow = showOpenStrings ? 5 : Math.min(5, 12 - baseFret + 1);
  
  return (
    <svg
      width={width}
      height={boardHeight + offsetY * 2}
      viewBox={`0 0 ${width} ${boardHeight + offsetY * 2}`}
      className="select-none"
    >
      <defs>
        <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C4A77D" />
          <stop offset="50%" stopColor="#D4B896" />
          <stop offset="100%" stopColor="#C4A77D" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
        </filter>
      </defs>
      
      <rect
        x={offsetX - 5}
        y={showOpenStrings ? offsetY : offsetY - fretHeight / 2}
        width={boardWidth + 10}
        height={showOpenStrings ? boardHeight : boardHeight + fretHeight / 2}
        rx={4}
        fill="url(#woodGradient)"
        filter="url(#shadow)"
      />
      
      {showOpenStrings && (
        <line
          x1={offsetX}
          y1={offsetY}
          x2={offsetX + boardWidth}
          y2={offsetY}
          stroke="#2D2420"
          strokeWidth={3}
          strokeLinecap="round"
        />
      )}
      
      {Array.from({ length: fretsToShow + 1 }).map((_, i) => {
        const fretY = offsetY + i * fretHeight;
        const nutWidth = i === 0 && !showOpenStrings ? 4 : 1.5;
        return (
          <line
            key={`fret-${i}`}
            x1={offsetX}
            y1={fretY}
            x2={offsetX + boardWidth}
            y2={fretY}
            stroke="#5D4E37"
            strokeWidth={nutWidth}
            strokeLinecap="round"
          />
        );
      })}
      
      {Array.from({ length: numStrings }).map((_, i) => {
        const x = offsetX + i * (boardWidth / (numStrings - 1));
        const stringThickness = 1.5 - i * 0.15;
        return (
          <line
            key={`string-${i}`}
            x1={x}
            y1={showOpenStrings ? offsetY : offsetY - fretHeight / 2}
            x2={x}
            y2={offsetY + boardHeight}
            stroke="#F5EFE6"
            strokeWidth={Math.max(0.8, stringThickness)}
            opacity={0.9}
          />
        );
      })}
      
      {!showOpenStrings && (
        <text
          x={offsetX - 15}
          y={offsetY + fretHeight / 2 + 4}
          fill="#2D2420"
          fontSize={size === 'small' ? 10 : size === 'medium' ? 14 : 18}
          fontWeight="bold"
          textAnchor="middle"
          className="font-body"
        >
          {baseFret}fr
        </text>
      )}
      
      {position.barre && (() => {
        const barreFret = position.barre.fret;
        const relativeFret = showOpenStrings ? barreFret : barreFret - baseFret + 1;
        const y = offsetY + (relativeFret - 0.5) * fretHeight;
        const fromX = getFretX(position.barre.fromString - 1);
        const toX = getFretX(position.barre.toString - 1);
        
        return (
          <rect
            x={Math.min(fromX, toX) - dotRadius * 0.3}
            y={y - dotRadius * 0.8}
            width={Math.abs(toX - fromX) + dotRadius * 0.6}
            height={dotRadius * 1.6}
            rx={dotRadius * 0.8}
            fill="#722F37"
            opacity={0.9}
          />
        );
      })()}
      
      {stringIndices.map((stringIdx, displayIdx) => {
        const fret = position.frets[stringIdx];
        const finger = position.fingers[stringIdx];
        const x = getFretX(stringIdx);
        
        if (fret === -1) {
          return (
            <g key={`note-${displayIdx}`}>
              <text
                x={x}
                y={showOpenStrings ? offsetY - 8 : offsetY - fretHeight / 2 - 8}
                fill="#722F37"
                fontSize={size === 'small' ? 12 : size === 'medium' ? 18 : 24}
                fontWeight="bold"
                textAnchor="middle"
                className="font-body"
              >
                ×
              </text>
            </g>
          );
        }
        
        if (fret === 0) {
          return (
            <g key={`note-${displayIdx}`}>
              <circle
                cx={x}
                cy={showOpenStrings ? offsetY - 8 : offsetY - fretHeight / 2 - 8}
                r={size === 'small' ? 5 : size === 'medium' ? 7 : 9}
                fill="none"
                stroke="#2D2420"
                strokeWidth={1.5}
              />
            </g>
          );
        }
        
        const y = getFretY(fret);
        
        return (
          <g key={`note-${displayIdx}`}>
            <circle
              cx={x}
              cy={y}
              r={dotRadius}
              fill="#722F37"
            />
            {showFingers && finger && (
              <text
                x={x}
                y={y + (size === 'small' ? 3 : size === 'medium' ? 4 : 6)}
                fill="white"
                fontSize={size === 'small' ? 9 : size === 'medium' ? 13 : 16}
                fontWeight="bold"
                textAnchor="middle"
                className="font-body"
              >
                {finger}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default Fretboard;
