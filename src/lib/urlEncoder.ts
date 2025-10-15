import pako from 'pako';
import { PuzzleData } from '../types/nonogram';

interface ShareablePuzzle extends PuzzleData {
  imageDataUrl: string;
}

// Compresses the puzzle object into a URL-safe string
export const encodePuzzle = (puzzle: ShareablePuzzle): string => {
  const jsonString = JSON.stringify(puzzle);
  // pako.deflate returns a Uint8Array, not a string
  const compressed = pako.deflate(jsonString);
  // Convert the Uint8Array to a binary string that btoa can handle
  const binaryString = String.fromCharCode.apply(null, compressed as any);
  return btoa(binaryString); // Base64 encode
};

// Decompresses the string from a URL back into a puzzle object
export const decodePuzzle = (encodedString: string): ShareablePuzzle | null => {
  try {
    const binaryString = atob(encodedString); // Base64 decode
    // Convert the binary string back to a Uint8Array for pako
    const compressed = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      compressed[i] = binaryString.charCodeAt(i);
    }
    // Inflate requires the { to: 'string' } option to return a string
    const jsonString = pako.inflate(compressed, { to: 'string' });
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to decode puzzle data:", error);
    return null;
  }
};