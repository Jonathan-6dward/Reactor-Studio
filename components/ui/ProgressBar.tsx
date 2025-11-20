import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  className?: string;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '', label }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-1 text-sm font-medium text-muted">
          <span>{label}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full bg-accent rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="bg-primary h-2.5 rounded-full relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
             <div className="absolute top-0 left-0 bottom-0 right-0 bg-white/20 animate-pulse"></div>
        </motion.div>
      </div>
    </div>
  );
};