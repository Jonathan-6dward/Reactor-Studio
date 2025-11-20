import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Play, Clock, Trash2, Download, Video, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MOCK_PROJECTS, USER_STATS } from '../constants';
import { VideoStatus } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-muted">Bem-vindo de volta, Alex.</p>
        </div>
        
        <div className="flex gap-3">
          <Link to="/batch-download">
             <Button variant="outline" icon={<Download className="w-4 h-4" />}>
               Download em Massa
             </Button>
          </Link>
          <Link to="/create">
            <Button icon={<Plus className="w-5 h-5" />} className="shadow-xl shadow-primary/20">
              Criar Nova Reação
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Card className="p-4 flex items-center gap-4 bg-card/50">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold">{USER_STATS.totalReactions}</p>
            <p className="text-xs text-muted font-medium uppercase tracking-wider">Vídeos Criados</p>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center gap-4 bg-card/50">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold">{USER_STATS.totalDownloaded}</p>
            <p className="text-xs text-muted font-medium uppercase tracking-wider">Vídeos Baixados</p>
          </div>
        </Card>

         <Card className="p-4 flex items-center gap-4 bg-card/50">
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold">Pro</p>
            <p className="text-xs text-muted font-medium uppercase tracking-wider">Plano Atual</p>
          </div>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">Projetos Recentes</h2>

      {MOCK_PROJECTS.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-accent rounded-3xl bg-card/30">
          <div className="w-20 h-20 bg-accent/50 rounded-full flex items-center justify-center mb-6">
            <Play className="w-10 h-10 text-muted" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Nenhum vídeo ainda</h3>
          <p className="text-muted max-w-md mb-8">Crie seu primeiro vídeo de reação com IA. Leva menos de 2 minutos!</p>
          <Link to="/create">
             <Button>Começar Agora</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group relative flex flex-col h-full" hover>
                {/* Thumbnail */}
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <img 
                    src={project.thumbnailUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                     {project.status === VideoStatus.COMPLETED && (
                       <Button size="sm" variant="primary" icon={<Play className="w-4 h-4"/>} onClick={() => navigate(`/result/${project.id}`)}>
                         Ver Vídeo
                       </Button>
                     )}
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge status={project.status} />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded text-white font-mono">
                    {project.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-white mb-1 truncate">{project.title}</h3>
                  <div className="flex items-center text-xs text-muted gap-3 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {project.createdAt}
                    </span>
                    {project.fileSize && <span>{project.fileSize}</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-accent">
                   <button 
                    className="text-muted hover:text-primary transition-colors p-1"
                    title="Baixar"
                   >
                     <Download className="w-4 h-4" />
                   </button>
                   <button 
                    className="text-muted hover:text-error transition-colors p-1"
                    title="Excluir"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;