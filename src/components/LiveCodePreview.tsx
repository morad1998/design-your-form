import React, { useState } from 'react';
import { Stroke } from '../types/canvas.ts';
import { 
  X, 
  Copy, 
  Check, 
  Smartphone, 
  Code, 
  Eye, 
  ArrowLeft, 
  Search, 
  MoreVertical, 
  Home, 
  Bookmark, 
  User, 
  Image, 
  ChevronRight, 
  SlidersHorizontal 
} from 'lucide-react';

interface LiveCodePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  strokesCount: number;
}

export const LiveCodePreview: React.FC<LiveCodePreviewProps> = ({
  isOpen,
  onClose,
  strokesCount,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generatedCode = `// Generated Production React + Tailwind Component from Tablet UI Wireframe
import React, { useState } from 'react';
import { ArrowLeft, Search, MoreVertical, Home, Bookmark, User, Image, ChevronRight } from 'lucide-react';

export default function MobileAppScreen() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col border-x border-slate-200">
      {/* 01. Top App Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <button className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-700 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold text-slate-900">Explore Feed</h1>
        <button className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-700 hover:text-slate-900">
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* 02. Search & Filter Bar */}
      <div className="p-4 bg-white border-b border-slate-100">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search prototypes & design systems..." 
            className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900 transition-colors"
          />
        </div>
      </div>

      {/* 03. Scrollable Content Stream */}
      <main className="flex-1 p-4 space-y-4 pb-24">
        {/* Story / Avatar Circles Row */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {['Your Story', 'Design Lead', 'Frontend', 'Reviewer'].map((name, i) => (
            <div key={i} className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-14 h-14 rounded-full p-0.5 border-2 border-blue-600 bg-white flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center font-semibold text-xs text-slate-700">
                  {name[0]}
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-600 max-w-[56px] truncate">{name}</span>
            </div>
          ))}
        </div>

        {/* Featured Media Card (Image Placeholder X) */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="aspect-video bg-slate-100 flex flex-col items-center justify-center text-slate-400">
            <Image className="w-8 h-8 opacity-60 mb-1" />
            <span className="text-xs font-mono text-slate-400">16:9 Media Container</span>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Prototyping</span>
              <span aria-hidden="true">·</span>
              <span>4 min read</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              From Tablet Stylus to Production UI
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Natural hand-drawing accelerates early design consensus before building component code.
            </p>
          </div>
        </div>

        {/* Primary CTA Button */}
        <button className="w-full h-12 bg-slate-900 text-white font-medium text-sm rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-transform flex items-center justify-center shadow-xs">
          Continue to Workspace
        </button>
      </main>

      {/* 04. Fixed Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-4 items-center z-40">
        <button 
          onClick={() => setActiveTab('home')}
          className="flex flex-col items-center justify-center text-blue-600 min-h-[44px]"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab('search')}
          className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-900 min-h-[44px]"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Search</span>
        </button>
        <button 
          onClick={() => setActiveTab('saved')}
          className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-900 min-h-[44px]"
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Saved</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-900 min-h-[44px]"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Live Wireframe-to-Code</h3>
            <p className="text-xs text-slate-500">
              {strokesCount > 0 ? `${strokesCount} strokes recorded` : 'Translating wireframe layout'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="min-h-[36px] min-w-[36px] rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center p-2 bg-slate-100 border-b border-slate-200 gap-1">
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Interactive Preview</span>
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'code' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Tailwind React Code</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'preview' ? (
          <div className="p-4 bg-slate-100 min-h-full flex items-center justify-center">
            {/* Interactive Mobile Device Frame */}
            <div className="w-full max-w-[340px] bg-white rounded-3xl shadow-xl border border-slate-300 overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white">
                <button className="text-slate-700 hover:text-slate-900">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h4 className="text-xs font-semibold text-slate-900">Explore Feed</h4>
                <button className="text-slate-700 hover:text-slate-900">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="p-3 border-b border-slate-100">
                <div className="relative flex items-center">
                  <Search className="absolute left-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search UI..."
                    className="w-full h-8 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Avatars */}
              <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto border-b border-slate-100">
                {['JD', 'AL', 'MR', 'SK'].map((initials, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                    {initials}
                  </div>
                ))}
              </div>

              {/* Media Card */}
              <div className="p-3 space-y-2">
                <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200">
                  <Image className="w-6 h-6 opacity-60" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-medium">Design Systems · 4m</span>
                  <h5 className="text-xs font-bold text-slate-900 leading-snug">
                    Stylus to Clean React Architecture
                  </h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Zero pixel-fiddling in early stages. Pure functional layout hierarchy.
                  </p>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="p-3 pt-0">
                <button className="w-full h-10 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors">
                  Continue to Prototype
                </button>
              </div>

              {/* Bottom Nav Bar */}
              <div className="h-12 border-t border-slate-200 grid grid-cols-4 items-center bg-white/95">
                <div className="flex flex-col items-center text-blue-600">
                  <Home className="w-4 h-4" />
                  <span className="text-[9px] font-medium">Home</span>
                </div>
                <div className="flex flex-col items-center text-slate-400">
                  <Search className="w-4 h-4" />
                  <span className="text-[9px] font-medium">Search</span>
                </div>
                <div className="flex flex-col items-center text-slate-400">
                  <Bookmark className="w-4 h-4" />
                  <span className="text-[9px] font-medium">Saved</span>
                </div>
                <div className="flex flex-col items-center text-slate-400">
                  <User className="w-4 h-4" />
                  <span className="text-[9px] font-medium">Profile</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">React + Tailwind JSX</span>
              <button
                onClick={handleCopy}
                className="min-h-[32px] px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Component</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed">
              <code>{generatedCode}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
