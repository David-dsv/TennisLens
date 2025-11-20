
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
}
