import React from 'react';
import { UI_STENCILS } from '../data/stencilsAndDrills.ts';
import { UIStencil, Stroke } from '../types/canvas.ts';
import { X, Plus, Copy, Check, Sparkles } from 'lucide-react';

interface StencilsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onStampStencil: (stencil: UIStencil) => void;
}

export const StencilsDrawer: React.FC<StencilsDrawerProps> = ({
  isOpen,
  onClose,
  onStampStencil,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = (id: string, code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">UI Stencils Tray</h3>
            <p className="text-xs text-slate-500">Tap to stamp architectural shorthand</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="min-h-[36px] min-w-[36px] rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Stencils List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {UI_STENCILS.map((stencil) => (
          <div
            key={stencil.id}
            className="border border-slate-200 rounded-2xl p-4 hover:border-slate-300 hover:shadow-xs transition-all bg-white space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600">
                  {stencil.category}
                </span>
                <h4 className="text-sm font-semibold text-slate-900 mt-0.5">{stencil.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{stencil.description}</p>
              </div>
            </div>

            {/* Visual Vector Wireframe Thumbnail */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-center overflow-hidden">
              <svg
                width={stencil.width}
                height={stencil.height}
                viewBox={`0 0 ${stencil.width} ${stencil.height}`}
                className="max-h-24 w-auto stroke-slate-800"
              >
                {stencil.strokes.map((st, i) => {
                  if (st.tool === 'line') {
                    return (
                      <line
                        key={i}
                        x1={st.points[0].x}
                        y1={st.points[0].y}
                        x2={st.points[st.points.length - 1].x}
                        y2={st.points[st.points.length - 1].y}
                        stroke={st.color}
                        strokeWidth={st.size}
                        strokeLinecap="round"
                      />
                    );
                  }
                  if (st.tool === 'circle') {
                    return (
                      <circle
                        key={i}
                        cx={st.points[0].x}
                        cy={st.points[0].y}
                        r={12}
                        stroke={st.color}
                        strokeWidth={st.size}
                        fill="none"
                      />
                    );
                  }
                  if (st.tool === 'rect') {
                    const p1 = st.points[0];
                    const p2 = st.points[st.points.length - 1];
                    return (
                      <rect
                        key={i}
                        x={Math.min(p1.x, p2.x)}
                        y={Math.min(p1.y, p2.y)}
                        width={Math.abs(p2.x - p1.x)}
                        height={Math.abs(p2.y - p1.y)}
                        stroke={st.color}
                        strokeWidth={st.size}
                        fill="none"
                        rx={6}
                      />
                    );
                  }
                  return null;
                })}
              </svg>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onStampStencil(stencil)}
                className="flex-1 min-h-[36px] bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 active:scale-[0.98] transition-transform flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Stamp on Canvas</span>
              </button>

              <button
                onClick={(e) => handleCopyCode(stencil.id, stencil.reactCode, e)}
                title="Copy clean Tailwind React code"
                className="min-h-[36px] px-3 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedId === stencil.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
