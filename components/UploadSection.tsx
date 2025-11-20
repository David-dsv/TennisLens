import React, { useRef, useState } from 'react';
import { UploadCloud, FileVideo, Zap, Target, Activity, Play, Trophy, ArrowRight } from 'lucide-react';

interface UploadSectionProps {
  onUpload: (file: File) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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
        onUpload(file);
      } else {
        alert("Please upload a valid video file.");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

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
             <button className="px-6 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" /> Watch Demo
             </button>
          </div>
        </div>

        {/* Drop Zone Card */}
        <div className="relative group">
           <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-lime-400 rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20 blur-lg"></div>
           
           <div 
            className={`
              relative bg-white rounded-[2rem] p-2 shadow-2xl shadow-slate-200/50 border border-white transition-all duration-300
              ${isDragging ? 'scale-105 rotate-1' : 'group-hover:translate-y-[-4px]'}
            `}
          >
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