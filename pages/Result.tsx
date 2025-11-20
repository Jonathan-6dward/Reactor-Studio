import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Download, Share2, RefreshCcw, Check } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Confetti from 'react-confetti';

const Result: React.FC = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Success Banner */}
        <div className="text-center mb-8 animate-fade-in">
           <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
             Vídeo de Reação Pronto!
           </h1>
           <p className="text-muted">Seu avatar IA reagiu com sucesso ao seu vídeo.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Main Video Player */}
           <div className="lg:col-span-2">
              <Card className="p-1 bg-gradient-to-br from-accent to-background overflow-hidden">
                 <div className="aspect-video bg-black rounded-lg relative flex items-center justify-center group">
                    {/* Mock Video Player */}
                    <img 
                        src="https://picsum.photos/seed/result/800/450" 
                        className="w-full h-full object-cover opacity-60"
                        alt="Resultado do Vídeo"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                           <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
                        </div>
                    </div>
                    
                    {/* Mock UI for Player */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="h-1 bg-white/30 rounded-full mb-2">
                            <div className="w-1/3 h-full bg-primary rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-xs font-medium">
                            <span>0:23</span>
                            <span>1:45</span>
                        </div>
                    </div>
                 </div>
              </Card>
           </div>

           {/* Sidebar Actions */}
           <div className="space-y-6">
              <Card className="p-6">
                  <h3 className="font-semibold mb-4 text-lg">Detalhes</h3>
                  <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-accent pb-2">
                          <span className="text-muted">Duração</span>
                          <span>1m 45s</span>
                      </div>
                      <div className="flex justify-between border-b border-accent pb-2">
                          <span className="text-muted">Resolução</span>
                          <span>1080p</span>
                      </div>
                       <div className="flex justify-between border-b border-accent pb-2">
                          <span className="text-muted">Tamanho</span>
                          <span>45 MB</span>
                      </div>
                  </div>

                  <div className="mt-6 space-y-3">
                      <Button className="w-full" size="lg" icon={<Download className="w-4 h-4"/>}>
                          Baixar MP4
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        icon={copied ? <Check className="w-4 h-4 text-success"/> : <Share2 className="w-4 h-4"/>}
                        onClick={handleCopy}
                      >
                          {copied ? "Link Copiado!" : "Compartilhar"}
                      </Button>
                  </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/10">
                  <h3 className="font-semibold mb-2">O que vem a seguir?</h3>
                  <p className="text-sm text-muted mb-4">Crie outra reação com um avatar ou estilo diferente.</p>
                  <Link to="/create">
                     <Button variant="secondary" className="w-full" icon={<RefreshCcw className="w-4 h-4"/>}>
                         Criar Novo
                     </Button>
                  </Link>
              </Card>
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default Result;