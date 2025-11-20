
import React from 'react';
import { Dumbbell, Play, Clock, Zap, Trophy, Target, TrendingUp } from 'lucide-react';

const DrillsView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto mt-8 md:mt-12 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
        <div>
           <div className="inline-flex items-center gap-2 bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
              <Zap className="w-3 h-3 fill-current" /> AI Recommendations
           </div>
           <h2 className="text-4xl font-black text-slate-900 tracking-tight">Personalized Drills</h2>
           <p className="text-slate-500 font-medium text-lg mt-2 max-w-xl">Based on your recent match analysis, we've curated these specific exercises to improve your weak points.</p>
        </div>
        
        <div className="flex gap-4 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
           {['Recommended', 'Strength', 'Cardio'].map((tab, i) => (
              <button key={tab} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${i === 0 ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
                 {tab}
              </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1">
           <div className="h-48 bg-slate-200 relative overflow-hidden">
              <img 
                 src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2670&auto=format&fit=crop" 
                 alt="Forehand" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                 <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide mb-1 inline-block">Focus: Consistency</span>
                 <h3 className="text-xl font-bold text-white">Deep Cross-Court Forehands</h3>
              </div>
           </div>
           <div className="p-6">
              <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 mb-6">
                 <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 15 min</div>
                 <div className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-lime-600" /> +12% XP</div>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                 Your last match showed a 45% error rate on deep balls. This drill focuses on heavy topspin to keep opponents behind the baseline.
              </p>
              <button className="w-full py-3 rounded-xl bg-slate-50 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center gap-2 group/btn">
                 Start Drill <Play className="w-4 h-4 group-hover/btn:fill-current" />
              </button>
           </div>
        </div>

        {/* Card 2 */}
        <div className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1">
           <div className="h-48 bg-slate-200 relative overflow-hidden">
              <img 
                 src="https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=2670&auto=format&fit=crop" 
                 alt="Serve" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                 <span className="bg-lime-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide mb-1 inline-block">Focus: Power</span>
                 <h3 className="text-xl font-bold text-white">Flat Serve Mechanics</h3>
              </div>
           </div>
           <div className="p-6">
              <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 mb-6">
                 <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 20 min</div>
                 <div className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-lime-600" /> +18% XP</div>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                 Improve your first serve percentage. Focus on the toss height and kinetic chain explosion.
              </p>
              <button className="w-full py-3 rounded-xl bg-slate-50 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center gap-2 group/btn">
                 Start Drill <Play className="w-4 h-4 group-hover/btn:fill-current" />
              </button>
           </div>
        </div>

         {/* Card 3 */}
         <div className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1">
           <div className="h-48 bg-slate-200 relative overflow-hidden">
              <img 
                 src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=2675&auto=format&fit=crop" 
                 alt="Footwork" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                 <span className="bg-violet-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide mb-1 inline-block">Focus: Agility</span>
                 <h3 className="text-xl font-bold text-white">Split Step & Recovery</h3>
              </div>
           </div>
           <div className="p-6">
              <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 mb-6">
                 <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 min</div>
                 <div className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-lime-600" /> +8% XP</div>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                 Enhance your reaction time to volleys and drop shots. High intensity interval footwork.
              </p>
              <button className="w-full py-3 rounded-xl bg-slate-50 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center gap-2 group/btn">
                 Start Drill <Play className="w-4 h-4 group-hover/btn:fill-current" />
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default DrillsView;
