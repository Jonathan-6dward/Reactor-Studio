import { Avatar, VideoProject, VideoStatus } from './types';

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