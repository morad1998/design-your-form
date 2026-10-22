import React from 'react';
import { PenTool, Compass, GraduationCap, BookOpen, Download } from 'lucide-react';

interface TopBarProps {
  activeView: 'guide' | 'studio' | 'drills' | 'cheatsheet';
  onNavigate: (view: 'guide' | 'studio' | 'drills' | 'cheatsheet') => void;
  onExport: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ activeView, onNavigate, onExport }) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200 sticky top-0 z-40 select-none">
      {/* Zone 1: Single text element wordmark */}
      <div 
        onClick={() => onNavigate('studio')}
        className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
      >
        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors">
          <PenTool className="w-4 h-4" />
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-900">
          PenUI Studio
        </span>
      </div>

      {/* Zone 2: 4 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
        <button
          onClick={() => onNavigate('studio')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'studio' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900'
          }`}
        >
          <PenTool className="w-4 h-4 opacity-75" />
          <span>Drawing Studio</span>
        </button>

        <button
          onClick={() => onNavigate('guide')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'guide' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4 opacity-75" />
          <span>Tablet Playbook</span>
        </button>

        <button
          onClick={() => onNavigate('drills')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'drills' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4 opacity-75" />
          <span>Practice Drills</span>
        </button>

        <button
          onClick={() => onNavigate('cheatsheet')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'cheatsheet' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 opacity-75" />
          <span>Symbol Cheatsheet</span>
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onExport}
          className="min-h-[40px] px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-[0.98] transition-transform flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Sketch</span>
        </button>
      </div>
    </header>
  );
};
