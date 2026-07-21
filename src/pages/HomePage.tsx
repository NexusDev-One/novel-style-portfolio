import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { chapters } from '../data/projects';
import type { Chapter } from '../data/projects';
import ProgressBar from '../components/ProgressBar';
import { FadeUp, FadeIn } from '../components/ScrollReveal';

interface HomePageProps {
  onNavigate: (chapterId: string) => void;
}

// Decorative ornament SVG
function Ornament({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="120" height="24" viewBox="0 0 120 24" fill="none">
      <path d="M0 12 Q30 4 60 12 Q90 20 120 12" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5"/>
      <circle cx="60" cy="12" r="2" fill="currentColor" opacity="0.6"/>
      <circle cx="20" cy="11" r="1" fill="currentColor" opacity="0.3"/>
      <circle cx="100" cy="13" r="1" fill="currentColor" opacity="0.3"/>
      <path d="M50 12 L60 6 L70 12 L60 18 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
    </svg>
  );
}

function BookEmblem({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="32" height="48" viewBox="0 0 32 48" fill="currentColor" opacity="0.5">
      {/* Left Page (Filled) */}
      <path d="M15.25 16 C11 12 6 12 2.5 14.5 V32.5 C6 30 11 30 15.25 34 Z" opacity="0.9" />
      {/* Right Page (Filled) */}
      <path d="M16.75 16 C21 12 26 12 29.5 14.5 V32.5 C26 30 21 30 16.75 34 Z" opacity="0.9" />
      {/* Central Spine */}
      <rect x="15.25" y="15" width="1.5" height="19.5" rx="0.5" />
      {/* Ribbon Bookmark */}
      <path d="M15.25 34.5 H16.75 V42 L16 40.5 L15.25 42 Z" />
      {/* Accent dot above the book */}
      <circle cx="16" cy="12" r="1.2" />
    </svg>
  );
}

function TOCEntry({ chapter, index, onNavigate }: { chapter: Chapter; index: number; onNavigate: (id: string) => void }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const dotLeaderCount = 40;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="toc-entry group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate(chapter.id)}
      style={{ paddingLeft: '2rem' }}
    >
      <div className="flex items-baseline gap-0 cursor-pointer py-4 border-b border-[#c4a882]/15 relative">

        {/* Chapter number */}
        <div className="flex-shrink-0 w-20">
          <motion.span
            className="text-sm tracking-widest uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              color: hovered ? '#b8963e' : '#c4a882',
              transition: 'color 0.3s ease',
            }}
          >
            {chapter.romanNumeral}
          </motion.span>
        </div>

        {/* Title area */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1">
            <motion.h3
              className="text-2xl md:text-3xl leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 500,
                color: hovered ? '#1a1714' : '#3d3830',
                transition: 'color 0.3s ease',
              }}
            >
              {chapter.title}
            </motion.h3>
            <motion.p
              className="text-sm md:text-base"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                color: '#8b7355',
                transition: 'color 0.3s ease',
              }}
            >
              {chapter.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Dot leader */}
        <div className="flex-1 mx-3 overflow-hidden hidden md:flex items-end pb-1" aria-hidden>
          <div className="flex gap-1 w-full justify-center">
            {Array.from({ length: dotLeaderCount }).map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 h-0.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: hovered
                    ? `rgba(184,150,62,${0.6 - i * 0.01})`
                    : 'rgba(196,168,130,0.3)',
                  transition: `background-color 0.3s ease ${i * 8}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Tags and page number */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <div className="hidden lg:flex gap-1.5">
            {chapter.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(196,168,130,0.15)',
                  color: '#8b7355',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.05em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <motion.span
            className="text-lg w-10 text-right"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              color: hovered ? '#b8963e' : '#c4a882',
              transition: 'color 0.3s ease',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>
        </div>

        {/* Hover reveal preview */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 top-full mt-1 z-30 pointer-events-none"
              style={{ width: 280 }}
            >
              <div
                className="rounded-lg overflow-hidden shadow-2xl border border-[#c4a882]/20"
                style={{ background: 'rgba(26,39,68,0.95)', backdropFilter: 'blur(12px)' }}
              >
                <img
                  src={chapter.finalImage}
                  alt={chapter.title}
                  className="w-full h-36 object-cover opacity-80"
                />
                <div className="p-3">
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: 'italic',
                      color: 'rgba(245,240,232,0.8)',
                    }}
                  >
                    {chapter.tagline}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className="text-xs"
                      style={{
                        color: 'rgba(196,168,130,0.7)',
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {chapter.duration}
                    </span>
                    <span style={{ color: 'rgba(196,168,130,0.4)' }}>·</span>
                    <span
                      className="text-xs"
                      style={{
                        color: 'rgba(184,150,62,0.9)',
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {chapter.role}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen paper-texture" style={{ background: 'var(--cream)' }}>
      <ProgressBar />

      {/* Book cover / hero */}
      <div
        className="relative min-h-screen flex flex-col items-center justify-center px-8 py-24 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1a2744 0%, #0d1520 100%)',
        }}
      >
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(196,168,130,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(196,168,130,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Top ornament */}
        <motion.div
          ref={heroRef}
          className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <BookEmblem className="text-[#c4a882] float-ornament" />
          <div className="w-px h-16 bg-gradient-to-b from-[#c4a882]/50 to-transparent" />
        </motion.div>

        {/* Main title */}
        <div className="text-center max-w-4xl mx-auto relative z-10 mt-16">
          <motion.p
            className="text-xs tracking-[0.5em] uppercase mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'rgba(196,168,130,0.6)',
            }}
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            The Portfolio of
          </motion.p>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl mb-6 leading-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: 'rgba(245,240,232,0.95)',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 40px rgba(0,0,0,0.4)',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Julian
            <br />
            <span style={{ fontStyle: 'italic', color: 'rgba(184,150,62,0.9)' }}>
              Voss
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={heroInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
            className="w-32 h-px mx-auto mb-6"
            style={{ background: 'linear-gradient(to right, transparent, #b8963e, transparent)' }}
          />

          <motion.p
            className="text-lg md:text-xl leading-relaxed max-w-lg mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              color: 'rgba(245,240,232,0.6)',
              fontWeight: 300,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
          >
            Senior UX Designer · Storyteller · Maker of things that matter
          </motion.p>

          <motion.div
            className="mt-12 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <div
              className="text-xs tracking-widest uppercase flex items-center gap-3"
              style={{
                color: 'rgba(196,168,130,0.5)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <div className="w-8 h-px" style={{ background: 'rgba(196,168,130,0.4)' }} />
              Scroll to read
              <div className="w-8 h-px" style={{ background: 'rgba(196,168,130,0.4)' }} />
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="hero-bottom-fade h-32" />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
            <rect x="1" y="1" width="18" height="30" rx="9" stroke="rgba(139, 115, 85, 0.45)" strokeWidth="1.2"/>
            <motion.rect
              x="9" y="6" width="2" height="8" rx="1"
              fill="rgba(184, 150, 62, 0.85)"
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="h-20 md:h-36" />

      {/* Table of Contents */}
      <div
        className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-32"
        style={{ background: 'var(--cream)' }}
      >
        {/* TOC Header */}
        <FadeUp>
          <div className="text-center mb-16 md:mb-24">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#8b7355',
              }}
            >
              Contents
            </p>
            <h2
              className="text-4xl md:text-5xl mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 500,
                color: 'var(--ink)',
              }}
            >
              Three Stories of Design
            </h2>
            <Ornament className="mx-auto text-[#c4a882]" />
            <p
              className="mt-6 text-base md:text-lg max-w-lg mx-auto leading-relaxed"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                color: '#8b7355',
              }}
            >
              Each project is a chapter — with its own problem, its own turning point, and its own resolution. Click any title to begin reading.
            </p>
          </div>
        </FadeUp>

        {/* Chapter entries */}
        <div className="relative">
          {/* Vertical rule */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(196,168,130,0.25), transparent)' }}
          />

          {chapters.map((chapter, i) => (
            <TOCEntry
              key={chapter.id}
              chapter={chapter}
              index={i}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* About section */}
        <FadeUp delay={0.2}>
          <div className="mt-32 md:mt-48 text-center">
            <div className="chapter-divider mb-12">
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  color: '#c4a882',
                  fontSize: '0.85rem',
                  letterSpacing: '0.2em',
                }}
              >
                About the Author
              </span>
            </div>

            <div className="max-w-2xl mx-auto">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-8 overflow-hidden"
                style={{ border: '2px solid rgba(196,168,130,0.3)', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
              >
                <img
                  src="/images/julian_portrait.png"
                  alt="Julian Voss Portrait"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3
                className="text-3xl mb-4"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: 'var(--ink)' }}
              >
                Julian Voss
              </h3>
              <p
                className="text-sm tracking-widest uppercase mb-6"
                style={{ fontFamily: "'Inter', sans-serif", color: '#8b7355' }}
              >
                Senior UX Designer · 8 Years Experience
              </p>
              <p
                className="text-lg leading-loose"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: '#3d3830',
                  lineHeight: '1.9',
                }}
              >
                I design for the moments in between — the pause before a decision, the breath before a purchase, the instant of relief when something works exactly as it should. I believe every product has a story worth telling elegantly.
              </p>

              <div className="mt-8 flex items-center justify-center gap-8">
                {[
                  { label: 'Projects', value: '47+' },
                  { label: 'Years', value: '8' },
                  { label: 'Users Served', value: '4M+' },
                ].map(item => (
                  <div key={item.label} className="text-center">
                    <div
                      className="text-2xl mb-1"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#b8963e' }}
                    >
                      {item.value}
                    </div>
                    <div
                      className="text-xs tracking-widest uppercase"
                      style={{ fontFamily: "'Inter', sans-serif", color: '#8b7355' }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Footer ornament */}
        <FadeIn delay={0.3}>
          <div className="mt-24 flex flex-col items-center gap-4">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#c4a882]/40" />
            <BookEmblem className="text-[#c4a882]" />
            <p
              className="text-xs tracking-[0.3em] uppercase mt-2"
              style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(196,168,130,0.5)' }}
            >
              MMXXIV
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
