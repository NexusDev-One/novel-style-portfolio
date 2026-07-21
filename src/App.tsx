import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import CaseStudyPage from './pages/CaseStudyPage';
import { chapters } from './data/projects';

type View = 'home' | 'chapter';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  const activeChapter = chapters.find((c) => c.id === activeChapterId) || null;

  const navigateToChapter = (chapterId: string) => {
    setDirection(1);
    setActiveChapterId(chapterId);
    setView('chapter');
    window.scrollTo(0, 0);
  };

  const navigateHome = () => {
    setDirection(-1);
    setView('home');
    window.scrollTo(0, 0);
    setTimeout(() => setActiveChapterId(null), 700);
  };

  const pageVariants = {
    initial: { opacity: 0, y: direction > 0 ? 30 : -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: direction > 0 ? -30 : 30 },
  };

  return (
    <div className="relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.55, ease: 'easeInOut' }}
          >
            <HomePage onNavigate={navigateToChapter} />
          </motion.div>
        )}

        {view === 'chapter' && activeChapter && (
          <motion.div
            key={`chapter-${activeChapter.id}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.55, ease: 'easeInOut' }}
          >
            <CaseStudyPage chapter={activeChapter} onBack={navigateHome} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter switcher — floating bookmark tabs on right side (visible in chapter view) */}
      <AnimatePresence>
        {view === 'chapter' && activeChapter && (
          <motion.div
            key="chapter-tabs"
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1 hidden md:flex"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {chapters.map((ch) => (
              <motion.button
                key={ch.id}
                onClick={() => {
                  if (ch.id !== activeChapter.id) {
                    setDirection(ch.number > activeChapter.number ? 1 : -1);
                    setActiveChapterId(ch.id);
                    window.scrollTo(0, 0);
                  }
                }}
                className="group flex items-center justify-end overflow-hidden"
                style={{ height: '44px' }}
              >
                <div
                  className="flex items-center px-3 py-2 rounded-l-lg text-xs transition-all duration-300"
                  style={{
                    background: ch.id === activeChapter.id
                      ? ch.color
                      : 'rgba(26,23,20,0.75)',
                    borderLeft: `3px solid ${ch.id === activeChapter.id ? ch.accentColor : 'transparent'}`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span
                    className="max-w-0 opacity-0 group-hover:max-w-32 group-hover:opacity-100 group-hover:mr-2 transition-all duration-300 ease-out overflow-hidden whitespace-nowrap"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: 'italic',
                      color: 'rgba(245,240,232,0.8)',
                      fontSize: '0.75rem',
                    }}
                  >
                    {ch.title.split(' ').slice(0, 2).join(' ')}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      color: ch.id === activeChapter.id
                        ? ch.accentColor
                        : 'rgba(196,168,130,0.6)',
                      fontSize: '0.8rem',
                      minWidth: '16px',
                      textAlign: 'center',
                    }}
                  >
                    {ch.romanNumeral}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
