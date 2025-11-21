
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { VideoPreviewCard } from '../components/video/VideoPreviewCard';
import { VideoAnalysisResult } from '../types';
import { api } from '../services/api';

const Preview: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState<VideoAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      const videoId = searchParams.get('videoId');
      // Fallback to url parameter if just pasted (less robust but handles direct link case if implemented)
      const url = searchParams.get('url'); 
      
      if (videoId) {
        try {
           const data = await api.getVideo(videoId);
           if (data) {
             setVideoData(data);
           } else {
             navigate('/'); // Not found
           }
        } catch (e) {
           console.error(e);
           navigate('/');
        }
      } else if (url) {
         // Should ideally be handled by VideoInput, but for safety:
         try {
             const data = await api.analyzeVideo(url);
             setVideoData(data);
         } catch (e) {
             navigate('/');
         }
      } else {
        navigate('/');
      }
      setLoading(false);
    };

    fetchVideo();
  }, [navigate, searchParams]);

  const handleNext = () => {
    navigate('/choose-avatar');
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-accent bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-muted hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <span className="font-bold tracking-tight">Reactor Studio</span>
          
          <div className="w-24" /> {/* Spacer */}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl space-y-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Vídeo Detectado!
            </h2>
            <p className="text-muted text-lg">
              Confirmamos os dados do seu vídeo. Tudo pronto para continuar.
            </p>
          </div>

          {/* Video Preview */}
          {videoData && <VideoPreviewCard data={videoData} />}

          {/* Next Button */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center pt-8"
          >
            <Button
              size="lg"
              onClick={handleNext}
              className="h-14 px-12 text-lg shadow-2xl shadow-primary/20 hover:scale-105 transition-transform duration-300"
              icon={<ArrowRight className="w-5 h-5 ml-2" />}
            >
              Próximo: Escolher Avatar
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Preview;
