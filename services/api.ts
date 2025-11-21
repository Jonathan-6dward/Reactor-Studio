
import { 
  Reaction, 
  BatchDownloadItem, 
  VideoAnalysisResult, 
  VideoStatus, 
  User, 
  BatchStatus,
  CreateReactionRequest,
  DownloadedVideo
} from '../types';
import { MOCK_USER, PRESET_AVATARS } from '../constants';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated "Database" in LocalStorage keys
const DB_KEYS = {
  REACTIONS: 'db_reactions',
  BATCHES: 'db_batches',
  UPLOADS: 'db_uploads', // Temporary storage for analyzed videos
  USER: 'db_user'
};

class MockBackendService {
  
  constructor() {
    // Initialize Mock User if not exists
    if (!localStorage.getItem(DB_KEYS.USER)) {
      localStorage.setItem(DB_KEYS.USER, JSON.stringify({
        id: 'user_123',
        ...MOCK_USER,
        creditsLeft: 10,
        isPro: false
      }));
    }
  }

  private getUser(): User {
    return JSON.parse(localStorage.getItem(DB_KEYS.USER) || '{}');
  }

  private saveUser(user: User) {
    localStorage.setItem(DB_KEYS.USER, JSON.stringify(user));
  }

  // ════════════════════════════════════════════════════════════
  // VIDEO ANALYSIS / UPLOAD (Simulates /api/upload & /api/download-video)
  // ════════════════════════════════════════════════════════════

  async analyzeVideo(url: string): Promise<VideoAnalysisResult> {
    await delay(1500); // Simulate yt-dlp processing time

    // Mock logic to detect platform
    let platform: any = 'upload';
    if (url.includes('youtube')) platform = 'youtube';
    else if (url.includes('tiktok')) platform = 'tiktok';
    else if (url.includes('instagram')) platform = 'instagram';

    const mockData: VideoAnalysisResult = {
      videoId: `vid_${Date.now()}`,
      url,
      title: platform === 'youtube' ? 'Vídeo Incrível do YouTube (Mock)' : 'Viral Video Analysis',
      thumbnailUrl: `https://picsum.photos/seed/${Date.now()}/800/450`,
      duration: 45, // seconds
      platform,
      resolution: '1080p'
    };

    // Save to "Temp DB"
    this.saveTempVideo(mockData);
    return mockData;
  }

  async uploadVideo(file: File): Promise<VideoAnalysisResult> {
    await delay(2000); // Simulate upload to R2

    const mockData: VideoAnalysisResult = {
      videoId: `upload_${Date.now()}`,
      url: URL.createObjectURL(file), // In real app this would be R2 public URL
      title: file.name,
      thumbnailUrl: `https://picsum.photos/seed/${file.name}/800/450`,
      duration: 30,
      platform: 'upload',
      resolution: 'Original'
    };

    this.saveTempVideo(mockData);
    return mockData;
  }

  private saveTempVideo(data: VideoAnalysisResult) {
    const uploads = JSON.parse(localStorage.getItem(DB_KEYS.UPLOADS) || '{}');
    uploads[data.videoId] = data;
    localStorage.setItem(DB_KEYS.UPLOADS, JSON.stringify(uploads));
  }

  async getVideo(videoId: string): Promise<VideoAnalysisResult | null> {
    const uploads = JSON.parse(localStorage.getItem(DB_KEYS.UPLOADS) || '{}');
    return uploads[videoId] || null;
  }

  // ════════════════════════════════════════════════════════════
  // REACTIONS (Simulates /api/reaction/*)
  // ════════════════════════════════════════════════════════════

  async createReaction(req: CreateReactionRequest): Promise<Reaction> {
    await delay(800);
    
    const videoData = await this.getVideo(req.videoId);
    if (!videoData) throw new Error("Video not found");

    const user = this.getUser();
    if (user.creditsLeft <= 0) throw new Error("Insufficient credits");

    // Deduct credit
    user.creditsLeft -= 1;
    this.saveUser(user);

    const newReaction: Reaction = {
      id: `react_${Date.now()}`,
      userId: user.id,
      originalVideoUrl: videoData.url,
      videoSource: videoData.platform,
      videoTitle: videoData.title,
      videoDuration: videoData.duration,
      
      avatarId: req.avatarId,
      style: req.style as any,
      voice: req.voice as any,
      position: req.position as any,
      size: req.size,

      status: VideoStatus.QUEUED,
      progress: 0,
      currentStep: "Na fila de processamento...",
      createdAt: new Date().toISOString()
    };

    const reactions = this.getAllReactions();
    reactions.push(newReaction);
    this.saveReactions(reactions);

    return newReaction;
  }

  async getReaction(id: string): Promise<Reaction | null> {
    // Here we SIMULATE the backend worker (BullMQ) processing the job
    // checking the time elapsed since creation to update status
    
    const reactions = this.getAllReactions();
    const index = reactions.findIndex(r => r.id === id);
    if (index === -1) return null;

    let reaction = reactions[index];
    
    // Simulation Logic: Update status based on time elapsed
    const now = Date.now();
    const created = new Date(reaction.createdAt).getTime();
    const elapsed = (now - created) / 1000; // seconds

    let changed = false;

    if (reaction.status === VideoStatus.QUEUED && elapsed > 2) {
      reaction.status = VideoStatus.PROCESSING;
      reaction.currentStep = "📹 Analisando vídeo e roteiro...";
      reaction.progress = 10;
      changed = true;
    } else if (reaction.status === VideoStatus.PROCESSING) {
       if (elapsed > 15) {
         reaction.status = VideoStatus.COMPLETED;
         reaction.progress = 100;
         reaction.currentStep = "✅ Finalizado!";
         reaction.finalVideoUrl = "https://picsum.photos/seed/video_final/800/450"; // Mock result
         reaction.thumbnailUrl = "https://picsum.photos/seed/thumb_final/800/450";
         changed = true;
       } else if (elapsed > 12) {
         reaction.progress = 90;
         reaction.currentStep = "🎬 Renderizando vídeo final...";
         changed = true;
       } else if (elapsed > 8) {
         reaction.progress = 60;
         reaction.currentStep = "✨ Animando avatar (Lip-sync)...";
         changed = true;
       } else if (elapsed > 5) {
         reaction.progress = 30;
         reaction.currentStep = "🎤 Gerando voz neural...";
         changed = true;
       }
    }

    if (changed) {
      reactions[index] = reaction;
      this.saveReactions(reactions);
    }

    return reaction;
  }

  private getAllReactions(): Reaction[] {
    return JSON.parse(localStorage.getItem(DB_KEYS.REACTIONS) || '[]');
  }

  private saveReactions(reactions: Reaction[]) {
    localStorage.setItem(DB_KEYS.REACTIONS, JSON.stringify(reactions));
  }

  // ════════════════════════════════════════════════════════════
  // BATCH DOWNLOADS (Simulates /api/batch/*)
  // ════════════════════════════════════════════════════════════

  async createBatch(sourceType: string, config: any): Promise<BatchDownloadItem> {
    await delay(1000);
    
    const user = this.getUser();
    
    const newBatch: BatchDownloadItem = {
      id: `batch_${Date.now()}`,
      userId: user.id,
      sourceType: sourceType as any,
      status: 'pending',
      totalVideos: 0, // Will be updated by "worker"
      downloadedCount: 0,
      failedCount: 0,
      createdAt: new Date().toISOString(),
      sourceData: config,
      downloadedVideos: []
    };

    const batches = this.getAllBatches();
    batches.push(newBatch);
    this.saveBatches(batches);

    return newBatch;
  }

  async getBatch(id: string): Promise<BatchDownloadItem | null> {
    const batches = this.getAllBatches();
    const index = batches.findIndex(b => b.id === id);
    if (index === -1) return null;

    let batch = batches[index];
    
    // Simulation Logic
    const now = Date.now();
    const created = new Date(batch.createdAt).getTime();
    const elapsed = (now - created) / 1000;

    let changed = false;

    if (batch.status === 'pending' && elapsed > 2) {
      batch.status = 'downloading';
      // Mock discovery of videos
      batch.totalVideos = batch.sourceType === 'channel' ? 12 : 5;
      changed = true;
    } else if (batch.status === 'downloading') {
       // Simulate finding 1 video every 2 seconds
       const estimatedTotalVideos = batch.totalVideos || 5;
       const videosToHave = Math.min(Math.floor((elapsed - 2) / 2), estimatedTotalVideos);
       
       if (videosToHave > batch.downloadedCount) {
         // Add new mock video
         const newVidId = batch.downloadedCount + 1;
         const mockVid: DownloadedVideo = {
            videoId: `v_${newVidId}`,
            title: `Vídeo Baixado #${newVidId}`,
            duration: '2:30',
            thumbnailUrl: `https://picsum.photos/seed/b_${id}_${newVidId}/200/112`,
            url: '#',
            platform: 'youtube'
         };
         
         if (!batch.downloadedVideos) batch.downloadedVideos = [];
         batch.downloadedVideos.push(mockVid);
         batch.downloadedCount = batch.downloadedVideos.length;
         changed = true;
       }

       if (batch.downloadedCount >= estimatedTotalVideos) {
         batch.status = 'completed';
         changed = true;
       }
    }

    if (changed) {
      batches[index] = batch;
      this.saveBatches(batches);
    }

    return batch;
  }

  private getAllBatches(): BatchDownloadItem[] {
    return JSON.parse(localStorage.getItem(DB_KEYS.BATCHES) || '[]');
  }

  private saveBatches(batches: BatchDownloadItem[]) {
    localStorage.setItem(DB_KEYS.BATCHES, JSON.stringify(batches));
  }
}

export const api = new MockBackendService();
