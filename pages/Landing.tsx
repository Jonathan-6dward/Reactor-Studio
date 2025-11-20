import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Play, Github, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">Reactor Studio</span>
        </div>
        <div className="flex gap-4">
            <a href="#" className="text-sm text-muted hover:text-white flex items-center mt-2">Preços</a>
            <Button variant="ghost" onClick={handleLogin}>Entrar</Button>
            <Button variant="primary" onClick={handleLogin}>Começar</Button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/50 border border-accent text-sm text-muted mb-6">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                Beta Público Disponível
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              Vídeos de Reação com IA <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Criados Instantaneamente.
              </span>
            </h1>
            
            <p className="text-xl text-muted max-w-2xl mx-auto mb-10">
              Faça upload de um vídeo. Escolha uma personalidade. Obtenha um vídeo de reação viral gerado por IA em minutos. Sem necessidade de câmera.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button size="lg" className="h-14 px-8 text-lg" onClick={handleLogin}>
                    Comece Grátis <ArrowRight className="ml-2 w-5 h-5"/>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg" icon={<Github className="w-5 h-5"/>}>
                    Star no GitHub
                </Button>
            </div>
        </motion.div>

        {/* Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full max-w-5xl"
        >
            <Card className="bg-card/50 border-accent/50 backdrop-blur-xl p-2 rounded-2xl shadow-2xl shadow-primary/10">
                <div className="aspect-[16/9] bg-black rounded-xl overflow-hidden relative">
                     <img src="https://picsum.photos/seed/demo/1200/675" className="w-full h-full object-cover opacity-80" alt="App Demo"/>
                     
                     {/* UI Overlay Mockup */}
                     <div className="absolute top-4 right-4 w-48 aspect-video bg-black border-2 border-primary rounded-lg overflow-hidden shadow-2xl">
                        <img src="https://picsum.photos/seed/avatar1/300/169" className="w-full h-full object-cover" alt="Avatar"/>
                     </div>

                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform border border-white/20">
                            <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                     </div>
                </div>
            </Card>
        </motion.div>
      </main>

      <footer className="border-t border-accent py-8 text-center text-muted text-sm">
        <p>© 2024 Reactor Studio. Construído com Open Source.</p>
      </footer>
    </div>
  );
};

export default Landing;