/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { TopBar } from './components/TopBar.tsx';
import { GuideSection } from './components/GuideSection.tsx';
import { DrawingCanvas } from './components/DrawingCanvas.tsx';
import { CanvasToolbar } from './components/CanvasToolbar.tsx';
import { StencilsDrawer } from './components/StencilsDrawer.tsx';
import { LiveCodePreview } from './components/LiveCodePreview.tsx';
import { PracticeDrillsModal } from './components/PracticeDrillsModal.tsx';
import { SymbolCheatsheetModal } from './components/SymbolCheatsheetModal.tsx';
import { ExportModal } from './components/ExportModal.tsx';
import { Stroke, ToolType, GridType, DevicePreset, UIStencil, PracticeDrill } from './types/canvas.ts';
import { PRACTICE_DRILLS } from './data/stencilsAndDrills.ts';
import { CheckCircle2, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'penui_studio_strokes_v1';

// Initial pre-loaded inspiring wireframe demonstrating standard shorthand
const INITIAL_DEMO_STROKES: Stroke[] = [
  // Top bar divider line
  {
    id: 'demo-line-1',
    tool: 'line',
    color: '#1e293b',
    size: 2,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 30, y: 70 }, { x: 360, y: 70 }],
  },
  // Back chevron
  {
    id: 'demo-chev',
    tool: 'line',
    color: '#1e293b',
    size: 2.5,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 55, y: 50 }, { x: 45, y: 57 }, { x: 55, y: 64 }],
  },
  // Title bar
  {
    id: 'demo-title',
    tool: 'line',
    color: '#1e293b',
    size: 3.5,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 130, y: 57 }, { x: 260, y: 57 }],
  },
  // Search box container
  {
    id: 'demo-search-box',
    tool: 'rect',
    color: '#1e293b',
    size: 2,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 40, y: 95 }, { x: 350, y: 140 }],
  },
  // Search placeholder line
  {
    id: 'demo-search-line',
    tool: 'line',
    color: '#64748b',
    size: 2,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 75, y: 118 }, { x: 190, y: 118 }],
  },
  // Hero Image Box
  {
    id: 'demo-hero-box',
    tool: 'rect',
    color: '#1e293b',
    size: 2,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 40, y: 165 }, { x: 350, y: 350 }],
  },
  // Image X diagonals
  {
    id: 'demo-x1',
    tool: 'line',
    color: '#94a3b8',
    size: 1.5,
    opacity: 0.8,
    layer: 'sketch',
    points: [{ x: 40, y: 165 }, { x: 350, y: 350 }],
  },
  {
    id: 'demo-x2',
    tool: 'line',
    color: '#94a3b8',
    size: 1.5,
    opacity: 0.8,
    layer: 'sketch',
    points: [{ x: 350, y: 165 }, { x: 40, y: 350 }],
  },
  // Card headline solid bar
  {
    id: 'demo-headline',
    tool: 'line',
    color: '#1e293b',
    size: 4,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 40, y: 380 }, { x: 280, y: 380 }],
  },
  // Greeking paragraph line 1
  {
    id: 'demo-greek-1',
    tool: 'line',
    color: '#64748b',
    size: 2,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 40, y: 410 }, { x: 340, y: 410 }],
  },
  // Greeking paragraph line 2
  {
    id: 'demo-greek-2',
    tool: 'line',
    color: '#64748b',
    size: 2,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 40, y: 430 }, { x: 220, y: 430 }],
  },
  // Primary CTA Button
  {
    id: 'demo-btn-box',
    tool: 'rect',
    color: '#2563eb',
    size: 2.5,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 40, y: 480 }, { x: 350, y: 530 }],
  },
  {
    id: 'demo-btn-text',
    tool: 'line',
    color: '#2563eb',
    size: 3,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 140, y: 505 }, { x: 250, y: 505 }],
  },
  // Bottom Tab Bar
  {
    id: 'demo-tab-line',
    tool: 'line',
    color: '#1e293b',
    size: 2,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 30, y: 690 }, { x: 360, y: 690 }],
  },
  {
    id: 'demo-t1',
    tool: 'circle',
    color: '#2563eb',
    size: 2.5,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 75, y: 725 }],
  },
  {
    id: 'demo-t2',
    tool: 'circle',
    color: '#94a3b8',
    size: 2,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 155, y: 725 }],
  },
  {
    id: 'demo-t3',
    tool: 'circle',
    color: '#94a3b8',
    size: 2,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 235, y: 725 }],
  },
  {
    id: 'demo-t4',
    tool: 'circle',
    color: '#94a3b8',
    size: 2,
    opacity: 1,
    layer: 'sketch',
    points: [{ x: 315, y: 725 }],
  },
];

export default function App() {
  const [activeView, setActiveView] = useState<'guide' | 'studio' | 'drills' | 'cheatsheet'>('studio');

  // Drawing tools state
  const [currentTool, setCurrentTool] = useState<ToolType>('pen');
  const [currentColor, setCurrentColor] = useState<string>('#1e293b');
  const [currentSize, setCurrentSize] = useState<number>(2);
  const [palmRejection, setPalmRejection] = useState<boolean>(true);
  const [smartSnap, setSmartSnap] = useState<boolean>(true);
  const [gridType, setGridType] = useState<GridType>('dot');
  const [devicePreset, setDevicePreset] = useState<DevicePreset>('iphone16');

  // Stroke history & active strokes
  const [strokes, setStrokes] = useState<Stroke[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_DEMO_STROKES;
  });

  const [history, setHistory] = useState<Stroke[][]>([INITIAL_DEMO_STROKES]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Active Drill
  const [activeDrill, setActiveDrill] = useState<PracticeDrill | null>(null);

  // Modals & Panels
  const [isStencilsOpen, setIsStencilsOpen] = useState(false);
  const [isCodePreviewOpen, setIsCodePreviewOpen] = useState(false);
  const [isDrillsModalOpen, setIsDrillsModalOpen] = useState(false);
  const [isCheatsheetModalOpen, setIsCheatsheetModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Persist strokes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(strokes));
    } catch {
      // ignore
    }
  }, [strokes]);

  // Handle stroke update with history stack
  const handleStrokesChange = (newStrokes: Stroke[]) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(newStrokes);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setStrokes(newStrokes);
  };

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setStrokes(history[nextIndex]);
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setStrokes(history[nextIndex]);
    }
  }, [historyIndex, history]);

  const handleClear = () => {
    if (window.confirm('Clear current drawing canvas?')) {
      handleStrokesChange([]);
      showToast('Canvas cleared');
    }
  };

  const handleResetDemo = () => {
    handleStrokesChange(INITIAL_DEMO_STROKES);
    setActiveDrill(null);
    showToast('Loaded demo wireframe');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
        e.preventDefault();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
        handleRedo();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Stamp Stencil onto Canvas
  const handleStampStencil = (stencil: UIStencil) => {
    // Offset stencil to center of device
    const offsetX = devicePreset === 'iphone16' ? 35 : 100;
    const offsetY = 120 + Math.floor(Math.random() * 80);

    const stampedStrokes: Stroke[] = stencil.strokes.map((st, i) => ({
      id: `stencil-${stencil.id}-${Date.now()}-${i}`,
      tool: st.tool,
      color: st.color,
      size: st.size,
      opacity: 1,
      layer: 'sketch',
      points: st.points.map(p => ({
        x: p.x + offsetX,
        y: p.y + offsetY,
        pressure: 0.8,
      })),
    }));

    handleStrokesChange([...strokes, ...stampedStrokes]);
    showToast(`Stamped ${stencil.name} onto canvas`);
    setIsStencilsOpen(false);
  };

  // Select Drill
  const handleSelectDrill = (drill: PracticeDrill) => {
    setActiveDrill(drill);
    setDevicePreset(drill.templateFrame);
    setActiveView('studio');
    showToast(`Loaded ${drill.title} blueprint`);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <TopBar
        activeView={activeView}
        onNavigate={(view) => {
          if (view === 'drills') {
            setIsDrillsModalOpen(true);
          } else if (view === 'cheatsheet') {
            setIsCheatsheetModalOpen(true);
          } else {
            setActiveView(view);
          }
        }}
        onExport={() => setIsExportModalOpen(true)}
      />

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col">
        {activeView === 'guide' ? (
          <GuideSection
            onStartDrawingWithPreset={(preset) => {
              setDevicePreset(preset);
              setActiveView('studio');
            }}
            onOpenDrills={() => setIsDrillsModalOpen(true)}
            onOpenCheatsheet={() => setIsCheatsheetModalOpen(true)}
          />
        ) : (
          <div className="flex-1 flex flex-col justify-between">
            {/* Active Drill Banner if in practice mode */}
            {activeDrill && (
              <div className="bg-blue-600 text-white px-6 py-2.5 flex items-center justify-between text-xs font-medium shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Active Drill:</span>
                  <span>{activeDrill.title}</span>
                  <span aria-hidden="true" className="opacity-60">·</span>
                  <span className="opacity-90">{activeDrill.objective}</span>
                </div>
                <button
                  onClick={() => setActiveDrill(null)}
                  className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded-md text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Exit Blueprint
                </button>
              </div>
            )}

            {/* Drawing Canvas Area */}
            <div className="flex-1 flex items-center justify-center relative">
              <DrawingCanvas
                currentTool={currentTool}
                currentColor={currentColor}
                currentSize={currentSize}
                palmRejection={palmRejection}
                smartSnap={smartSnap}
                gridType={gridType}
                devicePreset={devicePreset}
                ghostBlueprint={activeDrill ? activeDrill.ghostBlueprint : undefined}
                strokes={strokes}
                onStrokesChange={handleStrokesChange}
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={historyIndex > 0}
                canRedo={historyIndex < history.length - 1}
              />
            </div>

            {/* Floating Bottom Toolbar */}
            <div className="sticky bottom-4 z-30 px-4 pb-2">
              <CanvasToolbar
                currentTool={currentTool}
                onSelectTool={setCurrentTool}
                currentColor={currentColor}
                onSelectColor={setCurrentColor}
                currentSize={currentSize}
                onSelectSize={setCurrentSize}
                palmRejection={palmRejection}
                onTogglePalmRejection={() => {
                  const next = !palmRejection;
                  setPalmRejection(next);
                  showToast(next ? 'Palm Guard Active (Stylus only)' : 'Palm Guard Off (Touch draws too)');
                }}
                smartSnap={smartSnap}
                onToggleSmartSnap={() => {
                  const next = !smartSnap;
                  setSmartSnap(next);
                  showToast(next ? 'Smart Shape Snap: ON' : 'Smart Shape Snap: OFF');
                }}
                gridType={gridType}
                onChangeGrid={setGridType}
                devicePreset={devicePreset}
                onChangeDevicePreset={setDevicePreset}
                onUndo={handleUndo}
                onRedo={handleRedo}
                onClear={handleClear}
                canUndo={historyIndex > 0}
                canRedo={historyIndex < history.length - 1}
                onToggleStencils={() => setIsStencilsOpen(true)}
                onToggleCodePreview={() => setIsCodePreviewOpen(!isCodePreviewOpen)}
                isCodePreviewOpen={isCodePreviewOpen}
              />
            </div>
          </div>
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Stencils Tray Drawer */}
      <StencilsDrawer
        isOpen={isStencilsOpen}
        onClose={() => setIsStencilsOpen(false)}
        onStampStencil={handleStampStencil}
      />

      {/* Live Wireframe-to-Code Drawer */}
      <LiveCodePreview
        isOpen={isCodePreviewOpen}
        onClose={() => setIsCodePreviewOpen(false)}
        strokesCount={strokes.length}
      />

      {/* Practice Drills Modal */}
      <PracticeDrillsModal
        isOpen={isDrillsModalOpen}
        onClose={() => setIsDrillsModalOpen(false)}
        onSelectDrill={handleSelectDrill}
        activeDrillId={activeDrill?.id}
      />

      {/* Symbol Cheatsheet Modal */}
      <SymbolCheatsheetModal
        isOpen={isCheatsheetModalOpen}
        onClose={() => setIsCheatsheetModalOpen(false)}
        onTrySymbol={(symName) => {
          setActiveView('studio');
          showToast(`Selected canvas mode for ${symName}`);
        }}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        strokes={strokes}
        devicePreset={devicePreset}
      />
    </div>
  );
}
