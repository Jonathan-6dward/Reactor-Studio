import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Youtube, Music, Instagram, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PlatformType } from '../../types';
import { UploadDropzone } from './UploadDropzone';
import { api } from '../../services/api';
import { useToast } from '../ui/Toast';

export const VideoInput: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [platform, setPlatform] = useState<PlatformType | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

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
      setFeedbackMsg(null);
      return;
    }

    setIsValidating(true);
    setFeedbackMsg("Verificando link...");
    
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const detected = detectPlatform(value);
    setPlatform(detected);
    setIsValid(detected !== null);
    
    if (detected) {
        setFeedbackMsg("Link válido! Plataforma detectada.");
    } else {
        setFeedbackMsg("Link inválido ou plataforma não suportada.");
    }
    
    setIsValidating(false);
  };

  const handleAnalyze = async () => {
    if (!isValid) return;
    setIsValidating(true);
    setFeedbackMsg("Processando vídeo...");
    
    try {
      // Use service layer
      const result = await api.analyzeVideo(url);
      navigate(`/preview?videoId=${result.videoId}`);
    } catch (error) {
      console.error("Analysis failed", error);
      addToast("Falha ao analisar o vídeo. Verifique a URL e tente novamente.", "error");
      setFeedbackMsg("Erro ao analisar vídeo.");
    } finally {
      setIsValidating(false);
    }
  };

  const getPlatformIcon = () => {
      switch(platform) {
          case 'youtube': return <Youtube className="w-5 h-5 text-red-500" />;
          case 'tiktok': return <Music className="w-5 h-5 text-cyan-400" />;
          case 'instagram': return <Instagram className="w-5 h-5 text-pink-500" />;
          default: return null;
      }
  };

  const borderColor = isValidating 
    ? 'border-primary' 
    : isValid 
        ? 'border-success ring-1 ring-success/50' 
        : url.length > 5 
            ? 'border-error ring-1 ring-error/50' 
            : 'border-accent';

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
              className={`
                  w-full h-14 px-4 pr-12 bg-card/50 backdrop-blur border rounded-lg 
                  focus:outline-none transition-all text-lg
                  ${borderColor}
              `}
            />
            
            {/* Platform Icon */}
            <AnimatePresence>
              {platform && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 p-1 rounded-full backdrop-blur-sm"
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
            isLoading={isValidating && isValid}
            className={`h-14 px-8 text-lg min-w-[140px] ${isValid && !isValidating ? 'animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.4)]' : ''}`}
            icon={isValid && !isValidating ? <CheckCircle className="w-5 h-5" /> : undefined}
          >
            Analisar
          </Button>
        </div>

        {/* Status Message */}
        <AnimatePresence>
            {feedbackMsg && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`absolute -bottom-7 left-1 text-xs font-medium flex items-center gap-1.5 ${isValid ? 'text-success' : 'text-muted'}`}
                >
                   {isValid ? <CheckCircle className="w-3 h-3" /> : url.length > 5 ? <AlertCircle className="w-3 h-3 text-error" /> : null}
                   <span className={!isValid && url.length > 5 ? 'text-error' : ''}>{feedbackMsg}</span>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Platform Badge */}
        <AnimatePresence>
          {platform && isValid && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-2 text-sm text-muted flex items-center gap-1 absolute -bottom-12 right-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              <span className="capitalize font-medium text-white/80">Plataforma {platform} Suportada</span>
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