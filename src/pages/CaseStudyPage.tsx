import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Chapter, Section } from '../data/projects';
import ProgressBar from '../components/ProgressBar';
import { FadeUp, FadeIn, SlideIn, WireframeReveal, UIAssembly } from '../components/ScrollReveal';
import { AnimatedHeading, AnimatedParagraph } from '../components/AnimatedText';

interface CaseStudyPageProps {
  chapter: Chapter;
  onBack: () => void;
}

// Drop cap paragraph
function DropCapParagraph({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.p
      ref={ref}
      className={`drop-cap text-xl leading-loose ${className}`}
      style={{ fontFamily: "'EB Garamond', serif", color: '#3d3830' }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {text}
    </motion.p>
  );
}

// Metric card
function MetricCard({
  metric,
  index,
  accentColor,
}: {
  metric: { value: string; label: string; delta?: string };
  index: number;
  accentColor: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.97 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="p-6 rounded-xl border"
      style={{
        background: 'rgba(245,240,232,0.5)',
        borderColor: 'rgba(196,168,130,0.2)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="text-3xl md:text-4xl font-bold mb-2"
        style={{ fontFamily: "'Playfair Display', serif", color: accentColor }}
      >
        {metric.value}
      </div>
      <div
        className="text-sm mb-1"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: '#3d3830',
          letterSpacing: '0.05em',
          fontWeight: 500,
        }}
      >
        {metric.label}
      </div>
      {metric.delta && (
        <div
          className="text-xs"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            color: '#8b7355',
          }}
        >
          {metric.delta}
        </div>
      )}
    </motion.div>
  );
}

// Pull quote
function PullQuote({ text, accentColor }: { text: string; accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="my-12 md:my-16 pl-8 relative"
      style={{ borderLeft: `3px solid ${accentColor}` }}
    >
      <div
        className="text-5xl absolute -top-4 left-2 leading-none pointer-events-none"
        style={{
          color: accentColor,
          opacity: 0.3,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        "
      </div>
      <p
        className="text-xl md:text-2xl leading-relaxed"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          color: '#3d3830',
        }}
      >
        {text}
      </p>
    </motion.blockquote>
  );
}

// Interview quote
function InterviewQuote({ text }: { text: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="my-10 rounded-xl px-8 py-6 relative overflow-hidden"
      style={{
        background: 'rgba(196,168,130,0.08)',
        borderTop: '1px solid rgba(196,168,130,0.2)',
        borderBottom: '1px solid rgba(196,168,130,0.2)',
      }}
    >
      <p
        className="text-lg leading-relaxed"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          color: '#3d3830',
        }}
      >
        {text}
      </p>
    </motion.div>
  );
}

// Section renderer
function SectionBlock({ section, chapter, isFirst }: { section: Section; chapter: Chapter; isFirst: boolean }) {
  return (
    <section id={section.id} className="mb-24 md:mb-36 relative">
      {/* Section label */}
      <FadeUp>
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-8 h-px"
            style={{ background: chapter.accentColor, opacity: 0.6 }}
          />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: chapter.accentColor,
              opacity: 0.8,
            }}
          >
            {section.label}
          </span>
        </div>
      </FadeUp>

      {/* Section heading */}
      <AnimatedHeading
        text={section.heading}
        className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-10 font-display"
        delay={0.1}
      />

      {/* Body paragraphs */}
      {section.body.map((para, i) => (
        <div key={i} className="mb-6">
          {i === 0 && isFirst ? (
            <DropCapParagraph text={para} />
          ) : (
            <AnimatedParagraph
              text={para}
              delay={i * 0.1}
              className="text-lg md:text-xl leading-loose font-body"
            />
          )}
        </div>
      ))}

      {/* Pull quote */}
      {section.pullQuote && (
        <PullQuote text={section.pullQuote} accentColor={chapter.accentColor} />
      )}

      {/* Interview quote */}
      {section.quote && <InterviewQuote text={section.quote} />}

      {/* Margin note */}
      {section.marginNote && (
        <FadeIn delay={0.2}>
          <div
            className="margin-note my-6 max-w-xs ml-auto"
            style={{ borderColor: chapter.accentColor }}
          >
            {section.marginNote}
          </div>
        </FadeIn>
      )}

      {/* Reveal section - wireframe over sketch */}
      {section.type === 'reveal' && (
        <div className="mt-12">
          <WireframeReveal
            wireframeUrl={chapter.wireframeImage}
            sketchUrl={chapter.sketchImage}
            className="w-full h-64 md:h-96"
          />
        </div>
      )}

      {/* Comparison section - wireframe + final UI */}
      {section.type === 'comparison' && (
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <SlideIn from="left">
            <div>
              <WireframeReveal
                wireframeUrl={chapter.wireframeImage}
                sketchUrl={chapter.sketchImage}
                className="w-full h-56 md:h-72"
              />
              <p
                className="text-sm mt-3 text-center"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  color: '#8b7355',
                }}
              >
                The blueprint
              </p>
            </div>
          </SlideIn>
          <SlideIn from="right" delay={0.2}>
            <div>
              <UIAssembly finalUrl={chapter.finalImage} className="h-56 md:h-72" />
              <p
                className="text-sm mt-3 text-center"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  color: '#8b7355',
                }}
              >
                The reality
              </p>
            </div>
          </SlideIn>
        </div>
      )}

      {/* Metrics section */}
      {section.type === 'metrics' && section.metrics && (
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {section.metrics.map((metric, i) => (
            <MetricCard
              key={i}
              metric={metric}
              index={i}
              accentColor={chapter.accentColor}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// Sidebar navigation
function ChapterNav({
  sections,
  activeSection,
  accentColor,
}: {
  sections: { id: string; label: string }[];
  activeSection: string;
  accentColor: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {sections.map((sec) => (
        <button
          key={sec.id}
          onClick={() => {
            document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="flex items-center gap-2 text-left group"
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            animate={{
              backgroundColor: activeSection === sec.id ? accentColor : 'rgba(196,168,130,0.3)',
              scale: activeSection === sec.id ? 1.3 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <span
            className="text-xs transition-colors duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: activeSection === sec.id ? accentColor : 'rgba(139,115,85,0.6)',
              letterSpacing: '0.08em',
            }}
          >
            {sec.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function CaseStudyPage({ chapter, onBack }: CaseStudyPageProps) {
  const [activeSection, setActiveSection] = useState(chapter.sections[0]?.id || '');

  const sectionIds = chapter.sections.map((s) => s.id);

  // Track active section via scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActiveSection(id);
          });
        },
        { threshold: 0.25, rootMargin: '-15% 0px -15% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen paper-texture" style={{ background: 'var(--cream)' }}>
      <ProgressBar
        chapterTitle={chapter.title}
        chapterNum={chapter.romanNumeral}
        sections={chapter.sections.map((s) => ({ id: s.id, label: s.label }))}
        activeSection={activeSection}
      />

      {/* Chapter hero */}
      <div
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-end px-8 md:px-16 pb-20 pt-32 overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${chapter.color} 0%, #0d1015 100%)` }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${chapter.finalImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Back button */}
        <motion.button
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-2 group z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="w-6 h-6 flex items-center justify-center rounded-full border"
            style={{ borderColor: `rgba(245,240,232,0.3)` }}
            whileHover={{ scale: 1.1, borderColor: chapter.accentColor }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M6 2L3 5L6 8" stroke="rgba(245,240,232,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </motion.div>
          <span
            className="text-xs tracking-widest uppercase group-hover:opacity-100 transition-opacity duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'rgba(245,240,232,0.5)',
              opacity: 0.6,
            }}
          >
            Table of Contents
          </span>
        </motion.button>

        {/* Chapter identifier */}
        <motion.div
          className="relative z-10 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <span
            className="text-xs tracking-[0.5em] uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: chapter.accentColor,
              opacity: 0.8,
            }}
          >
            Chapter {chapter.romanNumeral} · {chapter.duration}
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="relative z-10 text-5xl md:text-7xl lg:text-8xl leading-none mb-6 max-w-4xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: chapter.textColor,
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {chapter.title}
        </motion.h1>

        <motion.p
          className="relative z-10 text-lg md:text-xl mb-4 max-w-xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            color: `${chapter.textColor}99`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          {chapter.subtitle}
        </motion.p>

        <motion.p
          className="relative z-10 text-base md:text-lg max-w-lg"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            color: chapter.accentColor,
            opacity: 0.9,
          }}
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 0.9 } : {}}
          transition={{ duration: 0.9, delay: 1.1 }}
        >
          "{chapter.tagline}"
        </motion.p>

        {/* Meta row */}
        <motion.div
          className="relative z-10 mt-10 pt-8 border-t flex flex-wrap gap-6 md:gap-10"
          style={{ borderColor: `${chapter.textColor}15` }}
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          {[
            { label: 'Role', value: chapter.role },
            { label: 'Duration', value: chapter.duration },
            { label: 'Team', value: chapter.team },
          ].map((item) => (
            <div key={item.label}>
              <p
                className="text-xs tracking-widest uppercase mb-1"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: `${chapter.textColor}40`,
                }}
              >
                {item.label}
              </p>
              <p
                className="text-sm"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: `${chapter.textColor}80`,
                }}
              >
                {item.value}
              </p>
            </div>
          ))}

          {/* Tools */}
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-1"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: `${chapter.textColor}40`,
              }}
            >
              Tools
            </p>
            <div className="flex flex-wrap gap-2">
              {chapter.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: `${chapter.textColor}10`,
                    border: `1px solid ${chapter.textColor}20`,
                    color: `${chapter.textColor}70`,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom gradient */}
        <div className="hero-bottom-fade h-32" />
      </div>

      {/* Spacer */}
      <div className="h-20 md:h-36" />

      {/* Content area */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <div className="flex gap-12 xl:gap-20">
          {/* Sticky sidebar */}
          <aside className="hidden xl:block w-40 flex-shrink-0">
            <div className="sticky top-24">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-6"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'rgba(139,115,85,0.5)',
                }}
              >
                In this chapter
              </p>
              <ChapterNav
                sections={chapter.sections.map((s) => ({ id: s.id, label: s.label }))}
                activeSection={activeSection}
                accentColor={chapter.accentColor}
              />

              <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(196,168,130,0.15)' }}>
                <p
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(139,115,85,0.5)' }}
                >
                  Tags
                </p>
                <div className="flex flex-col gap-2">
                  {chapter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: 'italic',
                        color: '#8b7355',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 max-w-2xl">
            {chapter.sections.map((section, i) => (
              <SectionBlock
                key={section.id}
                section={section}
                chapter={chapter}
                isFirst={i === 0}
              />
            ))}

            {/* Chapter ending / outcome */}
            <FadeUp>
              <div
                className="mt-20 p-10 md:p-14 rounded-2xl relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${chapter.color}ee, ${chapter.color}cc)`,
                }}
              >
                {/* Decorative corner */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-10"
                  style={{
                    background: `radial-gradient(circle at top right, ${chapter.accentColor}, transparent)`,
                  }}
                />

                <p
                  className="text-xs tracking-[0.4em] uppercase mb-4"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: chapter.accentColor,
                    opacity: 0.8,
                  }}
                >
                  Resolution
                </p>

                <h3
                  className="text-3xl md:text-4xl mb-6 leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    color: chapter.textColor,
                  }}
                >
                  {chapter.outcome.headline}
                </h3>

                <p
                  className="text-base md:text-lg leading-relaxed mb-10"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: `${chapter.textColor}99`,
                    lineHeight: '1.8',
                  }}
                >
                  {chapter.outcome.summary}
                </p>

                <div className="grid grid-cols-3 gap-6">
                  {chapter.outcome.metrics.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="text-center"
                    >
                      <div
                        className="text-2xl md:text-3xl mb-1"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          color: chapter.accentColor,
                          fontWeight: 600,
                        }}
                      >
                        {m.value}
                      </div>
                      <div
                        className="text-xs"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: `${chapter.textColor}50`,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {m.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative divider */}
                <div
                  className="mt-10 h-px w-full"
                  style={{ background: `linear-gradient(to right, transparent, ${chapter.accentColor}50, transparent)` }}
                />
                <p
                  className="text-center text-xs mt-6"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    color: `${chapter.textColor}30`,
                  }}
                >
                  — End of Chapter {chapter.romanNumeral} —
                </p>
              </div>
            </FadeUp>

            {/* Back CTA */}
            <FadeIn delay={0.2}>
              <div className="mt-16 text-center">
                <button
                  onClick={onBack}
                  className="group inline-flex items-center gap-3 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                    style={{
                      borderColor: chapter.accentColor,
                      background: 'transparent',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M7 2L4 6L7 10"
                        stroke={chapter.accentColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: 'italic',
                      color: '#8b7355',
                      fontSize: '1.1rem',
                    }}
                  >
                    Return to Table of Contents
                  </span>
                </button>
              </div>
            </FadeIn>
          </main>
        </div>
      </div>
    </div>
  );
}
