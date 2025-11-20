import { Avatar, VideoProject, VideoStatus } from './types';

export const MOCK_USER = {
  name: "Alex Creator",
  email: "alex@example.com",
  credits: 8,
  avatarUrl: "https://picsum.photos/seed/user/100/100"
};

export const PRESET_AVATARS: Avatar[] = [
  { id: '1', name: 'Neon Cyber', previewUrl: 'https://picsum.photos/seed/avatar1/200/200', type: 'preset' },
  { id: '2', name: 'Business Pro', previewUrl: 'https://picsum.photos/seed/avatar2/200/200', type: 'preset' },
  { id: '3', name: 'Casual Gamer', previewUrl: 'https://picsum.photos/seed/avatar3/200/200', type: 'preset' },
  { id: '4', name: 'Anime Style', previewUrl: 'https://picsum.photos/seed/avatar4/200/200', type: 'preset' },
  { id: '5', name: 'Minimalist', previewUrl: 'https://picsum.photos/seed/avatar5/200/200', type: 'preset' },
  { id: '6', name: '3D Toon', previewUrl: 'https://picsum.photos/seed/avatar6/200/200', type: 'preset' },
];

export const MOCK_PROJECTS: VideoProject[] = [
  {
    id: 'vid_1',
    title: 'Funny Cat Reaction',
    thumbnailUrl: 'https://picsum.photos/seed/vid1/300/169',
    status: VideoStatus.COMPLETED,
    createdAt: '2023-10-24',
    duration: '0:45',
    fileSize: '12MB'
  },
  {
    id: 'vid_2',
    title: 'Tech Review: iPhone 15',
    thumbnailUrl: 'https://picsum.photos/seed/vid2/300/169',
    status: VideoStatus.COMPLETED,
    createdAt: '2023-10-22',
    duration: '1:20',
    fileSize: '28MB'
  },
  {
    id: 'vid_3',
    title: 'Gaming Fails Compilation',
    thumbnailUrl: 'https://picsum.photos/seed/vid3/300/169',
    status: VideoStatus.FAILED,
    createdAt: '2023-10-20',
    duration: '0:00'
  }
];

export const PROCESSING_STEPS = [
  "📹 Analyzing video content...",
  "🎤 Generating AI voice commentary...",
  "✨ Animating avatar lipsync...",
  "🎬 Composing final render...",
  "✅ Finalizing..."
];