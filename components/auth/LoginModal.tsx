import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Shield, History, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const benefits = [
    { icon: CheckCircle2, text: "Gere seu vídeo instantaneamente" },
    { icon: History, text: "Salve no histórico para sempre" },
    { icon: Zap, text: "10 Créditos Grátis todos os meses" },
    { icon: Shield, text: "Seus vídeos 100% privados" },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-card border border-accent rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-muted hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 rotate-3">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Quase lá!</h2>
              <p className="text-muted">
                Faça login para finalizar a criação do seu vídeo e garantir que ele fique salvo na sua conta.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-accent/30 border border-accent/50 hover:bg-accent/50 transition-colors">
                  <benefit.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Button 
                className="w-full h-12 text-lg" 
                onClick={onLogin}
              >
                Entrar com Google
              </Button>
              <p className="text-xs text-center text-muted px-4">
                Não postamos nada nas suas redes sociais. Ao continuar, você aceita nossos Termos.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};