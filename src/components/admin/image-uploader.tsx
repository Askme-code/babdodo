
'use client';

import { useState, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { UploadCloud, X } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ImageUploaderProps {
  onFileSelect: (file: File | null) => void;
  currentImage?: string;
}

const ImageUploader = ({ onFileSelect, currentImage }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setFileName(null);
    onFileSelect(null);
    // This is a bit of a hack to clear the file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  };

  return (
    <div className="w-full">
      <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
        {preview ? (
          <div className="relative group mx-auto max-w-xs">
            <Image
              src={preview}
              alt="Image Preview"
              width={200}
              height={200}
              className="rounded-md object-contain mx-auto max-h-48"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
            <p className="text-sm text-muted-foreground mt-2 truncate">{fileName || 'Current Image'}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <UploadCloud className="h-10 w-10 text-muted-foreground" />
            <Label htmlFor="file-upload" className="cursor-pointer text-primary hover:underline font-medium">
              Click to upload an image
            </Label>
            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
