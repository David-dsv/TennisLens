
import React from 'react';
import { Database, ServerOff, AlertTriangle, Plus, ArrowRight } from 'lucide-react';

const HistoryView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 md:mt-16 animate-in fade-in duration-500 slide-in-from-bottom-4">
      
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Match Archive</h2>
        <p className="text-slate-500 font-medium text-lg">Review past performance and track long-term progress.</p>
      </div>

      {/* Main Empty State Card */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl shadow-indigo-100 border border-slate-100 text-center relative overflow-hidden group">
        
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -z-10 transform group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-50 rounded-tr-full -z-10 transform group-hover:scale-110 transition-transform duration-700"></div>

        <div className="relative z-10 max-w-md mx-auto">
          <div className="w-24 h-24 bg-slate-50 rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-inner relative group-hover:-translate-y-2 transition-transform duration-300">
            <Database className="w-10 h-10 text-slate-300" />
            <div className="absolute -bottom-2 -right-2 bg-red-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
               <ServerOff className="w-5 h-5" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-3">No Database Connected</h3>
          <p className="text-slate-500 leading-relaxed mb-8">
            We cannot retrieve your match history because no storage endpoint is configured. 
            <br className="hidden md:block"/> Please connect a database to enable cloud sync.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                Configure Database <ArrowRight className="w-4 h-4" />
             </button>
             <button className="px-6 py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all w-full sm:w-auto">
                Read Documentation
             </button>
          </div>
        </div>
      </div>

      {/* Mock "Local" Recent Items to fill space nicely */}
      <div className="mt-12 opacity-50 pointer-events-none select-none filter grayscale">
         <div className="flex items-center justify-between mb-6 px-4">
            <span className="font-bold text-slate-400 uppercase text-xs tracking-wider">Recently Cached (Local)</span>
         </div>
         <div className="space-y-4">
            {[1, 2].map((_, i) => (
               <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                     <AlertTriangle className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-1">
                     <div className="h-4 w-32 bg-slate-100 rounded-md mb-2"></div>
                     <div className="h-3 w-24 bg-slate-50 rounded-md"></div>
                  </div>
               </div>
            ))}
         </div>
      </div>

    </div>
  );
};

export default HistoryView;
