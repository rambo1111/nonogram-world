import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/features/image-converter/ImageUploader";
import OptionsPanel from "../components/features/image-converter/OptionsPanel";
import PageHeader from "../components/shared/PageHeader";
import NonogramGrid from "../components/features/nonogram-solver/NonogramGrid";
import Card from "../components/shared/Card";
import NeoButton from "../components/shared/NeoButton";
import { PuzzleData } from "../types/nonogram";
import { Play, Share2, Check } from "lucide-react";
import { encodePuzzle } from "../lib/urlEncoder";

const ConverterPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string>("");
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(15);
  const [threshold, setThreshold] = useState(128);
  const [generatedGrid, setGeneratedGrid] = useState<number[][] | null>(null);
  const [generatedClues, setGeneratedClues] = useState<{ rows: string[][]; cols: string[][] } | null>(null);
  const [shareLink, setShareLink] = useState("");
  // MODIFICATION: Add state to track if the link was just copied
  const [isCopied, setIsCopied] = useState(false);


  // No changes needed in these functions
  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setShareLink("");
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageDataUrl("");
    }
  };
  const handleGenerate = () => {
    if (!selectedFile) return;
    setShareLink("");
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const binaryGrid: number[][] = [];
        for (let y = 0; y < height; y++) {
          const row: number[] = [];
          for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const gray = (data[index] + data[index + 1] + data[index + 2]) / 3;
            row.push(gray < threshold ? 1 : -1);
          }
          binaryGrid.push(row);
        }
        setGeneratedGrid(binaryGrid);
        generateCluesFromGrid(binaryGrid);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };
  const generateCluesFromGrid = (grid: number[][]) => {
    const cols = grid[0].length;
    const getCluesForLine = (line: number[]): string[] => {
      const clues: number[] = []; let count = 0;
      for (const cell of line) { if (cell === 1) count++; else if (count > 0) { clues.push(count); count = 0; } }
      if (count > 0) clues.push(count);
      return clues.length > 0 ? clues.map(String) : ['0'];
    };
    const rowClues = grid.map(getCluesForLine);
    const colClues = Array.from({ length: cols }, (_, j) => getCluesForLine(grid.map(row => row[j])));
    const maxRowClues = Math.max(1, ...rowClues.map(c => c.length));
    const maxColClues = Math.max(1, ...colClues.map(c => c.length));
    setGeneratedClues({
        rows: rowClues.map(c => [...Array(maxRowClues - c.length).fill(''), ...c]),
        cols: colClues.map(c => [...Array(maxColClues - c.length).fill(''), ...c]),
    });
  };
  const getPuzzleData = (): PuzzleData | null => {
    if (!generatedClues) return null;
    return {
      gridSize: { rows: height, cols: width },
      maxGroups: Math.max(1, ...generatedClues.rows.map(r => r.length), ...generatedClues.cols.map(c => c.length)),
      clues: generatedClues,
    };
  };
  const handlePlay = () => {
    const puzzleData = getPuzzleData();
    if (puzzleData) {
      navigate('/game', { state: { puzzle: puzzleData } });
    }
  };

  // MODIFICATION: This function now copies to the clipboard
  const handleShare = () => {
    const puzzleData = getPuzzleData();
    if (!puzzleData || !imageDataUrl) return;

    const shareablePuzzle = { ...puzzleData, imageDataUrl };
    const encoded = encodePuzzle(shareablePuzzle);
    const link = `${window.location.origin}/play#${encoded}`;
    setShareLink(link);

    // Use the Clipboard API to copy the link
    navigator.clipboard.writeText(link).then(() => {
      setIsCopied(true);
      // Reset the button text after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error("Failed to copy link: ", err);
    });
  };

  return (
    <main className="container mx-auto flex flex-col items-center">
      <PageHeader title="Nonogram Maker" subtitle="Turn any image into a puzzle!" />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <div className="space-y-8">
            <ImageUploader onFileSelect={handleFileSelect} />
            <OptionsPanel width={width} setWidth={setWidth} height={height} setHeight={setHeight} threshold={threshold} setThreshold={setThreshold} onGenerate={handleGenerate} isDisabled={!selectedFile} />
        </div>
        <div>
            {generatedClues && generatedGrid ? (
              <div className="space-y-4">
                <NonogramGrid grid={generatedGrid as any} clues={generatedClues} onCellClick={() => {}} onClueChange={() => {}} isReadOnly={true} />
                <div className="grid grid-cols-2 gap-4">
                  <NeoButton onClick={handlePlay} className="w-full text-xl py-3"> <Play size={24}/> Play Puzzle </NeoButton>
                  {/* MODIFICATION: The share button now shows feedback when clicked */}
                  <NeoButton onClick={handleShare} variant={isCopied ? "primary" : "accent"} className="w-full text-xl py-3">
                    {isCopied ? (
                      <><Check size={24} /> Copied!</>
                    ) : (
                      <><Share2 size={24} /> Share Puzzle</>
                    )}
                  </NeoButton>
                </div>
                {shareLink && (
                    <div className="mt-4">
                        <label className="font-bold text-lg">Your Shareable Link:</label>
                        <input type="text" readOnly value={shareLink} onClick={(e) => e.currentTarget.select()} className="w-full p-3 mt-1 border-2 border-black rounded-lg bg-gray-100 cursor-pointer" />
                    </div>
                )}
              </div>
            ) : ( <Card><div className="h-96 flex items-center justify-center text-gray-500 text-xl font-bold">Your generated puzzle will appear here</div></Card> )}
        </div>
      </div>
    </main>
  );
};

export default ConverterPage;