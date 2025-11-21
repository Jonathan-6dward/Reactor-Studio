import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Youtube, Music, Instagram, Loader2, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PlatformType } from '../../types';
import { UploadDropzone } from './UploadDropzone';
import { api } from '../../services/api';
import { useToast } from '../ui/Toast';

const PATTERNS = {
  youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
  tiktok: /^(https?:\/\/)?(www\.)?(tiktok\.com)\/.+$/,
  instagram: /^(https?:\/\/)?(www\.)?(instagram\.com)\/.+$/
};

export const VideoInput: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [platform, setPlatform] = useState<PlatformType | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'neutral'>('neutral');
  
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    if (!url) {
      setIsValid(false);
      setPlatform(null);
      setFeedbackMsg(null);
      setFeedbackType('neutral');
      return;
    }

    const timer = setTimeout(() => {
      validateUrl(url);
    }, 500);

    return () => clearTimeout(timer);
  }, [url]);

  // Detect platform with regex
  const detectPlatform = (url: string): PlatformType | null => {
    if (PATTERNS.youtube.test(url)) return 'youtube';
    if (PATTERNS.tiktok.test(url)) return 'tiktok';
    if (PATTERNS.instagram.test(url)) return 'instagram';
    return null;
  };

  const validateUrl = async (value: string) => {
    setIsValidating(true);
    setFeedbackMsg("Verificando link...");
    setFeedbackType('neutral');
    
    // Simulate validation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const detected = detectPlatform(value);
    
    if (detected) {
        setPlatform(detected);
        setIsValid(true);
        setFeedbackMsg(`Link de ${detected} válido!`);
        setFeedbackType('success');
    } else {
        setPlatform(null);
        setIsValid(false);
        if (value.length > 8) {
            setFeedbackMsg("Plataforma não suportada ou link inválido.");
            setFeedbackType('error');
        } else {
            setFeedbackMsg(null);
        }
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
      addToast("Vídeo analisado com sucesso!", "success");
      navigate(`/preview?videoId=${result.videoId}`);
    } catch (error) {
      console.error("Analysis failed", error);
      addToast("Falha ao analisar o vídeo. Verifique a URL e tente novamente.", "error");
      setFeedbackMsg("Erro ao analisar vídeo.");
      setFeedbackType('error');
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

  const getBorderColor = () => {
      if (isValidating) return 'border-primary ring-1 ring-primary/30';
      if (feedbackType === 'success') return 'border-success ring-1 ring-success/50';
      if (feedbackType === 'error') return 'border-error ring-1 ring-error/50';
      return 'border-accent focus:border-primary';
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* URL Input */}
      <div className="relative">
        <div className="relative flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1 group">
            <input
              type="url"
              placeholder="Cole o link (YouTube, TikTok, Instagram)..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`
                  w-full h-14 px-4 pr-12 bg-card/50 backdrop-blur border rounded-lg 
                  focus:outline-none transition-all duration-300 text-lg
                  ${getBorderColor()}
              `}
            />
            
            {/* Platform Icon or Status Icon */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                <AnimatePresence mode="wait">
                    {isValidating ? (
                        <motion.div
                            key="loader"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                        >
                            <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        </motion.div>
                    ) : platform ? (
                        <motion.div
                            key="platform"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="bg-background/50 p-1 rounded-full backdrop-blur-sm"
                        >
                            {getPlatformIcon()}
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
          </div>

          {/* Analyze Button */}
          <Button
            size="lg"
            onClick={handleAnalyze}
            disabled={!isValid || isValidating}
            isLoading={isValidating && isValid}
            className={`h-14 px-8 text-lg min-w-[140px] transition-all duration-300 ${isValid && !isValidating ? 'animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.4)]' : ''}`}
            icon={isValid && !isValidating ? <CheckCircle className="w-5 h-5" /> : undefined}
          >
            Analisar
          </Button>
        </div>

        {/* Feedback Message */}
        <AnimatePresence>
            {feedbackMsg && (
                <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`absolute -bottom-8 left-1 text-xs font-medium flex items-center gap-1.5 ${
                        feedbackType === 'success' ? 'text-success' : feedbackType === 'error' ? 'text-error' : 'text-muted'
                    }`}
                >
                   {feedbackType === 'success' && <CheckCircle className="w-3 h-3" />}
                   {feedbackType === 'error' && <XCircle className="w-3 h-3" />}
                   {feedbackType === 'neutral' && <Loader2 className="w-3 h-3 animate-spin" />}
                   <span>{feedbackMsg}</span>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Platform Badge (Visual confirmation) */}
        <AnimatePresence>
          {platform && isValid && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-2 text-sm text-muted flex items-center gap-1 absolute -bottom-14 right-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
              <span className="capitalize font-medium text-white/80">Suporte a {platform} Ativo</span>
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