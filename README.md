# Julian Voss — Novel-Style Portfolio

A premium, literary-inspired UX design portfolio built as a single-page web application. The portfolio is structured like a novel — each case study is a "chapter" with its own narrative arc, visual identity, and emotional tone.

---

## ✨ Concept

Most portfolios show work. This one tells stories.

Instead of a conventional grid of thumbnails, each project is presented as a full-length narrative chapter: complete with a prologue, research findings, wireframe reveals, design comparisons, outcome metrics, and a closing statement. The reading experience borrows heavily from editorial design — pull quotes, margin notes, chapter headings, and cinematic scroll animations.

---

## 📖 Case Studies

### Chapter I — The Architecture of Trust
**VaultBank · Mobile Banking Redesign**
A 6-month redesign of a mobile banking app, focused on making users *feel* their money is safe — not just know it. NPS grew from 23 to 71. App Store rating improved from 3.2★ to 4.8★.

### Chapter II — The Desire to Belong
**Maison Éclat · Luxury E-Commerce Experience**
A 4-month transformation of a luxury fashion website from sterile catalog into immersive editorial experience. Cart abandonment dropped 34%. Average order value increased by 189%.

### Chapter III — The Quiet Revolution
**Serene · Mental Wellness App**
An 8-month redesign of a mental wellness app, informed by trauma-aware research protocols and clinical psychology. 30-day retention increased 84%. Clinical anxiety scores dropped 29% at 90 days.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 + custom CSS variables |
| Animations | Framer Motion 12 |
| Routing | React Router v7 |
| Scroll Detection | react-intersection-observer |
| Build Output | vite-plugin-singlefile — entire app compiles to a single index.html |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AnimatedText.tsx      # Letter-by-letter or word-by-word text reveal animations
│   ├── ProgressBar.tsx       # Scroll-progress reading indicator
│   └── ScrollReveal.tsx      # Intersection-observer-based fade/slide-in component
├── data/
│   └── projects.ts           # All case study content (chapters, sections, metrics)
├── hooks/                    # Custom React hooks
├── pages/
│   ├── HomePage.tsx          # Landing page with hero, animated emblem, and chapter TOC
│   └── CaseStudyPage.tsx     # Full narrative chapter page (shared template for all 3 projects)
├── utils/                    # Shared utility functions
├── App.tsx                   # Router setup and global layout
├── index.css                 # Global design tokens, typography, and utility styles
└── main.tsx                  # React entry point

public/
└── images/                   # Project screenshots, wireframes, and portrait assets
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm (comes with Node)

### Install & Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
```

The output is a **single self-contained `dist/index.html`** file (inlined JS + CSS, no external dependencies). You can open it directly in a browser or deploy it anywhere.

---

## 🎨 Design System

The visual identity is rooted in literary aesthetics:

- **Typography**: Playfair Display (headings) · Cormorant Garamond (body) · Inter (UI labels)
- **Palette**: Deep navy `#0d1520` · Warm cream `#f5f0e8` · Antique gold `#b8963e`
- **Motion**: Framer Motion scroll-linked reveals, staggered fade-ins, and a bobbing scroll indicator
- **Chapter Colors**: Each case study has its own dark hero color (navy · chocolate · forest green) with a matching gradient transition into the cream content area

---

## 📄 License

This is a personal portfolio project. All content, case studies, images, and design assets are fictional and created for demonstration purposes only.
