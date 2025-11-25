import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Loader2, Camera, MonitorPlay, BrainCircuit, Wand2, Check, Sparkles } from 'lucide-react';
import { ProcessingLog, VideoMeta, JobStatus } from '../types';

interface ProcessingViewProps {
  videoMeta: VideoMeta;
  onComplete: () => void;
  jobStatus?: JobStatus | null;
}

const LOG_MESSAGES = [
  { msg: "Booting vision engine...", delay: 500, step: 0 },
  { msg: "Parsing video metadata...", delay: 1200, step: 0 },
  { msg: "Detecting court boundaries...", delay: 3000, step: 1 },
  { msg: "Tracking player skeleton...", delay: 5000, step: 1 },
  { msg: "Calculating ball velocity...", delay: 7000, step: 2 },
  { msg: "Classifying shot types...", delay: 9000, step: 3 },
  { msg: "Measuring spin rate...", delay: 11000, step: 3 },
  { msg: "Building heatmaps...", delay: 13000, step: 4 },
  { msg: "Finalizing match stats...", delay: 15000, step: 4 },
];

const STEPS = [
  { id: 0, title: "Initialize", icon: Loader2 },
  { id: 1, title: "Tracking", icon: Camera },
  { id: 2, title: "Physics", icon: MonitorPlay },
  { id: 3, title: "Actions", icon: BrainCircuit },
  { id: 4, title: "Report", icon: Wand2 },
];

const ProcessingView: React.FC<ProcessingViewProps> = ({ videoMeta, onComplete, jobStatus }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<string>('');

  // Derive progress and step from jobStatus
  const progress = jobStatus?.progress ?? 0;

  // Map phase to step
  const getStepFromPhase = (phase: string): number => {
    const phaseLower = phase.toLowerCase();
    if (phaseLower.includes('loading') || phaseLower.includes('initializ')) return 0;
    if (phaseLower.includes('track')) return 1;
    if (phaseLower.includes('interpol') || phaseLower.includes('smooth')) return 2;
    if (phaseLower.includes('render')) return 3;
    if (phaseLower.includes('encod') || phaseLower.includes('complete')) return 4;
    return 0;
  };

  const currentStep = jobStatus ? getStepFromPhase(jobStatus.current_phase) : 0;

  // Add new messages to logs
  useEffect(() => {
    if (jobStatus?.message && jobStatus.message !== lastMessageRef.current) {
      lastMessageRef.current = jobStatus.message;
      setLogs(prev => [...prev, jobStatus.message]);
    }
  }, [jobStatus?.message]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-200/40 border border-white/60 overflow-hidden relative">
        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-lime-500"></div>

        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
                Crunching Data <Sparkles className="w-6 h-6 text-lime-500 animate-pulse" />
              </h3>
              <p className="text-slate-500 font-medium">{videoMeta.name} • {videoMeta.size}</p>
            </div>
            <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-mono text-xl font-bold shadow-xl shadow-slate-200">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Segmented Progress Bar */}
          <div className="flex gap-2 mb-12">
             {Array.from({ length: 20 }).map((_, i) => (
               <div 
                 key={i} 
                 className={`h-4 flex-1 rounded-full transition-all duration-300 ${
                   (i / 20) * 100 < progress 
                    ? 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]' 
                    : 'bg-slate-100'
                 }`}
               />
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Steps Visualizer */}
            <div className="lg:col-span-2 space-y-8 relative">
              {/* Connector Line */}
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100 -z-10"></div>

              {STEPS.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep || progress === 100;
                const Icon = step.icon;

                return (
                  <div key={step.id} className={`flex items-center gap-6 transition-all duration-500 ${isActive ? 'translate-x-2' : ''}`}>
                    <div className={`
                      w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 relative z-10
                      ${isCompleted 
                        ? 'bg-lime-500 text-white shadow-lg shadow-lime-200 rotate-0' 
                        : isActive 
                          ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-300 scale-110 rotate-6' 
                          : 'bg-white border-2 border-slate-100 text-slate-300'}
                    `}>
                      {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className={`font-bold text-lg transition-colors ${isActive || isCompleted ? 'text-slate-900' : 'text-slate-300'}`}>
                          {step.title}
                        </p>
                        {isActive && (
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md animate-pulse">PROCESSING</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Log Console */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col h-[300px]">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-auto text-xs font-mono text-slate-500">TERMINAL_V2</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide font-mono text-xs">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="text-slate-600">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                    <span className="text-indigo-300 font-medium">{log}</span>
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingView;