
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Layout } from '../components/Layout';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Card } from '../components/ui/Card';
import { api } from '../services/api';
import { VideoStatus } from '../types';
import { useToast } from '../components/ui/Toast';

const Processing: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToast } = useToast();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Iniciando...");
  const hasFailedRef = useRef(false);
  
  useEffect(() => {
    if (!id) return;

    const pollStatus = async () => {
      try {
        const reaction = await api.getReaction(id);
        if (!reaction) return;

        setProgress(reaction.progress);
        if (reaction.currentStep) setStatusText(reaction.currentStep);

        if (reaction.status === VideoStatus.COMPLETED) {
          setTimeout(() => {
            navigate(`/result/${id}`);
          }, 800);
        } else if (reaction.status === VideoStatus.FAILED) {
            setStatusText("Falha no processamento. Tente novamente.");
            if (!hasFailedRef.current) {
                addToast("O processamento do vídeo falhou. Por favor, tente novamente.", "error");
                hasFailedRef.current = true;
            }
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    };

    // Immediate check
    pollStatus();

    // Interval check
    const interval = setInterval(pollStatus, 1500);
    return () => clearInterval(interval);
  }, [id, navigate, addToast]);

  return (
    <Layout>
      <div className="flex items-center justify-center h-[calc(100vh-150px)]">
        <div className="max-w-lg w-full text-center">
          <motion.div 
            className="mb-8 inline-block"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary p-1">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                 <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              </div>
            </div>
          </motion.div>

          <h2 className="text-2xl font-bold mb-2">Criando Mágica</h2>
          <p className="text-muted mb-8">Por favor, mantenha esta aba aberta enquanto geramos seu vídeo.</p>

          <Card className="p-8 bg-card/50 border-primary/20">
            <ProgressBar progress={progress} className="mb-4" />
            
            <div className="h-8 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={statusText} // Animate when text changes
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm font-medium text-primary absolute w-full"
                    >
                        {statusText}
                    </motion.p>
                </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Processing;