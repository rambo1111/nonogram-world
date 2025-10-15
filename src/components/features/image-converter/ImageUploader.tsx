import React, { useState, useCallback } from 'react'; // 'useEffect' removed
import Card from '../../shared/Card';
import { UploadCloud } from 'lucide-react'; // 'ImageIcon' removed

interface ImageUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    const file = files?.[0] || null;
    onFileSelect(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const onDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); }, []);
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, []);

  return (
    <Card>
      {preview ? (
        <div className="text-center">
            <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg border-2 border-black" />
            <button onClick={() => handleFileChange(null)} className="mt-4 font-bold text-pink-600 hover:text-pink-800">
                Clear Image
            </button>
        </div>
      ) : (
        <div
          onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
          className={`border-4 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'}`}
        >
          <input id="file-upload" type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files)} className="hidden" />
          <label htmlFor="file-upload" className="cursor-pointer">
            <UploadCloud className="mx-auto h-16 w-16 text-gray-400" />
            <p className="mt-4 text-xl font-semibold">Drag & drop an image</p>
            <p className="mt-1 text-gray-500">or click to select</p>
          </label>
        </div>
      )}
    </Card>
  );
};

export default ImageUploader;