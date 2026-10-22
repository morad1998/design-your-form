import { UIStencil, PracticeDrill } from '../types/canvas.ts';

export const UI_STENCILS: UIStencil[] = [
  {
    id: 'top-nav-bar',
    name: 'Mobile App Bar',
    category: 'navigation',
    icon: 'PanelTop',
    width: 320,
    height: 56,
    label: 'App Bar',
    description: 'Header with back chevron, screen title, and contextual action.',
    strokes: [
      // Border bottom
      {
        tool: 'line',
        color: '#1e293b',
        size: 2,
        points: [{ x: 0, y: 54 }, { x: 320, y: 54 }]
      },
      // Back chevron <
      {
        tool: 'line',
        color: '#1e293b',
        size: 2.5,
        points: [{ x: 28, y: 20 }, { x: 20, y: 28 }, { x: 28, y: 36 }]
      },
      // Center Title line
      {
        tool: 'line',
        color: '#1e293b',
        size: 3.5,
        points: [{ x: 110, y: 28 }, { x: 210, y: 28 }]
      },
      // Right action icon (circle)
      {
        tool: 'circle',
        color: '#64748b',
        size: 2,
        points: [{ x: 295, y: 28 }]
      }
    ],
    reactCode: `<header className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white">
  <button className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-700">
    <ArrowLeft className="w-5 h-5" />
  </button>
  <h1 className="text-base font-semibold text-slate-900">Explore Feed</h1>
  <button className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-700">
    <MoreVertical className="w-5 h-5" />
  </button>
</header>`
  },
  {
    id: 'bottom-tab-bar',
    name: 'Bottom Tab Bar',
    category: 'navigation',
    icon: 'PanelBottom',
    width: 320,
    height: 60,
    label: 'Tab Bar',
    description: '4-tab mobile navigation anchor with active state.',
    strokes: [
      // Top divider
      {
        tool: 'line',
        color: '#1e293b',
        size: 2,
        points: [{ x: 0, y: 0 }, { x: 320, y: 0 }]
      },
      // Tab 1 (Active)
      {
        tool: 'circle',
        color: '#2563eb',
        size: 3,
        points: [{ x: 40, y: 24 }]
      },
      {
        tool: 'line',
        color: '#2563eb',
        size: 2,
        points: [{ x: 32, y: 44 }, { x: 48, y: 44 }]
      },
      // Tab 2
      {
        tool: 'circle',
        color: '#94a3b8',
        size: 2,
        points: [{ x: 120, y: 24 }]
      },
      // Tab 3
      {
        tool: 'circle',
        color: '#94a3b8',
        size: 2,
        points: [{ x: 200, y: 24 }]
      },
      // Tab 4
      {
        tool: 'circle',
        color: '#94a3b8',
        size: 2,
        points: [{ x: 280, y: 24 }]
      }
    ],
    reactCode: `<nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-4 items-center">
  <button className="flex flex-col items-center justify-center text-blue-600">
    <Home className="w-5 h-5" />
    <span className="text-[10px] font-medium mt-1">Home</span>
  </button>
  <button className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-900">
    <Search className="w-5 h-5" />
    <span className="text-[10px] font-medium mt-1">Search</span>
  </button>
  <button className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-900">
    <Bookmark className="w-5 h-5" />
    <span className="text-[10px] font-medium mt-1">Saved</span>
  </button>
  <button className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-900">
    <User className="w-5 h-5" />
    <span className="text-[10px] font-medium mt-1">Profile</span>
  </button>
</nav>`
  },
  {
    id: 'media-card-with-x',
    name: 'Media Card (Image X)',
    category: 'content',
    icon: 'Image',
    width: 300,
    height: 220,
    label: 'Image Card',
    description: 'Wireframe card with image X placeholder, title, and body Greeking.',
    strokes: [
      // Outer rect
      {
        tool: 'rect',
        color: '#1e293b',
        size: 2,
        points: [{ x: 5, y: 5 }, { x: 295, y: 215 }]
      },
      // Image box
      {
        tool: 'rect',
        color: '#64748b',
        size: 1.5,
        points: [{ x: 15, y: 15 }, { x: 285, y: 130 }]
      },
      // Diagonal X
      {
        tool: 'line',
        color: '#94a3b8',
        size: 1.5,
        points: [{ x: 15, y: 15 }, { x: 285, y: 130 }]
      },
      {
        tool: 'line',
        color: '#94a3b8',
        size: 1.5,
        points: [{ x: 285, y: 15 }, { x: 15, y: 130 }]
      },
      // Title bar
      {
        tool: 'line',
        color: '#1e293b',
        size: 3,
        points: [{ x: 15, y: 155 }, { x: 180, y: 155 }]
      },
      // Body line 1
      {
        tool: 'line',
        color: '#64748b',
        size: 1.8,
        points: [{ x: 15, y: 175 }, { x: 270, y: 175 }]
      },
      // Body line 2
      {
        tool: 'line',
        color: '#64748b',
        size: 1.8,
        points: [{ x: 15, y: 195 }, { x: 170, y: 195 }]
      }
    ],
    reactCode: `<div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
  <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-400">
    <Image className="w-8 h-8 opacity-60" />
  </div>
  <div className="p-4 space-y-2">
    <h3 className="text-base font-semibold text-slate-900 leading-snug">Design Systems on Modern Tablets</h3>
    <p className="text-xs text-slate-500 leading-relaxed">
      Rapid paperless prototyping techniques for modern touch displays with stylus integration.
    </p>
  </div>
</div>`
  },
  {
    id: 'search-input-field',
    name: 'Search Input Field',
    category: 'inputs',
    icon: 'Search',
    width: 280,
    height: 48,
    label: 'Search Field',
    description: 'Rounded search box with magnifying glass and prompt line.',
    strokes: [
      // Pill box
      {
        tool: 'rect',
        color: '#1e293b',
        size: 2,
        points: [{ x: 5, y: 5 }, { x: 275, y: 43 }]
      },
      // Magnifying circle
      {
        tool: 'circle',
        color: '#64748b',
        size: 2,
        points: [{ x: 28, y: 24 }]
      },
      // Magnifying tail
      {
        tool: 'line',
        color: '#64748b',
        size: 2,
        points: [{ x: 33, y: 29 }, { x: 40, y: 36 }]
      },
      // Placeholder line
      {
        tool: 'line',
        color: '#94a3b8',
        size: 2,
        points: [{ x: 55, y: 24 }, { x: 170, y: 24 }]
      }
    ],
    reactCode: `<div className="relative flex items-center">
  <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
  <input 
    type="text" 
    placeholder="Search prototypes, templates..." 
    className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900 transition-colors"
  />
</div>`
  },
  {
    id: 'primary-cta-button',
    name: 'Primary CTA Button',
    category: 'inputs',
    icon: 'SquareCheck',
    width: 260,
    height: 48,
    label: 'Primary Button',
    description: '48px thumb-friendly primary action button.',
    strokes: [
      {
        tool: 'rect',
        color: '#2563eb',
        size: 2.5,
        points: [{ x: 5, y: 5 }, { x: 255, y: 43 }]
      },
      {
        tool: 'line',
        color: '#2563eb',
        size: 3,
        points: [{ x: 75, y: 24 }, { x: 185, y: 24 }]
      }
    ],
    reactCode: `<button className="w-full h-12 bg-slate-900 text-white font-medium text-sm rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-transform flex items-center justify-center">
  Continue to Checkout
</button>`
  },
  {
    id: 'user-profile-row',
    name: 'User Info Row',
    category: 'content',
    icon: 'User',
    width: 300,
    height: 60,
    label: 'User Row',
    description: 'Avatar circle with double text lines and trailing chevron.',
    strokes: [
      // Avatar circle
      {
        tool: 'circle',
        color: '#1e293b',
        size: 2,
        points: [{ x: 28, y: 30 }]
      },
      // Name line
      {
        tool: 'line',
        color: '#1e293b',
        size: 2.5,
        points: [{ x: 56, y: 23 }, { x: 160, y: 23 }]
      },
      // Subtitle line
      {
        tool: 'line',
        color: '#94a3b8',
        size: 1.8,
        points: [{ x: 56, y: 38 }, { x: 120, y: 38 }]
      },
      // Trailing chevron >
      {
        tool: 'line',
        color: '#64748b',
        size: 2,
        points: [{ x: 275, y: 24 }, { x: 283, y: 30 }, { x: 275, y: 36 }]
      }
    ],
    reactCode: `<div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-medium text-slate-700">
      JD
    </div>
    <div>
      <h4 className="text-sm font-semibold text-slate-900">Julianne Vance</h4>
      <p className="text-xs text-slate-500">Lead Design Architect</p>
    </div>
  </div>
  <ChevronRight className="w-4 h-4 text-slate-400" />
</div>`
  },
  {
    id: 'kpi-stat-card',
    name: 'KPI Metric Stat Card',
    category: 'content',
    icon: 'BarChart2',
    width: 180,
    height: 120,
    label: 'KPI Card',
    description: 'Metric container with primary number and mini sparkline.',
    strokes: [
      {
        tool: 'rect',
        color: '#1e293b',
        size: 2,
        points: [{ x: 5, y: 5 }, { x: 175, y: 115 }]
      },
      // Metric title
      {
        tool: 'line',
        color: '#64748b',
        size: 2,
        points: [{ x: 16, y: 24 }, { x: 90, y: 24 }]
      },
      // Big number
      {
        tool: 'line',
        color: '#1e293b',
        size: 4,
        points: [{ x: 16, y: 52 }, { x: 110, y: 52 }]
      },
      // Sparkline trend
      {
        tool: 'line',
        color: '#10b981',
        size: 2.2,
        points: [{ x: 16, y: 92 }, { x: 45, y: 84 }, { x: 80, y: 90 }, { x: 120, y: 72 }, { x: 155, y: 64 }]
      }
    ],
    reactCode: `<div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
  <span className="text-xs text-slate-500 font-medium">Weekly Conversion</span>
  <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">24.8%</div>
  <div className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
    <span>+3.2% vs last week</span>
  </div>
</div>`
  }
];

export const PRACTICE_DRILLS: PracticeDrill[] = [
  {
    id: 'drill-feed',
    title: 'Drill 1: Mobile App Home Feed',
    difficulty: 'Beginner',
    timeEstimate: '3-5 min',
    objective: 'Draw a complete mobile screen structure: Top App Bar, Story Avatar Circles, Hero Media Card with X placeholder, and Bottom Tab Bar.',
    tips: [
      'Draw the top bar first, keeping the header height around 56px.',
      'Place 3 avatar circles horizontally in the upper stretch zone.',
      'For the media card, draw a big box with diagonal X from corner to corner.',
      'Anchor 4 evenly-spaced tab markers in the bottom thumb zone.'
    ],
    templateFrame: 'iphone16',
    expectedElements: ['Top App Bar', 'Story Row', 'Media Card with X', 'Bottom Tab Bar'],
    ghostBlueprint: [
      // Top bar
      {
        id: 'g-top-bar',
        tool: 'line',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 40, y: 80 }, { x: 360, y: 80 }],
        layer: 'sketch'
      },
      {
        id: 'g-top-title',
        tool: 'line',
        color: '#cbd5e1',
        size: 3,
        opacity: 0.7,
        points: [{ x: 140, y: 60 }, { x: 260, y: 60 }],
        layer: 'sketch'
      },
      // 3 Avatar circles
      {
        id: 'g-av1',
        tool: 'circle',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 80, y: 130 }],
        layer: 'sketch'
      },
      {
        id: 'g-av2',
        tool: 'circle',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 160, y: 130 }],
        layer: 'sketch'
      },
      {
        id: 'g-av3',
        tool: 'circle',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 240, y: 130 }],
        layer: 'sketch'
      },
      {
        id: 'g-av4',
        tool: 'circle',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 320, y: 130 }],
        layer: 'sketch'
      },
      // Feed card box
      {
        id: 'g-card-box',
        tool: 'rect',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 45, y: 180 }, { x: 355, y: 440 }],
        layer: 'sketch'
      },
      // Card image X
      {
        id: 'g-card-x1',
        tool: 'line',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 45, y: 180 }, { x: 355, y: 380 }],
        layer: 'sketch'
      },
      {
        id: 'g-card-x2',
        tool: 'line',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 355, y: 180 }, { x: 45, y: 380 }],
        layer: 'sketch'
      },
      // Card title and Greeking text
      {
        id: 'g-card-text1',
        tool: 'line',
        color: '#cbd5e1',
        size: 3,
        opacity: 0.7,
        points: [{ x: 60, y: 400 }, { x: 220, y: 400 }],
        layer: 'sketch'
      },
      {
        id: 'g-card-text2',
        tool: 'line',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 60, y: 420 }, { x: 300, y: 420 }],
        layer: 'sketch'
      },
      // Bottom tab bar
      {
        id: 'g-bottom-line',
        tool: 'line',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 40, y: 520 }, { x: 360, y: 520 }],
        layer: 'sketch'
      },
      {
        id: 'g-tab1',
        tool: 'circle',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 80, y: 545 }],
        layer: 'sketch'
      },
      {
        id: 'g-tab2',
        tool: 'circle',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 160, y: 545 }],
        layer: 'sketch'
      },
      {
        id: 'g-tab3',
        tool: 'circle',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 240, y: 545 }],
        layer: 'sketch'
      },
      {
        id: 'g-tab4',
        tool: 'circle',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 320, y: 545 }],
        layer: 'sketch'
      }
    ]
  },
  {
    id: 'drill-checkout',
    title: 'Drill 2: E-Commerce Product & Sticky CTA',
    difficulty: 'Intermediate',
    timeEstimate: '4 min',
    objective: 'Practice layout density: big square product hero, staggered title, size selector chips, and a full-width sticky bottom CTA button.',
    tips: [
      'Draw the product photo as a square 1:1 box with diagonal X.',
      'Leave comfortable breathing room between price tag and size pills.',
      'Place the CTA button at the very bottom inside the natural thumb reach zone.'
    ],
    templateFrame: 'iphone16',
    expectedElements: ['1:1 Hero Image', 'Headline', 'Price Tag', 'Size Options', 'Full-width Sticky CTA'],
    ghostBlueprint: [
      // Top nav
      {
        id: 'c-top',
        tool: 'line',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 40, y: 70 }, { x: 360, y: 70 }],
        layer: 'sketch'
      },
      // 1:1 Product Box
      {
        id: 'c-hero',
        tool: 'rect',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 60, y: 90 }, { x: 340, y: 310 }],
        layer: 'sketch'
      },
      {
        id: 'c-hero-x1',
        tool: 'line',
        color: '#cbd5e1',
        size: 1.5,
        opacity: 0.7,
        points: [{ x: 60, y: 90 }, { x: 340, y: 310 }],
        layer: 'sketch'
      },
      {
        id: 'c-hero-x2',
        tool: 'line',
        color: '#cbd5e1',
        size: 1.5,
        opacity: 0.7,
        points: [{ x: 340, y: 90 }, { x: 60, y: 310 }],
        layer: 'sketch'
      },
      // Title
      {
        id: 'c-title',
        tool: 'line',
        color: '#cbd5e1',
        size: 3.5,
        opacity: 0.7,
        points: [{ x: 60, y: 340 }, { x: 260, y: 340 }],
        layer: 'sketch'
      },
      // Price
      {
        id: 'c-price',
        tool: 'line',
        color: '#cbd5e1',
        size: 3,
        opacity: 0.7,
        points: [{ x: 60, y: 370 }, { x: 130, y: 370 }],
        layer: 'sketch'
      },
      // 3 Size Pills
      {
        id: 'c-pill1',
        tool: 'rect',
        color: '#cbd5e1',
        size: 1.8,
        opacity: 0.7,
        points: [{ x: 60, y: 405 }, { x: 120, y: 440 }],
        layer: 'sketch'
      },
      {
        id: 'c-pill2',
        tool: 'rect',
        color: '#cbd5e1',
        size: 1.8,
        opacity: 0.7,
        points: [{ x: 135, y: 405 }, { x: 195, y: 440 }],
        layer: 'sketch'
      },
      {
        id: 'c-pill3',
        tool: 'rect',
        color: '#cbd5e1',
        size: 1.8,
        opacity: 0.7,
        points: [{ x: 210, y: 405 }, { x: 270, y: 440 }],
        layer: 'sketch'
      },
      // Sticky CTA Button
      {
        id: 'c-cta',
        tool: 'rect',
        color: '#cbd5e1',
        size: 2.5,
        opacity: 0.7,
        points: [{ x: 50, y: 510 }, { x: 350, y: 555 }],
        layer: 'sketch'
      }
    ]
  },
  {
    id: 'drill-login',
    title: 'Drill 3: Clean Onboarding & Auth Form',
    difficulty: 'Beginner',
    timeEstimate: '3 min',
    objective: 'Draw a minimal authentication card: Brand insignia, two stacked input fields, primary submit button, and a divider.',
    tips: [
      'Draw the circular brand mark centered at the top.',
      'Stack Email and Password fields with standard 16px vertical gap.',
      'Keep button height consistent with input fields (~48px).'
    ],
    templateFrame: 'iphone16',
    expectedElements: ['Brand Mark', 'Email Input', 'Password Input', 'Submit Button'],
    ghostBlueprint: [
      // Centered Logo Circle
      {
        id: 'l-logo',
        tool: 'circle',
        color: '#cbd5e1',
        size: 2.5,
        opacity: 0.7,
        points: [{ x: 200, y: 130 }],
        layer: 'sketch'
      },
      // Welcome Title line
      {
        id: 'l-title',
        tool: 'line',
        color: '#cbd5e1',
        size: 3.5,
        opacity: 0.7,
        points: [{ x: 110, y: 180 }, { x: 290, y: 180 }],
        layer: 'sketch'
      },
      // Email field
      {
        id: 'l-email',
        tool: 'rect',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 55, y: 220 }, { x: 345, y: 268 }],
        layer: 'sketch'
      },
      // Password field
      {
        id: 'l-pass',
        tool: 'rect',
        color: '#cbd5e1',
        size: 2,
        opacity: 0.7,
        points: [{ x: 55, y: 288 }, { x: 345, y: 336 }],
        layer: 'sketch'
      },
      // Submit Button
      {
        id: 'l-btn',
        tool: 'rect',
        color: '#cbd5e1',
        size: 2.5,
        opacity: 0.7,
        points: [{ x: 55, y: 366 }, { x: 345, y: 414 }],
        layer: 'sketch'
      },
      // Social Divider
      {
        id: 'l-div',
        tool: 'line',
        color: '#cbd5e1',
        size: 1.5,
        opacity: 0.7,
        points: [{ x: 80, y: 460 }, { x: 320, y: 460 }],
        layer: 'sketch'
      }
    ]
  }
];
