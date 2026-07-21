import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}

export function FadeUp({ children, delay = 0, className = '', threshold = 0.15 }: ScrollRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.9, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0, className = '' }: ScrollRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.1, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({
  children,
  delay = 0,
  className = '',
  from = 'left',
}: ScrollRevealProps & { from?: 'left' | 'right' | 'bottom' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const initialX = from === 'left' ? -50 : from === 'right' ? 50 : 0;
  const initialY = from === 'bottom' ? 50 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: initialX, y: initialY }}
      transition={{ duration: 0.9, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Image that "assembles" from left like a curtain reveal
export function AssembleReveal({
  src,
  alt,
  className = '',
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ clipPath: 'inset(0 100% 0 0)', scale: 1.05 }}
        animate={
          inView
            ? { clipPath: 'inset(0 0% 0 0)', scale: 1 }
            : { clipPath: 'inset(0 100% 0 0)', scale: 1.05 }
        }
        transition={{ duration: 1.3, delay, ease: 'easeInOut' }}
      />
    </div>
  );
}

// Wireframe that slides over a sketch background
export function WireframeReveal({
  wireframeUrl,
  sketchUrl,
  className = '',
}: {
  wireframeUrl: string;
  sketchUrl: string;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* Sketch background - always visible, dims when wireframe appears */}
      <motion.img
        src={sketchUrl}
        alt="Design sketch"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1 }}
        animate={inView ? { opacity: 0.25, scale: 1.02 } : { opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Parchment overlay for sketch */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(237,232,219,0.4), rgba(245,240,232,0.2))',
        }}
      />

      {/* Wireframe sliding in from right */}
      <motion.div
        className="relative z-[2] w-full h-full"
        initial={{ x: '110%', opacity: 0 }}
        animate={inView ? { x: '0%', opacity: 1 } : { x: '110%', opacity: 0 }}
        transition={{ duration: 1.1, delay: 0.35, ease: 'easeOut' }}
      >
        <img
          src={wireframeUrl}
          alt="Wireframe"
          className="w-full h-full object-cover"
          style={{ borderRadius: 'inherit' }}
        />
      </motion.div>

      {/* Sketch label */}
      <motion.div
        className="absolute bottom-3 left-3 z-[10]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <span
          className="text-xs px-2 py-1 rounded"
          style={{
            background: 'rgba(26,23,20,0.72)',
            color: 'rgba(196,168,130,0.95)',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            backdropFilter: 'blur(6px)',
          }}
        >
          ✎ Low-fidelity wireframe
        </span>
      </motion.div>
    </div>
  );
}

// UI that "assembles" piece by piece like tiles flipping
export function UIAssembly({
  finalUrl,
  className = '',
}: {
  finalUrl: string;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const tiles = Array.from({ length: 12 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Final image */}
      <motion.div
        className="relative overflow-hidden rounded-xl w-full h-full"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: 1.0, delay: 0.15, ease: 'easeOut' }}
      >
        <img src={finalUrl} alt="Final design" className="w-full h-full object-cover" />

        {/* Assembly tile overlay */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 pointer-events-none">
          {tiles.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1 }}
              animate={inView ? { opacity: 0 } : { opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.3 + i * 0.07,
                ease: 'easeOut',
              }}
              style={{ backgroundColor: 'rgba(237,232,219,0.95)' }}
            />
          ))}
        </div>
      </motion.div>

      {/* Label */}
      <motion.div
        className="absolute bottom-3 right-3 z-20"
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <span
          className="text-xs px-2 py-1 rounded"
          style={{
            background: 'rgba(26,23,20,0.72)',
            color: 'rgba(196,168,130,0.95)',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            backdropFilter: 'blur(6px)',
          }}
        >
          ✦ High-fidelity UI
        </span>
      </motion.div>
    </div>
  );
}
