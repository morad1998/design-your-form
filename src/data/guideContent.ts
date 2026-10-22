export interface GuideChapter {
  id: string;
  number: string;
  title: string;
  summary: string;
  readTime: string;
  sections: Array<{
    heading: string;
    body: string;
    bulletPoints?: string[];
    callout?: {
      title: string;
      text: string;
    };
  }>;
}

export const GUIDE_CHAPTERS: GuideChapter[] = [
  {
    id: 'workflow',
    number: '01',
    title: 'The 4-Stage Tablet UI Workflow',
    summary: 'How professional product designers transition from boundless sketches to functional code in record time.',
    readTime: '4 min',
    sections: [
      {
        heading: 'Why Drawing Beats Figma in the Concept Phase',
        body: 'When you open Figma or code directly, your brain shifts into perfectionist mode: nudging 1px padding, picking hex codes, and fixing auto-layout bugs before validating if the feature even makes sense. Drawing on a tablet decouples layout thinking from visual styling.',
        bulletPoints: [
          'Speed: You can sketch 6 distinct screen layouts in 10 minutes.',
          'Cognitive freedom: Low-fidelity sketches invite feedback; high-fidelity mockups invite nitpicks about button colors.',
          'Spatial awareness: Sketching with a 1:1 screen frame lets you physically test thumb-reach zones on your actual hand.'
        ]
      },
      {
        heading: 'Stage 1: User Flows & Mindmaps (Boundless Mode)',
        body: 'Do not start inside a device phone frame. Use an infinite canvas to draw connected rectangular nodes representing screens, with directional arrows marking primary paths and error states.',
        bulletPoints: [
          'Draw screens as tiny 100x160px thumbnail boxes.',
          'Label the core user decision at each fork (e.g., "Has Account?", "Payment Approved?").',
          'Circle dead ends in red ink to eliminate navigation traps before drawing details.'
        ]
      },
      {
        heading: 'Stage 2: Low-Fidelity Wireframing (The Shorthand Phase)',
        body: 'Select a fixed device frame (e.g., iPhone 16 Pro 9:19.5 or iPad 4:3). Draw using standard UI shorthand: boxes with an "X" for images, horizontal wavy Greeking lines for paragraphs, and rounded boxes for buttons.',
        callout: {
          title: 'The Golden Rule of Low-Fi',
          text: 'Never write actual body copy when sketching. Use Greeking lines (parallel strokes) to test typographic density and hierarchy without distracting the client or yourself.'
        }
      },
      {
        heading: 'Stage 3: Spatial Math & The 8pt Grid Overlay',
        body: 'Switch on an 8pt or 16pt dot grid overlay. Re-align your primary containers to multiples of 8 (padding: 16px, button height: 48px, icon touch hitboxes: 44px min). Verify that the bottom 40% of the screen houses the most critical user actions (the natural thumb reach zone).'
      },
      {
        heading: 'Stage 4: Handoff & Code Generation',
        body: 'Group your sketched components into atomic units: Top Nav, Content Feed, Metric Cards, Sticky Action Bar. Map your sketched shorthand directly into Tailwind CSS utility classes and clean React components.'
      }
    ]
  },
  {
    id: 'hardware',
    number: '02',
    title: 'Hardware, Stylus & Ergonomic Setup',
    summary: 'Hardware configurations, friction tips, and physical postures that eliminate wrist fatigue and accidental palm touches.',
    readTime: '3 min',
    sections: [
      {
        heading: 'Matte Screen Protectors vs Bare Glass',
        body: 'Drawing on ultra-smooth glossy glass causes your stylus tip to skate, making straight wireframe lines wobbly and fatiguing your hand muscles from over-gripping.',
        bulletPoints: [
          'Apply a textured matte foil (such as Paperlike or Bellemond) for micro-friction that mimics 120gsm bond paper.',
          'Replace plastic Apple Pencil tips with fine-point metal micro-tips (0.8mm titanium) if you prefer technical drafting pen precision.',
          'Use S-Pen soft elastomer nibs on Samsung Galaxy Tab for natural pencil resistance without screen foil.'
        ]
      },
      {
        heading: 'Drafting Angle & Ergonomic Slant',
        body: 'Never draw on a tablet lying dead flat on a desk. Looking straight down causes cervical spine compression (text neck) after just 30 minutes.',
        bulletPoints: [
          'Elevate your tablet with a 15° to 25° drafting wedge or magnetic origami folio stand.',
          'Rest your forearm on the desk surface rather than hovering; let the tablet palm-rejection software handle the contact.',
          'If drawing in web browsers, enable "Stylus-Only Mode" so finger touches pan and zoom while only the pen deposits ink.'
        ]
      },
      {
        heading: 'Stylus Shortcut Configuration',
        body: 'On Apple Pencil 2/Pro, set the double-tap gesture to "Switch between current tool and eraser" or "Show color palette". On Samsung S-Pen, assign the side button to quick eraser or lasso select.'
      }
    ]
  },
  {
    id: 'shorthand',
    number: '03',
    title: 'Universal UI Sketching Shorthand Cheatsheet',
    summary: 'The battle-tested architectural symbols recognized by engineers and designers worldwide.',
    readTime: '5 min',
    sections: [
      {
        heading: 'The Visual Vocabulary of Interface Design',
        body: 'Just as architects use standardized symbols for doors, windows, and electrical outlets, UI designers use standard shorthand to communicate component semantics instantly.',
        bulletPoints: [
          'Image Placeholder: A rectangle with a diagonal "X" connecting opposite corners, or a small triangle/sun silhouette in the corner.',
          'Body Text / Paragraph: 3 to 4 parallel horizontal wavy or straight lines with the last line ending at 50% width (staggered terminal).',
          'Headlines & Titles: A solid dark horizontal bar or bold uppercase double-rule line.',
          'User Avatar: A circle containing a simple bust silhouette or an inner "+" for add-friend.',
          'Search Input: A rounded rectangle containing a magnifying glass icon on the left and a short horizontal placeholder line.',
          'Dropdown / Select: An outlined box with a downward-pointing caret "v" flush to the right edge.',
          'Primary Button: A filled solid rounded capsule or thick bordered box with centered uppercase text.',
          'Bottom Tab Bar: A bottom pinned strip divided into 4 or 5 equal zones with icons and a small active indicator dot.'
        ]
      },
      {
        heading: 'Flow & Gesture Notations',
        body: 'When annotating interactions, use contrasting ink (e.g. coral red or royal blue) so state transitions pop against charcoal wireframes.',
        bulletPoints: [
          'Tap Gesture: Small concentric circle or starburst radiating from the target element.',
          'Swipe / Drag: Dashed directional arrow with a finger pill badge indicating swipe trajectory.',
          'Modal / Sheet Transition: Upward arrow originating from the bottom bezel with a dashed hairline overlay.'
        ]
      }
    ]
  },
  {
    id: 'mobile-rules',
    number: '04',
    title: 'Mobile Thumb Zones & Spatial Discipline',
    summary: 'Ergonomic rules to ensure your sketched interfaces feel effortless in one hand.',
    readTime: '4 min',
    sections: [
      {
        heading: 'The 3-Tier Ergonomic Thumb Zone',
        body: 'When sketching for smartphones (iPhone 16 Pro or Pixel 9), categorize screen real-estate into reachability zones:',
        bulletPoints: [
          'Natural Reach Zone (Bottom 40%): Primary CTAs, bottom tab navigation, floating filter triggers, and key interactive controls.',
          'Stretch Zone (Middle 30%): Scrollable content feeds, metric cards, product photos, and list rows.',
          'Hard Reach Zone (Top 30%): Static page titles, non-destructive filters, and profile avatars. Never place single-path submit buttons here!'
        ]
      },
      {
        heading: 'The 44px Minimum Hitbox Rule',
        body: 'A human thumb pad covers roughly 10mm on glass. In your wireframe, ensure every clickable target—even a 20px icon—has at least 44x44px of visual breathing room around it to prevent accidental adjacent mis-taps.'
      },
      {
        heading: 'Single-Elevation Depth & Anti-Clutter',
        body: 'Avoid "cards inside cards inside containers". Use subtle hairline dividers (1px) and generous whitespace rather than nesting rounded boxes within rounded boxes.'
      }
    ]
  }
];

export const SYMBOL_CHEATSHEET = [
  {
    name: 'Image Placeholder',
    category: 'Media',
    meaning: 'Designates photography, video player, or hero illustration asset.',
    shorthand: 'Rectangle with diagonal "X"',
    tips: 'Draw a rectangle, then connect top-left to bottom-right and top-right to bottom-left with two quick strokes.'
  },
  {
    name: 'Headline / Title',
    category: 'Typography',
    meaning: 'Page H1 or section H2 heading with high visual weight.',
    shorthand: 'Solid bold horizontal bar',
    tips: 'Use the chisel marker tool or double-stroke a horizontal line with ~60% container width.'
  },
  {
    name: 'Body Paragraph',
    category: 'Typography',
    meaning: 'Multi-line descriptive body copy or article text.',
    shorthand: 'Parallel Greeking squiggles',
    tips: 'Draw 3 parallel lines with consistent 8px spacing; always cut the bottom line short at 40-50% width.'
  },
  {
    name: 'Primary Button / CTA',
    category: 'Actions',
    meaning: 'The dominant action on screen (e.g. "Continue", "Buy Now", "Save").',
    shorthand: 'Rounded box with centered text/label',
    tips: 'Draw a rounded rectangle with min 48px height; fill with light ink or write high-intent verb inside.'
  },
  {
    name: 'Search Bar',
    category: 'Inputs',
    meaning: 'Search or filter field with quick text entry.',
    shorthand: 'Pill box + magnifying glass',
    tips: 'Draw an elongated rounded capsule, add a small circle with a 45° tail on the left side.'
  },
  {
    name: 'User Avatar',
    category: 'Identity',
    meaning: 'User profile photo or team member indicator.',
    shorthand: 'Circle with head/shoulder outline',
    tips: 'Draw a circle, then a small arc at the bottom for shoulders and a dot for the head.'
  },
  {
    name: 'Dropdown / Select Box',
    category: 'Inputs',
    meaning: 'Selection menu with multiple options (e.g., Size, Country, Sort).',
    shorthand: 'Box with right-side caret "v"',
    tips: 'Draw a standard input rectangle, place an inverted chevron "v" inside the right edge.'
  },
  {
    name: 'Bottom Tab Navigation',
    category: 'Navigation',
    meaning: 'Primary 3-5 screen navigation destinations on mobile.',
    shorthand: 'Bottom bar divided into 4 slots with active filled icon',
    tips: 'Draw a horizontal bottom divider, place 4 vertical tick marks, fill the active icon solid.'
  },
  {
    name: 'Switch / Toggle',
    category: 'Inputs',
    meaning: 'Instant binary setting on/off toggle.',
    shorthand: 'Pill capsule with circle thumb shifted to right',
    tips: 'Draw a small capsule and place a filled circle on the right side for "ON", left for "OFF".'
  },
  {
    name: 'Modal Bottom Sheet',
    category: 'Overlays',
    meaning: 'Slide-up sheet for contextual options or checkout flows.',
    shorthand: 'Top-rounded panel with top center pill grab handle',
    tips: 'Draw a panel anchored to the bottom with rounded top corners, add a small 32px pill bar at the top center.'
  }
];
