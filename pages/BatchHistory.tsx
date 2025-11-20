import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Youtube, Link as LinkIcon, ListVideo, User, Download } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MOCK_BATCH_HISTORY } from '../constants';
import { BatchSourceType, BatchStatus } from '../types';

const BatchHistory: React.FC = () => {
  const getIcon = (type: BatchSourceType) => {
    switch (type) {
      case 'urls': return <LinkIcon className="w-4 h-4" />;
      case 'channel': return <Youtube className="w-4 h-4" />;
      case 'playlist': return <ListVideo className="w-4 h-4" />;
      case 'profile': return <User className="w-4 h-4" />;
      default: return <LinkIcon className="w-4 h-4" />;
    }
  };

  const getLabel = (type: BatchSourceType) => {
    switch (type) {
      case 'urls': return 'Links Diretos';
      case 'channel': return 'Canal';
      case 'playlist': return 'Playlist';
      case 'profile': return 'Perfil';
      default: return 'Desconhecido';
    }
  };

  const getStatusColor = (status: BatchStatus) => {
      switch(status) {
          case 'completed': return 'bg-success/10 text-success border-success/20';
          case 'failed': return 'bg-error/10 text-error border-error/20';
          case 'downloading': return 'bg-primary/10 text-primary border-primary/20';
          default: return 'bg-muted/10 text-muted border-muted/20';
      }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                 <Link to="/batch-download">
                    <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4"/>}>Voltar</Button>
                 </Link>
                 <h1 className="text-2xl font-bold">Histórico de Downloads</h1>
            </div>
        </div>

        <div className="grid gap-4">
          {MOCK_BATCH_HISTORY.map((item) => (
            <Card key={item.id} className="p-0 overflow-hidden hover:border-primary/30 transition-colors">
              <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
                <div className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-muted">
                      {getIcon(item.sourceType)}
                   </div>
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-base">{getLabel(item.sourceType)}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase font-bold tracking-wider ${getStatusColor(item.status)}`}>
                            {item.status === 'completed' ? 'Concluído' : item.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted mb-1">
                        {item.sourceType === 'channel' ? item.sourceData.channelUrl : 
                         item.sourceType === 'playlist' ? item.sourceData.playlistUrl : 
                         `${item.totalVideos} itens processados`}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted">
                         <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {item.createdAt}</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-6 pl-14 md:pl-0">
                    <div className="text-center">
                        <p className="text-xs text-muted uppercase font-medium">Vídeos</p>
                        <p className="font-bold text-lg">{item.totalVideos}</p>
                    </div>
                     <div className="text-center">
                        <p className="text-xs text-muted uppercase font-medium">Sucesso</p>
                        <p className="font-bold text-lg text-success">{item.downloadedCount}</p>
                    </div>
                     <div className="text-center">
                        <p className="text-xs text-muted uppercase font-medium">Falhas</p>
                        <p className={`font-bold text-lg ${item.failedCount > 0 ? 'text-error' : 'text-muted'}`}>{item.failedCount}</p>
                    </div>
                    
                    <div className="hidden md:block h-8 w-px bg-accent mx-2"></div>
                    
                    <div className="flex gap-2">
                        <Link to={`/batch-download/${item.id}`}>
                             <Button size="sm" variant="outline">Detalhes</Button>
                        </Link>
                        {item.status === 'completed' && (
                             <Button size="sm" icon={<Download className="w-3 h-3"/>}>Baixar</Button>
                        )}
                    </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BatchHistory;