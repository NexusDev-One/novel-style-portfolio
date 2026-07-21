import { motion } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress';

interface ProgressBarProps {
  chapterTitle?: string;
  chapterNum?: string;
  sections?: { id: string; label: string }[];
  activeSection?: string;
}

export default function ProgressBar({ chapterTitle, chapterNum, sections, activeSection }: ProgressBarProps) {
  const progress = useScrollProgress();
  const percentage = Math.round(progress * 100);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* The actual progress bar */}
      <motion.div
        className="progress-bar"
        style={{ width: `${percentage}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Chapter info overlay */}
      {chapterTitle && (
        <div className="absolute top-1 right-0 flex items-center gap-3 px-4 py-1">
          {sections && sections.length > 0 && (
            <div className="hidden md:flex items-center gap-2">
              {sections.map((sec) => (
                <div
                  key={sec.id}
                  className="transition-all duration-300"
                  style={{
                    width: activeSection === sec.id ? '24px' : '8px',
                    height: '2px',
                    backgroundColor: activeSection === sec.id
                      ? 'rgba(184,150,62,0.9)'
                      : 'rgba(184,150,62,0.35)',
                    borderRadius: '1px',
                  }}
                />
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 bg-[#1a1714]/80 backdrop-blur-sm px-3 py-1 rounded-full">
            {chapterNum && (
              <span
                className="chapter-num text-xs"
                style={{ color: 'rgba(196,168,130,0.8)', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
              >
                Ch. {chapterNum}
              </span>
            )}
            <span
              className="text-xs hidden sm:block"
              style={{ color: 'rgba(245,240,232,0.7)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}
            >
              {percentage}% read
            </span>
          </div>
        </div>
      )}

      {/* Reading progress label on homepage */}
      {!chapterTitle && percentage > 5 && (
        <div className="absolute top-1 right-4">
          <div className="flex items-center gap-2 bg-[#1a1714]/60 backdrop-blur-sm px-3 py-1 rounded-full">
            <span
              className="text-xs"
              style={{ color: 'rgba(196,168,130,0.8)', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
            >
              Table of Contents — {percentage}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
