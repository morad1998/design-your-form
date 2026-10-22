import React, { useState } from 'react';
import { SYMBOL_CHEATSHEET } from '../data/guideContent.ts';
import { X, Search, BookOpen, PenTool, Lightbulb } from 'lucide-react';

interface SymbolCheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrySymbol: (symbolName: string) => void;
}

export const SymbolCheatsheetModal: React.FC<SymbolCheatsheetModalProps> = ({
  isOpen,
  onClose,
  onTrySymbol,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Media', 'Typography', 'Actions', 'Inputs', 'Navigation', 'Overlays'];

  const filteredSymbols = SYMBOL_CHEATSHEET.filter((sym) => {
    const matchesCategory = selectedCategory === 'All' || sym.category === selectedCategory;
    const matchesSearch = sym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sym.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sym.shorthand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Reference Standard</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Universal UI Sketching Shorthand
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              The architectural symbols used by elite product designers to sketch interfaces at 10x speed.
            </p>
          </div>
          <button
            onClick={onClose}
            className="min-h-[36px] min-w-[36px] rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter symbols..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-3 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-slate-900"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Symbols Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSymbols.map((item, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl p-4 bg-white hover:border-slate-300 transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-400">
                    Symbol #{idx + 1}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-1">{item.name}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.meaning}</p>
                
                {/* Shorthand Box */}
                <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[11px] font-semibold text-slate-700">Standard Notation:</div>
                  <div className="text-xs font-mono text-slate-900 font-medium mt-0.5">{item.shorthand}</div>
                </div>

                {/* Pro tip */}
                <div className="mt-2.5 flex items-start gap-2 text-xs text-slate-500">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item.tips}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onTrySymbol(item.name);
                  onClose();
                }}
                className="mt-3 w-full min-h-[36px] bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <PenTool className="w-3 h-3" />
                <span>Draw on Canvas</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
