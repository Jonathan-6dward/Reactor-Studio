import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, User, History, Info, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { AvatarGallery } from '../components/avatar/AvatarGallery';
import { Avatar } from '../types';
import { Card } from '../components/ui/Card';

const ChooseAvatar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [activeTab, setActiveTab] = useState<'gallery' | 'upload' | 'history'>('gallery');

  useEffect(() => {
      // Restore selection if exists
      const stored = localStorage.getItem('selectedAvatar');
      if (stored) {
          setSelectedAvatar(JSON.parse(stored));
      }
  }, []);

  const handleNext = () => {
    if (!selectedAvatar) return;

    // Save to localStorage
    localStorage.setItem('selectedAvatar', JSON.stringify(selectedAvatar));
    navigate('/customize');
  };

  const handleBack = () => {
      // Retrieve pending video to construct the correct back URL
      const pendingVideo = localStorage.getItem('pendingVideo');
      if (pendingVideo) {
          const { videoId } = JSON.parse(pendingVideo);
          navigate(`/preview?videoId=${videoId}`);
      } else {
          navigate('/');
      }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-accent bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-muted hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight hover:text-primary transition-colors">
             <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="w-5 h-5 text-white" />
             </div>
             Reactor Studio
          </Link>

          <div className="w-24" />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-3"
            >
              Escolha seu Apresentador
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted text-lg"
            >
              Selecione quem vai reagir ao vídeo. Você pode escolher da nossa galeria ou fazer upload.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
            {/* Main Selection Area */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
               {/* Custom Tabs */}
               <div className="flex p-1 bg-accent/30 rounded-lg border border-accent w-fit">
                   {[
                       { id: 'gallery', label: 'Galeria', icon: User },
                       { id: 'upload', label: 'Meu Avatar', icon: Upload },
                       { id: 'history', label: 'Histórico', icon: History },
                   ].map(tab => (
                       <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                            ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'text-muted hover:text-white hover:bg-white/5'}
                        `}
                       >
                           <tab.icon className="w-4 h-4" />
                           {tab.label}
                       </button>
                   ))}
               </div>

               <div className="min-h-[400px]">
                   {activeTab === 'gallery' && (
                       <AvatarGallery selected={selectedAvatar} onSelect={setSelectedAvatar} />
                   )}
                   
                   {activeTab === 'upload' && (
                       <Card className="h-64 flex flex-col items-center justify-center border-dashed border-2 border-accent bg-card/30">
                           <div className="p-4 rounded-full bg-accent mb-4">
                               <Upload className="w-8 h-8 text-muted" />
                           </div>
                           <p className="text-lg font-medium mb-1">Faça upload de uma foto</p>
                           <p className="text-sm text-muted mb-4">JPG ou PNG, rosto frontal claro</p>
                           <Button variant="outline">Selecionar Arquivo</Button>
                       </Card>
                   )}
                   
                   {activeTab === 'history' && (
                       <div className="flex items-center justify-center h-64 text-muted bg-card/30 rounded-xl border border-accent">
                           <p>Você ainda não tem histórico de avatares.</p>
                       </div>
                   )}
               </div>
            </motion.div>

            {/* Preview Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24"
            >
               <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
                   <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted">Avatar Selecionado</h3>
                   
                   <div className="aspect-square rounded-xl bg-black/40 overflow-hidden mb-4 border border-accent relative">
                       {selectedAvatar ? (
                           <img src={selectedAvatar.previewUrl} className="w-full h-full object-cover" alt="Preview" />
                       ) : (
                           <div className="w-full h-full flex items-center justify-center text-muted/30">
                               <User className="w-16 h-16" />
                           </div>
                       )}
                       
                       {selectedAvatar && (
                           <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                               <p className="font-bold text-white">{selectedAvatar.name}</p>
                           </div>
                       )}
                   </div>

                   {selectedAvatar ? (
                       <div className="space-y-4">
                           <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary/90 flex gap-2">
                               <Info className="w-4 h-4 flex-shrink-0" />
                               Este avatar está pronto para sincronização labial.
                           </div>
                           <Button 
                                className="w-full h-12 text-lg" 
                                onClick={handleNext}
                                icon={<ArrowRight className="w-5 h-5 ml-2" />}
                           >
                               Confirmar
                           </Button>
                       </div>
                   ) : (
                       <div className="text-center text-sm text-muted py-4">
                           Selecione um avatar para continuar
                       </div>
                   )}
               </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChooseAvatar;