// src/lib/urlEncoder.ts

import pako from 'pako';
import { PuzzleData } from '../types/nonogram';

interface ShareablePuzzle extends PuzzleData {
  imageDataUrl: string;
}

// Compresses the puzzle object into a URL-safe string
export const encodePuzzle = (puzzle: ShareablePuzzle): string => {
  const jsonString = JSON.stringify(puzzle);
  const compressed = pako.deflate(jsonString);

  // MODIFICATION: Process the Uint8Array in chunks to avoid the call stack error.
  let binaryString = '';
  const CHUNK_SIZE = 8192; // Process in chunks of 8KB.
  for (let i = 0; i < compressed.length; i += CHUNK_SIZE) {
    const chunk = compressed.subarray(i, i + CHUNK_SIZE);
    binaryString += String.fromCharCode.apply(null, chunk as any);
  }
  
  return btoa(binaryString); // Base64 encode
};

// The decode function is correct and does not need changes.
export const decodePuzzle = (encodedString: string): ShareablePuzzle | null => {
  try {
    const binaryString = atob(encodedString); // Base64 decode
    const compressed = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      compressed[i] = binaryString.charCodeAt(i);
    }
    const jsonString = pako.inflate(compressed, { to: 'string' });
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to decode puzzle data:", error);
    return null;
  }
};