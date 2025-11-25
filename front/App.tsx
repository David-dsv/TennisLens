
import React, { useState, useRef } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ProcessingView from './components/ProcessingView';
import Dashboard from './components/Dashboard';
import HistoryView from './components/HistoryView';
import DrillsView from './components/DrillsView';
import { AppState, VideoMeta, AppView, JobStatus } from './types';

const API_URL = 'http://localhost:8000';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [currentView, setCurrentView] = useState<AppView>('ANALYSIS');
  const [videoMeta, setVideoMeta] = useState<VideoMeta | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const handleUpload = async (file: File, startTime: string, endTime: string, durationSeconds: number) => {
    try {
      // Set initial state
      setVideoMeta({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        duration: formatDuration(durationSeconds),
        durationSeconds,
        startTime,
        endTime
      });
      setAppState(AppState.PROCESSING);

      // Upload video
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const uploadData = await uploadResponse.json();

      // Start analysis
      const analysisForm = new FormData();
      analysisForm.append('file_id', uploadData.file_id);
      analysisForm.append('start_time', startTime);
      analysisForm.append('end_time', endTime);

      const analysisResponse = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        body: analysisForm
      });

      if (!analysisResponse.ok) {
        throw new Error('Analysis failed to start');
      }

      const analysisData = await analysisResponse.json();

      // Update video meta with job ID
      setVideoMeta(prev => prev ? { ...prev, jobId: analysisData.job_id, fileId: uploadData.file_id } : null);

      // Start polling for job status
      startPolling(analysisData.job_id);

    } catch (error) {
      console.error('Error:', error);
      alert('Error starting analysis. Make sure the backend server is running on port 8000.');
      setAppState(AppState.IDLE);
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startPolling = (jobId: string) => {
    // Clear any existing polling
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }

    pollingRef.current = setInterval(async () => {
      try {
        const response = await fetch(`${API_URL}/api/job/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job status');
        }

        const status: JobStatus = await response.json();
        setJobStatus(status);

        if (status.status === 'completed') {
          clearInterval(pollingRef.current!);
          pollingRef.current = null;
          setAppState(AppState.COMPLETE);
        } else if (status.status === 'failed') {
          clearInterval(pollingRef.current!);
          pollingRef.current = null;
          alert(`Analysis failed: ${status.error}`);
          setAppState(AppState.IDLE);
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 1000);
  };

  const handleProcessingComplete = () => {
    setAppState(AppState.COMPLETE);
  };

  const handleReset = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    setAppState(AppState.IDLE);
    setVideoMeta(null);
    setJobStatus(null);
  };

  // Render the main content based on the current view and app state
  const renderContent = () => {
    if (currentView === 'HISTORY') {
      return <HistoryView />;
    }

    if (currentView === 'TRAINING') {
      return <DrillsView />;
    }

    // Analysis View Logic
    if (appState === AppState.IDLE) {
      return <UploadSection onUpload={handleUpload} />;
    }
    
    if (appState === AppState.PROCESSING && videoMeta) {
      return <ProcessingView videoMeta={videoMeta} onComplete={handleProcessingComplete} jobStatus={jobStatus} />;
    }

    if (appState === AppState.COMPLETE && videoMeta) {
      return <Dashboard videoMeta={videoMeta} onReset={handleReset} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-700 relative overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-lime-200/30 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] bg-blue-200/20 rounded-full blur-[80px]" />
        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          {renderContent()}
        </main>

        <footer className="py-8 text-center">
          <p className="text-slate-400 text-sm font-medium">
            © 2024 TennisLens. <span className="text-indigo-500">Power your game.</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
