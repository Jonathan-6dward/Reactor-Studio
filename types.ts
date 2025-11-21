
export enum VideoStatus {
  QUEUED = 'queued',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export type PlatformType = 'youtube' | 'tiktok' | 'instagram' | 'upload';

export interface VideoProject {
  id: string;
  title: string;
  thumbnailUrl: string;
  status: VideoStatus;
  createdAt: string;
  duration: string;
  fileSize?: string;
}

// Mirrors Prisma 'User' model
export interface User {
  id: string;
  clerkId?: string;
  name: string;
  email: string;
  imageUrl: string;
  creditsLeft: number;
  isPro: boolean;
}

// Mirrors Prisma 'Reaction' model
export interface Reaction {
  id: string;
  userId: string;
  
  // Input
  originalVideoUrl: string;
  videoSource: PlatformType;
  videoTitle: string;
  videoDuration: number; // seconds
  
  // Config
  avatarId: string;
  style: 'quick' | 'detailed' | 'comedy';
  voice: 'male_deep' | 'female' | 'neutral' | 'male_mid';
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  size: number;

  // State
  status: VideoStatus;
  progress: number; // 0-100
  currentStep?: string;
  errorMessage?: string;

  // Output
  finalVideoUrl?: string;
  thumbnailUrl?: string;
  
  createdAt: string;
}

export interface ReactionConfig {
  videoFile: File | null;
  avatarId: string;
  style: 'quick' | 'analysis' | 'comedy';
  voice: 'female' | 'male_deep' | 'male_mid' | 'neutral';
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  size: number;
}

// Mirrors Prisma 'BatchDownload' model
export type BatchSourceType = 'urls' | 'channel' | 'playlist' | 'profile';
export type BatchStatus = 'pending' | 'downloading' | 'completed' | 'failed';

export interface DownloadedVideo {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  url: string;
  platform: string;
}

export interface BatchDownloadItem {
  id: string;
  userId: string;
  sourceType: BatchSourceType;
  status: BatchStatus;
  totalVideos: number;
  downloadedCount: number;
  failedCount: number;
  createdAt: string;
  sourceData: any;
  downloadedVideos?: DownloadedVideo[]; // JSON field in DB
}

export interface Avatar {
  id: string;
  name: string;
  previewUrl: string;
  type: 'preset' | 'custom';
}

// API Payloads
export interface CreateReactionRequest {
  videoId: string; // ID from the analyze step
  avatarId: string;
  style: string;
  voice: string;
  position: string;
  size: number;
}

export interface VideoAnalysisResult {
  videoId: string; // temp ID or R2 key
  url: string;
  title: string;
  thumbnailUrl: string;
  duration: number;
  platform: PlatformType;
  resolution?: string;
}

export type PendingVideoData = VideoAnalysisResult;
