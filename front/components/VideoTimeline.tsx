import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Scissors, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoTimelineProps {
  videoFile: File;
  videoDuration: number; // in seconds
  onTimeRangeChange: (startTime: string, endTime: string) => void;
}

const VideoTimeline: React.FC<VideoTimelineProps> = ({ videoFile, videoDuration, onTimeRangeChange }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(Math.min(videoDuration, 30)); // Default 30s max
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>('');

  // Create object URL for video preview
  useEffect(() => {
    const url = URL.createObjectURL(videoFile);
    setVideoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  // Update end time when duration changes
  useEffect(() => {
    setEndTime(Math.min(videoDuration, 30));
  }, [videoDuration]);

  // Notify parent of time range changes
  useEffect(() => {
    onTimeRangeChange(formatTime(startTime), formatTime(endTime));
  }, [startTime, endTime, onTimeRangeChange]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Parse MM:SS to seconds
  const parseTime = (timeStr: string): number => {
    const parts = timeStr.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  };

  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      // Loop within selection
      if (videoRef.current.currentTime >= endTime) {
        videoRef.current.currentTime = startTime;
      }
    }
  };

  // Play/Pause toggle
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        if (videoRef.current.currentTime < startTime || videoRef.current.currentTime >= endTime) {
          videoRef.current.currentTime = startTime;
        }
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Calculate position percentage
  const getPositionPercent = (time: number): number => {
    return (time / videoDuration) * 100;
  };

  // Get time from position
  const getTimeFromPosition = (clientX: number): number => {
    if (!timelineRef.current) return 0;
    const rect = timelineRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return percent * videoDuration;
  };

  // Handle timeline click
  const handleTimelineClick = (e: React.MouseEvent) => {
    const time = getTimeFromPosition(e.clientX);
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(startTime, Math.min(endTime, time));
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle drag start
  const handleMouseDown = (type: 'start' | 'end') => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === 'start') {
      setIsDraggingStart(true);
    } else {
      setIsDraggingEnd(true);
    }
  };

  // Handle drag
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const time = getTimeFromPosition(e.clientX);

    if (isDraggingStart) {
      const newStart = Math.max(0, Math.min(time, endTime - 1));
      setStartTime(newStart);
      if (videoRef.current && currentTime < newStart) {
        videoRef.current.currentTime = newStart;
      }
    }

    if (isDraggingEnd) {
      const newEnd = Math.min(videoDuration, Math.max(time, startTime + 1));
      setEndTime(newEnd);
      if (videoRef.current && currentTime > newEnd) {
        videoRef.current.currentTime = newEnd;
      }
    }
  }, [isDraggingStart, isDraggingEnd, startTime, endTime, videoDuration, currentTime]);

  // Handle drag end
  const handleMouseUp = useCallback(() => {
    setIsDraggingStart(false);
    setIsDraggingEnd(false);
  }, []);

  // Add/remove global mouse listeners
  useEffect(() => {
    if (isDraggingStart || isDraggingEnd) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingStart, isDraggingEnd, handleMouseMove, handleMouseUp]);

  // Time input handlers
  const handleStartTimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{1,2}:\d{2}$/.test(value)) {
      const seconds = parseTime(value);
      if (seconds >= 0 && seconds < endTime && seconds < videoDuration) {
        setStartTime(seconds);
        if (videoRef.current) {
          videoRef.current.currentTime = seconds;
        }
      }
    }
  };

  const handleEndTimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{1,2}:\d{2}$/.test(value)) {
      const seconds = parseTime(value);
      if (seconds > startTime && seconds <= videoDuration) {
        setEndTime(seconds);
      }
    }
  };

  const selectionDuration = endTime - startTime;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
      {/* Video Preview */}
      <div className="relative bg-black aspect-video max-h-[300px]">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = startTime;
            }
          }}
        />

        {/* Play button overlay */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
        >
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            {isPlaying ? (
              <Pause className="w-6 h-6 text-slate-800" />
            ) : (
              <Play className="w-6 h-6 text-slate-800 ml-1" />
            )}
          </div>
        </button>

        {/* Current time display */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-mono">
          {formatTime(currentTime)}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900">Select Analysis Range</h3>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">
              Selection: <span className="font-bold text-indigo-600">{formatTime(selectionDuration)}</span>
            </span>
          </div>
        </div>

        {/* Timeline Bar */}
        <div
          ref={timelineRef}
          className="relative h-12 bg-slate-100 rounded-xl cursor-pointer select-none"
          onClick={handleTimelineClick}
        >
          {/* Selection range */}
          <div
            className="absolute top-0 bottom-0 bg-indigo-500/20 border-y-2 border-indigo-500"
            style={{
              left: `${getPositionPercent(startTime)}%`,
              width: `${getPositionPercent(endTime) - getPositionPercent(startTime)}%`,
            }}
          />

          {/* Start handle */}
          <div
            className={`absolute top-0 bottom-0 w-4 bg-indigo-600 rounded-l-lg cursor-ew-resize flex items-center justify-center hover:bg-indigo-700 transition-colors ${isDraggingStart ? 'bg-indigo-700' : ''}`}
            style={{ left: `calc(${getPositionPercent(startTime)}% - 8px)` }}
            onMouseDown={handleMouseDown('start')}
          >
            <ChevronRight className="w-3 h-3 text-white" />
          </div>

          {/* End handle */}
          <div
            className={`absolute top-0 bottom-0 w-4 bg-indigo-600 rounded-r-lg cursor-ew-resize flex items-center justify-center hover:bg-indigo-700 transition-colors ${isDraggingEnd ? 'bg-indigo-700' : ''}`}
            style={{ left: `calc(${getPositionPercent(endTime)}% - 8px)` }}
            onMouseDown={handleMouseDown('end')}
          >
            <ChevronLeft className="w-3 h-3 text-white" />
          </div>

          {/* Current position indicator */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 pointer-events-none"
            style={{ left: `${getPositionPercent(currentTime)}%` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full" />
          </div>

          {/* Time markers */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-[10px] text-slate-400 font-mono">
            <span>0:00</span>
            <span>{formatTime(videoDuration / 4)}</span>
            <span>{formatTime(videoDuration / 2)}</span>
            <span>{formatTime((videoDuration * 3) / 4)}</span>
            <span>{formatTime(videoDuration)}</span>
          </div>
        </div>

        {/* Time Inputs */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Start Time</label>
            <input
              type="text"
              value={formatTime(startTime)}
              onChange={handleStartTimeInput}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl font-mono text-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="0:00"
            />
          </div>

          <div className="flex items-center justify-center pt-6">
            <div className="w-8 h-0.5 bg-slate-300 rounded-full" />
          </div>

          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">End Time</label>
            <input
              type="text"
              value={formatTime(endTime)}
              onChange={handleEndTimeInput}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl font-mono text-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="0:30"
            />
          </div>
        </div>

        {/* Duration info */}
        <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            <span className="font-medium">Video Duration:</span> {formatTime(videoDuration)}
          </div>
          <div className="text-sm">
            <span className="text-slate-600 font-medium">Analysis Duration:</span>{' '}
            <span className="text-indigo-600 font-bold">{formatTime(selectionDuration)}</span>
            {selectionDuration > 60 && (
              <span className="ml-2 text-amber-600 text-xs">(Long videos may take more time)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTimeline;
