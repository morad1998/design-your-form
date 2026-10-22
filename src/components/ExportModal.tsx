import React, { useState } from 'react';
import { Stroke, DevicePreset } from '../types/canvas.ts';
import { X, Download, FileCode, Check, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  strokes: Stroke[];
  devicePreset: DevicePreset;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  strokes,
  devicePreset,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPNG = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `tablet-ui-wireframe-${devicePreset}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      version: '1.0',
      timestamp: new Date().toISOString(),
      devicePreset,
      strokes,
    }, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `tablet-wireframe-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Export Wireframe</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Export your tablet sketches for design review or engineering handoff.
            </p>
          </div>
          <button
            onClick={onClose}
            className="min-h-[36px] min-w-[36px] rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Strokes Recorded: <strong className="text-slate-900">{strokes.length}</strong></span>
          <span>Target Frame: <strong className="text-slate-900 uppercase">{devicePreset}</strong></span>
        </div>

        {/* Export Options */}
        <div className="space-y-3">
          <button
            onClick={handleDownloadPNG}
            className="w-full min-h-[44px] p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-white flex items-center justify-between transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-slate-900">High-Res PNG Image</h4>
                <p className="text-[11px] text-slate-500">Perfect for sharing with clients or Slack</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
          </button>

          <button
            onClick={handleDownloadJSON}
            className="w-full min-h-[44px] p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-white flex items-center justify-between transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FileCode className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-slate-900">Vector JSON Wireframe</h4>
                <p className="text-[11px] text-slate-500">Raw coordinates & strokes for backup</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
          </button>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
