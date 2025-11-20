import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Youtube, Music, Instagram, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PlatformType } from '../../types';
import { UploadDropzone } from './UploadDropzone';

export const VideoInput: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [platform, setPlatform] = useState<PlatformType | null>(null);
  const navigate = useNavigate();

  // Detect platform
  const detectPlatform = (url: string): PlatformType | null => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('tiktok.com')) return 'tiktok';
    if (url.includes('instagram.com')) return 'instagram';
    return null;
  };

  // Validate URL (simulated)
  const validateUrl = async (value: string) => {
    if (!value) {
      setIsValid(false);
      setPlatform(null);
      return;
    }

    setIsValidating(true);
    const detected = detectPlatform(value);
    setPlatform(detected);

    // Simulate API validation delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setIsValid(detected !== null);
    setIsValidating(false);
  };

  const handleAnalyze = async () => {
    if (!isValid) return;
    
    // Mock data fetching based on URL
    const mockData = {
        url,
        platform,
        timestamp: Date.now(),
        title: 'Exemplo de Vídeo Viral',
        duration: 84,
        resolution: '1080p',
        thumbnailUrl: `https://picsum.photos/seed/${platform}/800/450`
    };

    // Save to localStorage temporary
    localStorage.setItem('pendingVideo', JSON.stringify(mockData));

    // Redirect to preview
    navigate(`/preview?url=${encodeURIComponent(url)}`);
  };

  const getPlatformIcon = () => {
      switch(platform) {
          case 'youtube': return <Youtube className="w-5 h-5 text-muted" />;
          case 'tiktok': return <Music className="w-5 h-5 text-muted" />;
          case 'instagram': return <Instagram className="w-5 h-5 text-muted" />;
          default: return null;
      }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* URL Input */}
      <div className="relative">
        <div className="relative flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="url"
              placeholder="Cole o link (YouTube, TikTok, Instagram)..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                validateUrl(e.target.value);
              }}
              className="w-full h-14 px-4 pr-12 bg-card/50 backdrop-blur border border-accent rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-lg"
            />
            
            {/* Platform Icon */}
            <AnimatePresence>
              {platform && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {getPlatformIcon()}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Validating Spinner */}
            {isValidating && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            )}
          </div>

          {/* Analyze Button */}
          <Button
            size="lg"
            onClick={handleAnalyze}
            disabled={!isValid || isValidating}
            className={`h-14 px-8 text-lg min-w-[140px] ${isValid ? 'animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.4)]' : ''}`}
            icon={isValid ? <CheckCircle className="w-5 h-5" /> : undefined}
          >
            Analisar
          </Button>
        </div>

        {/* Platform Badge */}
        <AnimatePresence>
          {platform && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-2 text-sm text-muted flex items-center gap-1 absolute -bottom-8 left-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              Detectado: <span className="capitalize text-white font-medium">{platform}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-accent"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-background px-4 text-muted">
            Ou faça upload
          </span>
        </div>
      </div>

      {/* Upload Dropzone */}
      <UploadDropzone />
    </div>
  );
};
