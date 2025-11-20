import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Layout } from '../components/Layout';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Card } from '../components/ui/Card';
import { PROCESSING_STEPS } from '../constants';

const Processing: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Non-linear progress for realism
        const increment = Math.random() * 2; 
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update text based on progress
    const stepsCount = PROCESSING_STEPS.length;
    const threshold = 100 / stepsCount;
    const current = Math.min(Math.floor(progress / threshold), stepsCount - 1);
    setStepIndex(current);

    if (progress === 100) {
      setTimeout(() => {
        navigate('/result/vid_new_123');
      }, 1000);
    }
  }, [progress, navigate]);

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

          <h2 className="text-2xl font-bold mb-2">Creating Magic</h2>
          <p className="text-muted mb-8">Please keep this tab open while we generate your reaction video.</p>

          <Card className="p-8 bg-card/50 border-primary/20">
            <ProgressBar progress={progress} className="mb-4" />
            
            <div className="h-8 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={stepIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm font-medium text-primary absolute w-full"
                    >
                        {PROCESSING_STEPS[stepIndex]}
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