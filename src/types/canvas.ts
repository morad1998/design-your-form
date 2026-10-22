export type ToolType = 'pen' | 'marker' | 'highlighter' | 'eraser' | 'rect' | 'circle' | 'line' | 'arrow' | 'text';

export type GridType = 'none' | 'dot' | '8pt' | 'isometric';

export type DevicePreset = 'iphone16' | 'ipadPro' | 'desktop' | 'watch' | 'freeform';

export interface Point {
  x: number;
  y: number;
  pressure?: number;
}

export interface Stroke {
  id: string;
  tool: ToolType;
  color: string;
  size: number;
  opacity: number;
  points: Point[];
  layer: 'sketch' | 'annotation';
  isShape?: boolean;
  shapeType?: 'rect' | 'circle' | 'line' | 'arrow';
}

export interface UIStencil {
  id: string;
  name: string;
  category: 'containers' | 'navigation' | 'inputs' | 'feedback' | 'content';
  icon: string;
  width: number;
  height: number;
  label: string;
  description: string;
  strokes: Array<{
    tool: ToolType;
    color: string;
    size: number;
    points: Point[];
  }>;
  reactCode: string;
}

export interface PracticeDrill {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  objective: string;
  tips: string[];
  templateFrame: DevicePreset;
  ghostBlueprint: Stroke[];
  expectedElements: string[];
}

export interface SymbolGuide {
  id: string;
  name: string;
  category: string;
  meaning: string;
  standardShorthand: string;
  drawingSteps: string[];
  proTip: string;
  sampleSvg: string;
}
