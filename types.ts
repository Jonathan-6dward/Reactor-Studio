export enum VideoStatus {
  QUEUED = 'queued',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface VideoProject {
  id: string;
  title: string;
  thumbnailUrl: string;
  status: VideoStatus;
  createdAt: string;
  duration: string;
  fileSize?: string;
}

export interface Avatar {
  id: string;
  name: string;
  previewUrl: string;
  type: 'preset' | 'custom';
}

export interface ReactionConfig {
  videoFile: File | null;
  videoUrl?: string; // For display/mock
  avatarId: string;
  style: 'quick' | 'analysis' | 'comedy';
  voice: 'male_deep' | 'male_mid' | 'female' | 'neutral';
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  size: number;
}

export interface User {
  name: string;
  email: string;
  credits: number;
  avatarUrl: string;
}