import React, { useRef, useState, useCallback } from 'react';
import { UploadCloud, FileVideo, Zap, Target, Activity, Play, Trophy, ArrowRight, Loader2, X } from 'lucide-react';
import VideoTimeline from './VideoTimeline';

interface UploadSectionProps {
  onUpload: (file: File, startTime: string, endTime: string, durationSeconds: number) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const demoVideoRef = useRef<HTMLVideoElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<string>('0:00');
  const [endTime, setEndTime] = useState<string>('0:30');
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        handleVideoSelected(file);
      } else {
        alert("Please upload a valid video file.");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleVideoSelected(e.target.files[0]);
    }
  };

  const handleVideoSelected = (file: File) => {
    setIsLoadingVideo(true);
    setSelectedFile(file);

    // Get video duration
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      const duration = video.duration;
      setVideoDuration(duration);
      setEndTime(formatTimeFromSeconds(Math.min(duration, 30)));
      setIsLoadingVideo(false);
    };
    video.onerror = () => {
      setIsLoadingVideo(false);
      alert("Error loading video metadata");
    };
    video.src = URL.createObjectURL(file);
  };

  const formatTimeFromSeconds = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeRangeChange = useCallback((start: string, end: string) => {
    setStartTime(start);
    setEndTime(end);
  }, []);

  const handleStartAnalysis = () => {
    if (selectedFile) {
      onUpload(selectedFile, startTime, endTime, videoDuration);
    }
  };

  const handleCancelSelection = () => {
    setSelectedFile(null);
    setVideoDuration(0);
    setStartTime('0:00');
    setEndTime('0:30');
  };

  // Show timeline view when video is selected
  if (selectedFile && videoDuration > 0) {
    return (
      <div className="max-w-4xl mx-auto mt-4 md:mt-12 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">
            Select Analysis Range
          </h2>
          <p className="text-slate-500">
            Choose the portion of the video you want to analyze
          </p>
        </div>

        {/* File info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <FileVideo className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">{selectedFile.name}</p>
              <p className="text-sm text-slate-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {formatTimeFromSeconds(videoDuration)}
              </p>
            </div>
          </div>
          <button
            onClick={handleCancelSelection}
            className="text-sm text-slate-500 hover:text-slate-700 px-4 py-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Change video
          </button>
        </div>

        {/* Timeline Component */}
        <VideoTimeline
          videoFile={selectedFile}
          videoDuration={videoDuration}
          onTimeRangeChange={handleTimeRangeChange}
        />

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleCancelSelection}
            className="px-6 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleStartAnalysis}
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-xl shadow-indigo-200 flex items-center gap-2"
          >
            Start Analysis <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoadingVideo) {
    return (
      <div className="max-w-4xl mx-auto mt-4 md:mt-12 flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
          <p className="text-slate-600 font-medium">Loading video...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-4 md:mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">

        {/* Text Content */}
        <div className="space-y-6 text-center lg:text-left relative">
           {/* Decorative element */}
           <div className="absolute -top-12 -left-12 w-24 h-24 bg-lime-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

           <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-slate-200 rounded-full p-1 pr-4 shadow-sm">
              <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">New</span>
              <span className="text-xs font-semibold text-slate-600">AI Motion Tracking v2.0</span>
           </div>

          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Unlock your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Full Potential.</span>
          </h2>

          <p className="text-lg text-slate-500 font-medium max-w-md mx-auto lg:mx-0 leading-relaxed">
            Transform raw footage into pro-level analytics. Detect every shot, spin, and movement with our advanced computer vision engine.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
             <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 hover:scale-105 transition-all duration-300 shadow-xl shadow-slate-200 flex items-center gap-2"
             >
                Start Analysis <ArrowRight className="w-4 h-4" />
             </button>
             <button
                onClick={() => setShowDemo(true)}
                className="px-6 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-2"
             >
                <Play className="w-4 h-4 fill-current" /> Watch Demo
             </button>
          </div>
        </div>

        {/* Drop Zone Card / Demo Video */}
        <div className="relative group">
           <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-lime-400 rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20 blur-lg"></div>

           <div
            className={`
              relative bg-white rounded-[2rem] p-2 shadow-2xl shadow-slate-200/50 border border-white transition-all duration-300
              ${isDragging ? 'scale-105 rotate-1' : 'group-hover:translate-y-[-4px]'}
            `}
          >
            {showDemo ? (
              /* Demo Video Player */
              <div className="relative rounded-[1.7rem] h-96 overflow-hidden bg-black">
                <video
                  ref={demoVideoRef}
                  src="/demo.mp4"
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  loop
                />
                <button
                  onClick={() => {
                    setShowDemo(false);
                    if (demoVideoRef.current) {
                      demoVideoRef.current.pause();
                    }
                  }}
                  className="absolute top-3 right-3 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                  CourtSide-CV Demo
                </div>
              </div>
            ) : (
              /* Upload Drop Zone */
              <div
                className={`
                  border-3 border-dashed rounded-[1.7rem] h-96 flex flex-col items-center justify-center cursor-pointer transition-colors duration-300
                  ${isDragging
                    ? 'border-indigo-500 bg-indigo-50/50'
                    : 'border-slate-100 bg-slate-50/30 hover:border-indigo-300 hover:bg-indigo-50/10'
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="video/*"
                  onChange={handleFileSelect}
                />

                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-indigo-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
                  <div className={`
                    w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500 shadow-lg relative z-10
                    ${isDragging
                      ? 'bg-indigo-600 text-white scale-110 rotate-12'
                      : 'bg-white text-indigo-600 shadow-indigo-100 group-hover:scale-110 group-hover:rotate-6'}
                  `}>
                    <UploadCloud className="w-10 h-10" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">Drop match footage</h3>
                <p className="text-slate-400 text-sm font-medium bg-white px-4 py-1 rounded-full shadow-sm border border-slate-100">MP4, MOV up to 2GB</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Ball Tracking", desc: "Precision trajectory analysis", icon: Target, color: "bg-indigo-600", light: "bg-indigo-50" },
          { title: "Stroke Recognition", desc: "Auto-tagging for every shot", icon: Activity, color: "bg-lime-500", light: "bg-lime-50" },
          { title: "Win Prediction", desc: "Live probability stats", icon: Trophy, color: "bg-violet-500", light: "bg-violet-50" }
        ].map((feature, idx) => (
          <div key={idx} className="bg-white/60 backdrop-blur border border-white/60 p-6 rounded-3xl shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center gap-4 mb-3">
              <div className={`w-12 h-12 rounded-2xl ${feature.light} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color.replace('bg-', 'text-')}`} />
              </div>
              <h4 className="font-bold text-lg text-slate-900">{feature.title}</h4>
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed pl-16">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadSection;