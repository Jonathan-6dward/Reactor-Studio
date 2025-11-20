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

export type BatchSourceType = 'urls' | 'channel' | 'playlist' | 'profile';
export type BatchStatus = 'pending' | 'downloading' | 'completed' | 'failed';

export interface BatchDownloadItem {
  id: string;
  sourceType: BatchSourceType;
  status: BatchStatus;
  totalVideos: number;
  downloadedCount: number;
  failedCount: number;
  createdAt: string;
  sourceData: any; // Stores specific config (channelUrl, username, etc)
}

export interface DownloadedVideo {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  url: string;
}

// New types for the public funnel
export type PlatformType = 'youtube' | 'tiktok' | 'instagram' | 'upload';

export interface PendingVideoData {
  url?: string;
  videoId?: string;
  platform: PlatformType;
  timestamp: number;
  // Hydrated data after fetch
  title?: string;
  thumbnailUrl?: string;
  duration?: number; // seconds
  resolution?: string;
}
