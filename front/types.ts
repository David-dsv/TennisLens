
export enum AppState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE'
}

export type AppView = 'ANALYSIS' | 'HISTORY' | 'TRAINING';

export interface ActionStat {
  name: string;
  count: number;
  color: string;
  [key: string]: string | number;
}

export interface ProcessingLog {
  id: number;
  timestamp: string;
  level: 'INFO' | 'WARNING' | 'SUCCESS';
  message: string;
}

export interface VideoMeta {
  name: string;
  size: string;
  duration: string;
  durationSeconds?: number;
  startTime?: string;
  endTime?: string;
  fileId?: string;
  jobId?: string;
}

export interface UploadResponse {
  success: boolean;
  file_id: string;
  original_name: string;
  size: number;
  duration: string;
  duration_seconds: number;
}

export interface JobStatus {
  job_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  current_phase: string;
  message: string;
  output_file?: string;
  error?: string;
}
