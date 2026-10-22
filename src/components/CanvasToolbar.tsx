import React from 'react';
import { 
  Pen, 
  Highlighter, 
  Eraser, 
  Square, 
  Circle, 
  Minus, 
  ArrowUpRight, 
  Undo2, 
  Redo2, 
  Trash2, 
  Grid, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Sparkles, 
  Hand, 
  Layers, 
  Code2, 
  PlusCircle 
} from 'lucide-react';
import { ToolType, GridType, DevicePreset } from '../types/canvas.ts';

interface CanvasToolbarProps {
  currentTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  currentColor: string;
  onSelectColor: (color: string) => void;
  currentSize: number;
  onSelectSize: (size: number) => void;
  palmRejection: boolean;
  onTogglePalmRejection: () => void;
  smartSnap: boolean;
  onToggleSmartSnap: () => void;
  gridType: GridType;
  onChangeGrid: (grid: GridType) => void;
  devicePreset: DevicePreset;
  onChangeDevicePreset: (preset: DevicePreset) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onToggleStencils: () => void;
  onToggleCodePreview: () => void;
  isCodePreviewOpen: boolean;
}

const INK_COLORS = [
  { label: 'Charcoal Wireframe', value: '#1e293b' },
  { label: 'Blueprint Blue', value: '#2563eb' },
  { label: 'Annotation Coral', value: '#ef4444' },
  { label: 'Emerald Mint', value: '#10b981' },
  { label: 'Highlighter Yellow', value: '#facc15' },
];

const SIZES = [
  { label: 'Fine (2px)', value: 2 },
  { label: 'Medium (4px)', value: 4 },
  { label: 'Thick (8px)', value: 8 },
  { label: 'Chisel (16px)', value: 16 },
];

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  currentTool,
  onSelectTool,
  currentColor,
  onSelectColor,
  currentSize,
  onSelectSize,
  palmRejection,
  onTogglePalmRejection,
  smartSnap,
  onToggleSmartSnap,
  gridType,
  onChangeGrid,
  devicePreset,
  onChangeDevicePreset,
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo,
  onToggleStencils,
  onToggleCodePreview,
  isCodePreviewOpen,
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-3 max-w-6xl mx-auto select-none">
      {/* Primary Drawing Tools */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => onSelectTool('pen')}
          title="Fine Wireframe Pen"
          className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            currentTool === 'pen' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Pen className="w-4 h-4" />
        </button>

        <button
          onClick={() => onSelectTool('highlighter')}
          title="Highlighter"
          className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            currentTool === 'highlighter' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Highlighter className="w-4 h-4" />
        </button>

        <button
          onClick={() => onSelectTool('rect')}
          title="Rectangle Box"
          className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            currentTool === 'rect' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Square className="w-4 h-4" />
        </button>

        <button
          onClick={() => onSelectTool('circle')}
          title="Circle / Avatar"
          className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            currentTool === 'circle' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Circle className="w-4 h-4" />
        </button>

        <button
          onClick={() => onSelectTool('line')}
          title="Straight Line / Divider"
          className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            currentTool === 'line' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          onClick={() => onSelectTool('arrow')}
          title="Flow Arrow"
          className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            currentTool === 'arrow' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => onSelectTool('eraser')}
          title="Eraser"
          className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            currentTool === 'eraser' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Eraser className="w-4 h-4" />
        </button>
      </div>

      {/* Palette Colors */}
      <div className="flex items-center gap-1.5 px-2 py-1 border-x border-slate-200">
        {INK_COLORS.map((ink) => (
          <button
            key={ink.value}
            onClick={() => onSelectColor(ink.value)}
            title={ink.label}
            className={`w-7 h-7 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
              currentColor === ink.value ? 'scale-110 ring-2 ring-slate-900 ring-offset-2' : 'hover:scale-105'
            }`}
            style={{ backgroundColor: ink.value }}
          />
        ))}
      </div>

      {/* Stroke Sizes */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
        {SIZES.map((sz) => (
          <button
            key={sz.value}
            onClick={() => onSelectSize(sz.value)}
            title={sz.label}
            className={`min-h-[32px] px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center ${
              currentSize === sz.value ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {sz.value}px
          </button>
        ))}
      </div>

      {/* Stylus Palm Rejection & Smart Snap Toggles */}
      <div className="flex items-center gap-2">
        <button
          onClick={onTogglePalmRejection}
          title={palmRejection ? "Palm Rejection: ON (Only Stylus draws, touches ignored)" : "Palm Rejection: OFF (Stylus + Finger touch both draw)"}
          className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border ${
            palmRejection
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <Hand className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Palm Guard</span>
          <span className="text-[10px] font-bold">{palmRejection ? 'ON' : 'OFF'}</span>
        </button>

        <button
          onClick={onToggleSmartSnap}
          title="Smart Shape Snap: Auto-convert rough rectangles and lines into clean wireframe shapes"
          className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border ${
            smartSnap
              ? 'bg-blue-50 border-blue-300 text-blue-800'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Smart Snap</span>
        </button>
      </div>

      {/* Frame & Grid Selectors */}
      <div className="flex items-center gap-2">
        {/* Device Frame */}
        <select
          value={devicePreset}
          onChange={(e) => onChangeDevicePreset(e.target.value as DevicePreset)}
          className="min-h-[38px] px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 cursor-pointer focus:outline-none focus:border-slate-400"
        >
          <option value="iphone16">Mobile (iPhone 16)</option>
          <option value="ipadPro">Tablet (iPad Pro 4:3)</option>
          <option value="desktop">Desktop Web 1440</option>
          <option value="watch">Smartwatch</option>
          <option value="freeform">Boundless Grid</option>
        </select>

        {/* Grid Type */}
        <select
          value={gridType}
          onChange={(e) => onChangeGrid(e.target.value as GridType)}
          className="min-h-[38px] px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 cursor-pointer focus:outline-none focus:border-slate-400"
        >
          <option value="none">No Grid</option>
          <option value="dot">Dot Grid (20px)</option>
          <option value="8pt">8pt Baseline Grid</option>
        </select>
      </div>

      {/* Undo / Redo / Clear / Stencils / Code Drawer Actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
          className={`min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg border border-slate-200 text-xs transition-colors cursor-pointer ${
            canUndo ? 'bg-white text-slate-700 hover:bg-slate-50' : 'bg-slate-50 text-slate-300 cursor-not-allowed'
          }`}
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
          className={`min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg border border-slate-200 text-xs transition-colors cursor-pointer ${
            canRedo ? 'bg-white text-slate-700 hover:bg-slate-50' : 'bg-slate-50 text-slate-300 cursor-not-allowed'
          }`}
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <button
          onClick={onClear}
          title="Clear Canvas"
          className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Stencils Drawer Trigger */}
        <button
          onClick={onToggleStencils}
          className="min-h-[38px] px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-900 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Stencils</span>
        </button>

        {/* Code Preview Drawer Trigger */}
        <button
          onClick={onToggleCodePreview}
          className={`min-h-[38px] px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            isCodePreviewOpen
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Live Code</span>
        </button>
      </div>
    </div>
  );
};
