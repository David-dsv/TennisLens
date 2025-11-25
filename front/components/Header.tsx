
import React from 'react';
import { Activity, Menu, ChevronDown } from 'lucide-react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const navItems: { label: string; value: AppView }[] = [
    { label: 'Analysis', value: 'ANALYSIS' },
    { label: 'History', value: 'HISTORY' },
    { label: 'Training', value: 'TRAINING' }
  ];

  return (
    <header className="sticky top-4 z-50 px-4 md:px-6">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg shadow-slate-200/50 rounded-2xl px-4 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <div 
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={() => onViewChange('ANALYSIS')}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-20"></div>
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/30 relative transform transition-transform group-hover:-translate-y-0.5">
              <Activity className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              Tennis<span className="text-indigo-600">Lens</span>
            </h1>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
          {navItems.map((item) => (
            <button 
              key={item.value} 
              onClick={() => onViewChange(item.value)}
              className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                currentView === item.value 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-right leading-tight">
            <p className="text-xs font-bold text-slate-900">John Doe</p>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Pro Account</p>
          </div>
          <button className="flex items-center gap-2 pl-2 rounded-full hover:bg-slate-50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 p-[2px] shadow-md">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                 <span className="text-xs font-black text-indigo-600">JD</span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 md:hidden" />
          </button>
          <button className="md:hidden text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
