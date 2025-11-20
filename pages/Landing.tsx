import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Github, LogIn } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { VideoInput } from '../components/video/VideoInput';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20">
      {/* Nav */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Reactor Studio</span>
        </div>
        <div className="flex gap-4">
            <Button variant="ghost" onClick={handleLogin} className="text-muted hover:text-white" icon={<LogIn className="w-4 h-4"/>}>
                Entrar
            </Button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20 relative overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl mx-auto text-center z-10"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/30 border border-accent/50 text-sm text-muted mb-8 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                Grátis para uso (Beta)
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Crie Reações Virais <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
                com Avatar IA
              </span>
            </h1>
            
            <p className="text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
              Transforme qualquer vídeo em conteúdo de reação engajador em segundos. 
              Sem câmera. Sem microfone. Apenas mágica.
            </p>

            {/* Main Action Component */}
            <div className="relative z-20">
                <VideoInput />
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted grayscale opacity-70 hover:opacity-100 transition-opacity duration-300">
                <span className="flex items-center gap-2"><ArrowRight className="w-3 h-3" /> YouTube</span>
                <span className="flex items-center gap-2"><ArrowRight className="w-3 h-3" /> TikTok</span>
                <span className="flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Instagram</span>
            </div>
        </motion.div>
      </main>
      
      <footer className="border-t border-accent/50 py-8 text-center text-muted text-sm bg-card/30 backdrop-blur-sm">
        <p>© 2024 Reactor Studio. Open Source Project.</p>
      </footer>
    </div>
  );
};

export default Landing;
