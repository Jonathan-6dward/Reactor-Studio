import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, Zap, LayoutTemplate, Mic, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { CreateReactionRequest, VideoAnalysisResult, Avatar } from '../types';
import { api } from '../services/api';
import { useToast } from '../components/ui/Toast';
import { useAuth } from '../contexts/AuthContext';
import { LoginModal } from '../components/auth/LoginModal';

const Customize: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { isAuthenticated, login } = useAuth();
  
  const [config, setConfig] = useState({
    style: 'quick',
    voice: 'female',
    position: 'top-right',
    size: 25
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [videoData, setVideoData] = useState<VideoAnalysisResult | null>(null);
  const [avatarData, setAvatarData] = useState<Avatar | null>(null);

  useEffect(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar');
    if (storedAvatar) setAvatarData(JSON.parse(storedAvatar));

    const pendingVideo = localStorage.getItem('pendingVideo');
    if (pendingVideo) setVideoData(JSON.parse(pendingVideo));
  }, []);

  const handleGenerateClick = () => {
      if (!videoData || !avatarData) {
        addToast("Dados do vídeo ou avatar incompletos.", "error");
        return;
      }

      // Deferred Login Check
      if (!isAuthenticated) {
          setShowLoginModal(true);
      } else {
          startGeneration();
      }
  };

  const handleLoginSuccess = () => {
      login();
      setShowLoginModal(false);
      // Small delay to allow state update before starting
      setTimeout(() => startGeneration(), 500);
  };

  const startGeneration = async () => {
    if (!videoData || !avatarData) return;
    
    setIsGenerating(true);
    
    try {
        const request: CreateReactionRequest = {
            videoId: videoData.videoId,
            avatarId: avatarData.id,
            style: config.style,
            voice: config.voice,
            position: config.position,
            size: config.size
        };

        const reaction = await api.createReaction(request);
        addToast("Processamento iniciado!", "success");
        navigate(`/processing/${reaction.id}`);

    } catch (error) {
        console.error("Failed to create reaction", error);
        const msg = error instanceof Error ? error.message : "Falha desconhecida";
        addToast(`Erro ao iniciar geração: ${msg}`, "error");
        setIsGenerating(false);
    }
  };

  const handleBack = () => {
      navigate('/choose-avatar');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLogin={handleLoginSuccess} 
      />

      <header className="border-b border-accent bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack} 
            className="text-muted hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
          
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight hover:text-primary transition-colors">
             <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="w-5 h-5 text-white" />
             </div>
             Reactor Studio
          </Link>
          
          <Link to="/">
             <Button variant="ghost" size="sm" icon={<Home className="w-4 h-4" />}>
                 Home
             </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_400px] gap-10">
            
            {/* Configuration Panel */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Personalize sua Reação</h2>
                    <p className="text-muted text-lg">Ajuste como o avatar interage com o vídeo.</p>
                </div>

                {/* Style */}
                <section>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" /> Estilo da Reação
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { id: 'quick', label: '⚡ Rápida', desc: 'Curta e direta' },
                            { id: 'analysis', label: '🧠 Análise', desc: 'Detalhada e profunda' },
                            { id: 'comedy', label: '😂 Comédia', desc: 'Engraçada e leve' },
                        ].map(opt => (
                            <div 
                                key={opt.id}
                                onClick={() => setConfig({ ...config, style: opt.id as any })}
                                className={`
                                    p-4 rounded-xl border cursor-pointer transition-all duration-200
                                    ${config.style === opt.id 
                                        ? 'bg-primary/10 border-primary ring-1 ring-primary' 
                                        : 'bg-card border-accent hover:border-muted hover:bg-accent/5'}
                                `}
                            >
                                <div className="font-bold mb-1">{opt.label}</div>
                                <div className="text-xs text-muted">{opt.desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Voice */}
                <section>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Mic className="w-5 h-5 text-secondary" /> Voz do Avatar
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { id: 'female', label: 'Rachel', desc: 'Feminina, Energética' },
                            { id: 'male_deep', label: 'Marcus', desc: 'Masculina, Grave' },
                            { id: 'male_mid', label: 'Caleb', desc: 'Masculina, Casual' },
                            { id: 'neutral', label: 'Sam', desc: 'Neutra, Profissional' },
                        ].map(opt => (
                            <div 
                                key={opt.id}
                                onClick={() => setConfig({ ...config, voice: opt.id as any })}
                                className={`
                                    flex items-center justify-between p-3 rounded-lg border cursor-pointer
                                    ${config.voice === opt.id 
                                        ? 'bg-secondary/10 border-secondary' 
                                        : 'bg-card border-accent hover:border-muted'}
                                `}
                            >
                                <div>
                                    <div className="font-medium text-sm">{opt.label}</div>
                                    <div className="text-xs text-muted">{opt.desc}</div>
                                </div>
                                {config.voice === opt.id && (
                                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Position & Size */}
                <section>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <LayoutTemplate className="w-5 h-5 text-success" /> Layout
                    </h3>
                    <Card className="p-6 bg-card/30">
                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-medium mb-3 block">Posição na Tela</label>
                                <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                                    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
                                        <button
                                            key={pos}
                                            onClick={() => setConfig({...config, position: pos as any})}
                                            className={`
                                                p-2 text-xs border rounded-md transition-colors flex items-center justify-center gap-2
                                                ${config.position === pos ? 'bg-white text-black border-white' : 'border-accent text-muted hover:border-muted'}
                                            `}
                                        >
                                            <div className={`w-2 h-2 bg-current rounded-sm ${pos.includes('left') ? 'mr-auto' : 'ml-auto'} ${pos.includes('top') ? 'mb-auto' : 'mt-auto'}`} />
                                            {pos.replace('-', ' ').toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium mb-3 block flex justify-between">
                                    <span>Tamanho do Avatar</span>
                                    <span className="text-muted">{config.size}%</span>
                                </label>
                                <input 
                                    type="range" 
                                    min="15" 
                                    max="40" 
                                    value={config.size} 
                                    onChange={(e) => setConfig({...config, size: parseInt(e.target.value)})}
                                    className="w-full h-2 bg-accent rounded-lg appearance-none cursor-pointer accent-white"
                                />
                                <div className="flex justify-between text-xs text-muted mt-2">
                                    <span>Pequeno</span>
                                    <span>Grande</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>
            </div>

            {/* Live Preview Mockup */}
            <div className="sticky top-24 h-fit">
                <Card className="overflow-hidden border-primary/30 shadow-2xl shadow-primary/5 bg-black">
                    <div className="aspect-[9/16] relative bg-accent/20">
                        {/* Background Video Mock */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-50">
                            {videoData?.thumbnailUrl ? (
                                <img src={videoData.thumbnailUrl} className="w-full h-full object-cover" alt="Bg" />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Play className="w-12 h-12 text-muted mb-2" />
                                    <span className="text-xs text-muted">Sem vídeo</span>
                                </div>
                            )}
                        </div>
                        
                        {/* Avatar Overlay Mock */}
                        <motion.div 
                            className="absolute aspect-square bg-primary rounded-lg shadow-xl overflow-hidden border-2 border-white/20"
                            style={{
                                top: config.position?.includes('top') ? '5%' : 'auto',
                                bottom: config.position?.includes('bottom') ? '5%' : 'auto',
                                left: config.position?.includes('left') ? '5%' : 'auto',
                                right: config.position?.includes('right') ? '5%' : 'auto',
                                width: `${config.size}%`,
                            }}
                            layout
                        >
                            {avatarData ? (
                                <img 
                                    src={avatarData.previewUrl} 
                                    className="w-full h-full object-cover" 
                                    alt="Avatar"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white/50 text-xs text-center p-1">
                                    Sem Avatar
                                </div>
                            )}
                        </motion.div>

                        {/* Controls Mock */}
                        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="h-1 w-full bg-white/30 rounded-full mb-2"></div>
                            <div className="flex justify-between text-xs text-white/70">
                                <span>0:00</span>
                                <span>0:{videoData?.duration || '00'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-card border-t border-accent">
                        <Button 
                            size="lg" 
                            className="w-full h-12 text-lg shadow-lg shadow-primary/25"
                            onClick={handleGenerateClick}
                            isLoading={isGenerating}
                        >
                            {isAuthenticated ? 'Gerar Vídeo Mágico ✨' : 'Entrar e Gerar Vídeo 🚀'}
                        </Button>
                        <p className="text-xs text-center mt-3 text-muted">
                            {isAuthenticated 
                                ? 'Ao continuar, você usará 1 crédito do seu plano.' 
                                : 'Faça login para salvar e processar seu vídeo gratuitamente.'}
                        </p>
                    </div>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Customize;