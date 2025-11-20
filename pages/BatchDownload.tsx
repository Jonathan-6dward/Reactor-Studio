import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Link as LinkIcon, Youtube, ListVideo, User, Info, CheckCircle } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { BatchSourceType } from '../types';
import { MOCK_USER } from '../constants';

const BatchDownload: React.FC = () => {
  const navigate = useNavigate();
  const [sourceType, setSourceType] = useState<BatchSourceType>('urls');
  const [loading, setLoading] = useState(false);

  // Form states
  const [urls, setUrls] = useState('');
  const [channelUrl, setChannelUrl] = useState('');
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [maxVideos, setMaxVideos] = useState('10');
  const [sortBy, setSortBy] = useState('recent');

  const handleStartDownload = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate(`/batch-download/batch_${Date.now()}`);
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-bold text-white mb-1">Download em Massa</h1>
           <p className="text-muted">Baixe múltiplos vídeos de canais, playlists ou perfis.</p>
        </div>
        <Link to="/batch-download/history">
          <Button variant="outline">Ver Histórico</Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Type Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { id: 'urls', label: 'URLs Múltiplas', icon: LinkIcon },
            { id: 'channel', label: 'Canal YouTube', icon: Youtube },
            { id: 'playlist', label: 'Playlist', icon: ListVideo },
            { id: 'profile', label: 'Perfil Social', icon: User },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSourceType(type.id as BatchSourceType)}
              className={`
                flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all
                ${sourceType === type.id 
                  ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                  : 'border-accent bg-card text-muted hover:border-muted hover:bg-accent/50'}
              `}
            >
              <type.icon className="w-6 h-6 mb-2" />
              <span className="font-medium text-sm">{type.label}</span>
            </button>
          ))}
        </div>

        <Card className="p-6 md:p-8 border-primary/20">
          {/* URLs Input */}
          {sourceType === 'urls' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Colar URLs</h2>
              <p className="text-sm text-muted">Cole um link por linha (YouTube, TikTok, Instagram Reels).</p>
              
              <textarea
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                placeholder="https://youtube.com/watch?v=...\nhttps://tiktok.com/@user/video/..."
                className="w-full h-64 bg-background border border-accent rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-primary resize-none"
              />
              
              <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-muted">
                   {urls.split('\n').filter(u => u.trim().length > 0).length} links detectados
                </div>
                <div className="flex gap-3">
                   <Button variant="outline">Validar Links</Button>
                   <Button 
                     onClick={handleStartDownload} 
                     isLoading={loading}
                     disabled={!urls.trim()}
                   >
                     Baixar Todos
                   </Button>
                </div>
              </div>
            </div>
          )}

          {/* Channel Input */}
          {sourceType === 'channel' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Configuração do Canal</h2>
                <label className="block text-sm font-medium text-muted mb-2">URL do Canal</label>
                <input
                  type="text"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  placeholder="https://youtube.com/@nomedocanal"
                  className="w-full bg-background border border-accent rounded-lg p-3 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Máximo de vídeos</label>
                  <select 
                    value={maxVideos}
                    onChange={(e) => setMaxVideos(e.target.value)}
                    className="w-full bg-background border border-accent rounded-lg p-3 focus:outline-none focus:border-primary"
                  >
                    <option value="5">5 vídeos</option>
                    <option value="10">10 vídeos</option>
                    <option value="20">20 vídeos</option>
                    <option value="50">50 vídeos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Ordenar por</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-background border border-accent rounded-lg p-3 focus:outline-none focus:border-primary"
                  >
                    <option value="recent">Mais recentes</option>
                    <option value="popular">Mais populares</option>
                    <option value="oldest">Mais antigos</option>
                  </select>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex gap-3 items-start">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted">
                  <span className="text-primary font-semibold">Nota:</span> Você tem <strong>{MOCK_USER.credits}</strong> créditos. 
                  Este download utilizará até <strong>{maxVideos}</strong> créditos.
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleStartDownload}
                isLoading={loading}
                disabled={!channelUrl.trim()}
              >
                📥 Baixar {maxVideos} Vídeos do Canal
              </Button>
            </div>
          )}

          {/* Playlist Input */}
          {sourceType === 'playlist' && (
             <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Configuração da Playlist</h2>
                <label className="block text-sm font-medium text-muted mb-2">URL da Playlist</label>
                <input
                  type="text"
                  value={playlistUrl}
                  onChange={(e) => setPlaylistUrl(e.target.value)}
                  placeholder="https://youtube.com/playlist?list=..."
                  className="w-full bg-background border border-accent rounded-lg p-3 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">Máximo de vídeos</label>
                 <select 
                    value={maxVideos}
                    onChange={(e) => setMaxVideos(e.target.value)}
                    className="w-full bg-background border border-accent rounded-lg p-3 focus:outline-none focus:border-primary"
                  >
                    <option value="10">10 vídeos</option>
                    <option value="20">20 vídeos</option>
                    <option value="50">50 vídeos</option>
                    <option value="100">100 vídeos</option>
                  </select>
              </div>

              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleStartDownload}
                isLoading={loading}
                disabled={!playlistUrl.trim()}
              >
                📥 Baixar Playlist Completa
              </Button>
            </div>
          )}

           {/* Profile Input */}
           {sourceType === 'profile' && (
             <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Download de Perfil</h2>
              
              <div>
                <label className="block text-sm font-medium text-muted mb-2">Plataforma</label>
                <div className="flex gap-4">
                   <button 
                     onClick={() => setPlatform('instagram')}
                     className={`flex-1 p-3 border rounded-lg text-center transition-colors ${platform === 'instagram' ? 'bg-primary/20 border-primary text-white' : 'border-accent text-muted'}`}
                   >
                     Instagram
                   </button>
                   <button 
                     onClick={() => setPlatform('tiktok')}
                     className={`flex-1 p-3 border rounded-lg text-center transition-colors ${platform === 'tiktok' ? 'bg-primary/20 border-primary text-white' : 'border-accent text-muted'}`}
                   >
                     TikTok
                   </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">Nome de Usuário (@)</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="w-full bg-background border border-accent rounded-lg p-3 focus:outline-none focus:border-primary"
                />
              </div>
              
               <div>
                <label className="block text-sm font-medium text-muted mb-2">Máximo de posts</label>
                 <select 
                    value={maxVideos}
                    onChange={(e) => setMaxVideos(e.target.value)}
                    className="w-full bg-background border border-accent rounded-lg p-3 focus:outline-none focus:border-primary"
                  >
                    <option value="5">5 posts recentes</option>
                    <option value="15">15 posts recentes</option>
                    <option value="30">30 posts recentes</option>
                  </select>
              </div>

              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleStartDownload}
                isLoading={loading}
                disabled={!username.trim()}
              >
                📥 Baixar Vídeos do Perfil
              </Button>
            </div>
          )}

        </Card>
      </div>
    </Layout>
  );
};

export default BatchDownload;