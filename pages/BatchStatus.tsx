import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, ArrowLeft, Download, RefreshCcw } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { MOCK_DOWNLOADED_VIDEOS } from '../constants';
import { DownloadedVideo } from '../types';

const BatchStatus: React.FC = () => {
  const { id } = useParams();
  const [progress, setProgress] = useState(0);
  const [downloadedVideos, setDownloadedVideos] = useState<DownloadedVideo[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Simulate batch processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          return 100;
        }
        return prev + 5;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate finding new videos as progress increases
    if (progress > 0 && progress % 20 === 0 && downloadedVideos.length < MOCK_DOWNLOADED_VIDEOS.length) {
        setDownloadedVideos(prev => [...prev, MOCK_DOWNLOADED_VIDEOS[prev.length]]);
    }
  }, [progress]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to="/batch-download" className="flex items-center text-muted hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Downloads
        </Link>

        <Card className="p-8 mb-8 border-primary/20 bg-card/80 backdrop-blur">
          <div className="text-center mb-8">
             <h1 className="text-2xl font-bold mb-2">
                {isCompleted ? 'Download Concluído!' : 'Processando Download em Massa...'}
             </h1>
             <p className="text-muted">
                {isCompleted 
                    ? `${downloadedVideos.length} vídeos baixados com sucesso.` 
                    : `Baixando vídeos do canal... ${downloadedVideos.length} concluídos.`}
             </p>
          </div>

          <ProgressBar progress={progress} className="mb-6" />

          {isCompleted && (
             <div className="flex justify-center gap-4">
                <Button variant="primary" icon={<Download className="w-4 h-4"/>}>Baixar Todos (.zip)</Button>
                <Button variant="outline" icon={<RefreshCcw className="w-4 h-4"/>}>Novo Download</Button>
             </div>
          )}
        </Card>

        {downloadedVideos.length > 0 && (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    Vídeos Processados <span className="bg-accent px-2 py-0.5 rounded-full text-xs">{downloadedVideos.length}</span>
                </h3>
                
                <div className="grid gap-3">
                    {downloadedVideos.map((video, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-card border border-accent rounded-lg hover:border-primary/30 transition-colors group">
                            <div className="w-32 aspect-video bg-black rounded overflow-hidden relative flex-shrink-0">
                                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                                <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1 rounded text-white">
                                    {video.duration}
                                </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate text-sm mb-1">{video.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-success">
                                    <CheckCircle className="w-3 h-3" /> Sucesso
                                </div>
                            </div>

                            <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Download className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        )}
        
        {!isCompleted && (
            <div className="mt-8 p-4 border border-accent rounded-lg bg-accent/5 flex items-center justify-center text-muted text-sm animate-pulse">
                Aguardando próximos vídeos...
            </div>
        )}
      </div>
    </Layout>
  );
};

export default BatchStatus;