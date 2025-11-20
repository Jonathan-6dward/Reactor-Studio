import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UploadDropzone: React.FC = () => {
  const navigate = useNavigate();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Emulate upload process
    // In a real app, we would upload to API here.
    // For this demo, we simulate a successful upload and store metadata.
    
    const mockVideoId = `vid_upload_${Date.now()}`;
    
    // Save to localStorage
    localStorage.setItem('pendingVideo', JSON.stringify({
      videoId: mockVideoId,
      url: URL.createObjectURL(file), // Temporary local URL for preview
      platform: 'upload',
      timestamp: Date.now(),
      title: file.name,
      duration: 45, // Mock duration
      resolution: '1080p',
      thumbnailUrl: 'https://picsum.photos/seed/upload/800/450'
    }));

    // Redirect to preview
    navigate(`/preview?videoId=${mockVideoId}`);
  }, [navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov'],
      'video/webm': ['.webm'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-xl p-12
        transition-all duration-200 cursor-pointer
        hover:border-primary hover:bg-primary/5
        ${isDragActive ? 'border-primary bg-primary/10 scale-105' : 'border-muted bg-card/30'}
      `}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="p-4 rounded-full bg-primary/10">
          {isDragActive ? (
            <Film className="w-8 h-8 text-primary animate-bounce" />
          ) : (
            <Upload className="w-8 h-8 text-primary" />
          )}
        </div>
        
        <div>
          <p className="text-lg font-medium">
            {isDragActive ? 'Solte o vídeo aqui' : 'Arraste seu vídeo aqui'}
          </p>
          <p className="text-sm text-muted">
            ou clique para selecionar
          </p>
        </div>

        <p className="text-xs text-muted">
          MP4, MOV, WEBM • Máx 100MB • Até 2 minutos
        </p>
      </div>
    </div>
  );
};
