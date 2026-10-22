import React from 'react';
import { PRACTICE_DRILLS } from '../data/stencilsAndDrills.ts';
import { PracticeDrill } from '../types/canvas.ts';
import { X, Play, Clock, CheckCircle2, Award } from 'lucide-react';

interface PracticeDrillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDrill: (drill: PracticeDrill) => void;
  activeDrillId?: string;
}

export const PracticeDrillsModal: React.FC<PracticeDrillsModalProps> = ({
  isOpen,
  onClose,
  onSelectDrill,
  activeDrillId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <Award className="w-4 h-4" />
              <span>Interactive Drills</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Tablet UI Drawing Drills
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a practice drill to project a ghost blueprint guide onto your canvas.
            </p>
          </div>
          <button
            onClick={onClose}
            className="min-h-[36px] min-w-[36px] rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Drills */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {PRACTICE_DRILLS.map((drill) => {
            const isActive = activeDrillId === drill.id;
            return (
              <div
                key={drill.id}
                className={`border rounded-2xl p-5 transition-all space-y-3 ${
                  isActive
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-slate-700">{drill.difficulty}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{drill.timeEstimate}</span>
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{drill.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{drill.objective}</p>
                  </div>

                  <button
                    onClick={() => {
                      onSelectDrill(drill);
                      onClose();
                    }}
                    className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isActive ? 'Active Drill' : 'Load Blueprint'}</span>
                  </button>
                </div>

                {/* Expected elements checklist */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Blueprint Targets:
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {drill.expectedElements.map((elem, i) => (
                      <span
                        key={i}
                        className="text-xs text-slate-700 flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>{elem}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pro Tips */}
                <div className="text-xs text-slate-500 bg-slate-50/80 p-3 rounded-xl space-y-1">
                  <span className="font-semibold text-slate-700">Stylus Technique:</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                    {drill.tips.map((tip, tIdx) => (
                      <li key={tIdx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
