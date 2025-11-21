import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2, Zap } from 'lucide-react';
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
      const url = searchParams.get('url'); 
      
      // 1. Try URL Params
      if (videoId) {
        try {
           const data = await api.getVideo(videoId);
           if (data) {
             setVideoData(data);
             // Update local storage to persist state for forward/backward navigation
             localStorage.setItem('pendingVideo', JSON.stringify(data));
           } else {
             navigate('/'); // Not found
           }
        } catch (e) {
           console.error(e);
           navigate('/');
        }
      } 
      // 2. Try direct analysis URL
      else if (url) {
         try {
             const data = await api.analyzeVideo(url);
             setVideoData(data);
             localStorage.setItem('pendingVideo', JSON.stringify(data));
         } catch (e) {
             navigate('/');
         }
      } 
      // 3. Fallback to Local Storage (allows coming back from Choose Avatar without params)
      else {
        const stored = localStorage.getItem('pendingVideo');
        if (stored) {
            setVideoData(JSON.parse(stored));
        } else {
            navigate('/');
        }
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
          <Link to="/">
            <Button
                variant="ghost"
                size="sm"
                className="text-muted hover:text-white"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
            </Button>
          </Link>
          
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight hover:text-primary transition-colors">
             <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="w-5 h-5 text-white" />
             </div>
             Reactor Studio
          </Link>
          
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