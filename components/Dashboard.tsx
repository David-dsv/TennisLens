import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, AreaChart, Area } from 'recharts';
import { Play, Share2, Download, ArrowLeft, Clock, Activity, Zap, User, Trophy, Info, MoreHorizontal } from 'lucide-react';
import { VideoMeta, ActionStat } from '../types';

interface DashboardProps {
  videoMeta: VideoMeta;
  onReset: () => void;
}

const ACTION_DATA: ActionStat[] = [
  { name: 'Forehand', count: 45, color: '#4f46e5' }, // indigo-600
  { name: 'Backhand', count: 32, color: '#8b5cf6' }, // violet-500
  { name: 'Serve', count: 18, color: '#84cc16' },    // lime-500
  { name: 'Smash', count: 5, color: '#f43f5e' },     // rose-500
  { name: 'Volley', count: 12, color: '#f59e0b' },   // amber-500
];

const TIMELINE_DATA = Array.from({ length: 25 }, (_, i) => ({
  time: i,
  intensity: 40 + Math.random() * 60,
  actionType: i % 5 === 0 ? 'Serve' : i % 3 === 0 ? 'Forehand' : 'Backhand'
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-xl">
        <p className="text-white text-sm font-bold mb-1">{payload[0].name}</p>
        <p className="text-slate-400 text-xs font-medium">Count: <span className="text-lime-400 font-bold text-sm ml-1">{payload[0].value}</span></p>
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC<DashboardProps> = ({ videoMeta, onReset }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-20">
      
      {/* Top Nav Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onReset} className="p-3 bg-white rounded-2xl hover:bg-slate-50 border border-slate-200 transition-colors group">
             <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-indigo-600" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Match Analysis</span>
               <span className="text-slate-400 text-xs font-medium">Today, 10:23 AM</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{videoMeta.name}</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-white hover:bg-slate-50 text-slate-700 px-5 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all border border-slate-200 shadow-sm hover:-translate-y-0.5">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all shadow-xl shadow-slate-200 hover:-translate-y-0.5">
            <Share2 className="w-4 h-4" /> Share Report
          </button>
        </div>
      </div>

      {/* Stats Grid - "Trading Card" Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Actions", value: "112", sub: "+12% vs avg", icon: Activity, bg: "bg-indigo-600", text: "text-white", iconBg: "bg-indigo-500/30" },
          { label: "Duration", value: "04:32", sub: "Active Play", icon: Clock, bg: "bg-white", text: "text-slate-900", iconBg: "bg-slate-100", border: true },
          { label: "Avg Speed", value: "118", unit: "km/h", icon: Zap, bg: "bg-lime-400", text: "text-slate-900", iconBg: "bg-lime-500/30" },
          { label: "Win Rate", value: "68", unit: "%", icon: Trophy, bg: "bg-white", text: "text-slate-900", iconBg: "bg-purple-50", border: true, iconColor: "text-purple-600" }
        ].map((stat, i) => (
          <div key={i} className={`
            relative overflow-hidden p-6 rounded-[2rem] flex flex-col justify-between min-h-[160px] transition-transform hover:scale-[1.02] duration-300
            ${stat.bg} ${stat.text} ${stat.border ? 'border border-slate-200 shadow-sm' : 'shadow-xl shadow-indigo-500/10'}
          `}>
            {/* Background decoration for colored cards */}
            {!stat.border && (
              <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl pointer-events-none"></div>
            )}
            
            <div className="flex justify-between items-start relative z-10">
              <div className={`p-3 rounded-2xl ${stat.iconBg}`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor || 'text-current'}`} />
              </div>
              {stat.border && <MoreHorizontal className="w-5 h-5 text-slate-300" />}
            </div>
            
            <div className="relative z-10">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tighter">{stat.value}</span>
                {stat.unit && <span className="text-sm font-bold opacity-60">{stat.unit}</span>}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs font-bold uppercase tracking-wider opacity-70">{stat.label}</p>
                {stat.sub && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/20">{stat.sub}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Video Area - TV Broadcast Style */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden aspect-video border-4 border-white shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1531315630201-bb15dbbe169b?q=80&w=2574&auto=format&fit=crop" 
              alt="Tennis Match Analysis" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* TV Overlay Graphics */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
              <div className="flex gap-3">
                <div className="bg-slate-900/80 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold tracking-wider">LIVE FEED</span>
                </div>
                <div className="bg-indigo-600/90 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-indigo-400/30">
                  <span className="text-xs font-bold">SET 2 • GAME 4</span>
                </div>
              </div>
              
              <div className="bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-white/10">
                <div className="w-32 h-16 bg-gradient-to-t from-lime-500/20 to-transparent rounded-lg border-b-2 border-lime-500 relative">
                   {/* Mock Mini-map */}
                   <div className="absolute inset-2 border-2 border-white/30 rounded-sm"></div>
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-lime-400 rounded-full shadow-[0_0_10px_#a3e635]"></div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <button className="group/btn relative">
                 <div className="absolute inset-0 bg-indigo-600 rounded-full blur-xl opacity-40 group-hover/btn:opacity-60 transition-opacity animate-pulse"></div>
                 <div className="relative w-24 h-24 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:bg-white">
                   <Play className="w-10 h-10 ml-2 fill-indigo-600 text-indigo-600" />
                 </div>
              </button>
            </div>

            {/* Bottom Timeline Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent">
               <div className="h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className="h-full w-[35%] bg-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.8)]"></div>
               </div>
               <div className="flex justify-between mt-3 text-white/60 text-xs font-medium font-mono">
                  <span>04:32</span>
                  <span>12:45</span>
               </div>
            </div>
          </div>

          {/* Momentum Chart */}
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                   <Activity className="w-5 h-5 text-indigo-600" /> Match Momentum
                </h3>
              </div>
              <div className="flex gap-2">
                 {['1st Set', '2nd Set', 'All'].map((label, i) => (
                    <button key={label} className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${i === 2 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                       {label}
                    </button>
                 ))}
              </div>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TIMELINE_DATA}>
                  <defs>
                    <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <Tooltip cursor={{ stroke: '#4f46e5', strokeWidth: 2, strokeDasharray: '5 5' }} content={<CustomTooltip />} />
                  <Area 
                     type="monotone" 
                     dataKey="intensity" 
                     stroke="#4f46e5" 
                     strokeWidth={4}
                     fillOpacity={1} 
                     fill="url(#colorIntensity)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Coach's Corner */}
        <div className="space-y-6">
          
          {/* Action Distribution */}
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -z-0"></div>
            <h3 className="text-xl font-bold text-slate-900 mb-1 relative z-10">Shot Breakdown</h3>
            <p className="text-sm text-slate-500 mb-6 relative z-10">Frequency by stroke type</p>
            
            <div className="h-64 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ACTION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="count"
                    cornerRadius={6}
                  >
                    {ACTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value) => <span className="text-slate-700 text-xs font-bold ml-1">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                <div className="text-center bg-white/80 backdrop-blur p-2 rounded-full">
                   <Trophy className="w-8 h-8 text-slate-900 mx-auto mb-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Stats List */}
          <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
             {/* Background Gradients */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full filter blur-[80px] opacity-20 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime-500 rounded-full filter blur-[80px] opacity-10 pointer-events-none"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
               <h3 className="text-xl font-bold">Performance</h3>
               <button className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-white" />
               </button>
            </div>

            <div className="space-y-6 relative z-10">
              {ACTION_DATA.map((action) => (
                <div key={action.name} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: action.color }}></div>
                       <span className="text-slate-300 text-sm font-bold group-hover:text-white transition-colors">{action.name}</span>
                    </div>
                    <span className="text-white text-sm font-mono font-bold">{action.count}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out relative" 
                      style={{ width: `${(action.count / 45) * 100}%`, backgroundColor: action.color }}
                    >
                       <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/30"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
               <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center shrink-0">
                     <Zap className="w-5 h-5 text-slate-900 fill-current" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-lime-400 uppercase mb-1">Coach's Insight</p>
                     <p className="text-sm text-slate-300 leading-relaxed">
                        Forehand consistency is up <strong>15%</strong>. Focus on backhand recovery position in the next set.
                     </p>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;