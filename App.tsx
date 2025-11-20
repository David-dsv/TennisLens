
import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ProcessingView from './components/ProcessingView';
import Dashboard from './components/Dashboard';
import HistoryView from './components/HistoryView';
import DrillsView from './components/DrillsView';
import { AppState, VideoMeta, AppView } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [currentView, setCurrentView] = useState<AppView>('ANALYSIS');
  const [videoMeta, setVideoMeta] = useState<VideoMeta | null>(null);

  const handleUpload = (file: File) => {
    setVideoMeta({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      duration: '00:00' // Placeholder
    });
    setAppState(AppState.PROCESSING);
  };

  const handleProcessingComplete = () => {
    setAppState(AppState.COMPLETE);
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setVideoMeta(null);
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
      return <ProcessingView videoMeta={videoMeta} onComplete={handleProcessingComplete} />;
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
