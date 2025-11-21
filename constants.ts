
import { Avatar, VideoProject, VideoStatus, BatchDownloadItem, DownloadedVideo } from './types';

export const MOCK_USER = {
  name: "Alex Creator",
  email: "alex@exemplo.com",
  credits: 8,
  avatarUrl: "https://picsum.photos/seed/user/100/100"
};

export const PRESET_AVATARS: Avatar[] = [
  { id: '1', name: 'Cyber Neon', previewUrl: 'https://picsum.photos/seed/avatar1/200/200', type: 'preset' },
  { id: '2', name: 'Executivo', previewUrl: 'https://picsum.photos/seed/avatar2/200/200', type: 'preset' },
  { id: '3', name: 'Gamer Casual', previewUrl: 'https://picsum.photos/seed/avatar3/200/200', type: 'preset' },
  { id: '4', name: 'Estilo Anime', previewUrl: 'https://picsum.photos/seed/avatar4/200/200', type: 'preset' },
  { id: '5', name: 'Minimalista', previewUrl: 'https://picsum.photos/seed/avatar5/200/200', type: 'preset' },
  { id: '6', name: 'Cartoon 3D', previewUrl: 'https://picsum.photos/seed/avatar6/200/200', type: 'preset' },
];

export const MOCK_PROJECTS: VideoProject[] = [
  {
    id: 'vid_1',
    title: 'Reação Gato Engraçado',
    thumbnailUrl: 'https://picsum.photos/seed/vid1/300/169',
    status: VideoStatus.COMPLETED,
    createdAt: '24/10/2023',
    duration: '0:45',
    fileSize: '12MB'
  },
  {
    id: 'vid_2',
    title: 'Review Tech: iPhone 15',
    thumbnailUrl: 'https://picsum.photos/seed/vid2/300/169',
    status: VideoStatus.COMPLETED,
    createdAt: '22/10/2023',
    duration: '1:20',
    fileSize: '28MB'
  },
  {
    id: 'vid_3',
    title: 'Compilado Fails Gamer',
    thumbnailUrl: 'https://picsum.photos/seed/vid3/300/169',
    status: VideoStatus.FAILED,
    createdAt: '20/10/2023',
    duration: '0:00'
  }
];

export const PROCESSING_STEPS = [
  "📹 Analisando conteúdo do vídeo...",
  "🎤 Gerando comentários com voz IA...",
  "✨ Animando lipsync do avatar...",
  "🎬 Compondo renderização final...",
  "✅ Finalizando..."
];

export const MOCK_BATCH_HISTORY: BatchDownloadItem[] = [
  {
    id: 'batch_1',
    userId: 'user_1',
    sourceType: 'channel',
    status: 'completed',
    totalVideos: 10,
    downloadedCount: 9,
    failedCount: 1,
    createdAt: '24/10/2023 14:30',
    sourceData: { channelUrl: 'youtube.com/@techchannel' }
  },
  {
    id: 'batch_2',
    userId: 'user_1',
    sourceType: 'urls',
    status: 'completed',
    totalVideos: 5,
    downloadedCount: 5,
    failedCount: 0,
    createdAt: '23/10/2023 09:15',
    sourceData: { urls: ['...'] }
  },
  {
    id: 'batch_3',
    userId: 'user_1',
    sourceType: 'playlist',
    status: 'failed',
    totalVideos: 50,
    downloadedCount: 12,
    failedCount: 38,
    createdAt: '20/10/2023 18:00',
    sourceData: { playlistUrl: '...' }
  }
];

export const MOCK_DOWNLOADED_VIDEOS: DownloadedVideo[] = [
  { videoId: 'v1', title: 'Tech Review 2024', duration: '10:20', thumbnailUrl: 'https://picsum.photos/seed/v1/120/68', url: '#' , platform: 'youtube' },
  { videoId: 'v2', title: 'Unboxing Novo Gadget', duration: '05:15', thumbnailUrl: 'https://picsum.photos/seed/v2/120/68', url: '#', platform: 'youtube' },
  { videoId: 'v3', title: 'Setup Tour 2023', duration: '15:00', thumbnailUrl: 'https://picsum.photos/seed/v3/120/68', url: '#', platform: 'youtube' },
  { videoId: 'v4', title: 'Dicas de Produtividade', duration: '08:45', thumbnailUrl: 'https://picsum.photos/seed/v4/120/68', url: '#', platform: 'youtube' },
  { videoId: 'v5', title: 'Vlog Semanal #40', duration: '12:30', thumbnailUrl: 'https://picsum.photos/seed/v5/120/68', url: '#', platform: 'youtube' },
];

export const USER_STATS = {
  totalReactions: 45,
  totalDownloaded: 128
};
