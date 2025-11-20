import React from 'react';
import { CheckCircle2, Clock, Monitor, Youtube, Music, Instagram, FileVideo } from 'lucide-react';
import { Card } from '../ui/Card';
import { PendingVideoData } from '../../types';

interface VideoPreviewCardProps {
  data: PendingVideoData;
}

export const VideoPreviewCard: React.FC<VideoPreviewCardProps> = ({ data }) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPlatformIcon = () => {
      switch(data.platform) {
          case 'youtube': return <Youtube className="w-5 h-5 text-red-500" />;
          case 'tiktok': return <Music className="w-5 h-5 text-cyan-400" />;
          case 'instagram': return <Instagram className="w-5 h-5 text-pink-500" />;
          default: return <FileVideo className="w-5 h-5 text-primary" />;
      }
  };

  return (
    <div className="grid md:grid-cols-[2fr_1fr] gap-6">
      {/* Video Player Mockup */}
      <Card className="p-0 overflow-hidden bg-black/40 border-accent">
        <div className="relative aspect-video bg-muted/10 group cursor-pointer">
          <img
            src={data.thumbnailUrl || "https://picsum.photos/seed/video/800/450"}
            alt={data.title}
            className="w-full h-full object-cover opacity-80 transition-opacity group-hover:opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 shadow-2xl shadow-primary/20">
              <div className="ml-1 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent"></div>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-mono">
              {formatDuration(data.duration || 0)}
          </div>
        </div>
      </Card>

      {/* Video Info */}
      <Card className="p-6 h-full flex flex-col justify-between">
        <div>
            <div className="flex items-start gap-3 mb-6">
                <div className="mt-1 p-2 bg-accent/50 rounded-lg">
                    {getPlatformIcon()}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold line-clamp-2 text-lg leading-tight mb-1">{data.title}</h3>
                    <p className="text-xs text-muted capitalize">{data.platform} Video</p>
                </div>
            </div>

            <div className="space-y-4">
                <InfoRow
                icon={<Clock className="w-4 h-4" />}
                label="Duração"
                value={formatDuration(data.duration || 0)}
                />
                <InfoRow
                icon={<Monitor className="w-4 h-4" />}
                label="Resolução"
                value={data.resolution || 'N/A'}
                />
            </div>
        </div>

        <div className="pt-4 border-t border-accent mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm border border-success/20">
            <CheckCircle2 className="w-4 h-4" />
            Vídeo validado com sucesso
          </div>
        </div>
      </Card>
    </div>
  );
};

function InfoRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="text-muted">{icon}</div>
      <div className="flex-1 flex justify-between">
        <span className="text-muted">{label}</span>
        <span className="font-medium text-white">{value}</span>
      </div>
    </div>
  );
}
