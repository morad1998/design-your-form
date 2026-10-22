import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Stroke, Point, ToolType, GridType, DevicePreset } from '../types/canvas.ts';

interface DrawingCanvasProps {
  currentTool: ToolType;
  currentColor: string;
  currentSize: number;
  palmRejection: boolean;
  smartSnap: boolean;
  gridType: GridType;
  devicePreset: DevicePreset;
  ghostBlueprint?: Stroke[];
  strokes: Stroke[];
  onStrokesChange: (strokes: Stroke[]) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  currentTool,
  currentColor,
  currentSize,
  palmRejection,
  smartSnap,
  gridType,
  devicePreset,
  ghostBlueprint = [],
  strokes,
  onStrokesChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const currentPointsRef = useRef<Point[]>([]);
  const activePointerIdRef = useRef<number | null>(null);

  // Device frame dimensions
  const getDeviceDimensions = useCallback(() => {
    switch (devicePreset) {
      case 'iphone16':
        return { width: 390, height: 780, radius: 44, hasDynamicIsland: true, title: 'iPhone 16 Pro' };
      case 'ipadPro':
        return { width: 720, height: 960, radius: 28, hasDynamicIsland: false, title: 'iPad Pro 11"' };
      case 'desktop':
        return { width: 980, height: 620, radius: 12, hasBrowserBar: true, title: 'Web App 1440' };
      case 'watch':
        return { width: 340, height: 420, radius: 60, title: 'Smartwatch' };
      case 'freeform':
      default:
        return { width: 1040, height: 800, radius: 16, title: 'Boundless Canvas' };
    }
  }, [devicePreset]);

  // Redraw all strokes on canvas
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    // Reset transform & clear
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Grid if applicable
    if (gridType === 'dot') {
      ctx.fillStyle = '#cbd5e1';
      const gap = 20;
      for (let x = gap; x < width; x += gap) {
        for (let y = gap; y < height; y += gap) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (gridType === '8pt') {
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.8)';
      ctx.lineWidth = 0.5;
      const gap = 16;
      ctx.beginPath();
      for (let x = 0; x < width; x += gap) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gap) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    }

    // 2. Draw Ghost Blueprint (for drills)
    if (ghostBlueprint && ghostBlueprint.length > 0) {
      ctx.save();
      ctx.globalAlpha = 0.35;
      ghostBlueprint.forEach((s) => {
        drawStroke(ctx, s, true);
      });
      ctx.restore();
    }

    // 3. Draw Completed User Strokes
    strokes.forEach((stroke) => {
      drawStroke(ctx, stroke);
    });

    // 4. Draw Active In-Progress Stroke
    if (isDrawing && currentPointsRef.current.length > 0) {
      const activeStroke: Stroke = {
        id: 'active',
        tool: currentTool,
        color: currentColor,
        size: currentSize,
        opacity: currentTool === 'highlighter' ? 0.35 : 1,
        points: currentPointsRef.current,
        layer: 'sketch',
      };
      drawStroke(ctx, activeStroke);
    }
  }, [gridType, ghostBlueprint, strokes, isDrawing, currentTool, currentColor, currentSize]);

  // Helper to draw a single stroke
  const drawStroke = (ctx: CanvasRenderingContext2D, stroke: Stroke, isGhost = false) => {
    if (!stroke.points || stroke.points.length === 0) return;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = stroke.color;
    ctx.globalAlpha = stroke.opacity;

    if (stroke.tool === 'highlighter') {
      ctx.lineWidth = stroke.size * 3;
      ctx.globalCompositeOperation = 'multiply';
    } else if (stroke.tool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = stroke.size * 2;
    } else {
      ctx.lineWidth = stroke.size;
    }

    if (stroke.tool === 'rect') {
      const p1 = stroke.points[0];
      const p2 = stroke.points[stroke.points.length - 1];
      const rx = Math.min(p1.x, p2.x);
      const ry = Math.min(p1.y, p2.y);
      const rw = Math.abs(p2.x - p1.x);
      const rh = Math.abs(p2.y - p1.y);
      ctx.beginPath();
      ctx.strokeRect(rx, ry, rw, rh);
      ctx.restore();
      return;
    }

    if (stroke.tool === 'circle') {
      const p1 = stroke.points[0];
      const p2 = stroke.points[stroke.points.length - 1];
      const radius = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, Math.max(radius, 6), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      return;
    }

    if (stroke.tool === 'line') {
      const p1 = stroke.points[0];
      const p2 = stroke.points[stroke.points.length - 1];
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
      return;
    }

    if (stroke.tool === 'arrow') {
      const p1 = stroke.points[0];
      const p2 = stroke.points[stroke.points.length - 1];
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Arrow head
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      const headLen = Math.max(12, stroke.size * 2.5);
      ctx.beginPath();
      ctx.moveTo(p2.x, p2.y);
      ctx.lineTo(p2.x - headLen * Math.cos(angle - Math.PI / 6), p2.y - headLen * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(p2.x, p2.y);
      ctx.lineTo(p2.x - headLen * Math.cos(angle + Math.PI / 6), p2.y - headLen * Math.sin(angle + Math.PI / 6));
      ctx.stroke();
      ctx.restore();
      return;
    }

    // Freehand Pen / Marker / Eraser
    const points = stroke.points;
    if (points.length === 1) {
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, (stroke.size / 2) * (points[0].pressure || 1), 0, Math.PI * 2);
      ctx.fillStyle = stroke.color;
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      // Curve smoothing
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.stroke();
    }

    ctx.restore();
  };

  // Resize canvas according to dimensions & DPI
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = getDeviceDimensions();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    renderCanvas();
  }, [getDeviceDimensions, renderCanvas]);

  // Pointer Events for Stylus / Touch / Mouse
  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      pressure: e.pressure && e.pressure > 0 ? e.pressure : 0.7,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Palm rejection: if enabled, reject touch when drawing, only accept pen or mouse
    if (palmRejection && e.pointerType === 'touch') {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    activePointerIdRef.current = e.pointerId;

    const pt = getCanvasPoint(e);
    currentPointsRef.current = [pt];
    setIsDrawing(true);
    renderCanvas();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || activePointerIdRef.current !== e.pointerId) return;
    const pt = getCanvasPoint(e);
    currentPointsRef.current.push(pt);
    renderCanvas();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || activePointerIdRef.current !== e.pointerId) return;
    setIsDrawing(false);
    activePointerIdRef.current = null;

    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }

    const points = currentPointsRef.current;
    if (points.length === 0) return;

    // Check for smart shape snapping (if freehand pen drew a roughly closed rectangle or circle)
    let finalTool = currentTool;
    let finalPoints = [...points];

    if (smartSnap && currentTool === 'pen' && points.length > 15) {
      const pFirst = points[0];
      const pLast = points[points.length - 1];
      const dist = Math.hypot(pLast.x - pFirst.x, pLast.y - pFirst.y);

      // If stroke is closed and has 4 corners, snap to rectangle
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      points.forEach(p => {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      });

      const width = maxX - minX;
      const height = maxY - minY;

      if (dist < 30 && width > 30 && height > 30) {
        // Snap to rect
        finalTool = 'rect';
        finalPoints = [{ x: minX, y: minY }, { x: maxX, y: maxY }];
      } else if (dist > 80) {
        // Check if nearly straight horizontal/vertical line
        const dx = Math.abs(pLast.x - pFirst.x);
        const dy = Math.abs(pLast.y - pFirst.y);
        if (dy < 12 && dx > 50) {
          finalTool = 'line';
          finalPoints = [{ x: pFirst.x, y: (pFirst.y + pLast.y) / 2 }, { x: pLast.x, y: (pFirst.y + pLast.y) / 2 }];
        } else if (dx < 12 && dy > 50) {
          finalTool = 'line';
          finalPoints = [{ x: (pFirst.x + pLast.x) / 2, y: pFirst.y }, { x: (pFirst.x + pLast.x) / 2, y: pLast.y }];
        }
      }
    }

    const newStroke: Stroke = {
      id: `stroke-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      tool: finalTool,
      color: currentColor,
      size: currentSize,
      opacity: finalTool === 'highlighter' ? 0.35 : 1,
      points: finalPoints,
      layer: 'sketch',
    };

    onStrokesChange([...strokes, newStroke]);
    currentPointsRef.current = [];
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
    activePointerIdRef.current = null;
    currentPointsRef.current = [];
    renderCanvas();
  };

  const { width, height, radius, hasDynamicIsland, hasBrowserBar, title } = getDeviceDimensions();

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center p-4 md:p-8 min-h-[calc(100vh-140px)] select-none overflow-x-auto"
    >
      {/* Device Frame Wrapper */}
      <div className="relative">
        {/* Device Frame Title & Size Badge */}
        <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-500 mb-2">
          <span className="font-semibold text-slate-700">{title}</span>
          <span className="font-mono tabular-nums">{width} × {height}</span>
        </div>

        {/* Outer Bezel */}
        <div
          className="relative bg-white shadow-2xl transition-all duration-200 border border-slate-300"
          style={{
            borderRadius: `${radius}px`,
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          {/* Dynamic Island for iPhone */}
          {hasDynamicIsland && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-900 rounded-full z-20 pointer-events-none flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <div className="w-3 h-3 rounded-full bg-slate-800" />
            </div>
          )}

          {/* Desktop Browser Bar */}
          {hasBrowserBar && (
            <div className="h-9 border-b border-slate-200 bg-slate-100 flex items-center px-4 gap-2 z-20 pointer-events-none rounded-t-xl">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <div className="ml-4 flex-1 max-w-sm h-6 bg-white rounded border border-slate-200 flex items-center px-3 text-[10px] text-slate-400">
                https://my-app-wireframe.design
              </div>
            </div>
          )}

          {/* Drawing Canvas */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            className="touch-none block cursor-crosshair rounded-[inherit]"
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
          />

          {/* Mobile Home Indicator Bar */}
          {devicePreset === 'iphone16' && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900/30 rounded-full z-20 pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
};
