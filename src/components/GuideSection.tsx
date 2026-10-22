import React, { useState } from 'react';
import { GUIDE_CHAPTERS } from '../data/guideContent.ts';
import { Tablet, PenTool, Layout, CheckCircle2, ArrowRight, Sparkles, Layers, Sliders, Smartphone, Laptop } from 'lucide-react';
import { DevicePreset } from '../types/canvas.ts';

interface GuideSectionProps {
  onStartDrawingWithPreset: (preset: DevicePreset) => void;
  onOpenDrills: () => void;
  onOpenCheatsheet: () => void;
}

export const GuideSection: React.FC<GuideSectionProps> = ({
  onStartDrawingWithPreset,
  onOpenDrills,
  onOpenCheatsheet,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('workflow');
  const currentChapter = GUIDE_CHAPTERS.find(c => c.id === selectedChapterId) || GUIDE_CHAPTERS[0];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      {/* Hero Masterclass Banner */}
      <div className="border border-slate-200 rounded-3xl p-8 md:p-12 bg-white shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          <span>Official Guide</span>
          <span aria-hidden="true">·</span>
          <span>Tablet UI Architecture</span>
          <span aria-hidden="true">·</span>
          <span>Stylus Workflow</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 max-w-3xl text-balance">
          Mastering UI Design with Tablet & Stylus
        </h1>
        <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
          How to wireframe at 10x speed, bypass early pixel-pushing in Figma, and sketch production-ready mobile and web interfaces with natural pen ergonomics.
        </p>

        {/* Quick-action buttons bar */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onStartDrawingWithPreset('iphone16')}
            className="min-h-[44px] px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-transform flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <PenTool className="w-4 h-4" />
            <span>Launch Canvas (Mobile Frame)</span>
          </button>

          <button
            onClick={() => onStartDrawingWithPreset('ipadPro')}
            className="min-h-[44px] px-5 py-2.5 bg-slate-100 text-slate-800 text-sm font-medium rounded-xl hover:bg-slate-200 active:scale-[0.98] transition-transform flex items-center gap-2 cursor-pointer"
          >
            <Tablet className="w-4 h-4" />
            <span>Tablet 4:3 Frame</span>
          </button>

          <button
            onClick={onOpenDrills}
            className="min-h-[44px] px-5 py-2.5 bg-slate-100 text-slate-800 text-sm font-medium rounded-xl hover:bg-slate-200 active:scale-[0.98] transition-transform flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Start Practice Drills</span>
          </button>

          <button
            onClick={onOpenCheatsheet}
            className="min-h-[44px] px-4 py-2.5 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>View Symbol Shorthand</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4-Column Quick Blueprint Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
            01
          </div>
          <h3 className="text-base font-semibold text-slate-900">Boundless Thinking</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Start on an infinite blank grid. Map screens as thumbnail nodes with interaction arrows before drawing buttons.
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm">
            02
          </div>
          <h3 className="text-base font-semibold text-slate-900">Universal Shorthand</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Boxes with an "X" for media, parallel Greeking lines for copy, and capsules for buttons. Never write real copy early.
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm">
            03
          </div>
          <h3 className="text-base font-semibold text-slate-900">Thumb-Zone Ergonomics</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Anchor bottom 40% for primary navigation & action CTAs. Keep top 30% strictly for titles and passive info.
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm">
            04
          </div>
          <h3 className="text-base font-semibold text-slate-900">Friction & Grip</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Elevate tablet to a 15°-20° drafting angle, use a matte screen protector, and rest your palm naturally on glass.
          </p>
        </div>
      </div>

      {/* In-Depth Chapters Layout: Sidebar Nav + Chapter Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 space-y-2 sticky top-20">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
            Table of Contents
          </h2>
          {GUIDE_CHAPTERS.map((chap) => (
            <button
              key={chap.id}
              onClick={() => setSelectedChapterId(chap.id)}
              className={`w-full text-left p-3 rounded-xl transition-colors cursor-pointer flex items-start gap-3 ${
                selectedChapterId === chap.id
                  ? 'bg-slate-900 text-white'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className={`text-xs font-mono font-semibold pt-0.5 ${
                selectedChapterId === chap.id ? 'text-blue-300' : 'text-slate-400'
              }`}>
                {chap.number}
              </span>
              <div>
                <h4 className="text-sm font-semibold leading-snug">{chap.title}</h4>
                <div className={`text-xs mt-0.5 flex items-center gap-1.5 ${
                  selectedChapterId === chap.id ? 'text-slate-300' : 'text-slate-400'
                }`}>
                  <span>{chap.readTime} read</span>
                </div>
              </div>
            </button>
          ))}

          {/* Quick Hardware Checklist Card */}
          <div className="mt-6 pt-4 border-t border-slate-100 px-3 space-y-3">
            <h4 className="text-xs font-semibold text-slate-900">Recommended Tablet Rig</h4>
            <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span>iPad Air/Pro with Apple Pencil 2/Pro</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span>Galaxy Tab S9/S10 with S-Pen</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span>Matte Paper-Feel screen protector</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span>Magnetic 20° slant drafting wedge</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Selected Chapter Content */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-xs space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
              <span>Chapter {currentChapter.number}</span>
              <span aria-hidden="true">·</span>
              <span>{currentChapter.readTime}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {currentChapter.title}
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">
              {currentChapter.summary}
            </p>
          </div>

          <div className="space-y-8 divide-y divide-slate-100">
            {currentChapter.sections.map((section, idx) => (
              <div key={idx} className={`${idx > 0 ? 'pt-8' : ''} space-y-4`}>
                <h3 className="text-lg font-semibold text-slate-900">
                  {section.heading}
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {section.body}
                </p>

                {section.bulletPoints && (
                  <ul className="space-y-2.5 pl-1">
                    {section.bulletPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.callout && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <h5 className="text-xs font-semibold text-slate-900">{section.callout.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{section.callout.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Chapter Call to Action */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Ready to test this concept on the canvas?
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onStartDrawingWithPreset('iphone16')}
                className="min-h-[40px] px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 active:scale-[0.98] transition-transform flex items-center gap-1.5 cursor-pointer"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Open in Canvas</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated App Comparison Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-xs space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Tablet UI Software Landscape
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            How native drawing tools compare for UI/UX wireframing workflows.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-500 font-semibold">
                <th className="py-3 px-4">Tool</th>
                <th className="py-3 px-4">Best Used For</th>
                <th className="py-3 px-4">Engine</th>
                <th className="py-3 px-4">Key Advantage</th>
                <th className="py-3 px-4">Limitation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs md:text-sm text-slate-700">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">PenUI Studio (This App)</td>
                <td className="py-3.5 px-4">UI Wireframing & Code Generation</td>
                <td className="py-3.5 px-4 font-mono text-xs">Web Canvas + React</td>
                <td className="py-3.5 px-4 text-emerald-700 font-medium">Real-time Tailwind React code export & drills</td>
                <td className="py-3.5 px-4 text-slate-500">Focused on UI wireframing</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Concepts App</td>
                <td className="py-3.5 px-4">Infinite whiteboard user flows</td>
                <td className="py-3.5 px-4 font-mono text-xs">Infinite Vector</td>
                <td className="py-3.5 px-4">Zero pixelation at any zoom level, COPIC palette</td>
                <td className="py-3.5 px-4 text-slate-500">Requires subscription for advanced exports</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Procreate</td>
                <td className="py-3.5 px-4">Textured hand-drawn UI illustrations</td>
                <td className="py-3.5 px-4 font-mono text-xs">High-DPI Raster</td>
                <td className="py-3.5 px-4">QuickShape snap (hold pen to snap perfect rect)</td>
                <td className="py-3.5 px-4 text-slate-500">Fixed canvas size, pixelates when enlarged</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">FigJam (iPad)</td>
                <td className="py-3.5 px-4">Team whiteboarding & post-its</td>
                <td className="py-3.5 px-4 font-mono text-xs">Figma WebGL</td>
                <td className="py-3.5 px-4">Direct sync with Figma desktop design files</td>
                <td className="py-3.5 px-4 text-slate-500">Apple Pencil latency can lag on heavy files</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
